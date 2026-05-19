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
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Discover the right cloud stack
          </h1>
          <p className="mt-2 max-w-2xl text-stone-600">
            Your gateway to discovering, evaluating, and adopting the right cloud
            services for every business need.
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
