import { fetchCatalogFromSupabase } from "@/lib/supabase/server";
import { fallbackCatalog } from "@/lib/catalog/fallback-data";
import type { CatalogData } from "@/types";

export async function getCatalog(): Promise<CatalogData> {
  const remote = await fetchCatalogFromSupabase();
  return remote ?? fallbackCatalog;
}
