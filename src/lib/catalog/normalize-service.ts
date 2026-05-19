import type { SaasDepartment } from "@/lib/departments";
import type { CloudService } from "@/types";

export function normalizeService(raw: CloudService & { departments?: SaasDepartment[] | null }): CloudService {
  const departments =
    raw.category === "SaaS" ? (raw.departments ?? []) : [];

  return {
    ...raw,
    departments,
    paas_provider:
      raw.category === "PaaS"
        ? (raw.paas_provider ?? null)
        : null,
  };
}

export function normalizeCatalogServices(
  services: (CloudService & { departments?: SaasDepartment[] | null })[],
): CloudService[] {
  return services.map(normalizeService);
}
