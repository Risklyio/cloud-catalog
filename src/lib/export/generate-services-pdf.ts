import { jsPDF } from "jspdf";
import { resolveServiceLogoUrl } from "@/lib/logo-url";
import type { CloudService } from "@/types";

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

export async function generateServicesPdf(options: {
  services: CloudService[];
  reportTitle: string;
  reportSubtitle?: string;
}): Promise<void> {
  const { services, reportTitle, reportSubtitle } = options;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 18;

  const brandLogo = await loadImageDataUrl("/logo.png", false);
  if (brandLogo) {
    doc.addImage(brandLogo, "PNG", margin, y - 2, 48, 10);
  }

  doc.setFontSize(9);
  doc.setTextColor(120, 113, 108);
  doc.text(
    `Generated ${new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`,
    pageWidth - margin,
    y + 4,
    { align: "right" },
  );

  y += 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(41, 37, 36);
  const titleLines = doc.splitTextToSize(reportTitle, pageWidth - margin * 2);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 7 + 2;

  if (reportSubtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(87, 83, 78);
    const subLines = doc.splitTextToSize(reportSubtitle, pageWidth - margin * 2);
    doc.text(subLines, margin, y);
    y += subLines.length * 5 + 4;
  }

  doc.setDrawColor(231, 229, 228);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  for (const service of services) {
    const blockHeight = 32;
    if (y + blockHeight > 285) {
      doc.addPage();
      y = 20;
    }

    const logoUrl = resolveServiceLogoUrl(service.website_url, service.logo_url);
    let textX = margin;

    if (logoUrl) {
      const logoData = await loadImageDataUrl(logoUrl, true);
      if (logoData) {
        try {
          doc.addImage(logoData, "PNG", margin, y, 11, 11);
          textX = margin + 14;
        } catch {
          /* skip broken image */
        }
      }
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(41, 37, 36);
    doc.text(service.name, textX, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 113, 108);
    doc.text(`${service.category} · ${service.vendor}`, textX, y + 10);

    doc.setFontSize(10);
    doc.setTextColor(68, 64, 60);
    const descLines = doc.splitTextToSize(service.description, pageWidth - textX - margin);
    doc.text(descLines, textX, y + 15);

    const tags =
      service.tags.length > 0 ? `Tags: ${service.tags.slice(0, 6).join(", ")}` : "";
    if (tags) {
      doc.setFontSize(8);
      doc.setTextColor(168, 162, 158);
      doc.text(tags, textX, y + 15 + descLines.length * 4.2);
    }

    y +=
      18 +
      descLines.length * 4.2 +
      (tags ? 5 : 0) +
      6;
  }

  doc.setFontSize(8);
  doc.setTextColor(168, 162, 158);
  doc.text(
    "cloudiscover.io · Read-only catalog export",
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: "center" },
  );

  doc.save(`cloudiscover-${slugify(reportTitle) || "services"}.pdf`);
}
