"use client";

import Link from "next/link";
import { useId } from "react";
import { trustpilotDomainFromWebsite, trustpilotReviewUrl } from "@/lib/trustpilot-url";
import type { ServiceReview } from "@/types/service-review";

function StarIcon({
  filled,
  partial,
  gradientId,
}: {
  filled: boolean;
  partial?: number;
  gradientId: string;
}) {
  const fillPercent =
    partial !== undefined ? `${Math.round(partial * 100)}%` : filled ? "100%" : "0%";

  return (
    <span className="relative inline-block h-3.5 w-3.5 shrink-0" aria-hidden>
      <svg className="h-3.5 w-3.5 text-stone-200" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: fillPercent }}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill={`url(#${gradientId})`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </span>
    </span>
  );
}

function StarRow({
  rating,
  gradientId,
  empty = false,
}: {
  rating: number;
  gradientId: string;
  empty?: boolean;
}) {
  if (empty) {
    return (
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={false} gradientId={gradientId} />
        ))}
      </span>
    );
  }

  const clamped = Math.min(5, Math.max(0, rating));
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const filled = clamped >= starValue;
        const partial = !filled && clamped > i ? clamped - i : undefined;
        return (
          <StarIcon
            key={starValue}
            filled={filled}
            partial={partial}
            gradientId={gradientId}
          />
        );
      })}
    </span>
  );
}

export function ServiceRating({
  review,
  websiteUrl,
}: {
  review: ServiceReview | null | undefined;
  websiteUrl: string | null;
}) {
  const gradientId = useId().replace(/:/g, "");
  const domain = trustpilotDomainFromWebsite(websiteUrl);
  const trustpilotHref = review?.source_url ?? (domain ? trustpilotReviewUrl(domain) : null);

  return (
    <section
      className="mt-3 rounded-lg border border-stone-100 bg-stone-50/60 px-3 py-2.5"
      aria-label={
        review
          ? `${review.rating} out of 5 on Trustpilot`
          : "No Trustpilot reviews found"
      }
    >
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            className="rating-stars-gradient"
          >
            <stop offset="0%" />
            <stop offset="50%" />
            <stop offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <p className="text-[10px] font-medium uppercase tracking-wide text-stone-400">
        Trustpilot
      </p>

      {review ? (
        <>
          <div className="mt-1">
            <StarRow rating={review.rating} gradientId={gradientId} />
          </div>
          <p className="mt-1.5 text-[11px] leading-snug text-stone-500">
            {new Intl.NumberFormat("en-US").format(review.review_count)} reviews ·{" "}
            <a
              href={review.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
            >
              View on Trustpilot
            </a>
            {" · "}
            <Link
              href="/trustpilot-ratings"
              className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
            >
              Learn more
            </Link>
          </p>
        </>
      ) : (
        <>
          <div className="mt-1 opacity-60">
            <StarRow rating={0} gradientId={gradientId} empty />
          </div>
          <p className="mt-1.5 text-[11px] text-stone-500">
            No reviews found
            {trustpilotHref && (
              <>
                {" "}
                ·{" "}
                <a
                  href={trustpilotHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
                >
                  Search Trustpilot
                </a>
              </>
            )}
            {" · "}
            <Link
              href="/trustpilot-ratings"
              className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
            >
              Learn more
            </Link>
          </p>
        </>
      )}
    </section>
  );
}
