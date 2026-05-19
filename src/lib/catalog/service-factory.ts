import type { CloudService, ServiceCategory } from "@/types";
import type { SaasDepartment } from "@/lib/departments";

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
    slug?: string;
  } = {},
): CloudService {
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
    category: options.category ?? "SaaS",
    vendor,
    logo_url: null,
    website_url: websiteUrl,
    tags,
    departments:
      (options.category ?? "SaaS") === "SaaS" ? (options.departments ?? []) : [],
    created_at: ts(),
  };
}
