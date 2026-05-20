import type { Metadata } from "next";
import Link from "next/link";
import { GartnerRatingsExplorer } from "@/components/gartner-ratings-explorer";
import { SiteFooter } from "@/components/site-footer";
import { getGartnerRatingsPageData } from "@/lib/catalog/get-gartner-ratings-page-data";

export const metadata: Metadata = {
  title: "Gartner reviews — Cloudiscover.io",
  description:
    "How Cloudiscover.io shows Gartner Peer Insights ratings on catalog services, how vendor-level scores are mapped, and important limitations.",
};

export default async function GartnerReviewsPage() {
  const pageData = await getGartnerRatingsPageData();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-[#6557ff]">Trust & reviews</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Gartner reviews
        </h1>
        <p className="mt-3 text-stone-600">
          Service cards show Gartner Peer Insights ratings when we have verified a
          vendor product page. Services can earn a <strong>Top rated</strong> mark
          when their Gartner rating is above 4 with more than 500 reviews
          (vendor-level benchmark).
        </p>
        <p className="mt-4 rounded-lg border border-amber-200/90 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
          <strong>Gartner Peer Insights only, verified products.</strong> We do not
          mix in other review sites. <strong>No reviews found</strong> means we have
          not mapped the vendor to a checked Gartner product—not that the product has
          no customers.
        </p>
        <p className="mt-4">
          <Link
            href="/"
            className="text-sm font-medium text-[#6557ff] transition hover:text-[#f74dc7]"
          >
            ← Back to catalog
          </Link>
        </p>
      </header>

      <GartnerRatingsExplorer {...pageData} />
      <SiteFooter />
    </main>
  );
}
