import "server-only";

import { resolveSecurityCertifications } from "@/lib/catalog/service-certifications.server";
import type { CloudService } from "@/types";

/** Attach compliance badges on the server only (never in client bundles). */
export function attachSecurityCertifications(
  services: CloudService[],
): CloudService[] {
  return services.map((service) => ({
    ...service,
    security_certifications:
      service.security_certifications?.length
        ? service.security_certifications
        : resolveSecurityCertifications(service.slug, service.vendor),
  }));
}
