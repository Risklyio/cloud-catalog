import { CatalogProvider } from "@/components/catalog-provider";
import { CatalogShell } from "@/components/catalog-shell";
import { getCatalog } from "@/lib/catalog/get-catalog";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const revalidate = 3600;

export default async function HomePage() {
  const catalog = await getCatalog();
  const usingFallback = !isSupabaseConfigured();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {usingFallback && (
        <p
          role="status"
          className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
        >
          Running with demo data. Set{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          to load from Supabase.
        </p>
      )}

      <CatalogProvider data={catalog}>
        <CatalogShell />
      </CatalogProvider>

      <footer className="mt-16 border-t border-slate-200/80 pt-8 text-center text-sm text-slate-500 dark:border-slate-800">
        Read-only catalog · Static-first · Deploy on Vercel
      </footer>
    </main>
  );
}
