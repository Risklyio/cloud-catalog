"use client";

import { FilterPanel } from "@/components/filter-panel";
import { GroupNav } from "@/components/group-nav";
import { SearchBar } from "@/components/search-bar";
import { ServiceGrid } from "@/components/service-grid";

export function CatalogShell() {
  return (
    <>
      <header className="mb-8 space-y-4">
        <section>
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Cloud Service Catalog
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Discover the right cloud stack
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            Browse SaaS, PaaS, and IaaS offerings with instant fuzzy search,
            filters, and curated groups — read-only, no sign-in required.
          </p>
        </section>
        <SearchBar />
      </header>

      <section className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <GroupNav />
        </aside>

        <aside className="hidden xl:block">
          <FilterPanel />
        </aside>

        <main className="min-w-0 space-y-8">
          <section className="space-y-6 lg:hidden">
            <GroupNav />
            <FilterPanel />
          </section>
          <ServiceGrid />
        </main>
      </section>
    </>
  );
}
