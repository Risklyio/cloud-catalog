/** Sidebar layout: curated roots vs platform categories (SaaS / PaaS / IaaS). */

/** Curated top-level groups — listings unchanged; only nav section changes. */
export const CURATED_ROOT_GROUP_SLUGS = [
  "top-rated",
  "vulnerability-scanners",
  "compliance-platforms",
  "generative-ai",
  "marketing-stack",
] as const;

export type PlatformCategoryId = "saas" | "paas" | "iaas";

export type PlatformNavCategory = {
  id: PlatformCategoryId;
  title: string;
  description: string;
  /** Optional extra groups shown when the platform section is expanded. */
  extraGroupSlugs?: readonly string[];
  subcategories?: {
    label: string;
    groupSlugs: readonly string[];
  };
  cloudProviders?: {
    label: string;
    groupSlugs: readonly string[];
  };
};

export const PLATFORM_NAV_CATEGORIES: readonly PlatformNavCategory[] = [
  {
    id: "saas",
    title: "SaaS",
    description:
      "Software delivered over the internet—subscription apps for IT, security, and compliance teams.",
    subcategories: {
      label: "Solution areas",
      groupSlugs: ["saas-it", "saas-cyber-security", "saas-compliance"],
    },
  },
  {
    id: "paas",
    title: "PaaS",
    description:
      "Managed platforms to build, integrate, and run applications without operating raw infrastructure.",
    extraGroupSlugs: ["developer-platforms"],
    cloudProviders: {
      label: "Cloud Providers",
      groupSlugs: ["paas-aws", "paas-azure", "paas-gcp"],
    },
  },
  {
    id: "iaas",
    title: "IaaS",
    description:
      "Compute, storage, and networking resources you provision and scale in the cloud.",
    cloudProviders: {
      label: "Cloud Providers",
      groupSlugs: ["iaas-aws", "iaas-azure", "iaas-gcp", "iaas-independent"],
    },
  },
] as const;

const PLATFORM_GROUP_SLUGS = new Set<string>([
  "saas-solutions",
  "saas-it",
  "saas-cyber-security",
  "saas-compliance",
  "developer-platforms",
  "paas-platforms",
  "paas-aws",
  "paas-azure",
  "paas-gcp",
  "cloud-compute-iaas",
  "iaas-aws",
  "iaas-azure",
  "iaas-gcp",
  "iaas-independent",
]);

export function isPlatformGroupSlug(slug: string): boolean {
  return PLATFORM_GROUP_SLUGS.has(slug);
}

export function isCuratedRootGroupSlug(slug: string): boolean {
  return (CURATED_ROOT_GROUP_SLUGS as readonly string[]).includes(slug);
}
