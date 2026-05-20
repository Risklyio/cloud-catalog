"use client";

import { useState, type ReactNode } from "react";
import { SAAS_DEPARTMENTS } from "@/lib/departments";
import { PAAS_PROVIDERS } from "@/lib/paas-providers";
import { SAAS_SEGMENTS } from "@/lib/saas-segments";
import { useCatalogStore } from "@/store/catalog-store";
import type { ServiceCategory } from "@/types";

const CATEGORIES: ServiceCategory[] = ["SaaS", "PaaS", "IaaS", "AI", "DNS"];

const categoryInactiveStyles: Record<ServiceCategory, string> = {
  SaaS: "border-violet-200 bg-violet-50/80 text-violet-800 hover:bg-violet-100",
  PaaS: "border-sky-200 bg-sky-50/80 text-sky-800 hover:bg-sky-100",
  IaaS: "border-amber-200 bg-amber-50/80 text-amber-800 hover:bg-amber-100",
  AI: "border-fuchsia-200 bg-fuchsia-50/80 text-fuchsia-800 hover:bg-fuchsia-100",
  DNS: "border-teal-200 bg-teal-50/80 text-teal-800 hover:bg-teal-100",
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

function FilterChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 ${
        open ? "rotate-90" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CollapsibleFilterSection({
  title,
  summary,
  defaultOpen = false,
  forceOpen = false,
  children,
}: {
  title: string;
  summary?: string;
  defaultOpen?: boolean;
  forceOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen || forceOpen);

  return (
    <section className="border-t border-stone-100 pt-4 first:border-t-0 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open || forceOpen}
        className="flex w-full items-center gap-2 text-left"
      >
        <FilterChevron open={open || forceOpen} />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">
            {title}
          </span>
          {summary && (
            <span className="mt-0.5 block text-xs font-normal normal-case text-stone-400">
              {summary}
            </span>
          )}
        </span>
      </button>
      {(open || forceOpen) && <div className="mt-3 pl-6">{children}</div>}
    </section>
  );
}

const RATING_OPTIONS = [
  { value: 4, label: "4+ stars" },
  { value: 4.5, label: "4.5+ stars" },
] as const;

export function FilterPanel() {
  const filters = useCatalogStore((s) => s.filters);
  const allVendors = useCatalogStore((s) => s.allVendors);
  const toggleCategory = useCatalogStore((s) => s.toggleCategory);
  const toggleVendor = useCatalogStore((s) => s.toggleVendor);
  const toggleDepartment = useCatalogStore((s) => s.toggleDepartment);
  const togglePaasProvider = useCatalogStore((s) => s.togglePaasProvider);
  const toggleSaasSegment = useCatalogStore((s) => s.toggleSaasSegment);
  const setMinRating = useCatalogStore((s) => s.setMinRating);
  const setVerifiedCompliance = useCatalogStore((s) => s.setVerifiedCompliance);
  const clearFilters = useCatalogStore((s) => s.clearFilters);

  const saasSelected = filters.categories.includes("SaaS");
  const paasSelected = filters.categories.includes("PaaS");
  const vendorSummary =
    filters.vendors.length > 0
      ? `${filters.vendors.length} selected`
      : `${allVendors.length} available`;

  const hasFilters =
    filters.categories.length > 0 ||
    filters.vendors.length > 0 ||
    filters.departments.length > 0 ||
    filters.paasProviders.length > 0 ||
    filters.saasSegments.length > 0 ||
    filters.minRating !== null ||
    filters.verifiedCompliance !== null;

  return (
    <aside className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <section className="flex items-center justify-between pb-4">
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

      <div className="space-y-4">
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
            Category
          </h3>
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
          <section className="border-t border-stone-100 pt-4">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Cloud provider
            </h3>
            <p className="mb-2 text-xs text-stone-400">PaaS hyperscaler</p>
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
          <>
            <section className="border-t border-stone-100 pt-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
                Solution area
              </h3>
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
            <section className="border-t border-stone-100 pt-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
                Department
              </h3>
              <ul className="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
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
          </>
        )}

        <CollapsibleFilterSection title="Vendor" summary={vendorSummary}>
          <ul className="flex max-h-44 flex-wrap gap-2 overflow-y-auto">
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
        </CollapsibleFilterSection>

        <CollapsibleFilterSection title="Gartner rating">
          <p className="mb-2 text-xs text-stone-400">
            Services without Gartner data are hidden when a minimum is set.
          </p>
          <ul className="flex flex-wrap gap-2">
            {RATING_OPTIONS.map((option) => (
              <FilterChip
                key={option.value}
                active={filters.minRating === option.value}
                onClick={() => setMinRating(option.value)}
                inactiveClassName="border-amber-200 bg-amber-50/80 text-amber-900 hover:bg-amber-100"
              >
                {option.label}
              </FilterChip>
            ))}
          </ul>
        </CollapsibleFilterSection>

        <CollapsibleFilterSection title="Verified compliance">
          <ul className="flex flex-wrap gap-2">
            <FilterChip
              active={filters.verifiedCompliance === "yes"}
              onClick={() => setVerifiedCompliance("yes")}
              inactiveClassName="border-emerald-200 bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100"
            >
              Yes
            </FilterChip>
            <FilterChip
              active={filters.verifiedCompliance === "no"}
              onClick={() => setVerifiedCompliance("no")}
              inactiveClassName="border-stone-200 bg-stone-50/80 text-stone-700 hover:bg-stone-100"
            >
              No
            </FilterChip>
          </ul>
        </CollapsibleFilterSection>
      </div>
    </aside>
  );
}
