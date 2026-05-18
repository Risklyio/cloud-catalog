"use client";

import { useMemo } from "react";
import { useCatalogStore } from "@/store/catalog-store";
import { buildFuseIndex } from "@/lib/search/build-fuse-index";
import { filterServices } from "@/lib/search/filter-services";

export function useVisibleServices() {
  const services = useCatalogStore((s) => s.services);
  const groups = useCatalogStore((s) => s.groups);
  const query = useCatalogStore((s) => s.query);
  const filters = useCatalogStore((s) => s.filters);
  const activeGroupSlug = useCatalogStore((s) => s.activeGroupSlug);

  return useMemo(() => {
    let pool = services;

    if (activeGroupSlug) {
      const group = groups.find((g) => g.slug === activeGroupSlug);
      if (group) {
        const idSet = new Set(group.service_ids);
        pool = services.filter((s) => idSet.has(s.id));
      }
    }

    pool = filterServices(pool, filters);

    const trimmed = query.trim();
    if (!trimmed) return pool;

    const fuse = buildFuseIndex(pool);
    return fuse.search(trimmed).map((r) => r.item);
  }, [services, groups, query, filters, activeGroupSlug]);
}
