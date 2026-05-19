/** Public Trustpilot aggregate shown on service cards. */
export interface ServiceReview {
  /** Trustpilot TrustScore from 1 to 5 (one decimal). */
  rating: number;
  review_count: number;
  /** Trustpilot company review page. */
  source_url: string;
}
