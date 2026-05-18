"use client";

import type { ReactNode } from "react";
import { SAAS_DEPARTMENTS } from "@/lib/departments";
import { useCatalogStore } from "@/store/catalog-store";
import type { ServiceCategory } from "@/types";

const CATEGORIES: ServiceCategory[] = ["SaaS", "PaaS", "IaaS"];

const categoryStyles: Record<ServiceCategory, string> = {
  SaaS: "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200",
  PaaS: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-200",
  IaaS: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200",
};

function Chip({
  active,
  onClick,
  children,
  className = "",
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
        active
          ? "border-sky-500 bg-sky-500 text-white shadow-sm dark:border-sky-400 dark:bg-sky-500"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      } ${className}`}
    >
      {children}
    </button>
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
  const clearFilters = useCatalogStore((s) => s.clearFilters);

  const saasSelected = filters.categories.includes("SaaS");

  const hasFilters =
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.vendors.length > 0 ||
    filters.departments.length > 0;

  return (
    <aside className="space-y-6 rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
      <section className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Filters
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400"
          >
            Clear all
          </button>
        )}
      </section>

      <section>
        <h3 className="mb-2 text-xs font-medium text-slate-500">Category</h3>
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <Chip
                active={filters.categories.includes(cat)}
                onClick={() => toggleCategory(cat)}
                className={filters.categories.includes(cat) ? "" : categoryStyles[cat]}
              >
                {cat}
              </Chip>
            </li>
          ))}
        </ul>
      </section>

      {saasSelected && (
        <section>
          <h3 className="mb-1 text-xs font-medium text-slate-500">Department</h3>
          <p className="mb-2 text-xs text-slate-400">
            Filter SaaS apps by the teams that use them
          </p>
          <ul className="flex max-h-52 flex-wrap gap-2 overflow-y-auto">
            {SAAS_DEPARTMENTS.map((dept) => (
              <li key={dept.id}>
                <Chip
                  active={filters.departments.includes(dept.id)}
                  onClick={() => toggleDepartment(dept.id)}
                >
                  {dept.label}
                </Chip>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="mb-2 text-xs font-medium text-slate-500">Vendor</h3>
        <ul className="flex max-h-36 flex-wrap gap-2 overflow-y-auto">
          {allVendors.map((vendor) => (
            <li key={vendor}>
              <Chip
                active={filters.vendors.includes(vendor)}
                onClick={() => toggleVendor(vendor)}
              >
                {vendor}
              </Chip>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-medium text-slate-500">Tags</h3>
        <ul className="flex max-h-48 flex-wrap gap-2 overflow-y-auto">
          {allTags.map((tag) => (
            <li key={tag}>
              <Chip
                active={filters.tags.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </Chip>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
