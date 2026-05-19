import type { Metadata } from "next";
import Link from "next/link";
import { CloudServiceProvidersExplorer } from "@/components/cloud-service-providers-explorer";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "For cloud service providers — Cloudiscover.io",
  description:
    "How cloud vendors can request catalog listing changes, amend Trustpilot and compliance data, and improve visibility on Cloudiscover.io.",
};

export default function ForCloudServiceProvidersPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-[#6557ff]">Vendors & providers</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          For cloud service providers
        </h1>
        <p className="mt-3 text-stone-600">
          If you represent a vendor listed in the catalog, you can request changes
          to your listing, Trustpilot display, and compliance badges. This page
          explains what we can update and how a complete, trustworthy public
          profile helps buyers discover your service.
        </p>
        <p className="mt-4 rounded-lg border border-amber-200/90 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
          <strong>Authorised requests only.</strong> We may ask you to verify that
          you work for the vendor before changing or removing catalog data.
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

      <CloudServiceProvidersExplorer />
      <SiteFooter />
    </main>
  );
}
