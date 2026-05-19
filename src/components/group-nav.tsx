"use client";

import { useState } from "react";
import {
  CURATED_ROOT_GROUP_SLUGS,
  PLATFORM_NAV_CATEGORIES,
  type PlatformNavCategory,
} from "@/lib/catalog/group-navigation";
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

function NavChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 ${
        open ? "rotate-90" : ""
      }`}
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
  );
}

function NestedGroupList({
  groupSlugs,
  groupsBySlug,
  activeGroupSlug,
  setActiveGroup,
}: {
  groupSlugs: readonly string[];
  groupsBySlug: Map<string, ServiceGroup>;
  activeGroupSlug: string | null;
  setActiveGroup: (slug: string | null) => void;
}) {
  return (
    <ul className="ml-3 space-y-0.5 border-l border-stone-200 pl-2">
      {groupSlugs.map((slug) => {
        const group = groupsBySlug.get(slug);
        if (!group) return null;
        return (
          <GroupButton
            key={group.id}
            active={activeGroupSlug === group.slug}
            onClick={() => setActiveGroup(group.slug)}
            title={group.title}
            nested
          />
        );
      })}
    </ul>
  );
}

function CollapsibleSubsection({
  label,
  groupSlugs,
  groupsBySlug,
  activeGroupSlug,
  setActiveGroup,
  defaultOpen = false,
}: {
  label: string;
  groupSlugs: readonly string[];
  groupsBySlug: Map<string, ServiceGroup>;
  activeGroupSlug: string | null;
  setActiveGroup: (slug: string | null) => void;
  defaultOpen?: boolean;
}) {
  const childActive = groupSlugs.some((slug) => activeGroupSlug === slug);
  const [open, setOpen] = useState(defaultOpen || childActive);

  return (
    <li className="space-y-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 transition hover:bg-stone-100 hover:text-stone-700"
      >
        <NavChevron open={open} />
        {label}
      </button>
      {open && (
        <NestedGroupList
          groupSlugs={groupSlugs}
          groupsBySlug={groupsBySlug}
          activeGroupSlug={activeGroupSlug}
          setActiveGroup={setActiveGroup}
        />
      )}
    </li>
  );
}

function PlatformCategorySection({
  category,
  groupsBySlug,
  activeGroupSlug,
  setActiveGroup,
}: {
  category: PlatformNavCategory;
  groupsBySlug: Map<string, ServiceGroup>;
  activeGroupSlug: string | null;
  setActiveGroup: (slug: string | null) => void;
}) {
  const relatedSlugs = [
    ...(category.subcategories?.groupSlugs ?? []),
    ...(category.cloudProviders?.groupSlugs ?? []),
    ...(category.extraGroupSlugs ?? []),
  ];
  const childActive = relatedSlugs.some((slug) => activeGroupSlug === slug);
  const [open, setOpen] = useState(childActive);

  return (
    <li className="space-y-1">
      <div className="flex items-stretch gap-1">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-8 shrink-0 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
          aria-expanded={open}
          aria-label={open ? `Collapse ${category.title}` : `Expand ${category.title}`}
        >
          <NavChevron open={open} />
        </button>
        <div className="min-w-0 flex-1 rounded-[10px] border border-transparent px-3 py-2">
          <span className="block text-sm font-semibold text-stone-800">{category.title}</span>
          <span className="mt-0.5 line-clamp-2 text-xs text-stone-500">
            {category.description}
          </span>
        </div>
      </div>
      {open && (
        <ul className="ml-3 space-y-2 border-l border-stone-200 pl-2 pt-1">
          {category.subcategories && (
            <CollapsibleSubsection
              label={category.subcategories.label}
              groupSlugs={category.subcategories.groupSlugs}
              groupsBySlug={groupsBySlug}
              activeGroupSlug={activeGroupSlug}
              setActiveGroup={setActiveGroup}
              defaultOpen={category.id === "saas"}
            />
          )}
          {category.cloudProviders && (
            <CollapsibleSubsection
              label={category.cloudProviders.label}
              groupSlugs={category.cloudProviders.groupSlugs}
              groupsBySlug={groupsBySlug}
              activeGroupSlug={activeGroupSlug}
              setActiveGroup={setActiveGroup}
            />
          )}
          {category.extraGroupSlugs?.map((slug) => {
            const group = groupsBySlug.get(slug);
            if (!group) return null;
            return (
              <GroupButton
                key={group.id}
                active={activeGroupSlug === group.slug}
                onClick={() => setActiveGroup(group.slug)}
                title={group.title}
                nested
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export function GroupNav() {
  const groups = useCatalogStore((s) => s.groups);
  const activeGroupSlug = useCatalogStore((s) => s.activeGroupSlug);
  const setActiveGroup = useCatalogStore((s) => s.setActiveGroup);

  const groupsBySlug = new Map(groups.map((g) => [g.slug, g]));
  const curatedGroups = CURATED_ROOT_GROUP_SLUGS.map((slug) => groupsBySlug.get(slug)).filter(
    (g): g is ServiceGroup => g != null,
  );

  return (
    <nav aria-label="Catalog navigation" className="space-y-8">
      <section aria-labelledby="curated-groups-heading" className="space-y-2">
        <h2
          id="curated-groups-heading"
          className="text-sm font-semibold uppercase tracking-wide text-stone-500"
        >
          Curated groups
        </h2>
        <ul className="space-y-1">
          <GroupButton
            active={activeGroupSlug === null}
            onClick={() => setActiveGroup(null)}
            title="All services"
          />
          {curatedGroups.map((group) => (
            <GroupButton
              key={group.id}
              active={activeGroupSlug === group.slug}
              onClick={() => setActiveGroup(group.slug)}
              title={group.title}
              description={group.description}
            />
          ))}
        </ul>
      </section>

      <section aria-labelledby="platforms-heading" className="space-y-2">
        <h2
          id="platforms-heading"
          className="text-sm font-semibold uppercase tracking-wide text-stone-500"
        >
          Platforms
        </h2>
        <p className="text-xs text-stone-500">
          Browse by service model—expand for solution areas or cloud providers.
        </p>
        <ul className="space-y-2">
          {PLATFORM_NAV_CATEGORIES.map((category) => (
            <PlatformCategorySection
              key={category.id}
              category={category}
              groupsBySlug={groupsBySlug}
              activeGroupSlug={activeGroupSlug}
              setActiveGroup={setActiveGroup}
            />
          ))}
        </ul>
      </section>
    </nav>
  );
}
