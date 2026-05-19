import type { CloudService, ServiceCategory } from "@/types";
import type { SaasDepartment } from "@/lib/departments";
import type { PaasProvider } from "@/lib/paas-providers";

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
    created_at: ts(),
  };
}
