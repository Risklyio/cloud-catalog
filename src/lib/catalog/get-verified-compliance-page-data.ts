import "server-only";

import { getCatalog } from "@/lib/catalog/get-catalog";
import type { SecurityCertification } from "@/types/security-certification";
import type { ServiceCategory } from "@/types";

export type VendorComplianceGroup = {
  vendor: string;
  services: {
    slug: string;
    name: string;
    category: ServiceCategory;
    certifications: SecurityCertification[];
  }[];
};

export type VerifiedCompliancePageData = {
  vendorGroups: VendorComplianceGroup[];
  servicesWithBadges: number;
  vendorCount: number;
};

export async function getVerifiedCompliancePageData(): Promise<VerifiedCompliancePageData> {
  const catalog = await getCatalog();
  const withCerts = catalog.services.filter(
    (s) => (s.security_certifications?.length ?? 0) > 0,
  );

  const byVendor = new Map<string, VendorComplianceGroup["services"]>();

  for (const service of withCerts) {
    const certifications = service.security_certifications ?? [];
    const list = byVendor.get(service.vendor) ?? [];
    list.push({
      slug: service.slug,
      name: service.name,
      category: service.category,
      certifications,
    });
    byVendor.set(service.vendor, list);
  }

  const vendorGroups: VendorComplianceGroup[] = [...byVendor.entries()]
    .map(([vendor, services]) => ({
      vendor,
      services: services.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.vendor.localeCompare(b.vendor));

  return {
    vendorGroups,
    servicesWithBadges: withCerts.length,
    vendorCount: vendorGroups.length,
  };
}
