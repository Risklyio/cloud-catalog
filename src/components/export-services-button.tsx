"use client";

import { useState } from "react";
import { buildExportLabel } from "@/lib/export/build-export-label";
import { useCatalogStore } from "@/store/catalog-store";
import type { CloudService, ServiceGroup } from "@/types";

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
    <section className="brand-gradient-border brand-gradient-border--hover shrink-0 rounded-xl">
      <button
        type="button"
        onClick={handleExport}
        disabled={exporting}
        title="Export selection as PDF"
        aria-label="Export selection as PDF"
        className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white text-[#6557ff] shadow-sm transition hover:text-[#f74dc7] disabled:cursor-wait disabled:opacity-60"
      >
        {exporting ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#6557ff] border-t-transparent" />
        ) : (
          <ExportIcon className="h-5 w-5" />
        )}
      </button>
    </section>
  );
}
