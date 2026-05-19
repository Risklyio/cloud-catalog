"use client";

import Link from "next/link";
import { useState } from "react";
import type { VerifiedCompliancePageData } from "@/lib/catalog/get-verified-compliance-page-data";
import type { SecurityCertId } from "@/types/security-certification";

type TopicId = "what" | "how-we-check" | "limitations" | "frameworks";

const TOPICS: {
  id: TopicId;
  title: string;
  body: React.ReactNode;
}[] = [
  {
    id: "what",
    title: "What is Verified Compliance?",
    body: (
      <>
        <p>
          On catalog service cards, the <strong>Verified compliance</strong>{" "}
          section highlights security and compliance frameworks that a provider
          publicly documents on their official website—such as trust centers,
          security pages, or compliance portals.
        </p>
        <p className="mt-3">
          Each badge links to the provider&apos;s own evidence page so you can
          review the source yourself. Expand the row on a card to see ISO 27001,
          SOC 2, PCI DSS, Cyber Essentials, or FedRAMP where we have found public
          documentation.
        </p>
      </>
    ),
  },
  {
    id: "how-we-check",
    title: "How Cloudiscover.io checks for certifications",
    body: (
      <>
        <p>
          We do not run audits or certify vendors ourselves. Instead, we map
          each catalog entry to publicly available compliance information using:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-stone-600">
          <li>Vendor trust and security pages linked from our research</li>
          <li>Known hyperscaler compliance programs (AWS, Azure, Google Cloud)</li>
          <li>Vendor-wide profiles so related products share the same evidence base</li>
        </ul>
        <p className="mt-3">
          Links always point to the provider&apos;s site—not third-party claims—so
          you can verify wording and scope directly with the vendor.
        </p>
      </>
    ),
  },
  {
    id: "limitations",
    title: "Important limitations",
    body: (
      <>
        <p className="rounded-lg border border-amber-200/90 bg-amber-50/90 px-3 py-2.5 text-amber-950">
          <strong>This feature is not 100% accurate.</strong> Our catalog is
          maintained from public sources and may be incomplete, out of date, or
          missing frameworks a vendor has achieved but not published prominently.
        </p>
        <ul className="mt-3 list-inside list-disc space-y-2 text-stone-600">
          <li>
            <strong>No badge does not mean a company is insecure.</strong> Many
            vendors are highly secure but do not publish certifications on pages
            we can link to, use different naming, or restrict details to
            customers under NDA.
          </li>
          <li>
            A badge indicates we found public documentation—not that your use case
            is covered, certified, or audit-ready.
          </li>
          <li>
            Always complete your own vendor due diligence, risk assessment, and
            contractual review before adopting any cloud service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "frameworks",
    title: "Frameworks we look for",
    body: (
      <>
        <p>We currently surface these frameworks when public evidence exists:</p>
        <ul className="mt-3 space-y-2">
          {(
            [
              ["iso27001", "ISO 27001", "Information security management"],
              ["pci-dss", "PCI DSS", "Payment card data security"],
              ["soc2", "SOC 2", "Trust services criteria for service organizations"],
              [
                "cyber-essentials",
                "Cyber Essentials",
                "UK baseline controls for organisations",
              ],
              ["fedramp", "FedRAMP", "US federal cloud authorization program"],
            ] as const
          ).map(([id, label, desc]) => (
            <li
              key={id}
              className="rounded-lg border border-emerald-100 bg-emerald-50/50 px-3 py-2 text-sm"
            >
              <span className="font-semibold text-emerald-900">{label}</span>
              <span className="text-emerald-800/80"> — {desc}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

const FRAMEWORK_HINTS: Record<SecurityCertId, string> = {
  iso27001: "Information security management systems",
  "pci-dss": "Payment card industry data security",
  soc2: "Service organization controls",
  "cyber-essentials": "UK National Cyber Security Centre scheme",
  fedramp: "US government cloud authorization",
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-stone-400 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function AccordionButton({
  open,
  onClick,
  title,
  subtitle,
  activeRing,
}: {
  open: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  activeRing?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
        open
          ? `ring-2 ring-offset-2 ${activeRing ?? "ring-emerald-400/60"} border-emerald-200 bg-emerald-50/90 text-emerald-950`
          : "border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50"
      }`}
    >
      <span>
        <span className="block font-semibold">{title}</span>
        {subtitle && (
          <span
            className={`mt-0.5 block text-xs ${open ? "text-emerald-800/80" : "text-stone-500"}`}
          >
            {subtitle}
          </span>
        )}
      </span>
      <Chevron open={open} />
    </button>
  );
}

export function VerifiedComplianceExplorer({
  vendorGroups,
  servicesWithBadges,
  vendorCount,
}: VerifiedCompliancePageData) {
  const [openTopic, setOpenTopic] = useState<TopicId | null>("what");
  const [openVendor, setOpenVendor] = useState<string | null>(null);

  return (
    <div className="max-w-3xl space-y-12">
      <section aria-labelledby="compliance-overview-heading">
        <h2
          id="compliance-overview-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Understanding the feature
        </h2>
        <p className="mt-2 text-stone-600">
          Expand a topic below for how verified compliance works, how we research
          it, and what it does <em>not</em> guarantee.
        </p>
        <ul className="mt-6 space-y-3">
          {TOPICS.map((topic) => {
            const isOpen = openTopic === topic.id;
            return (
              <li key={topic.id}>
                <AccordionButton
                  open={isOpen}
                  onClick={() =>
                    setOpenTopic((current) =>
                      current === topic.id ? null : topic.id,
                    )
                  }
                  title={topic.title}
                  activeRing="ring-emerald-400/60"
                />
                {isOpen && (
                  <div className="mt-2 rounded-xl border border-emerald-100 bg-white px-4 py-4 text-sm leading-relaxed text-stone-700">
                    {topic.body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="providers-heading">
        <h2
          id="providers-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Providers in the catalog
        </h2>
        <p className="mt-2 text-stone-600">
          {servicesWithBadges} services across {vendorCount} vendors currently
          show at least one documented framework in the catalog. Select a vendor
          to see linked services and evidence URLs.
        </p>
        <ul className="mt-6 space-y-3">
          {vendorGroups.map((group) => {
            const isOpen = openVendor === group.vendor;
            return (
              <li key={group.vendor}>
                <AccordionButton
                  open={isOpen}
                  onClick={() =>
                    setOpenVendor((current) =>
                      current === group.vendor ? null : group.vendor,
                    )
                  }
                  title={group.vendor}
                  subtitle={`${group.services.length} service${group.services.length === 1 ? "" : "s"} with badges`}
                  activeRing="ring-[#6557ff]/40"
                />
                {isOpen && (
                  <ul className="mt-2 space-y-3 rounded-xl border border-stone-100 bg-stone-50/80 p-3">
                    {group.services.map((service) => (
                      <li
                        key={service.slug}
                        className="rounded-lg border border-stone-200/80 bg-white p-3"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <Link
                            href={`/?q=${encodeURIComponent(service.name)}`}
                            className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
                          >
                            {service.name}
                          </Link>
                          <span className="text-xs font-medium text-stone-500">
                            {service.category}
                          </span>
                        </div>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {service.certifications.map((cert) => (
                            <li key={`${service.slug}-${cert.id}`}>
                              <a
                                href={cert.evidence_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={FRAMEWORK_HINTS[cert.id]}
                                className="inline-flex items-center rounded-md border border-emerald-200/80 bg-emerald-50/90 px-2 py-0.5 text-xs font-medium text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-100"
                              >
                                {cert.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        {vendorGroups.length === 0 && (
          <p className="mt-4 text-sm text-stone-500">
            No provider mappings are available yet. Browse the{" "}
            <Link href="/" className="font-medium text-[#6557ff]">
              catalog
            </Link>{" "}
            to explore services.
          </p>
        )}
      </section>
    </div>
  );
}
