"use client";

import type { ReactNode } from "react";
import { SAAS_DEPARTMENTS } from "@/lib/departments";
import { PAAS_PROVIDERS } from "@/lib/paas-providers";
import { SAAS_SEGMENTS } from "@/lib/saas-segments";
import { useCatalogStore } from "@/store/catalog-store";
import type { ServiceCategory } from "@/types";

const CATEGORIES: ServiceCategory[] = ["SaaS", "PaaS", "IaaS", "AI"];

const categoryInactiveStyles: Record<ServiceCategory, string> = {
  SaaS: "border-violet-200 bg-violet-50/80 text-violet-800 hover:bg-violet-100",
  PaaS: "border-sky-200 bg-sky-50/80 text-sky-800 hover:bg-sky-100",
  IaaS: "border-amber-200 bg-amber-50/80 text-amber-800 hover:bg-amber-100",
  AI: "border-fuchsia-200 bg-fuchsia-50/80 text-fuchsia-800 hover:bg-fuchsia-100",
};

const paasProviderInactiveStyles = {
  aws: "border-orange-200 bg-orange-50/80 text-orange-900 hover:bg-orange-100",
  azure: "border-sky-200 bg-sky-50/80 text-sky-900 hover:bg-sky-100",
  gcp: "border-blue-200 bg-blue-50/80 text-blue-900 hover:bg-blue-100",
} as const;

const saasSegmentInactiveStyles = {
  it: "border-stone-200 bg-stone-50/80 text-stone-800 hover:bg-stone-100",
  "cyber-security":
    "border-rose-200 bg-rose-50/80 text-rose-900 hover:bg-rose-100",
  compliance:
    "border-emerald-200 bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100",
} as const;

function FilterChip({
  active,
  onClick,
  children,
  inactiveClassName = "border-stone-200 bg-white text-stone-600 hover:bg-stone-50",
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  inactiveClassName?: string;
}) {
  if (active) {
    return (
      <li className="brand-gradient-border brand-gradient-border--active rounded-full">
        <button
          type="button"
          onClick={onClick}
          className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#6557ff]"
        >
          {children}
        </button>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full border px-3 py-1 text-sm font-medium transition ${inactiveClassName}`}
      >
        {children}
      </button>
    </li>
  );
}

export function FilterPanel() {
  const filters = useCatalogStore((s) => s.filters);
  const allTags = useCatalogStore((s) => s.allTags);
  const allVendors = useCatalogStore((s) => s.allVendors);
  const toggleCategory = useCatalogStore((s) => s.toggleCategory);
  const toggleTag = useCatalogStore((s) => s.toggleTag);
  const toggleVendor = useCatalogStore((s) => s.toggleVendor);
  const toggleDepartment = useCatalogStore((s) => s.toggleDepartment);
  const togglePaasProvider = useCatalogStore((s) => s.togglePaasProvider);
  const toggleSaasSegment = useCatalogStore((s) => s.toggleSaasSegment);
  const clearFilters = useCatalogStore((s) => s.clearFilters);

  const saasSelected = filters.categories.includes("SaaS");
  const paasSelected = filters.categories.includes("PaaS");

  const hasFilters =
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.vendors.length > 0 ||
    filters.departments.length > 0 ||
    filters.paasProviders.length > 0 ||
    filters.saasSegments.length > 0;

  return (
    <aside className="space-y-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <section className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Filters
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-[#6557ff] hover:text-[#f74dc7]"
          >
            Clear all
          </button>
        )}
      </section>

      <section>
        <h3 className="mb-2 text-xs font-medium text-stone-500">Category</h3>
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              active={filters.categories.includes(cat)}
              onClick={() => toggleCategory(cat)}
              inactiveClassName={categoryInactiveStyles[cat]}
            >
              {cat}
            </FilterChip>
          ))}
        </ul>
      </section>

      {paasSelected && (
        <section>
          <h3 className="mb-1 text-xs font-medium text-stone-500">Cloud provider</h3>
          <p className="mb-2 text-xs text-stone-400">
            Filter PaaS services by hyperscaler
          </p>
          <ul className="flex flex-wrap gap-2">
            {PAAS_PROVIDERS.map((provider) => (
              <FilterChip
                key={provider.id}
                active={filters.paasProviders.includes(provider.id)}
                onClick={() => togglePaasProvider(provider.id)}
                inactiveClassName={paasProviderInactiveStyles[provider.id]}
              >
                {provider.label}
              </FilterChip>
            ))}
          </ul>
        </section>
      )}

      {saasSelected && (
        <section>
          <h3 className="mb-1 text-xs font-medium text-stone-500">Solution area</h3>
          <p className="mb-2 text-xs text-stone-400">
            Filter SaaS by IT, security, or compliance focus
          </p>
          <ul className="flex flex-wrap gap-2">
            {SAAS_SEGMENTS.map((segment) => (
              <FilterChip
                key={segment.id}
                active={filters.saasSegments.includes(segment.id)}
                onClick={() => toggleSaasSegment(segment.id)}
                inactiveClassName={saasSegmentInactiveStyles[segment.id]}
              >
                {segment.label}
              </FilterChip>
            ))}
          </ul>
        </section>
      )}

      {saasSelected && (
        <section>
          <h3 className="mb-1 text-xs font-medium text-stone-500">Department</h3>
          <p className="mb-2 text-xs text-stone-400">
            Filter SaaS apps by the teams that use them
          </p>
          <ul className="flex max-h-52 flex-wrap gap-2 overflow-y-auto">
            {SAAS_DEPARTMENTS.map((dept) => (
              <FilterChip
                key={dept.id}
                active={filters.departments.includes(dept.id)}
                onClick={() => toggleDepartment(dept.id)}
              >
                {dept.label}
              </FilterChip>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="mb-2 text-xs font-medium text-stone-500">Vendor</h3>
        <ul className="flex max-h-36 flex-wrap gap-2 overflow-y-auto">
          {allVendors.map((vendor) => (
            <FilterChip
              key={vendor}
              active={filters.vendors.includes(vendor)}
              onClick={() => toggleVendor(vendor)}
            >
              {vendor}
            </FilterChip>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-medium text-stone-500">Tags</h3>
        <ul className="flex max-h-48 flex-wrap gap-2 overflow-y-auto">
          {allTags.map((tag) => (
            <FilterChip
              key={tag}
              active={filters.tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              #{tag}
            </FilterChip>
          ))}
        </ul>
      </section>
    </aside>
  );
}
