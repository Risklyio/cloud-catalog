"use client";

import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useCatalogStore } from "@/store/catalog-store";

type SearchBarProps = {
  compact?: boolean;
  className?: string;
};

export function SearchBar({ compact = false, className = "" }: SearchBarProps) {
  const query = useCatalogStore((s) => s.query);
  const setQuery = useCatalogStore((s) => s.setQuery);
  const [local, setLocal] = useState(query);
  const debounced = useDebouncedValue(local, 200);

  useEffect(() => {
    setQuery(debounced);
  }, [debounced, setQuery]);

  useEffect(() => {
    setLocal(query);
  }, [query]);

  if (compact) {
    return (
      <div
        className={`relative min-w-0 flex-1 sm:max-w-xs ${className}`.trim()}
      >
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
        <input
          type="search"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Search…"
          className="h-9 w-full min-w-[7.5rem] rounded-full border border-stone-200/90 bg-stone-50/90 py-1.5 pl-9 pr-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#6557ff]/40 focus:bg-white focus:ring-2 focus:ring-[#6557ff]/20"
          aria-label="Search cloud services"
        />
      </div>
    );
  }

  return (
    <section
      className={`brand-gradient-border brand-gradient-border--focus search-bar-glow w-full ${className}`.trim()}
    >
      <div className="relative rounded-[14px] bg-white">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 z-[1] h-5 w-5 -translate-y-1/2 text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
        <input
          type="search"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Search services by name, vendor, tags…"
          className="relative z-[1] w-full rounded-[14px] border-0 bg-transparent py-3.5 pl-12 pr-4 text-stone-900 outline-none ring-0 placeholder:text-stone-400 focus:ring-0"
          aria-label="Search cloud services"
        />
      </div>
    </section>
  );
}
