/** Gartner Peer Insights product review URL (client-safe). */
export function gartnerProductReviewUrl(productSlug: string): string {
  const slug = productSlug.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  return `https://www.gartner.com/reviews/product/${slug}`;
}

/** Map website hostname to Gartner vendor product slug when known. */
const HOST_TO_GARTNER_PRODUCT: Record<string, string> = {
  "aws.amazon.com": "amazon-web-services",
  "amazon.com": "amazon-web-services",
  "azure.microsoft.com": "microsoft-azure",
  "microsoft.com": "microsoft-azure",
  "cloud.google.com": "google-cloud-platform",
  "google.com": "google-cloud-platform",
  "ibm.com": "ibm-cloud",
  "oracle.com": "oracle-cloud-infrastructure",
  "salesforce.com": "salesforce-sales-cloud",
  "servicenow.com": "servicenow",
  "workday.com": "workday",
  "snowflake.com": "snowflake",
  "databricks.com": "databricks",
  "datadoghq.com": "datadog",
  "okta.com": "okta",
  "crowdstrike.com": "crowdstrike",
  "stripe.com": "stripe",
  "adobe.com": "adobe",
  "github.com": "github",
  "atlassian.com": "atlassian",
  "mongodb.com": "mongodb-atlas",
  "redis.com": "redis-enterprise-software",
  "elastic.co": "elastic-cloud",
  "splunk.com": "splunk",
  "paloaltonetworks.com": "palo-alto-networks-prisma-cloud",
  "fortinet.com": "fortinet",
  "zscaler.com": "zscaler",
  "sentinelone.com": "sentinelone",
  "sophos.com": "sophos",
  "proofpoint.com": "proofpoint",
  "mimecast.com": "mimecast",
  "barracuda.com": "barracuda-networks",
  "tenable.com": "tenable",
  "qualys.com": "qualys",
  "rapid7.com": "rapid7",
  "newrelic.com": "new-relic",
  "grafana.com": "grafana-labs",
  "hashicorp.com": "hashicorp",
  "digitalocean.com": "digitalocean",
  "heroku.com": "salesforce-heroku",
  "openai.com": "openai",
  "anthropic.com": "anthropic",
  "figma.com": "figma",
  "canva.com": "canva",
  "monday.com": "monday-com",
  "asana.com": "asana",
  "hubspot.com": "hubspot",
  "bamboohr.com": "bamboohr",
  "gusto.com": "gusto",
  "greenhouse.io": "greenhouse",
  "linkedin.com": "linkedin",
  "knowbe4.com": "knowbe4",
  "drata.com": "drata",
  "vanta.com": "vanta",
  "onetrust.com": "onetrust",
  "auth0.com": "okta",
  "supabase.com": "supabase",
  "vercel.com": "vercel",
};

export function gartnerProductFromWebsite(
  websiteUrl: string | null | undefined,
): string | null {
  if (!websiteUrl) return null;
  try {
    const host = new URL(websiteUrl).hostname.toLowerCase().replace(/^www\./, "");
    return HOST_TO_GARTNER_PRODUCT[host] ?? null;
  } catch {
    return null;
  }
}
