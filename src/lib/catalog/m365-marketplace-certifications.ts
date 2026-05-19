import "server-only";

import type { CloudService } from "@/types";
import type { SecurityCertification } from "@/types/security-certification";

/** Display label for Microsoft 365 Certification on catalog badges. */
export const M365_CERTIFIED_LABEL = "M365 Certified";

/**
 * Curated SaaS listings from the Microsoft Marketplace M365-certified filter.
 * @see https://marketplace.microsoft.com/en-us/search/products?filters=M365-certified
 *
 * Evidence links point to each product's marketplace listing (not the vendor trust center).
 */
export const M365_MARKETPLACE_BY_SLUG: Record<string, string> = {
  asana:
    "https://marketplace.microsoft.com/en-us/product/office/WA200001727?tab=Overview",
  auth0:
    "https://marketplace.microsoft.com/en-us/product/saas/auth0.auth0-identity-platform-on-azure?tab=Overview",
  "barracuda-email-security-service":
    "https://marketplace.microsoft.com/en-us/product/saas/aad.barracudaemailsecurityservice?tab=Overview",
  "crowdstrike-falcon":
    "https://marketplace.microsoft.com/en-us/product/saas/crowdstrike1726000395811.falconcloudsecurity?tab=Overview",
  datadog:
    "https://marketplace.microsoft.com/en-us/product/saas/datadog1591740804488.dd_liftr_v2?tab=Overview",
  drata:
    "https://marketplace.microsoft.com/en-us/product/WA200004751?tab=Overview",
  figma:
    "https://marketplace.microsoft.com/en-us/product/saas/aad.figma?tab=Overview",
  greenhouse:
    "https://marketplace.microsoft.com/en-us/product/saas/aad.greenhouse?tab=Overview",
  hubspot:
    "https://marketplace.microsoft.com/en-us/product/office/WA104381257?tab=Overview",
  knowbe4:
    "https://marketplace.microsoft.com/en-us/product/saas/knowbe41757596355407.knowbe4defend?tab=Overview",
  "mimecast-awareness-training":
    "https://marketplace.microsoft.com/en-us/product/saas/mimecastnorthamerica1584469118674.mimecast_email_security_free_trial?tab=Overview",
  "mimecast-cloud-security":
    "https://marketplace.microsoft.com/en-us/product/saas/mimecastnorthamerica1584469118674.mimecast_email_security_free_trial?tab=Overview",
  "monday-com":
    "https://marketplace.microsoft.com/en-us/product/WA200001798?tab=Overview",
  "new-relic":
    "https://marketplace.microsoft.com/en-us/product/saas/newrelicinc1635200720692.newrelic_liftr_payg?tab=Overview",
  onetrust:
    "https://marketplace.microsoft.com/en-us/product/saas/onetrustllc1594047340198.ot_private_1yr?tab=Overview",
  "power-bi":
    "https://marketplace.microsoft.com/en-us/product/saas/microsoft.power-bi?tab=Overview",
  "proofpoint-security-awareness":
    "https://marketplace.microsoft.com/en-us/product/saas/proofpointinc1600438591120.proofpoint_core_email_protection_for_m365?tab=Overview",
  salesforce:
    "https://marketplace.microsoft.com/en-us/product/office/WA104379334?tab=Overview",
  "sentinelone-singularity":
    "https://marketplace.microsoft.com/en-us/product/saas/aad.sentinelone?tab=Overview",
  "servicenow-grc":
    "https://marketplace.microsoft.com/en-us/product/saas/servicenow1594831756316.servicenow_on_azure?tab=Overview",
  "sophos-intercept-x-advanced":
    "https://marketplace.microsoft.com/en-us/product/saas/sophos.sophos-interceptx-for-server?tab=Overview",
  "trend-micro-apex-one":
    "https://marketplace.microsoft.com/en-us/marketplace/apps/trendmicro.trend-vision-one-enterprise?tab=Overview",
  vanta:
    "https://marketplace.microsoft.com/en-us/product/saas/aad.vantao365?tab=Overview",
  workday:
    "https://marketplace.microsoft.com/en-us/product/saas/aad.workday?tab=Overview",
  "zscaler-internet-access":
    "https://marketplace.microsoft.com/en-us/product/saas/zscaler1579058425289.zia_flat_rate?tab=Overview",
};

export function resolveM365MarketplaceCertification(
  service: Pick<CloudService, "slug" | "category">,
): SecurityCertification | null {
  if (service.category !== "SaaS") return null;

  const evidence_url = M365_MARKETPLACE_BY_SLUG[service.slug];
  if (!evidence_url) return null;

  return {
    id: "m365-certified",
    label: M365_CERTIFIED_LABEL,
    evidence_url,
  };
}
