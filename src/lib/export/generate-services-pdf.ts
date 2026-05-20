import { jsPDF } from "jspdf";
import {
  formatComplianceExportLine,
  formatGartnerExportLine,
} from "@/lib/export/format-service-export-meta";
import {
  PDF_BRAND,
  PDF_CATEGORY_THEME,
} from "@/lib/export/pdf-category-theme";
import { resolveServiceLogoUrl } from "@/lib/logo-url";
import type { CloudService, ServiceCategory } from "@/types";

const PAGE_BOTTOM = 285;
const CARD_RADIUS = 3;
const HEADER_BAR_HEIGHT = 30;

async function loadImageDataUrl(url: string, useProxy: boolean): Promise<string | null> {
  try {
    const fetchUrl = useProxy
      ? `/api/image-proxy?url=${encodeURIComponent(url)}`
      : url;
    const res = await fetch(fetchUrl);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

function drawCategoryBadge(
  doc: jsPDF,
  category: ServiceCategory,
  x: number,
  y: number,
): number {
  const theme = PDF_CATEGORY_THEME[category];
  const paddingX = 2.5;
  const paddingY = 1.2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  const textW = doc.getTextWidth(category);
  const badgeW = textW + paddingX * 2;
  const badgeH = 5;

  doc.setFillColor(...theme.badgeFill);
  doc.setDrawColor(...theme.cardStroke);
  doc.roundedRect(x, y - badgeH + 1, badgeW, badgeH, 1.5, 1.5, "FD");

  doc.setTextColor(...theme.badgeText);
  doc.text(category, x + paddingX, y - 1.2);

  return badgeW;
}

function measureServiceBlockHeight(
  doc: jsPDF,
  service: CloudService,
  contentWidth: number,
): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  const nameLines = doc.splitTextToSize(service.name, contentWidth);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const complianceLines = doc.splitTextToSize(
    formatComplianceExportLine(service),
    contentWidth,
  );

  doc.setFontSize(9.5);
  const descLines = doc.splitTextToSize(service.description, contentWidth);

  const tagsH = service.tags.length > 0 ? 4 : 0;

  return (
    12 +
    nameLines.length * 5 +
    7 +
    5 +
    complianceLines.length * 4 +
    2 +
    descLines.length * 4.2 +
    tagsH +
    8
  );
}

function drawReportHeaderBar(
  doc: jsPDF,
  options: {
    margin: number;
    pageWidth: number;
    y: number;
    brandLogo: string | null;
    reportTitle: string;
    reportSubtitle?: string;
    compact?: boolean;
  },
): number {
  const { margin, pageWidth, y, brandLogo, reportTitle, reportSubtitle, compact } =
    options;
  const barW = pageWidth - margin * 2;
  const barH = compact ? 14 : HEADER_BAR_HEIGHT;
  const rx = 5;

  doc.setFillColor(...PDF_BRAND.headerFill);
  doc.roundedRect(margin, y, barW, barH, rx, rx, "F");

  if (!compact) {
    doc.setFillColor(...PDF_BRAND.headerAccent);
    doc.roundedRect(margin + barW - 42, y + 2, 38, barH - 4, 4, 4, "F");
  }

  const pillX = margin + 4;
  const pillY = y + (compact ? 2.5 : 4);
  const pillW = compact ? 36 : 54;
  const pillH = barH - (compact ? 5 : 8);

  doc.setFillColor(...PDF_BRAND.pillFill);
  doc.roundedRect(pillX, pillY, pillW, pillH, 2.5, 2.5, "F");

  if (brandLogo) {
    const logoW = compact ? 30 : 44;
    const logoH = compact ? 6 : 8;
    doc.addImage(
      brandLogo,
      "PNG",
      pillX + (pillW - logoW) / 2,
      pillY + (pillH - logoH) / 2,
      logoW,
      logoH,
    );
  }

  const textX = pillX + pillW + 5;
  const textMaxW = barW - pillW - 14;

  doc.setTextColor(...PDF_BRAND.headerText);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(compact ? 10 : 13);
  const titleLines = doc.splitTextToSize(reportTitle, textMaxW);
  doc.text(titleLines, textX, y + (compact ? 7 : 11));

  if (reportSubtitle && !compact) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(reportSubtitle, textX, y + 11 + titleLines.length * 4.5, {
      maxWidth: textMaxW,
    });
  }

  const generated = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(compact ? 7 : 7.5);
  doc.text(generated, margin + barW - 3, y + barH - 3, { align: "right" });

  return y + barH + (compact ? 6 : 10);
}

