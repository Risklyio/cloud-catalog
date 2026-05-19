import type { CloudService, ServiceCategory } from "@/types";
import type { SaasDepartment } from "@/lib/departments";
import type { PaasProvider } from "@/lib/paas-providers";
import type { SaasSegment } from "@/lib/saas-segments";

const ts = () => new Date().toISOString();

export function createService(
  id: string,
  name: string,
  description: string,
  vendor: string,
  websiteUrl: string,
  tags: string[],
  options: {
    category?: ServiceCategory;
    departments?: SaasDepartment[];
    paas_provider?: PaasProvider;
    saas_segment?: SaasSegment;
    slug?: string;
  } = {},
): CloudService {
  const category = options.category ?? "SaaS";
  const slug =
    options.slug ??
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return {
    id,
    name,
    slug,
    description,
    category,
    vendor,
    logo_url: null,
    website_url: websiteUrl,
    tags,
    departments: category === "SaaS" ? (options.departments ?? []) : [],
    paas_provider:
      category === "PaaS" ? (options.paas_provider ?? null) : null,
    saas_segment:
      category === "SaaS" ? (options.saas_segment ?? null) : null,
    created_at: ts(),
  };
}
