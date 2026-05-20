import "server-only";

import {
  TOP_RATED_MIN_RATING,
  TOP_RATED_MIN_REVIEW_COUNT,
  isTopRatedGartner,
} from "@/lib/gartner-top-rated";
import type { CloudService, ServiceGroup } from "@/types";

export const TOP_RATED_GROUP_SLUG = "top-rated";

export function buildTopRatedGroup(services: CloudService[]): ServiceGroup {
  const service_ids = services
    .filter((service) => isTopRatedGartner(service.review))
    .map((service) => service.id);

  return {
    id: "g-top-rated",
    slug: TOP_RATED_GROUP_SLUG,
    title: "Top rated",
    description: `Services with a verified Gartner rating above ${TOP_RATED_MIN_RATING} and more than ${TOP_RATED_MIN_REVIEW_COUNT} reviews.`,
    service_ids,
    created_at: new Date().toISOString(),
  };
}

/** Inject or refresh the curated Top rated group from live Gartner data. */
export function applyTopRatedGroup(
  services: CloudService[],
  groups: ServiceGroup[],
): ServiceGroup[] {
  const topRated = buildTopRatedGroup(services);
  const rest = groups.filter((group) => group.slug !== TOP_RATED_GROUP_SLUG);
  return [topRated, ...rest];
}
