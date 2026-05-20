import "server-only";

import { getCatalog } from "@/lib/catalog/get-catalog";
import {
  TOP_RATED_MIN_RATING,
  TOP_RATED_MIN_REVIEW_COUNT,
  isTopRatedGartner,
} from "@/lib/gartner-top-rated";
import type { ServiceCategory } from "@/types";
import type { ServiceReview } from "@/types/service-review";

export type VendorGartnerGroup = {
  vendor: string;
  services: {
    slug: string;
    name: string;
    category: ServiceCategory;
    review: ServiceReview;
  }[];
};

export type TopRatedService = {
  slug: string;
  name: string;
  vendor: string;
  category: ServiceCategory;
  review: ServiceReview;
};

export type GartnerRatingsPageData = {
  vendorGroups: VendorGartnerGroup[];
  topRatedServices: TopRatedService[];
  servicesWithRating: number;
  servicesWithoutRating: number;
  topRatedCount: number;
  vendorCount: number;
  topRatedMinRating: number;
  topRatedMinReviewCount: number;
};

export async function getGartnerRatingsPageData(): Promise<GartnerRatingsPageData> {
  const catalog = await getCatalog();
  const withRating = catalog.services.filter((s) => s.review != null);
  const withoutRating = catalog.services.length - withRating.length;

  const byVendor = new Map<string, VendorGartnerGroup["services"]>();

  for (const service of withRating) {
    const review = service.review;
    if (!review) continue;
    const list = byVendor.get(service.vendor) ?? [];
    list.push({
      slug: service.slug,
      name: service.name,
      category: service.category,
      review,
    });
    byVendor.set(service.vendor, list);
  }

  const vendorGroups: VendorGartnerGroup[] = [...byVendor.entries()]
    .map(([vendor, services]) => ({
      vendor,
      services: services.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.vendor.localeCompare(b.vendor));

  const topRatedServices: TopRatedService[] = withRating
    .filter((service) => isTopRatedGartner(service.review))
    .map((service) => ({
      slug: service.slug,
      name: service.name,
      vendor: service.vendor,
      category: service.category,
      review: service.review!,
    }))
    .sort((a, b) => {
      const byRating = b.review.rating - a.review.rating;
      if (byRating !== 0) return byRating;
      return b.review.review_count - a.review.review_count;
    });

  return {
    vendorGroups,
    topRatedServices,
    servicesWithRating: withRating.length,
    servicesWithoutRating: withoutRating,
    topRatedCount: topRatedServices.length,
    vendorCount: vendorGroups.length,
    topRatedMinRating: TOP_RATED_MIN_RATING,
    topRatedMinReviewCount: TOP_RATED_MIN_REVIEW_COUNT,
  };
}
