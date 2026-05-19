import type { SaasDepartment } from "@/lib/departments";

export type ServiceCategory = "SaaS" | "PaaS" | "IaaS" | "AI";

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
  /** Relevant business departments (SaaS only; empty for PaaS/IaaS). */
  departments: SaasDepartment[];
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
