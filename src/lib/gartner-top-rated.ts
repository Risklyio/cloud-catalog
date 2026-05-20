import type { ServiceReview } from "@/types/service-review";

/** Gartner rating must be strictly above this value (4.1 qualifies; 4.0 does not). */
export const TOP_RATED_MIN_RATING = 4;

/** Review count must be strictly above this value (501 qualifies; 500 does not). */
export const TOP_RATED_MIN_REVIEW_COUNT = 500;

export function isTopRatedGartner(
  review: ServiceReview | null | undefined,
): boolean {
  if (!review) return false;
  return (
    review.rating > TOP_RATED_MIN_RATING &&
    review.review_count > TOP_RATED_MIN_REVIEW_COUNT
  );
}
