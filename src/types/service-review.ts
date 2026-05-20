/** Public Gartner Peer Insights aggregate shown on service cards (vendor-level). */
export interface ServiceReview {
  /** Gartner average rating from 1 to 5 (one decimal). */
  rating: number;
  review_count: number;
  /** Gartner Peer Insights product review page for the vendor. */
  source_url: string;
  /** Gartner product slug (e.g. amazon-web-services). */
  gartner_product_slug?: string;
}
