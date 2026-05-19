import {
  createCertification,
  type SecurityCertification,
} from "@/lib/security-certifications";

const c = createCertification;

/** Shared evidence pages for hyperscaler portfolios. */
const AWS_COMPLIANCE = [
  c("iso27001", "https://aws.amazon.com/compliance/iso-27001/"),
  c("soc2", "https://aws.amazon.com/compliance/soc/"),
  c("pci-dss", "https://aws.amazon.com/compliance/pci-dss/"),
  c("fedramp", "https://aws.amazon.com/compliance/fedramp/"),
];

const AZURE_COMPLIANCE = [
  c("iso27001", "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-iso-27001"),
  c("soc2", "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-soc-2"),
  c("pci-dss", "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-pci-dss"),
  c("fedramp", "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-fedramp"),
];

const GCP_COMPLIANCE = [
  c("iso27001", "https://cloud.google.com/security/compliance/iso-27001"),
  c("soc2", "https://cloud.google.com/security/compliance/soc-2"),
  c("pci-dss", "https://cloud.google.com/security/compliance/pci-dss"),
  c("fedramp", "https://cloud.google.com/security/compliance/fedramp"),
];

/**
 * Public trust / compliance evidence URLs keyed by service slug.
 * Only include certifications explicitly listed on the vendor site.
 */
const BY_SLUG: Record<string, SecurityCertification[]> = {
  // Fallback core
  snowflake: [
    c("soc2", "https://www.snowflake.com/en/legal/compliance/soc-2/"),
    c("iso27001", "https://www.snowflake.com/en/legal/compliance/iso/"),
    c("pci-dss", "https://www.snowflake.com/en/legal/compliance/pci-dss/"),
  ],
  bigquery: GCP_COMPLIANCE,
  "amazon-redshift": AWS_COMPLIANCE,
  datadog: [
    c("soc2", "https://www.datadoghq.com/trust/"),
    c("iso27001", "https://www.datadoghq.com/trust/"),
    c("pci-dss", "https://www.datadoghq.com/trust/"),
  ],
  "grafana-cloud": [
    c("soc2", "https://grafana.com/trust/compliance/"),
    c("iso27001", "https://grafana.com/trust/compliance/"),
  ],
  "new-relic": [
    c("soc2", "https://newrelic.com/security"),
    c("iso27001", "https://newrelic.com/security"),
    c("fedramp", "https://newrelic.com/security"),
  ],
  stripe: [
    c("pci-dss", "https://stripe.com/docs/security"),
    c("soc2", "https://stripe.com/docs/security"),
    c("iso27001", "https://stripe.com/docs/security"),
  ],
  auth0: [
    c("soc2", "https://auth0.com/trust-center"),
    c("iso27001", "https://auth0.com/trust-center"),
  ],
  hubspot: [
    c("soc2", "https://legal.hubspot.com/security"),
    c("iso27001", "https://legal.hubspot.com/security"),
  ],
  supabase: [
    c("soc2", "https://supabase.com/security"),
    c("iso27001", "https://supabase.com/security"),
  ],
  vercel: [
    c("soc2", "https://vercel.com/security"),
    c("iso27001", "https://vercel.com/security"),
  ],
  heroku: [
    c("soc2", "https://www.heroku.com/policy/security"),
    c("iso27001", "https://www.heroku.com/policy/security"),
  ],
  databricks: [
    c("soc2", "https://www.databricks.com/trust/compliance"),
    c("iso27001", "https://www.databricks.com/trust/compliance"),
    c("pci-dss", "https://www.databricks.com/trust/compliance"),
  ],
  salesforce: [
    c("soc2", "https://compliance.salesforce.com/"),
    c("iso27001", "https://compliance.salesforce.com/"),
    c("pci-dss", "https://compliance.salesforce.com/"),
  ],
  workday: [
    c("soc2", "https://www.workday.com/en-us/company/trust/overview.html"),
    c("iso27001", "https://www.workday.com/en-us/company/trust/overview.html"),
    c("pci-dss", "https://www.workday.com/en-us/company/trust/overview.html"),
  ],
  "aws-ec2": AWS_COMPLIANCE,
  "google-compute-engine": GCP_COMPLIANCE,
  "azure-virtual-machines": AZURE_COMPLIANCE,
  "ibm-cloud": [
    c("iso27001", "https://www.ibm.com/trust/security-standards"),
    c("soc2", "https://www.ibm.com/trust/security-standards"),
    c("fedramp", "https://www.ibm.com/trust/security-standards"),
  ],
  "oracle-cloud-infrastructure": [
    c("iso27001", "https://www.oracle.com/corporate/contracts/cloud-services/trust/"),
    c("soc2", "https://www.oracle.com/corporate/contracts/cloud-services/trust/"),
    c("pci-dss", "https://www.oracle.com/corporate/contracts/cloud-services/trust/"),
  ],
  digitalocean: [
    c("soc2", "https://www.digitalocean.com/trust/certifications-reports"),
    c("iso27001", "https://www.digitalocean.com/trust/certifications-reports"),
  ],

  // Compliance platforms
  vanta: [
    c("soc2", "https://www.vanta.com/products/frameworks"),
    c("iso27001", "https://www.vanta.com/products/frameworks"),
  ],
  drata: [
    c("soc2", "https://drata.com/grc"),
    c("iso27001", "https://drata.com/grc"),
  ],
  secureframe: [
    c("soc2", "https://secureframe.com/frameworks"),
    c("iso27001", "https://secureframe.com/frameworks"),
  ],
  onetrust: [
    c("soc2", "https://www.onetrust.com/certifications/"),
    c("iso27001", "https://www.onetrust.com/certifications/"),
  ],
  sprinto: [
    c("soc2", "https://sprinto.com/compliance/"),
    c("iso27001", "https://sprinto.com/compliance/"),
  ],
  logicgate: [
    c("soc2", "https://www.logicgate.com/security/"),
    c("iso27001", "https://www.logicgate.com/security/"),
  ],
  hyperproof: [
    c("soc2", "https://hyperproof.io/security/"),
    c("iso27001", "https://hyperproof.io/security/"),
  ],
  auditboard: [
    c("soc2", "https://www.auditboard.com/trust/"),
    c("iso27001", "https://www.auditboard.com/trust/"),
  ],

  // Cyber security
  qualys-vmdr: [
    c("soc2", "https://www.qualys.com/company/trust/"),
    c("iso27001", "https://www.qualys.com/company/trust/"),
    c("fedramp", "https://www.qualys.com/company/trust/"),
  ],
  "tenable-io": [
    c("soc2", "https://www.tenable.com/trust"),
    c("iso27001", "https://www.tenable.com/trust"),
  ],
  snyk: [
    c("soc2", "https://snyk.io/trust/"),
    c("iso27001", "https://snyk.io/trust/"),
  ],
  hostedscan: [
    c("soc2", "https://hostedscan.com/security"),
    c("iso27001", "https://hostedscan.com/security"),
  ],
  "microsoft-defender-for-endpoint": [
    c("iso27001", "https://www.microsoft.com/trust-center/compliance/iso-27001"),
    c("soc2", "https://www.microsoft.com/trust-center/compliance/soc"),
    c("fedramp", "https://www.microsoft.com/trust-center/compliance/fedramp"),
  ],
  "crowdstrike-falcon": [
    c("soc2", "https://www.crowdstrike.com/trust-center/compliance/"),
    c("iso27001", "https://www.crowdstrike.com/trust-center/compliance/"),
    c("fedramp", "https://www.crowdstrike.com/trust-center/compliance/"),
  ],
  "sentinelone-singularity": [
    c("soc2", "https://www.sentinelone.com/legal/security-compliance/"),
    c("iso27001", "https://www.sentinelone.com/legal/security-compliance/"),
  ],
  "sophos-intercept-x-advanced": [
    c("iso27001", "https://www.sophos.com/en-us/legal/sophos-group-security"),
    c("soc2", "https://www.sophos.com/en-us/legal/sophos-group-security"),
    c("cyber-essentials", "https://www.sophos.com/en-us/legal/sophos-group-security"),
  ],
  "trend-micro-apex-one": [
    c("iso27001", "https://www.trendmicro.com/en_us/about/trust-center.html"),
    c("soc2", "https://www.trendmicro.com/en_us/about/trust-center.html"),
  ],
  mimecast: [
    c("iso27001", "https://www.mimecast.com/company/trust-center/"),
    c("soc2", "https://www.mimecast.com/company/trust-center/"),
    c("cyber-essentials", "https://www.mimecast.com/company/trust-center/"),
  ],
  "barracuda-email-security-service": [
    c("soc2", "https://www.barracuda.com/company/legal/trust"),
    c("iso27001", "https://www.barracuda.com/company/legal/trust"),
  ],
  "zscaler-internet-access": [
    c("soc2", "https://www.zscaler.com/trust/compliance-and-certifications"),
    c("iso27001", "https://www.zscaler.com/trust/compliance-and-certifications"),
    c("fedramp", "https://www.zscaler.com/trust/compliance-and-certifications"),
  ],
  "cisco-umbrella": [
    c("soc2", "https://trust.cisco.com/"),
    c("iso27001", "https://trust.cisco.com/"),
    c("fedramp", "https://trust.cisco.com/"),
  ],
};

