"use client";

import Link from "next/link";
import { useState } from "react";
import { TopRatedBadge } from "@/components/top-rated-badge";
import type { GartnerRatingsPageData } from "@/lib/catalog/get-gartner-ratings-page-data";

type TopicId =
  | "what"
  | "top-rated"
  | "how-discovered"
  | "limitations"
  | "gartner-rating";

const TOPICS: {
  id: TopicId;
  title: string;
  body: React.ReactNode;
}[] = [
  {
    id: "what",
    title: "What is the Gartner rating?",
    body: (
      <>
        <p>
          Every catalog service card includes a <strong>Gartner</strong>{" "}
          section. When we have verified data, it shows the provider&apos;s public{" "}
          <strong>Gartner rating</strong> (1–5 stars) and review count, with a link to
          their profile on{" "}
          <a
            href="https://www.gartner.com/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
          >
            Gartner Peer Insights
          </a>
          .
        </p>
        <p className="mt-3">
          Scores are <strong>vendor-level</strong> on Gartner (e.g. AWS EC2 uses the
          Amazon Web Services product page). We use <strong>Gartner Peer Insights
          only</strong> so every service is compared the same way. If we do not have
          verified data for that vendor, the card shows <strong>No reviews found</strong>
          —not a score invented by Cloudiscover.io.
        </p>
      </>
    ),
  },
  {
    id: "top-rated",
    title: "What is Top rated, and how is the mark calculated?",
    body: (
      <>
        <p>
          <strong>Top rated</strong> is a Cloudiscover.io label for catalog
          services whose <strong>verified</strong> Gartner data shows a
          consistently strong public score with enough reviews to be meaningful.
          It is not a Gartner badge or award.
        </p>
        <h3 className="mt-4 text-sm font-semibold text-stone-900">
          How the mark is calculated
        </h3>
        <p className="mt-2 text-stone-600">
          We apply the mark only when <strong>all</strong> of the following are
          true for the Gartner rating and review count we display on the card (sourced
          from the linked Gartner profile):
        </p>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-stone-600">
          <li>
            The service has a <strong>verified Gartner mapping</strong> in our
            catalog (not <strong>No reviews found</strong>).
          </li>
          <li>
            <strong>Gartner rating is above 4</strong> — written as{" "}
            <code className="text-xs">rating &gt; 4</code>.
          </li>
          <li>
            <strong>Review count is more than 500</strong> — written as{" "}
            <code className="text-xs">review_count &gt; 500</code>.
          </li>
        </ol>
        <p className="mt-3 text-sm text-stone-600">
          <strong>Examples:</strong> 4.1 stars with 600 reviews → Top rated. 4.0
          with 800 reviews → not Top rated. 4.6 with 500 reviews → not Top rated.
        </p>
        <h3 className="mt-4 text-sm font-semibold text-stone-900">
          Where it appears in the catalog
        </h3>
        <ul className="mt-2 list-inside list-disc space-y-1.5 text-stone-600">
          <li>
            A <strong>Top rated</strong> pill with a checkmark sits on the same
            row as the <strong>Gartner</strong> title inside the Gartner box
            on the card.
          </li>
          <li>
            The service logo keeps the same size as other cards and shows an
            always-on animated brand gradient ring around it (no larger footprint).
          </li>
          <li>
            The <strong>Top rated</strong> curated group in the sidebar lists every
            service that currently meets these thresholds (updated when catalog
            data is refreshed).
          </li>
        </ul>
        <p className="mt-3 rounded-lg border border-violet-100 bg-violet-50/80 px-3 py-2.5 text-violet-950">
          Scores are updated periodically, not in real time. A service can lose or
          gain Top rated when Gartner or our verified catalog data changes.
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
          We do not run our own customer surveys. Ratings come from public{" "}
          <strong>Gartner Peer Insights</strong> product pages, matched to each
          service like this:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-stone-600">
          <li>
            The service&apos;s website hostname maps to a Gartner product slug when
            known (e.g. <code className="text-xs">aws.amazon.com</code> →{" "}
            <code className="text-xs">amazon-web-services</code>)
          </li>
          <li>
            A curated list of <strong>verified</strong> vendor scores is maintained
            in our catalog—only products we have checked on Gartner are shown with
            stars
          </li>
          <li>
            Some catalog entries map to a parent vendor product (e.g. AWS EC2 →
            Amazon Web Services on Gartner)
          </li>
        </ul>
        <p className="mt-3">
          The star display on each card reflects Gartner&apos;s published average
          rating. Click <strong>View on Gartner</strong> to read reviews and confirm
          the score yourself.
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
          <strong>Scores may be out of date.</strong> Gartner changes as new
          reviews are posted. Our catalog is updated periodically, not in real
          time.
        </p>
        <ul className="mt-3 list-inside list-disc space-y-2 text-stone-600">
          <li>
            <strong>No reviews found does not mean a product is poor.</strong> The
            vendor may have no Gartner profile, use a different domain, or not
            yet be in our verified list.
          </li>
          <li>
            Gartner scores are <strong>vendor-level</strong>, not per SKU—EC2 and
            Redshift share the same Amazon Web Services benchmark.
          </li>
          <li>
            Peer Insights reviews come from IT professionals, but they still may not
            match your procurement context or product line.
          </li>
          <li>
            A low Gartner rating does not replace technical due diligence, security
            review, or contractual assessment.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "gartner-rating",
    title: "What is a Gartner rating?",
    body: (
      <>
        <p>
          On{" "}
          <a
            href="https://www.gartner.com/reviews/product/amazon-web-services"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
          >
            Gartner Peer Insights
          </a>
          , each vendor product has an average rating from 1 to 5 stars and a total
          review count from verified IT professionals.
        </p>
        <p className="mt-3">
          Cloudiscover.io shows that average and count exactly as published on the
          linked Gartner product page—we do not adjust, average across other sites,
          or apply our own grading.
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

export function GartnerRatingsExplorer({
  vendorGroups,
  topRatedServices,
  servicesWithRating,
  servicesWithoutRating,
  topRatedCount,
  vendorCount,
  topRatedMinRating,
  topRatedMinReviewCount,
}: GartnerRatingsPageData) {
  const [openTopic, setOpenTopic] = useState<TopicId | null>("what");
  const [openVendor, setOpenVendor] = useState<string | null>(null);

  return (
    <div className="max-w-3xl space-y-12">
      <section aria-labelledby="gartner-overview-heading">
        <h2
          id="gartner-overview-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Understanding Gartner on cards
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

      <section aria-labelledby="top-rated-heading">
        <h2
          id="top-rated-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Top rated in the catalog
        </h2>
        <p className="mt-2 text-stone-600">
          {topRatedCount} service{topRatedCount === 1 ? "" : "s"} currently qualify:
          Gartner rating above {topRatedMinRating} with more than{" "}
          {topRatedMinReviewCount} reviews.
          Browse the{" "}
          <Link href="/" className="font-medium text-[#6557ff] hover:text-[#f74dc7]">
            catalog
          </Link>{" "}
          to see the Top rated mark in each card&apos;s Gartner box and the
          logo gradient ring.
        </p>
        {topRatedServices.length > 0 ? (
          <ul className="mt-6 space-y-3">
            {topRatedServices.map((service) => (
              <li
                key={service.slug}
                className="rounded-xl border border-[#6557ff]/15 bg-gradient-to-r from-[#6557ff]/5 to-[#f74dc7]/5 px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={`/?q=${encodeURIComponent(service.name)}`}
                    className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
                  >
                    {service.name}
                  </Link>
                  <TopRatedBadge />
                </div>
                <p className="mt-1 text-xs text-stone-500">
                  {service.vendor} · {service.category}
                </p>
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
                    View on Gartner →
                  </a>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-stone-500">
            No services meet the top-rated thresholds yet. As we add verified
            Gartner profiles with higher scores and review volume, they will
            appear here and on their catalog cards.
          </p>
        )}
      </section>

      <section aria-labelledby="catalog-ratings-heading">
        <h2
          id="catalog-ratings-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Services with verified Gartner data
        </h2>
        <p className="mt-2 text-stone-600">
          {servicesWithRating} services across {vendorCount} vendors show a
          verified Gartner rating. {servicesWithoutRating} other services show{" "}
          <strong>No reviews found</strong> until we add a checked Gartner
          profile. Select a vendor to see services and Gartner links.
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
                            View on Gartner →
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
            No verified Gartner mappings yet. Browse the{" "}
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
