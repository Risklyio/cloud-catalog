import type { SaasDepartment } from "@/lib/departments";
import type { PaasProvider } from "@/lib/paas-providers";
import type { SaasSegment } from "@/lib/saas-segments";
import type { SecurityCertification } from "@/types/security-certification";
import type { ServiceReview } from "@/types/service-review";

export type { SecurityCertId, SecurityCertification } from "@/types/security-certification";
export type { ServiceReview } from "@/types/service-review";

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
  /** Cloud hyperscaler (PaaS only; normalized on load). */
  paas_provider?: PaasProvider | null;
  /** Solution area (SaaS only; normalized on load). */
  saas_segment?: SaasSegment | null;
  /** Publicly documented frameworks with links to provider evidence. */
  security_certifications?: SecurityCertification[];
  /** Gartner Peer Insights vendor rating when available. */
  review?: ServiceReview | null;
  created_at: string;
}

export interface ServiceGroup {
  id: string;
  slug: string;
  title: string;
  description: string;
  service_ids: string[];
  /** When set, rendered nested under the parent curated group. */
  parent_slug?: string | null;
  /** Collapsible section in curated nav (starts collapsed when default_collapsed). */
  collapsible?: boolean;
  default_collapsed?: boolean;
  created_at: string;
}

export interface CatalogData {
  services: CloudService[];
  groups: ServiceGroup[];
}
