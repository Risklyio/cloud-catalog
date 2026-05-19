import type { ServiceReview } from "@/types/service-review";

/** TrustScore must be strictly above this value (e.g. 4.1 qualifies, 4.0 does not). */
export const TOP_RATED_MIN_RATING = 4;

/** Review count must be strictly above this value. */
export const TOP_RATED_MIN_REVIEW_COUNT = 50;

export function isTopRatedTrustpilot(
  review: ServiceReview | null | undefined,
): boolean {
  if (!review) return false;
  return (
    review.rating > TOP_RATED_MIN_RATING &&
    review.review_count > TOP_RATED_MIN_REVIEW_COUNT
  );
}