async function drawServiceCard(
  doc: jsPDF,
  service: CloudService,
  y: number,
  margin: number,
  pageWidth: number,
): Promise<number> {
  const theme = PDF_CATEGORY_THEME[service.category];
  const cardX = margin;
  const cardW = pageWidth - margin * 2;
  const innerPad = 4;
  const contentX = cardX + innerPad + 14;
  const contentW = cardW - innerPad * 2 - 14;

  const blockH = measureServiceBlockHeight(doc, service, contentW);

  doc.setFillColor(...theme.cardFill);
  doc.setDrawColor(...theme.cardStroke);
  doc.setLineWidth(0.35);
  doc.roundedRect(cardX, y, cardW, blockH, CARD_RADIUS, CARD_RADIUS, "FD");

  const logoUrl = resolveServiceLogoUrl(service.website_url, service.logo_url);
  if (logoUrl) {
    const logoData = await loadImageDataUrl(logoUrl, true);
    if (logoData) {
      try {
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(
          cardX + innerPad,
          y + innerPad,
          11,
          11,
          2,
          2,
          "F",
        );
        doc.addImage(logoData, "PNG", cardX + innerPad, y + innerPad, 11, 11);
      } catch {
        /* skip broken image */
      }
    }
  }

  let textY = y + innerPad + 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(41, 37, 36);
  const nameLines = doc.splitTextToSize(service.name, contentW);
  doc.text(nameLines, contentX, textY);
  textY += nameLines.length * 5 + 1.5;

  const badgeW = drawCategoryBadge(doc, service.category, contentX, textY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...theme.metaText);
  doc.text(service.vendor, contentX + badgeW + 2.5, textY - 0.5);
  textY += 6;

  doc.setFontSize(8.5);
  doc.setTextColor(101, 87, 255);
  const trustLine = formatGartnerExportLine(service);
  doc.text(trustLine, contentX, textY, { maxWidth: contentW });
  textY += 4.5;

  const complianceLine = formatComplianceExportLine(service);
  const hasCerts = (service.security_certifications?.length ?? 0) > 0;
  if (hasCerts) {
    doc.setTextColor(5, 150, 105);
  } else {
    doc.setTextColor(234, 88, 12);
  }
  const complianceLines = doc.splitTextToSize(complianceLine, contentW);
  doc.text(complianceLines, contentX, textY);
  textY += complianceLines.length * 4 + 1;

  doc.setFontSize(9.5);
  doc.setTextColor(68, 64, 60);
  const descLines = doc.splitTextToSize(service.description, contentW);
  doc.text(descLines, contentX, textY);
  textY += descLines.length * 4.2;

  if (service.tags.length > 0) {
    doc.setFontSize(7.5);
    doc.setTextColor(120, 113, 108);
    const tags = `Tags: ${service.tags.slice(0, 6).join(", ")}`;
    doc.text(tags, contentX, textY, { maxWidth: contentW });
  }

  return y + blockH + 5;
}

export async function generateServicesPdf(options: {
  services: CloudService[];
  reportTitle: string;
  reportSubtitle?: string;
}): Promise<void> {
  const { services, reportTitle, reportSubtitle } = options;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  const brandLogo = await loadImageDataUrl("/logo.png", false);

  let y = 12;
  y = drawReportHeaderBar(doc, {
    margin,
    pageWidth,
    y,
    brandLogo,
    reportTitle,
    reportSubtitle,
  });

  for (const service of services) {
    const theme = PDF_CATEGORY_THEME[service.category];
    const probeH = measureServiceBlockHeight(
      doc,
      service,
      pageWidth - margin * 2 - 8 - 14,
    );

    if (y + probeH > PAGE_BOTTOM) {
      doc.addPage();
      y = drawReportHeaderBar(doc, {
        margin,
        pageWidth,
        y: 12,
        brandLogo,
        reportTitle: reportTitle.slice(0, 60),
        compact: true,
      });
    }

    y = await drawServiceCard(doc, service, y, margin, pageWidth);
  }

  doc.setFontSize(8);
  doc.setTextColor(168, 162, 158);
  doc.text(
    "cloudiscover.io · Catalog export includes Gartner and compliance status as displayed on cards",
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: "center" },
  );

  doc.save(`cloudiscover-${slugify(reportTitle) || "services"}.pdf`);
}
