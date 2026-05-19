"use client";

import { useState } from "react";
import { buildExportLabel } from "@/lib/export/build-export-label";
import { useCatalogStore } from "@/store/catalog-store";
import type { CloudService, ServiceGroup } from "@/types";

const TOOLTIP_ID = "export-services-tooltip";

function ExportIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
      />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function ExportServicesButton({
  services,
  activeGroup,
}: {
  services: CloudService[];
  activeGroup: ServiceGroup | null;
}) {
  const [exporting, setExporting] = useState(false);
  const filters = useCatalogStore((s) => s.filters);
  const query = useCatalogStore((s) => s.query);

  if (services.length === 0) return null;

  async function handleExport() {
    setExporting(true);
    try {
      const { generateServicesPdf } = await import("@/lib/export/generate-services-pdf");
      const { title, subtitle } = buildExportLabel(
        services.length,
        filters,
        query,
        activeGroup,
      );
      await generateServicesPdf({
        services,
        reportTitle: title,
        reportSubtitle: subtitle,
      });
    } catch (err) {
      console.error("PDF export failed:", err);
      window.alert("Could not generate PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <section className="flex shrink-0 items-center gap-2">
      <div className="brand-gradient-border brand-gradient-border--hover rounded-xl">
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          aria-describedby={TOOLTIP_ID}
          aria-label="Download PDF report of visible services"
          className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white text-[#6557ff] shadow-sm transition hover:text-[#f74dc7] disabled:cursor-wait disabled:opacity-60"
        >
          {exporting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#6557ff] border-t-transparent" />
          ) : (
            <ExportIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="group/tooltip relative">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-[#6557ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6557ff]/40"
          aria-label="What does export do?"
          aria-describedby={TOOLTIP_ID}
        >
          <InfoIcon className="h-4 w-4" />
        </button>
        <div
          id={TOOLTIP_ID}
          role="tooltip"
          className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-stone-200 bg-white p-3 text-left text-xs leading-relaxed text-stone-600 opacity-0 shadow-lg transition-opacity duration-200 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 sm:w-72"
        >
          <p className="font-semibold text-stone-800">Export to PDF</p>
          <p className="mt-1">
            Downloads a PDF of the services currently shown (based on your filters
            and search), with a branded header bar, category-coloured cards, Trustpilot
            ratings, compliance status, vendor logos, and descriptions.
          </p>
        </div>
      </div>
    </section>
  );
}
