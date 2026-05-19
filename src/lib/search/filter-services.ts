import type { SaasDepartment } from "@/lib/departments";
import type { PaasProvider } from "@/lib/paas-providers";
import type { SaasSegment } from "@/lib/saas-segments";
import type { CloudService, ServiceCategory } from "@/types";

export type VerifiedComplianceFilter = "yes" | "no";

export interface ServiceFilters {
  categories: ServiceCategory[];
  vendors: string[];
  departments: SaasDepartment[];
  paasProviders: PaasProvider[];
  saasSegments: SaasSegment[];
  /** Minimum star rating (1–5); services without a rating are excluded when set. */
  minRating: number | null;
  verifiedCompliance: VerifiedComplianceFilter | null;
}

export function hasVerifiedCompliance(service: CloudService): boolean {
  return (service.security_certifications?.length ?? 0) > 0;
}

export function filterServices(
  services: CloudService[],
  filters: ServiceFilters,
): CloudService[] {
  return services.filter((service) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(service.category)
    ) {
      return false;
    }

    if (
      filters.vendors.length > 0 &&
      !filters.vendors.includes(service.vendor)
    ) {
      return false;
    }

    if (filters.departments.length > 0) {
      if (service.category !== "SaaS" || service.departments.length === 0) return false;
      if (!filters.departments.some((d) => service.departments.includes(d))) {
        return false;
      }
    }

    if (filters.paasProviders.length > 0) {
      if (service.category !== "PaaS" || !service.paas_provider) return false;
      if (!filters.paasProviders.includes(service.paas_provider)) {
        return false;
      }
    }

    if (filters.saasSegments.length > 0) {
      if (service.category !== "SaaS" || !service.saas_segment) return false;
      if (!filters.saasSegments.includes(service.saas_segment)) {
        return false;
      }
    }

    if (filters.minRating !== null) {
      if (!service.review || service.review.rating < filters.minRating) {
        return false;
      }
    }

    if (filters.verifiedCompliance === "yes" && !hasVerifiedCompliance(service)) {
      return false;
    }

    if (filters.verifiedCompliance === "no" && hasVerifiedCompliance(service)) {
      return false;
    }

    return true;
  });
}

export function extractFilterOptions(services: CloudService[]) {
  const vendors = new Set<string>();

  for (const service of services) {
    vendors.add(service.vendor);
  }

  return {
    vendors: [...vendors].sort((a, b) => a.localeCompare(b)),
  };
}
