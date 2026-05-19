"use client";

import { FilterPanel } from "@/components/filter-panel";
import { GroupNav } from "@/components/group-nav";
import { ServiceGrid } from "@/components/service-grid";

export function CatalogShell() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#242426] sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          Discover the world&apos;s largest cloud service repository
        </h1>
        <p className="mt-3 text-base text-[#5c5c62] sm:text-lg lg:whitespace-nowrap">
          Search, compare, and adopt{" "}
          <span className="font-medium text-[#6557ff]">SaaS</span>,{" "}
          <span className="font-medium text-sky-600">PaaS</span>,{" "}
          <span className="font-medium text-amber-700">IaaS</span>, and{" "}
          <span className="font-medium text-[#f74dc7]">AI</span>
          —curated for every team, in one place.
        </p>
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
