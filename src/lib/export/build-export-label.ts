import { SAAS_DEPARTMENT_LABELS } from "@/lib/departments";
import type { ServiceFilters } from "@/lib/search/filter-services";
import type { ServiceGroup } from "@/types";

export function buildExportLabel(
  servicesCount: number,
  filters: ServiceFilters,
  query: string,
  activeGroup: ServiceGroup | null,
): { title: string; subtitle: string } {
  if (activeGroup) {
    return {
      title: activeGroup.title,
      subtitle: `${activeGroup.description} · ${servicesCount} service${servicesCount === 1 ? "" : "s"}`,
    };
  }

  const parts: string[] = [];

  if (filters.categories.length > 0) {
    parts.push(filters.categories.join(", "));
  }

  if (filters.departments.length > 0) {
    parts.push(
      filters.departments.map((d) => SAAS_DEPARTMENT_LABELS[d]).join(", "),
    );
  }

  if (filters.vendors.length > 0) {
    parts.push(`${filters.vendors.length} vendor${filters.vendors.length === 1 ? "" : "s"}`);
  }

  if (filters.minRating !== null) {
    parts.push(`${filters.minRating}+ stars`);
  }

  if (filters.verifiedCompliance === "yes") {
    parts.push("Verified compliance");
  } else if (filters.verifiedCompliance === "no") {
    parts.push("No verified compliance");
  }

  if (query.trim()) {
    parts.push(`Search: “${query.trim()}”`);
  }

  const title = parts.length > 0 ? parts.join(" · ") : "All cloud services";
  const subtitle = `${servicesCount} service${servicesCount === 1 ? "" : "s"} in this selection`;

  return { title, subtitle };
}
