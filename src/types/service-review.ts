/** Third-party review source used for public ratings on service cards. */
export type ReviewSource = "trustpilot" | "google";

export interface ServiceReview {
  /** Aggregate score from 1 to 5 (one decimal). */
  rating: number;
  review_count: number;
  source: ReviewSource;
  source_label: string;
  /** Link to the Trustpilot or Google reviews page. */
  source_url: string;
}
