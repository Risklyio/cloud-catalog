import "server-only";

import {
  trustpilotDomainFromWebsite,
  trustpilotReviewUrl,
} from "@/lib/trustpilot-url";
import type { ServiceReview } from "@/types/service-review";

type TrustpilotSnapshot = {
  rating: number;
  review_count: number;
};

/**
 * Verified Trustpilot TrustScores only — keyed by review domain.
 * Sourced from trustpilot.com/review/{domain}; omit entries we have not verified.
 */
const TRUSTPILOT_VERIFIED: Record<string, TrustpilotSnapshot> = {
  "asana.com": { rating: 1.6, review_count: 288 },
  "auth0.com": { rating: 2.0, review_count: 42 },
  "bamboohr.com": { rating: 4.6, review_count: 2100 },
  "barracuda.com": { rating: 2.3, review_count: 48 },
  "canva.com": { rating: 3.7, review_count: 4233 },
  "crowdstrike.com": { rating: 2.0, review_count: 19 },
  "datadoghq.com": { rating: 1.9, review_count: 21 },
  "databricks.com": { rating: 2.4, review_count: 12 },
  "digitalocean.com": { rating: 4.6, review_count: 2284 },
  "drata.com": { rating: 2.6, review_count: 4 },
  "figma.com": { rating: 2.5, review_count: 189 },
  "grafana.com": { rating: 3.2, review_count: 8 },
  "greenhouse.io": { rating: 2.8, review_count: 24 },
  "gusto.com": { rating: 4.6, review_count: 4200 },
  "heroku.com": { rating: 2.1, review_count: 35 },
  "hubspot.com": { rating: 1.7, review_count: 1071 },
  "knowbe4.com": { rating: 4.6, review_count: 520 },
  "linkedin.com": { rating: 1.4, review_count: 12000 },
  "mimecast.com": { rating: 2.8, review_count: 56 },
  "monday.com": { rating: 2.6, review_count: 3395 },
  "newrelic.com": { rating: 1.5, review_count: 18 },
  "okta.com": { rating: 1.8, review_count: 95 },
  "onetrust.com": { rating: 2.2, review_count: 12 },
  "openai.com": { rating: 1.5, review_count: 890 },
  "oracle.com": { rating: 1.6, review_count: 620 },
  "qualys.com": { rating: 2.5, review_count: 14 },
  "rapid7.com": { rating: 2.7, review_count: 22 },
  "salesforce.com": { rating: 1.5, review_count: 608 },
  "sentinelone.com": { rating: 2.3, review_count: 11 },
  "servicenow.com": { rating: 1.8, review_count: 120 },
  "snowflake.com": { rating: 2.0, review_count: 28 },
  "sophos.com": { rating: 2.4, review_count: 180 },
  "stripe.com": { rating: 1.8, review_count: 16928 },
  "supabase.com": { rating: 3.8, review_count: 42 },
  "tenable.com": { rating: 2.6, review_count: 19 },
  "vanta.com": { rating: 4.0, review_count: 13 },
  "vercel.com": { rating: 2.9, review_count: 38 },
  "workday.com": { rating: 1.9, review_count: 340 },
  "zscaler.com": { rating: 2.1, review_count: 9 },
  "github.com": { rating: 2.3, review_count: 240 },
  "ibm.com": { rating: 1.5, review_count: 450 },
  "adobe.com": { rating: 2.0, review_count: 4800 },
  "anthropic.com": { rating: 2.8, review_count: 12 },
  "proofpoint.com": { rating: 2.0, review_count: 110 },
  "cisco.com": { rating: 1.7, review_count: 290 },
};

/** Slug → Trustpilot domain when it differs from the service website hostname. */
const SLUG_TRUSTPILOT_DOMAIN: Record<string, string> = {
  "amazon-redshift": "aws.amazon.com",
  bigquery: "cloud.google.com",
  "google-compute-engine": "cloud.google.com",
  "azure-virtual-machines": "azure.microsoft.com",
  "aws-ec2": "aws.amazon.com",
  auth0: "auth0.com",
  "new-relic": "newrelic.com",
  "grafana-cloud": "grafana.com",
  "monday-com": "monday.com",
  "mimecast-awareness-training": "mimecast.com",
  "mimecast-cloud-security": "mimecast.com",
  "crowdstrike-falcon": "crowdstrike.com",
  "sentinelone-singularity": "sentinelone.com",
  "sophos-intercept-x-advanced": "sophos.com",
  "trend-micro-apex-one": "trendmicro.com",
  "zscaler-internet-access": "zscaler.com",
  "barracuda-email-security-service": "barracuda.com",
  "proofpoint-security-awareness": "proofpoint.com",
  "github-advanced-security": "github.com",
  "oracle-cloud-infrastructure": "oracle.com",
  "linkedin-learning": "linkedin.com",
  "udemy-business": "udemy.com",
};

function lookupVerified(domain: string): ServiceReview | null {
  const snapshot =
    TRUSTPILOT_VERIFIED[domain] ??
    TRUSTPILOT_VERIFIED[domain.replace(/^www\./, "")];
  if (!snapshot) return null;
  return {
    rating: snapshot.rating,
    review_count: snapshot.review_count,
    source_url: trustpilotReviewUrl(domain),
  };
}

export function resolveServiceReview(
  slug: string,
  websiteUrl: string | null | undefined,
): ServiceReview | null {
  const slugDomain = SLUG_TRUSTPILOT_DOMAIN[slug];
  if (slugDomain) {
    const fromSlug = lookupVerified(slugDomain);
    if (fromSlug) return fromSlug;
  }

  const hostDomain = trustpilotDomainFromWebsite(websiteUrl);
  if (!hostDomain) return null;

  return lookupVerified(hostDomain);
}
