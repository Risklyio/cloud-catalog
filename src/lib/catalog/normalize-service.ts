import type { SaasDepartment } from "@/lib/departments";
import { inferSaasSegment } from "@/lib/catalog/infer-saas-segment";
import { getCertificationsForService } from "@/lib/catalog/service-certifications";
import type { CloudService } from "@/types";

export function normalizeService(
  raw: CloudService & { departments?: SaasDepartment[] | null },
): CloudService {
  const departments = raw.category === "SaaS" ? (raw.departments ?? []) : [];
  const withDepartments = { ...raw, departments };
  const saas_segment =
    raw.category === "SaaS" ? inferSaasSegment(withDepartments) : null;

  const security_certifications =
    raw.security_certifications?.length
      ? raw.security_certifications
      : getCertificationsForService(raw.slug, raw.vendor);

  return {
    ...withDepartments,
    paas_provider:
      raw.category === "PaaS" ? (raw.paas_provider ?? null) : null,
    saas_segment,
    security_certifications,
  };
}

export function normalizeCatalogServices(
  services: (CloudService & { departments?: SaasDepartment[] | null })[],
): CloudService[] {
  return services.map(normalizeService);
}
