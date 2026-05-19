import "server-only";

import { resolveM365MarketplaceCertification } from "@/lib/catalog/m365-marketplace-certifications";
import { resolveSecurityCertifications } from "@/lib/catalog/service-certifications.server";
import type { CloudService } from "@/types";
import type {
  SecurityCertId,
  SecurityCertification,
} from "@/types/security-certification";

function mergeCertifications(
  base: SecurityCertification[],
  extra: SecurityCertification | null,
): SecurityCertification[] {
  if (!extra) return base;
  const seen = new Set<SecurityCertId>(base.map((c) => c.id));
  if (seen.has(extra.id)) return base;
  return [...base, extra];
}

/** Attach compliance badges on the server only (never in client bundles). */
export function attachSecurityCertifications(
  services: CloudService[],
): CloudService[] {
  return services.map((service) => {
    const base =
      service.security_certifications?.length
        ? service.security_certifications
        : resolveSecurityCertifications(service.slug, service.vendor);
    const m365 = resolveM365MarketplaceCertification(service);
    return {
      ...service,
      security_certifications: mergeCertifications(base, m365),
    };
  });
}
