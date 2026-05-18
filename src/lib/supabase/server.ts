import { createClient } from "@supabase/supabase-js";
import type { CatalogData, CloudService, ServiceGroup } from "@/types";

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

export function createServerSupabase() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function fetchCatalogFromSupabase(): Promise<CatalogData | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createServerSupabase();

  const [servicesResult, groupsResult] = await Promise.all([
    supabase.from("services").select("*").order("name"),
    supabase.from("service_groups").select("*").order("title"),
  ]);

  if (servicesResult.error || groupsResult.error) {
    console.error("Supabase fetch error:", servicesResult.error ?? groupsResult.error);
    return null;
  }

  return {
    services: (servicesResult.data ?? []) as CloudService[],
    groups: (groupsResult.data ?? []) as ServiceGroup[],
  };
}
