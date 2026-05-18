"use client";

import { useCatalogStore } from "@/store/catalog-store";

export function GroupNav() {
  const groups = useCatalogStore((s) => s.groups);
  const activeGroupSlug = useCatalogStore((s) => s.activeGroupSlug);
  const setActiveGroup = useCatalogStore((s) => s.setActiveGroup);

  return (
    <nav aria-label="Curated groups" className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Curated groups
      </h2>
      <ul className="space-y-1">
        <li>
          <button
            type="button"
            onClick={() => setActiveGroup(null)}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
              activeGroupSlug === null
                ? "bg-sky-500/15 font-medium text-sky-800 dark:text-sky-200"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            All services
          </button>
        </li>
        {groups.map((group) => (
          <li key={group.id}>
            <button
              type="button"
              onClick={() => setActiveGroup(group.slug)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                activeGroupSlug === group.slug
                  ? "bg-sky-500/15 font-medium text-sky-800 dark:text-sky-200"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <span className="block font-medium">{group.title}</span>
              <span className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-500">
                {group.description}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
