import { additionalServices } from "@/lib/catalog/additional-services";
import { fallbackCatalog } from "@/lib/catalog/fallback-data";
import { normalizeCatalogServices } from "@/lib/catalog/normalize-service";
import { fetchCatalogFromSupabase } from "@/lib/supabase/server";
import type { CatalogData, CloudService, ServiceGroup } from "@/types";

function mergeBySlug(services: CloudService[], extras: CloudService[]): CloudService[] {
  const map = new Map(services.map((s) => [s.slug, s]));
  for (const service of extras) {
    if (!map.has(service.slug)) map.set(service.slug, service);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function mergeGroups(groups: ServiceGroup[], extras: ServiceGroup[]): ServiceGroup[] {
  const map = new Map(groups.map((g) => [g.slug, g]));
  for (const group of extras) {
    if (!map.has(group.slug)) map.set(group.slug, group);
  }
  return [...map.values()].sort((a, b) => a.title.localeCompare(b.title));
}

export async function getCatalog(): Promise<CatalogData> {
  const remote = await fetchCatalogFromSupabase();

  if (remote) {
    return {
      services: normalizeCatalogServices(
        mergeBySlug(remote.services, additionalServices),
      ),
      groups: mergeGroups(remote.groups, fallbackCatalog.groups),
    };
  }

  return {
    ...fallbackCatalog,
    services: normalizeCatalogServices(fallbackCatalog.services),
  };
}
