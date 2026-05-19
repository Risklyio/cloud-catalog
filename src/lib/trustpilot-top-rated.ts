import type { ServiceReview } from "@/types/service-review";

/** Minimum TrustScore (inclusive), e.g. 3.5 qualifies. */
export const TOP_RATED_MIN_RATING = 3.5;

/** Minimum review count (inclusive), e.g. 50 qualifies. */
export const TOP_RATED_MIN_REVIEW_COUNT = 50;

export function isTopRatedTrustpilot(
  review: ServiceReview | null | undefined,
): boolean {
  if (!review) return false;
  return (
    review.rating >= TOP_RATED_MIN_RATING &&
    review.review_count >= TOP_RATED_MIN_REVIEW_COUNT
  );
}
