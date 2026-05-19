import type { Metadata } from "next";
import Link from "next/link";
import { TrustpilotRatingsExplorer } from "@/components/trustpilot-ratings-explorer";
import { SiteFooter } from "@/components/site-footer";
import { getTrustpilotRatingsPageData } from "@/lib/catalog/get-trustpilot-ratings-page-data";

export const metadata: Metadata = {
  title: "Trustpilot ratings — Cloudiscover.io",
  description:
    "How Cloudiscover.io shows Trustpilot TrustScores on catalog services, how ratings are discovered, and important limitations.",
};

export default async function TrustpilotRatingsPage() {
  const pageData = await getTrustpilotRatingsPageData();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-[#6557ff]">Public reviews</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Trustpilot ratings
        </h1>
        <p className="mt-3 text-stone-600">
          Service cards show Trustpilot TrustScores when we have verified a
          public profile for the vendor. This page explains what those stars mean,
          how we find them, and what they do <strong>not</strong> prove.
        </p>
        <p className="mt-4 rounded-lg border border-amber-200/90 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
          <strong>Trustpilot only, verified domains.</strong> We do not mix in
          Google or other review sites.{" "}
          <strong>No reviews found</strong> means we have not yet linked a checked
          Trustpilot profile—not that the product has no customers.
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

      <TrustpilotRatingsExplorer {...pageData} />
      <SiteFooter />
    </main>
  );
}
