import type { Metadata } from "next";
import Link from "next/link";
import { VerifiedComplianceExplorer } from "@/components/verified-compliance-explorer";
import { SiteFooter } from "@/components/site-footer";
import { getVerifiedCompliancePageData } from "@/lib/catalog/get-verified-compliance-page-data";

export const metadata: Metadata = {
  title: "Verified Compliance — Cloudiscover.io",
  description:
    "How Cloudiscover.io surfaces public security and compliance documentation on catalog services, with important limitations and provider-level evidence links.",
};

export default async function VerifiedCompliancePage() {
  const pageData = await getVerifiedCompliancePageData();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-[#6557ff]">Trust & compliance</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Verified Compliance
        </h1>
        <p className="mt-3 text-stone-600">
          Service cards can show security frameworks when a provider publishes
          official evidence on the web. This page explains what those badges mean,
          how we research them, and what they do <strong>not</strong> prove.
        </p>
        <p className="mt-4 rounded-lg border border-amber-200/90 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
          <strong>Not 100% accurate.</strong> Information is drawn from public
          sources and may be incomplete or outdated.{" "}
          <strong>
            Missing a badge does not mean a vendor is insecure
          </strong>
          —many secure organisations do not publish certifications we can link
          to from the catalog.
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

      <VerifiedComplianceExplorer {...pageData} />
      <SiteFooter />
    </main>
  );
}
