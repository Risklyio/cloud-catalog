"use client";

import Link from "next/link";
import { useState } from "react";

type TopicId =
  | "overview"
  | "catalog-listings"
  | "catalog-details"
  | "trustpilot"
  | "verified-compliance"
  | "visibility";

const PROVIDER_CONTACT_EMAIL = "providers@cloudiscover.io";

const TOPICS: {
  id: TopicId;
  title: string;
  subtitle?: string;
  body: React.ReactNode;
}[] = [
  {
    id: "overview",
    title: "Who this page is for",
    subtitle: "Vendors and cloud service providers listed in the catalog",
    body: (
      <>
        <p>
          Cloudiscover.io is a read-only discovery catalog. If you represent a{" "}
          <strong>cloud service provider</strong>—SaaS, PaaS, IaaS, or AI—we
          want your public listing to be accurate, fair, and useful to buyers.
        </p>
        <p className="mt-3">
          Use the topics below to understand what you can request, how we handle
          changes, and how strong public signals on your listing (reviews and
          compliance evidence) can improve visibility in the catalog.
        </p>
        <p className="mt-3 text-sm text-stone-600">
          We review requests manually. We do not charge for standard listing
          corrections, but we may ask for proof that you are authorised to speak
          for the vendor or product.
        </p>
      </>
    ),
  },
  {
    id: "catalog-listings",
    title: "Add or remove a catalog listing",
    subtitle: "New services and delisting requests",
    body: (
      <>
        <p>
          <strong>Add a service.</strong> If your product is a genuine cloud
          offering and not already listed, you can request inclusion. Include
          the product name, category (SaaS, PaaS, IaaS, or AI), vendor, website
          URL, a short description, and why it belongs in a cloud services
          catalog.
        </p>
        <p className="mt-3">
          <strong>Remove a service.</strong> You may ask for a listing to be
          removed—for example after a product is retired, rebranded beyond
          recognition, or listed in error. Tell us which catalog entry applies
          and your relationship to the vendor.
        </p>
        <p className="mt-3 rounded-lg border border-stone-200 bg-stone-50/80 px-3 py-2.5 text-sm text-stone-700">
          Removal hides the service from Cloudiscover.io; it does not affect your
          website, Trustpilot profile, or certifications elsewhere.
        </p>
      </>
    ),
  },
  {
    id: "catalog-details",
    title: "Amend name, logo, and other details",
    subtitle: "Core card content and metadata",
    body: (
      <>
        <p>
          You can request updates to factual catalog fields, including:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-stone-600">
          <li>Product or company display name</li>
          <li>Logo (link to an official, publicly hosted image we may use)</li>
          <li>Vendor name and website URL</li>
          <li>Short description and category (SaaS / PaaS / IaaS / AI)</li>
          <li>Department or segment tags where applicable</li>
        </ul>
        <p className="mt-3">
          We do not publish marketing claims we cannot verify from your public
          site. Descriptions should match how you present the product on your
          own website.
        </p>
      </>
    ),
  },
  {
    id: "trustpilot",
    title: "Trustpilot information",
    subtitle: "Corrections and removal of TrustScore on the card",
    body: (
      <>
        <p>
          Cards may show a <strong>Trustpilot</strong> TrustScore when we have
          verified a public profile for your domain. See our{" "}
          <Link
            href="/trustpilot-ratings"
            className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
          >
            Trustpilot ratings
          </Link>{" "}
          page for how scores are sourced and what <strong>Top rated</strong>{" "}
          means.
        </p>
        <p className="mt-3">
          <strong>Amend.</strong> If the wrong Trustpilot domain is linked, or our
          verified snapshot is out of date, send the correct trustpilot.com/review
          URL and the TrustScore you believe should be shown. We update from
          public Trustpilot pages—we do not accept private spreadsheets or
          unverifiable figures.
        </p>
        <p className="mt-3">
          <strong>Remove the score from Cloudiscover.io.</strong> You may request
          that we stop showing Trustpilot data on your card entirely. We will
          display <strong>No reviews found</strong> in the Trustpilot section
          instead of a score. This does not change your Trustpilot profile or
          reviews on trustpilot.com.
        </p>
      </>
    ),
  },
  {
    id: "verified-compliance",
    title: "Verified compliance badges",
    subtitle: "Removal or correction of compliance markers",
    body: (
      <>
        <p>
          <strong>Verified compliance</strong> badges link to public evidence on
          your site (for example ISO 27001 or SOC 2 trust pages). See{" "}
          <Link
            href="/verified-compliance"
            className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
          >
            Verified Compliance
          </Link>{" "}
          for how we research them.
        </p>
        <p className="mt-3">
          <strong>Remove badges.</strong> If a framework is listed incorrectly, or
          you do not want compliance frameworks shown on Cloudiscover.io, explain
          which badges should be removed and why. We can switch the card to{" "}
          <strong>Unverified compliance</strong> when no public evidence is linked.
        </p>
        <p className="mt-3">
          <strong>Add or correct badges.</strong> Send official, public URLs for
          each framework you want shown. We only list certifications we can verify
          from your documentation—not third-party claims.
        </p>
      </>
    ),
  },
  {
    id: "visibility",
    title: "How the catalog helps providers improve visibility",
    subtitle: "Trustpilot, certifications, and clicks from the site",
    body: (
      <>
        <p>
          Buyers use Cloudiscover.io to compare cloud services. Listings with
          stronger, verifiable public signals tend to stand out in search,
          filters, and curated groups such as{" "}
          <strong>Top rated</strong>.
        </p>
        <h3 className="mt-4 text-sm font-semibold text-stone-900">
          Trustpilot TrustScore
        </h3>
        <p className="mt-2 text-stone-600">
          Services with a verified TrustScore of <strong>3.5+</strong> and{" "}
          <strong>50+ reviews</strong> can earn the Top rated mark and appear in
          the Top rated curated group, with a badge in the Trustpilot box on the
          card. Improving genuine customer reviews on your official Trustpilot
          profile is the path to better visibility here—we reflect Trustpilot; we
          do not sell placement.
        </p>
        <h3 className="mt-4 text-sm font-semibold text-stone-900">
          Security certifications
        </h3>
        <p className="mt-2 text-stone-600">
          Publishing clear compliance pages (ISO 27001, SOC 2, PCI DSS, Cyber
          Essentials, FedRAMP, and others) lets us link{" "}
          <strong>Verified compliance</strong> badges. Buyers filter for verified
          compliance; documented frameworks can increase clicks through to your
          website from the catalog.
        </p>
        <h3 className="mt-4 text-sm font-semibold text-stone-900">
          Complete, accurate listings
        </h3>
        <p className="mt-2 text-stone-600">
          Accurate names, logos, descriptions, and URLs help your card match
          search queries and category filters. Keeping public trust and security
          pages up to date makes it easier for us to maintain your listing
          without repeated correction requests.
        </p>
        <p className="mt-3 rounded-lg border border-violet-100 bg-violet-50/80 px-3 py-2.5 text-sm text-violet-950">
          Cloudiscover.io does not guarantee rankings, leads, or traffic. Visibility
          follows how buyers search and which public signals your listing displays.
        </p>
      </>
    ),
  },
];

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
}: {
  open: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
        open
          ? "border-violet-200 bg-violet-50/90 text-violet-950 ring-2 ring-[#6557ff]/40 ring-offset-2"
          : "border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50"
      }`}
    >
      <span>
        <span className="block font-semibold">{title}</span>
        {subtitle && (
          <span
            className={`mt-0.5 block text-xs ${open ? "text-violet-800/80" : "text-stone-500"}`}
          >
            {subtitle}
          </span>
        )}
      </span>
      <Chevron open={open} />
    </button>
  );
}

export function CloudServiceProvidersExplorer() {
  const [openTopic, setOpenTopic] = useState<TopicId | null>("overview");

  return (
    <div className="max-w-3xl space-y-12">
      <section aria-labelledby="providers-topics-heading">
        <h2
          id="providers-topics-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Requests and guidance
        </h2>
        <p className="mt-2 text-stone-600">
          Expand a topic for what you can ask us to change and how the catalog
          surfaces your service to buyers.
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
                  subtitle={topic.subtitle}
                />
                {isOpen && (
                  <div className="mt-2 rounded-xl border border-violet-100 bg-white px-4 py-4 text-sm leading-relaxed text-stone-700">
                    {topic.body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="providers-contact-heading"
        className="rounded-xl border border-[#6557ff]/15 bg-gradient-to-br from-[#6557ff]/5 to-[#f74dc7]/5 px-5 py-5"
      >
        <h2
          id="providers-contact-heading"
          className="text-lg font-semibold text-stone-900"
        >
          Submit a request
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Email{" "}
          <a
            href={`mailto:${PROVIDER_CONTACT_EMAIL}`}
            className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
          >
            {PROVIDER_CONTACT_EMAIL}
          </a>{" "}
          with the subject line <strong>Catalog request</strong> and include:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-stone-600">
          <li>Your name, role, and company</li>
          <li>Catalog service name or URL on Cloudiscover.io</li>
          <li>What you want changed (add, remove, amend, or hide Trustpilot / compliance)</li>
          <li>Links to official sources (website, Trustpilot, trust center) where relevant</li>
        </ul>
        <p className="mt-3 text-xs text-stone-500">
          We aim to respond within a few business days. Complex or disputed
          requests may take longer.
        </p>
      </section>
    </div>
  );
}
