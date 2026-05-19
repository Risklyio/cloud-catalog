import type { SaasDepartment } from "@/lib/departments";
import { inferSaasSegment } from "@/lib/catalog/infer-saas-segment";
import type { CloudService } from "@/types";

export function normalizeService(
  raw: CloudService & { departments?: SaasDepartment[] | null },
): CloudService {
  const departments = raw.category === "SaaS" ? (raw.departments ?? []) : [];
  const withDepartments = { ...raw, departments };
  const saas_segment =
    raw.category === "SaaS" ? inferSaasSegment(withDepartments) : null;

  return {
    ...withDepartments,
    paas_provider:
      raw.category === "PaaS" ? (raw.paas_provider ?? null) : null,
    saas_segment,
  };
}

export function normalizeCatalogServices(
  services: (CloudService & { departments?: SaasDepartment[] | null })[],
): CloudService[] {
  return services.map(normalizeService);
}
