import type { Metadata } from "next";
import Link from "next/link";
import { CloudDefinitionsExplorer } from "@/components/cloud-definitions-explorer";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "How cloud services are defined — Cloudiscover.io",
  description:
    "SaaS, PaaS, IaaS, and AI service models plus how NIST, CSA, FedRAMP, ISO, NCSC CAF, Cyber Essentials, ENISA, and SOC 2 define cloud computing.",
};

export default function CloudDefinitionsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-[#6557ff]">Reference</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          How cloud services are defined
        </h1>
        <p className="mt-3 text-stone-600">
          A practical guide to service models used in this catalog and how major
          security frameworks describe cloud computing—most of them built on{" "}
          <strong className="font-semibold text-stone-800">NIST SP 800-145</strong>.
          Expand each section to explore definitions and coloured highlights.
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

      <CloudDefinitionsExplorer />
      <SiteFooter />
    </main>
  );
}
