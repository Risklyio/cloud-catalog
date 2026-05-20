/** Gartner Peer Insights product review URL (client-safe). */
export function gartnerProductReviewUrl(productSlug: string): string {
  const slug = productSlug.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  return `https://www.gartner.com/reviews/product/${slug}`;
}

/** Map website hostname to full Gartner product slug when known. */
const HOST_TO_GARTNER_PRODUCT_SLUG: Record<string, string> = {
  "aws.amazon.com": "amazon-web-services",
  "amazon.com": "amazon-web-services",
  "azure.microsoft.com": "azure",
  "microsoft.com": "azure",
  "cloud.google.com": "google-cloud-platform",
  "google.com": "google-cloud-platform",
  "ibm.com": "ibm-cloud",
  "oracle.com": "oracle-cloud-infrastructure",
  "salesforce.com": "salesforce-sales-cloud",
  "servicenow.com": "servicenow-service-management",
  "workday.com": "workday-hcm",
  "snowflake.com": "snowflake-ai-data-cloud",
  "databricks.com": "databricks-data-intelligence-platform",
  "datadoghq.com": "datadog-534048731",
  "okta.com": "okta-workforce-identity",
  "crowdstrike.com": "crowdstrike-falcon",
  "stripe.com": "stripe-billing",
  "github.com": "github-copilot",
  "atlassian.com": "jira",
  "mongodb.com": "mongodbatlas",
  "elastic.co": "elastic-security",
  "splunk.com": "splunk-cloud-platform",
  "paloaltonetworks.com": "prisma-cloud",
  "fortinet.com": "fortigate-next-generation-firewall",
  "zscaler.com": "zscaler-private-access",
  "sentinelone.com": "sentinelone-singularity-endpoint",
  "sophos.com": "sophos-endpoint",
  "proofpoint.com": "proofpoint-threat-protection",
  "mimecast.com": "mimecast-advanced-email-security",
  "barracuda.com": "barracuda-email-protection",
  "tenable.com": "tenable-vulnerability-management",
  "qualys.com": "qualys-vmdr",
  "rapid7.com": "rapid7-insightvm",
  "newrelic.com": "new-relic",
  "grafana.com": "grafana-cloud",
  "heroku.com": "salesforce-sales-cloud",
  "anthropic.com": "claude",
  "canva.com": "canva-enterprise",
  "monday.com": "monday-com",
  "asana.com": "asana",
  "hubspot.com": "hubspot-marketing-hub",
  "bamboohr.com": "bamboohr",
  "auth0.com": "okta-workforce-identity",
  "onetrust.com": "onetrust-tech-risk-compliance",
  "vanta.com": "vanta-859163126",
};

export function gartnerProductFromWebsite(
  websiteUrl: string | null | undefined,
): string | null {
  if (!websiteUrl) return null;
  try {
    const host = new URL(websiteUrl).hostname.toLowerCase().replace(/^www\./, "");
    return HOST_TO_GARTNER_PRODUCT_SLUG[host] ?? null;
  } catch {
    return null;
  }
}
