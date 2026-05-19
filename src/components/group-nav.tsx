"use client";

import { useState } from "react";
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
        <span className="mt-0.5 line-clamp-2 text-xs text-stone-500">{description}</span>
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

function CollapsibleGroupSection({
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
  const [open, setOpen] = useState(!group.default_collapsed);
  const parentActive = activeGroupSlug === group.slug;

  return (
    <li className="space-y-1">
      <div className="flex items-stretch gap-1">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-8 shrink-0 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
          aria-expanded={open}
          aria-label={open ? `Collapse ${group.title}` : `Expand ${group.title}`}
        >
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
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
        </button>
        <div className="min-w-0 flex-1">
          {parentActive ? (
            <div className="brand-gradient-border brand-gradient-border--active group-nav-active">
              <button
                type="button"
                onClick={() => setActiveGroup(group.slug)}
                className="group-nav-active-inner w-full rounded-[10px] bg-white px-3 py-2 text-left text-sm font-semibold text-[#6557ff]"
              >
                {group.title}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setActiveGroup(group.slug)}
              className="w-full rounded-[10px] px-3 py-2 text-left text-sm font-medium text-stone-600 transition hover:bg-stone-100"
            >
              {group.title}
            </button>
          )}
        </div>
      </div>
      {open && childGroups.length > 0 && (
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
  if (group.collapsible) {
    return (
      <CollapsibleGroupSection
        group={group}
        childGroups={childGroups}
        activeGroupSlug={activeGroupSlug}
        setActiveGroup={setActiveGroup}
      />
    );
  }

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
