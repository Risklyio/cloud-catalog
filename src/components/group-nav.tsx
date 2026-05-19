"use client";

import { useCatalogStore } from "@/store/catalog-store";

function GroupButton({
  active,
  onClick,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description?: string;
}) {
  const inner = (
    <button
      type="button"
      onClick={onClick}
      className={`group-nav-active-inner w-full rounded-[10px] px-3 py-2 text-left text-sm transition ${
        active
          ? "bg-white text-[#6557ff]"
          : "bg-transparent text-stone-600 hover:bg-stone-100"
      }`}
    >
      <span className={`block ${active ? "font-semibold" : "font-medium"}`}>{title}</span>
      {description && (
        <span
          className={`mt-0.5 line-clamp-2 text-xs ${active ? "text-stone-500" : "text-stone-500"}`}
        >
          {description}
        </span>
      )}
    </button>
  );

  if (active) {
    return (
      <li className="brand-gradient-border brand-gradient-border--active group-nav-active">
        {inner}
      </li>
    );
  }

  return <li>{inner}</li>;
}

export function GroupNav() {
  const groups = useCatalogStore((s) => s.groups);
  const activeGroupSlug = useCatalogStore((s) => s.activeGroupSlug);
  const setActiveGroup = useCatalogStore((s) => s.setActiveGroup);

  return (
    <nav aria-label="Curated groups" className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
        Curated groups
      </h2>
      <ul className="space-y-1">
        <GroupButton
          active={activeGroupSlug === null}
          onClick={() => setActiveGroup(null)}
          title="All services"
        />
        {groups.map((group) => (
          <GroupButton
            key={group.id}
            active={activeGroupSlug === group.slug}
            onClick={() => setActiveGroup(group.slug)}
            title={group.title}
            description={group.description}
          />
        ))}
      </ul>
    </nav>
  );
}
