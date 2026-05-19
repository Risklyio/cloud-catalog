"use client";

import type { ServiceReview } from "@/types/service-review";

function StarIcon({ filled, partial }: { filled: boolean; partial?: number }) {
  const fillPercent =
    partial !== undefined ? `${Math.round(partial * 100)}%` : filled ? "100%" : "0%";

  return (
    <span className="relative inline-block h-4 w-4 shrink-0" aria-hidden>
      <svg
        className="absolute inset-0 h-4 w-4 text-stone-200"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: fillPercent }}
      >
        <svg
          className="h-4 w-4 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </span>
    </span>
  );
}

function StarRow({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, rating));
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const filled = clamped >= starValue;
        const partial =
          !filled && clamped > i ? clamped - i : undefined;
        return (
          <StarIcon
            key={starValue}
            filled={filled}
            partial={partial}
          />
        );
      })}
    </span>
  );
}

const SOURCE_STYLES: Record<ServiceReview["source"], string> = {
  trustpilot: "bg-emerald-50 text-emerald-800 ring-emerald-200/80",
  google: "bg-sky-50 text-sky-800 ring-sky-200/80",
};

export function ServiceRating({ review }: { review: ServiceReview }) {
  const formattedCount = new Intl.NumberFormat("en-US").format(
    review.review_count,
  );

  return (
    <section
      className="mt-4 rounded-xl border border-stone-100 bg-gradient-to-br from-stone-50/90 to-white px-3.5 py-3"
      aria-label={`${review.rating} out of 5 stars from ${review.source_label}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
            Public rating
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-2xl font-bold tabular-nums tracking-tight text-stone-900">
              {review.rating.toFixed(1)}
            </span>
            <StarRow rating={review.rating} />
          </div>
          <p className="mt-1 text-xs text-stone-500">
            {formattedCount} reviews on{" "}
            <a
              href={review.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#6557ff] underline-offset-2 hover:text-[#f74dc7] hover:underline"
            >
              {review.source_label}
            </a>
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${SOURCE_STYLES[review.source]}`}
        >
          {review.source === "trustpilot" ? "TP" : "G"}
        </span>
      </div>
    </section>
  );
}
