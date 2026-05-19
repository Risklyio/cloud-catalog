import type { SaasDepartment } from "@/lib/departments";
import type { PaasProvider } from "@/lib/paas-providers";
import type { SaasSegment } from "@/lib/saas-segments";
import type { CloudService, ServiceCategory } from "@/types";

export interface ServiceFilters {
  categories: ServiceCategory[];
  tags: string[];
  vendors: string[];
  departments: SaasDepartment[];
  paasProviders: PaasProvider[];
  saasSegments: SaasSegment[];
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

    if (
      filters.tags.length > 0 &&
      !filters.tags.some((tag) => service.tags.includes(tag))
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

    return true;
  });
}

export function extractFilterOptions(services: CloudService[]) {
  const tags = new Set<string>();
  const vendors = new Set<string>();

  for (const service of services) {
    vendors.add(service.vendor);
    for (const tag of service.tags) tags.add(tag);
  }

  return {
    tags: [...tags].sort((a, b) => a.localeCompare(b)),
    vendors: [...vendors].sort((a, b) => a.localeCompare(b)),
  };
}
