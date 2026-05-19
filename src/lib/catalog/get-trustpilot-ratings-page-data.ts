import "server-only";

import { getCatalog } from "@/lib/catalog/get-catalog";
import type { ServiceCategory } from "@/types";
import type { ServiceReview } from "@/types/service-review";

export type VendorTrustpilotGroup = {
  vendor: string;
  services: {
    slug: string;
    name: string;
    category: ServiceCategory;
    review: ServiceReview;
  }[];
};

export type TrustpilotRatingsPageData = {
  vendorGroups: VendorTrustpilotGroup[];
  servicesWithRating: number;
  servicesWithoutRating: number;
  vendorCount: number;
};

export async function getTrustpilotRatingsPageData(): Promise<TrustpilotRatingsPageData> {
  const catalog = await getCatalog();
  const withRating = catalog.services.filter((s) => s.review != null);
  const withoutRating = catalog.services.length - withRating.length;

  const byVendor = new Map<string, VendorTrustpilotGroup["services"]>();

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

  const vendorGroups: VendorTrustpilotGroup[] = [...byVendor.entries()]
    .map(([vendor, services]) => ({
      vendor,
      services: services.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.vendor.localeCompare(b.vendor));

  return {
    vendorGroups,
    servicesWithRating: withRating.length,
    servicesWithoutRating: withoutRating,
    vendorCount: vendorGroups.length,
  };
}
