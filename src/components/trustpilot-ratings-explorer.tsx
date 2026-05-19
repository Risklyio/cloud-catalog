"use client";

import Link from "next/link";
import { useState } from "react";
import type { TrustpilotRatingsPageData } from "@/lib/catalog/get-trustpilot-ratings-page-data";

type TopicId = "what" | "how-discovered" | "limitations" | "trustscore";

const TOPICS: {
  id: TopicId;
  title: string;
  body: React.ReactNode;
}[] = [
  {
    id: "what",
    title: "What is the Trustpilot rating?",
    body: (
      <>
        <p>
          Every catalog service card includes a <strong>Trustpilot</strong>{" "}
          section. When we have verified data, it shows the provider&apos;s public{" "}
          <strong>TrustScore</strong> (1–5 stars) and review count, with a link to
          their profile on{" "}
          <a
            href="https://www.trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
          >
            trustpilot.com
          </a>
          .
        </p>
        <p className="mt-3">
          We use <strong>Trustpilot only</strong> so every service is compared the
          same way. If we do not have a verified TrustScore for that vendor, the
          card shows <strong>No reviews found</strong>—not a score invented by
          Cloudiscover.io.
        </p>
      </>
    ),
  },
  {
    id: "how-discovered",
    title: "How Cloudiscover.io discovers ratings",
    body: (
      <>
        <p>
          We do not run our own customer surveys. Ratings are taken from public
          Trustpilot company pages, matched to each service like this:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-stone-600">
          <li>
            The service&apos;s website URL is used to find the matching Trustpilot
            review domain (e.g. <code className="text-xs">stripe.com</code>)
          </li>
          <li>
            A curated list of <strong>verified</strong> TrustScores is maintained
            in our catalog—only domains we have checked on Trustpilot are shown
            with stars
          </li>
          <li>
            Some products map to a parent company domain when their Trustpilot
            profile lives under the vendor brand (e.g. Auth0 → Okta&apos;s domain)
          </li>
        </ul>
        <p className="mt-3">
          The star display on each card reflects Trustpilot&apos;s published
          TrustScore. Click <strong>View on Trustpilot</strong> to read reviews and
          confirm the score yourself.
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
          <strong>Scores may be out of date.</strong> Trustpilot changes as new
          reviews are posted. Our catalog is updated periodically, not in real
          time.
        </p>
        <ul className="mt-3 list-inside list-disc space-y-2 text-stone-600">
          <li>
            <strong>No reviews found does not mean a product is poor.</strong> The
            vendor may have no Trustpilot profile, use a different domain, or not
            yet be in our verified list.
          </li>
          <li>
            Trustpilot reviews are often left by consumers or small businesses—not
            always enterprise buyers—so scores may not reflect your procurement
            experience.
          </li>
          <li>
            A low TrustScore on Trustpilot does not replace technical due
            diligence, security review, or contractual assessment.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "trustscore",
    title: "What is a TrustScore?",
    body: (
      <>
        <p>
          Trustpilot&apos;s <strong>TrustScore</strong> is an aggregate rating from
          1 to 5 stars based on reviews on that company&apos;s Trustpilot profile.
          Trustpilot describes it as a measure of customer trust built from recent
          reviews, with more weight on newer reviews.
        </p>
        <p className="mt-3">
          Cloudiscover.io shows the TrustScore and total review count exactly as
          published on the linked Trustpilot page—we do not adjust, average across
          other sites, or apply our own grading.
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
          ? `ring-2 ring-offset-2 ${activeRing ?? "ring-[#6557ff]/40"} border-violet-200 bg-violet-50/90 text-violet-950`
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

function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function TrustpilotRatingsExplorer({
  vendorGroups,
  servicesWithRating,
  servicesWithoutRating,
  vendorCount,
}: TrustpilotRatingsPageData) {
  const [openTopic, setOpenTopic] = useState<TopicId | null>("what");
  const [openVendor, setOpenVendor] = useState<string | null>(null);

  return (
    <div className="max-w-3xl space-y-12">
      <section aria-labelledby="trustpilot-overview-heading">
        <h2
          id="trustpilot-overview-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Understanding Trustpilot on cards
        </h2>
        <p className="mt-2 text-stone-600">
          Expand a topic below for how ratings appear in the catalog, how we
          source them, and what they do <em>not</em> guarantee.
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
                  activeRing="ring-[#6557ff]/40"
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

      <section aria-labelledby="catalog-ratings-heading">
        <h2
          id="catalog-ratings-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Services with verified Trustpilot data
        </h2>
        <p className="mt-2 text-stone-600">
          {servicesWithRating} services across {vendorCount} vendors show a
          verified TrustScore. {servicesWithoutRating} other services show{" "}
          <strong>No reviews found</strong> until we add a checked Trustpilot
          profile. Select a vendor to see services and Trustpilot links.
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
                  subtitle={`${group.services.length} service${group.services.length === 1 ? "" : "s"} rated`}
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
                        <p className="mt-2 text-sm text-stone-700">
                          <span className="font-semibold text-[#6557ff]">
                            {formatRating(service.review.rating)}
                          </span>
                          <span className="text-stone-400"> / 5</span>
                          <span className="text-stone-500">
                            {" "}
                            ·{" "}
                            {new Intl.NumberFormat("en-US").format(
                              service.review.review_count,
                            )}{" "}
                            reviews
                          </span>
                        </p>
                        <p className="mt-1.5">
                          <a
                            href={service.review.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-[#6557ff] hover:text-[#f74dc7]"
                          >
                            View on Trustpilot →
                          </a>
                        </p>
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
            No verified Trustpilot mappings yet. Browse the{" "}
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
