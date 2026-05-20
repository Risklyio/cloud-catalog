import "server-only";

import {
  GARTNER_VERIFIED_BY_SLUG,
  HOST_TO_GARTNER_PRODUCT_SLUG,
  SLUG_TO_GARTNER_PRODUCT_SLUG,
} from "@/lib/catalog/gartner-verified-products";
import {
  gartnerProductFromWebsite,
  gartnerProductReviewUrl,
} from "@/lib/gartner-url";
import type { ServiceReview } from "@/types/service-review";

function lookupVerified(productSlug: string): ServiceReview | null {
  const snapshot = GARTNER_VERIFIED_BY_SLUG[productSlug];
  if (!snapshot) return null;
  return {
    rating: snapshot.rating,
    review_count: snapshot.review_count,
    source_url: gartnerProductReviewUrl(productSlug),
    gartner_product_slug: productSlug,
  };
}

export function resolveServiceReview(
  slug: string,
  websiteUrl: string | null | undefined,
): ServiceReview | null {
  const slugProduct = SLUG_TO_GARTNER_PRODUCT_SLUG[slug];
  if (slugProduct) {
    const fromSlug = lookupVerified(slugProduct);
    if (fromSlug) return fromSlug;
  }

  const hostProduct = gartnerProductFromWebsite(websiteUrl);
  if (hostProduct) {
    const fromHost = lookupVerified(hostProduct);
    if (fromHost) return fromHost;
  }

  return null;
}