/** Apply hyperscaler defaults for PaaS slugs not listed explicitly. */
const AWS_SLUG_PREFIXES = ["aws-", "amazon-"];
const AZURE_SLUG_PREFIXES = ["azure-"];
const GCP_SLUG_PREFIXES = [
  "google-",
  "cloud-run",
  "firebase",
  "cloud-sql",
  "firestore",
  "bigtable",
  "cloud-functions",
  "cloud-workflows",
  "apigee",
  "cloud-endpoints",
  "artifact-registry",
];

function matchPrefix(slug: string, prefixes: string[]) {
  return prefixes.some((p) => slug.startsWith(p) || slug === p);
}

function dedupeCertifications(
  certs: SecurityCertification[],
): SecurityCertification[] {
  const seen = new Set<string>();
  return certs.filter((cert) => {
    if (seen.has(cert.id)) return false;
    seen.add(cert.id);
    return true;
  });
}

export function getCertificationsForService(
  slug: string,
  vendor: string,
): SecurityCertification[] {
  if (BY_SLUG[slug]?.length) return dedupeCertifications(BY_SLUG[slug]);

  const vendorLower = vendor.toLowerCase();
  if (vendorLower.includes("aws") || matchPrefix(slug, AWS_SLUG_PREFIXES)) {
    return AWS_COMPLIANCE;
  }
  if (
    vendorLower.includes("azure") ||
    vendorLower.includes("microsoft azure") ||
    matchPrefix(slug, AZURE_SLUG_PREFIXES)
  ) {
    return AZURE_COMPLIANCE;
  }
  if (vendorLower.includes("google cloud") || matchPrefix(slug, GCP_SLUG_PREFIXES)) {
    return GCP_COMPLIANCE;
  }

  return [];
}
