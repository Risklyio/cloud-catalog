import { fetchCatalogFromSupabase } from "@/lib/supabase/server";
import { fallbackCatalog } from "@/lib/catalog/fallback-data";
import { normalizeCatalogServices } from "@/lib/catalog/normalize-service";
import type { CatalogData } from "@/types";

export async function getCatalog(): Promise<CatalogData> {
  const remote = await fetchCatalogFromSupabase();
  const catalog = remote ?? fallbackCatalog;
  return {
    ...catalog,
    services: normalizeCatalogServices(catalog.services),
  };
}
