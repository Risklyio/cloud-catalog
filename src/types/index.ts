export type ServiceCategory = "SaaS" | "PaaS" | "IaaS";

export interface CloudService {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ServiceCategory;
  vendor: string;
  logo_url: string | null;
  website_url: string | null;
  tags: string[];
  created_at: string;
}

export interface ServiceGroup {
  id: string;
  slug: string;
  title: string;
  description: string;
  service_ids: string[];
  created_at: string;
}

export interface CatalogData {
  services: CloudService[];
  groups: ServiceGroup[];
}
