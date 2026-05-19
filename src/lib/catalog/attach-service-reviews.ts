import "server-only";

import { resolveServiceReview } from "@/lib/catalog/service-reviews.server";
import type { CloudService } from "@/types";

/** Attach public review ratings on the server only. */
export function attachServiceReviews(services: CloudService[]): CloudService[] {
  return services.map((service) => ({
    ...service,
    review:
      service.review !== undefined
        ? service.review
        : resolveServiceReview(service.slug, service.website_url),
  }));
}
