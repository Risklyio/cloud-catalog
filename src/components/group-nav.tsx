"use client";

import { useCatalogStore } from "@/store/catalog-store";
import type { ServiceGroup } from "@/types";

function GroupButton({
  active,
  onClick,
  title,
  description,
  nested = false,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  nested?: boolean;
}) {
  const inner = (
    <button
      type="button"
      onClick={onClick}
      className={`group-nav-active-inner w-full rounded-[10px] px-3 py-2 text-left text-sm transition ${
        nested ? "py-1.5" : ""
      } ${
        active
          ? "bg-white text-[#6557ff]"
          : "bg-transparent text-stone-600 hover:bg-stone-100"
      }`}
    >
      <span className={`block ${active ? "font-semibold" : "font-medium"}`}>{title}</span>
      {description && !nested && (
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

function GroupSection({
  group,
  childGroups,
  activeGroupSlug,
  setActiveGroup,
}: {
  group: ServiceGroup;
  childGroups: ServiceGroup[];
  activeGroupSlug: string | null;
  setActiveGroup: (slug: string | null) => void;
}) {
  return (
    <li className="space-y-1">
      <GroupButton
        active={activeGroupSlug === group.slug}
        onClick={() => setActiveGroup(group.slug)}
        title={group.title}
        description={group.description}
      />
      {childGroups.length > 0 && (
        <ul className="ml-3 space-y-0.5 border-l border-stone-200 pl-2">
          {childGroups.map((child) => (
            <GroupButton
              key={child.id}
              active={activeGroupSlug === child.slug}
              onClick={() => setActiveGroup(child.slug)}
              title={child.title}
              nested
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function GroupNav() {
  const groups = useCatalogStore((s) => s.groups);
  const activeGroupSlug = useCatalogStore((s) => s.activeGroupSlug);
  const setActiveGroup = useCatalogStore((s) => s.setActiveGroup);

  const rootGroups = groups.filter((g) => !g.parent_slug);
  const childrenByParent = new Map<string, ServiceGroup[]>();
  for (const group of groups) {
    if (!group.parent_slug) continue;
    const list = childrenByParent.get(group.parent_slug) ?? [];
    list.push(group);
    childrenByParent.set(group.parent_slug, list);
  }

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
        {rootGroups.map((group) => (
          <GroupSection
            key={group.id}
            group={group}
            childGroups={childrenByParent.get(group.slug) ?? []}
            activeGroupSlug={activeGroupSlug}
            setActiveGroup={setActiveGroup}
          />
        ))}
      </ul>
    </nav>
  );
}
