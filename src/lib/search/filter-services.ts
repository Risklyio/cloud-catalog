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

function categoryFilterActive(filters: ServiceFilters): boolean {
  return filters.categories.length > 0;
}

function appliesPaasProviderFilter(filters: ServiceFilters): boolean {
  if (filters.paasProviders.length === 0) return false;
  if (!categoryFilterActive(filters)) return true;
  return filters.categories.includes("PaaS");
}

function appliesSaasSegmentFilter(filters: ServiceFilters): boolean {
  if (filters.saasSegments.length === 0) return false;
  if (!categoryFilterActive(filters)) return true;
  return filters.categories.includes("SaaS");
}

function appliesDepartmentFilter(filters: ServiceFilters): boolean {
  if (filters.departments.length === 0) return false;
  if (!categoryFilterActive(filters)) return true;
  return filters.categories.includes("SaaS");
}

export function filterServices(
  services: CloudService[],
  filters: ServiceFilters,
): CloudService[] {
  return services.filter((service) => {
    if (
      categoryFilterActive(filters) &&
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

    if (appliesDepartmentFilter(filters)) {
      if (service.category !== "SaaS" || service.departments.length === 0) return false;
      if (!filters.departments.some((d) => service.departments.includes(d))) {
        return false;
      }
    }

    if (appliesPaasProviderFilter(filters)) {
      if (service.category !== "PaaS" || !service.paas_provider) return false;
      if (!filters.paasProviders.includes(service.paas_provider)) {
        return false;
      }
    }

    if (appliesSaasSegmentFilter(filters)) {
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
