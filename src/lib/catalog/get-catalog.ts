import { additionalServices } from "@/lib/catalog/additional-services";
import { fallbackCatalog } from "@/lib/catalog/fallback-data";
import { applyTopRatedGroup } from "@/lib/catalog/apply-top-rated-group";
import { attachSecurityCertifications } from "@/lib/catalog/attach-security-certifications";
import { attachServiceReviews } from "@/lib/catalog/attach-service-reviews";
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

/** Fallback groups define the canonical curated list; remote entries override by slug only. */
function mergeGroups(remote: ServiceGroup[], canonical: ServiceGroup[]): ServiceGroup[] {
  const remoteBySlug = new Map(remote.map((g) => [g.slug, g]));
  return canonical
    .map((group) => {
      const fromRemote = remoteBySlug.get(group.slug);
      if (!fromRemote) return group;
      return {
        ...fromRemote,
        parent_slug: group.parent_slug ?? fromRemote.parent_slug,
        collapsible: group.collapsible ?? fromRemote.collapsible,
        default_collapsed: group.default_collapsed ?? fromRemote.default_collapsed,
        service_ids: group.service_ids,
        title: group.title,
        description: group.description,
      };
    })
    .sort((a, b) => {
      const order = canonical.findIndex((g) => g.slug === a.slug);
      const orderB = canonical.findIndex((g) => g.slug === b.slug);
      if (order !== -1 && orderB !== -1) return order - orderB;
      return a.title.localeCompare(b.title);
    });
}

function finalizeServices(services: CloudService[]): CloudService[] {
  return attachServiceReviews(
    attachSecurityCertifications(normalizeCatalogServices(services)),
  );
}

function finalizeCatalog(
  services: CloudService[],
  groups: ServiceGroup[],
): CatalogData {
  const finalizedServices = finalizeServices(services);
  return {
    services: finalizedServices,
    groups: applyTopRatedGroup(finalizedServices, groups),
  };
}

export async function getCatalog(): Promise<CatalogData> {
  const remote = await fetchCatalogFromSupabase();

  if (remote) {
    return finalizeCatalog(
      mergeBySlug(remote.services, additionalServices),
      mergeGroups(remote.groups, fallbackCatalog.groups),
    );
  }

  return finalizeCatalog(fallbackCatalog.services, fallbackCatalog.groups);
}
