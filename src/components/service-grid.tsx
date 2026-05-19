"use client";

import { useCatalogStore } from "@/store/catalog-store";
import { useVisibleServices } from "@/hooks/use-visible-services";
import { ExportServicesButton } from "@/components/export-services-button";
import { ServiceCard } from "@/components/service-card";

export function ServiceGrid() {
  const hydrated = useCatalogStore((s) => s.hydrated);
  const groups = useCatalogStore((s) => s.groups);
  const activeGroupSlug = useCatalogStore((s) => s.activeGroupSlug);
  const query = useCatalogStore((s) => s.query);
  const services = useVisibleServices();
  const activeGroup = activeGroupSlug
    ? groups.find((g) => g.slug === activeGroupSlug) ?? null
    : null;

  if (!hydrated) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            className="h-56 animate-pulse rounded-2xl bg-slate-200/80 dark:bg-slate-800"
          />
        ))}
      </section>
    );
  }

  return (
    <section>
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-stone-900">
            {activeGroup ? activeGroup.title : "All cloud services"}
          </h2>
          <ExportServicesButton services={services} activeGroup={activeGroup} />
        </div>
        <p className="mt-1 text-sm text-stone-500">
          {activeGroup
            ? activeGroup.description
            : "Discover SaaS, PaaS, IaaS, and AI offerings across vendors."}
          {query.trim() ? ` · Searching for “${query.trim()}”` : ""}
        </p>
        <p className="mt-2 text-xs font-medium text-stone-400">
          {services.length} {services.length === 1 ? "service" : "services"}
        </p>
      </header>

      {services.length === 0 ? (
        <article className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-8 py-16 text-center dark:border-slate-700 dark:bg-slate-900/40">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
            No services match your criteria
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Try clearing filters or broadening your search terms.
          </p>
        </article>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
