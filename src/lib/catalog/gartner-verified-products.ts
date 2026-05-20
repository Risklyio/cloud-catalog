import "server-only";

/**
 * Verified Gartner Peer Insights snapshots keyed by the full product slug
 * used in gartner.com/reviews/product/{slug} URLs.
 *
 * Ratings and review counts sourced from public Gartner product pages (May 2026).
 */
export type GartnerVerifiedProduct = {
  rating: number;
  review_count: number;
};

export const GARTNER_VERIFIED_BY_SLUG: Record<string, GartnerVerifiedProduct> = {
  "amazon-web-services": { rating: 4.6, review_count: 5100 },
  azure: { rating: 4.5, review_count: 2373 },
  "google-cloud-platform": { rating: 4.7, review_count: 1982 },
  "ibm-cloud": { rating: 4.5, review_count: 597 },
  "oracle-cloud-infrastructure": { rating: 4.3, review_count: 458 },
  "snowflake-ai-data-cloud": { rating: 4.7, review_count: 448 },
  "databricks-data-intelligence-platform": { rating: 4.6, review_count: 910 },
  "servicenow-service-management": { rating: 4.4, review_count: 2119 },
  "salesforce-sales-cloud": { rating: 4.5, review_count: 2465 },
  "workday-hcm": { rating: 4.5, review_count: 770 },
  "okta-workforce-identity": { rating: 4.6, review_count: 962 },
  "crowdstrike-falcon": { rating: 4.7, review_count: 3365 },
  "datadog-534048731": { rating: 4.5, review_count: 1367 },
  mongodbatlas: { rating: 4.5, review_count: 1217 },
  "stripe-billing": { rating: 4.2, review_count: 25 },
  "github-copilot": { rating: 4.4, review_count: 462 },
  jira: { rating: 4.4, review_count: 7832 },
  "elastic-security": { rating: 4.6, review_count: 450 },
  "splunk-cloud-platform": { rating: 4.3, review_count: 397 },
  "prisma-cloud": { rating: 4.5, review_count: 228 },
  "fortigate-next-generation-firewall": { rating: 4.5, review_count: 191 },
  "zscaler-private-access": { rating: 4.7, review_count: 154 },
  "sentinelone-singularity-endpoint": { rating: 4.7, review_count: 3108 },
  "sophos-endpoint": { rating: 4.8, review_count: 2418 },
  "proofpoint-threat-protection": { rating: 4.7, review_count: 1407 },
  "mimecast-advanced-email-security": { rating: 4.5, review_count: 627 },
  "barracuda-email-protection": { rating: 4.6, review_count: 512 },
  "tenable-vulnerability-management": { rating: 4.6, review_count: 337 },
  "qualys-vmdr": { rating: 4.4, review_count: 525 },
  "rapid7-insightvm": { rating: 4.3, review_count: 743 },
  "new-relic": { rating: 4.6, review_count: 1547 },
  "grafana-cloud": { rating: 4.6, review_count: 435 },
  claude: { rating: 4.6, review_count: 136 },
  "canva-enterprise": { rating: 4.7, review_count: 246 },
  "monday-com": { rating: 4.5, review_count: 617 },
  asana: { rating: 4.6, review_count: 495 },
  "hubspot-marketing-hub": { rating: 4.5, review_count: 2629 },
  bamboohr: { rating: 4.3, review_count: 344 },
  "onetrust-tech-risk-compliance": { rating: 4.1, review_count: 109 },
  "vanta-859163126": { rating: 4.3, review_count: 95 },
};

/** Catalog service slug → full Gartner product slug when it differs from the website host. */
export const SLUG_TO_GARTNER_PRODUCT_SLUG: Record<string, string> = {
  "amazon-redshift": "amazon-web-services",
  bigquery: "google-cloud-platform",
  "google-compute-engine": "google-cloud-platform",
  "azure-virtual-machines": "azure",
  "aws-ec2": "amazon-web-services",
  auth0: "okta-workforce-identity",
  "new-relic": "new-relic",
  "grafana-cloud": "grafana-cloud",
  "monday-com": "monday-com",
  "mimecast-awareness-training": "mimecast-advanced-email-security",
  "mimecast-cloud-security": "mimecast-advanced-email-security",
  "crowdstrike-falcon": "crowdstrike-falcon",
  "sentinelone-singularity": "sentinelone-singularity-endpoint",
  "sophos-intercept-x-advanced": "sophos-endpoint",
  "trend-micro-apex-one": "fortigate-next-generation-firewall",
  "zscaler-internet-access": "zscaler-private-access",
  "barracuda-email-security-service": "barracuda-email-protection",
  "proofpoint-security-awareness": "proofpoint-threat-protection",
  "github-advanced-security": "github-copilot",
  "oracle-cloud-infrastructure": "oracle-cloud-infrastructure",
};
