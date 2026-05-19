import "server-only";

import type {
  SecurityCertId,
  SecurityCertification,
} from "@/types/security-certification";

const LABELS: Record<SecurityCertId, string> = {
  iso27001: "ISO 27001",
  "pci-dss": "PCI DSS",
  soc2: "SOC 2",
  "cyber-essentials": "Cyber Essentials",
  fedramp: "FedRAMP",
  "m365-certified": "M365 Certified",
};

function cert(id: SecurityCertId, evidence_url: string): SecurityCertification {
  return { id, label: LABELS[id], evidence_url };
}

const AWS = [
  cert("iso27001", "https://aws.amazon.com/compliance/iso-27001/"),
  cert("soc2", "https://aws.amazon.com/compliance/soc/"),
  cert("pci-dss", "https://aws.amazon.com/compliance/pci-dss/"),
  cert("fedramp", "https://aws.amazon.com/compliance/fedramp/"),
];

const AZURE = [
  cert(
    "iso27001",
    "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-iso-27001",
  ),
  cert(
    "soc2",
    "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-soc-2",
  ),
  cert(
    "pci-dss",
    "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-pci-dss",
  ),
  cert(
    "fedramp",
    "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-fedramp",
  ),
];

const GCP = [
  cert("iso27001", "https://cloud.google.com/security/compliance/iso-27001"),
  cert("soc2", "https://cloud.google.com/security/compliance/soc-2"),
  cert("pci-dss", "https://cloud.google.com/security/compliance/pci-dss"),
  cert("fedramp", "https://cloud.google.com/security/compliance/fedramp"),
];

const MICROSOFT_TRUST = [
  cert("iso27001", "https://www.microsoft.com/trust-center/compliance/iso-27001"),
  cert("soc2", "https://www.microsoft.com/trust-center/compliance/soc"),
  cert("fedramp", "https://www.microsoft.com/trust-center/compliance/fedramp"),
];

type TrustProfile = {
  vendor: RegExp;
  certifications: SecurityCertification[];
};

/**
 * Vendor-first trust profiles: any catalog service from these vendors
 * inherits the same public compliance evidence links.
 */
const TRUST_PROFILES: TrustProfile[] = [
  { vendor: /qualys/i, certifications: [
    cert("soc2", "https://www.qualys.com/company/trust/"),
    cert("iso27001", "https://www.qualys.com/company/trust/"),
    cert("fedramp", "https://www.qualys.com/company/trust/"),
  ]},
  { vendor: /tenable/i, certifications: [
    cert("soc2", "https://www.tenable.com/trust"),
    cert("iso27001", "https://www.tenable.com/trust"),
  ]},
  { vendor: /rapid7/i, certifications: [
    cert("soc2", "https://www.rapid7.com/trust/"),
    cert("iso27001", "https://www.rapid7.com/trust/"),
  ]},
  { vendor: /crowdstrike/i, certifications: [
    cert("soc2", "https://www.crowdstrike.com/trust-center/compliance/"),
    cert("iso27001", "https://www.crowdstrike.com/trust-center/compliance/"),
    cert("fedramp", "https://www.crowdstrike.com/trust-center/compliance/"),
  ]},
  { vendor: /sentinelone/i, certifications: [
    cert("soc2", "https://www.sentinelone.com/legal/security-compliance/"),
    cert("iso27001", "https://www.sentinelone.com/legal/security-compliance/"),
  ]},
  { vendor: /sophos/i, certifications: [
    cert("iso27001", "https://www.sophos.com/en-us/legal/sophos-group-security"),
    cert("soc2", "https://www.sophos.com/en-us/legal/sophos-group-security"),
    cert("cyber-essentials", "https://www.sophos.com/en-us/legal/sophos-group-security"),
  ]},
  { vendor: /trend micro/i, certifications: [
    cert("iso27001", "https://www.trendmicro.com/en_us/about/trust-center.html"),
    cert("soc2", "https://www.trendmicro.com/en_us/about/trust-center.html"),
  ]},
  { vendor: /mimecast/i, certifications: [
    cert("iso27001", "https://www.mimecast.com/company/trust-center/"),
    cert("soc2", "https://www.mimecast.com/company/trust-center/"),
    cert("cyber-essentials", "https://www.mimecast.com/company/trust-center/"),
  ]},
  { vendor: /barracuda/i, certifications: [
    cert("soc2", "https://www.barracuda.com/company/legal/trust"),
    cert("iso27001", "https://www.barracuda.com/company/legal/trust"),
  ]},
  { vendor: /zscaler/i, certifications: [
    cert("soc2", "https://www.zscaler.com/trust/compliance-and-certifications"),
    cert("iso27001", "https://www.zscaler.com/trust/compliance-and-certifications"),
    cert("fedramp", "https://www.zscaler.com/trust/compliance-and-certifications"),
  ]},
  { vendor: /cisco/i, certifications: [
    cert("soc2", "https://trust.cisco.com/"),
    cert("iso27001", "https://trust.cisco.com/"),
    cert("fedramp", "https://trust.cisco.com/"),
  ]},
  { vendor: /snyk/i, certifications: [
    cert("soc2", "https://snyk.io/trust/"),
    cert("iso27001", "https://snyk.io/trust/"),
  ]},
  { vendor: /hostedscan/i, certifications: [
    cert("soc2", "https://hostedscan.com/security"),
    cert("iso27001", "https://hostedscan.com/security"),
  ]},
  { vendor: /checkmarx/i, certifications: [
    cert("soc2", "https://www.checkmarx.com/company/trust/"),
    cert("iso27001", "https://www.checkmarx.com/company/trust/"),
  ]},
  { vendor: /^github$/i, certifications: [
    cert("soc2", "https://github.com/security"),
    cert("iso27001", "https://github.com/security"),
  ]},
  { vendor: /vanta/i, certifications: [
    cert("soc2", "https://www.vanta.com/products/frameworks"),
    cert("iso27001", "https://www.vanta.com/products/frameworks"),
  ]},
  { vendor: /drata/i, certifications: [
    cert("soc2", "https://drata.com/grc"),
    cert("iso27001", "https://drata.com/grc"),
  ]},
  { vendor: /secureframe/i, certifications: [
    cert("soc2", "https://secureframe.com/frameworks"),
    cert("iso27001", "https://secureframe.com/frameworks"),
  ]},
  { vendor: /onetrust/i, certifications: [
    cert("soc2", "https://www.onetrust.com/certifications/"),
    cert("iso27001", "https://www.onetrust.com/certifications/"),
  ]},
  { vendor: /sprinto/i, certifications: [
    cert("soc2", "https://sprinto.com/compliance/"),
    cert("iso27001", "https://sprinto.com/compliance/"),
  ]},
  { vendor: /logicgate/i, certifications: [
    cert("soc2", "https://www.logicgate.com/security/"),
    cert("iso27001", "https://www.logicgate.com/security/"),
  ]},
  { vendor: /hyperproof/i, certifications: [
    cert("soc2", "https://hyperproof.io/security/"),
    cert("iso27001", "https://hyperproof.io/security/"),
  ]},
  { vendor: /auditboard/i, certifications: [
    cert("soc2", "https://www.auditboard.com/trust/"),
    cert("iso27001", "https://www.auditboard.com/trust/"),
  ]},
  { vendor: /servicenow/i, certifications: [
    cert("soc2", "https://www.servicenow.com/company/trust/compliance.html"),
    cert("iso27001", "https://www.servicenow.com/company/trust/compliance.html"),
  ]},
  { vendor: /datadog/i, certifications: [
    cert("soc2", "https://www.datadoghq.com/trust/"),
    cert("iso27001", "https://www.datadoghq.com/trust/"),
    cert("pci-dss", "https://www.datadoghq.com/trust/"),
  ]},
  { vendor: /grafana labs/i, certifications: [
    cert("soc2", "https://grafana.com/trust/compliance/"),
    cert("iso27001", "https://grafana.com/trust/compliance/"),
  ]},
  { vendor: /new relic/i, certifications: [
    cert("soc2", "https://newrelic.com/security"),
    cert("iso27001", "https://newrelic.com/security"),
    cert("fedramp", "https://newrelic.com/security"),
  ]},
  { vendor: /stripe/i, certifications: [
    cert("pci-dss", "https://stripe.com/docs/security"),
    cert("soc2", "https://stripe.com/docs/security"),
    cert("iso27001", "https://stripe.com/docs/security"),
  ]},
  { vendor: /snowflake/i, certifications: [
    cert("soc2", "https://www.snowflake.com/en/legal/compliance/soc-2/"),
    cert("iso27001", "https://www.snowflake.com/en/legal/compliance/iso/"),
    cert("pci-dss", "https://www.snowflake.com/en/legal/compliance/pci-dss/"),
  ]},
  { vendor: /databricks/i, certifications: [
    cert("soc2", "https://www.databricks.com/trust/compliance"),
    cert("iso27001", "https://www.databricks.com/trust/compliance"),
    cert("pci-dss", "https://www.databricks.com/trust/compliance"),
  ]},
  { vendor: /salesforce/i, certifications: [
    cert("soc2", "https://compliance.salesforce.com/"),
    cert("iso27001", "https://compliance.salesforce.com/"),
    cert("pci-dss", "https://compliance.salesforce.com/"),
  ]},
  { vendor: /workday/i, certifications: [
    cert("soc2", "https://www.workday.com/en-us/company/trust/overview.html"),
    cert("iso27001", "https://www.workday.com/en-us/company/trust/overview.html"),
    cert("pci-dss", "https://www.workday.com/en-us/company/trust/overview.html"),
  ]},
  { vendor: /hubspot/i, certifications: [
    cert("soc2", "https://legal.hubspot.com/security"),
    cert("iso27001", "https://legal.hubspot.com/security"),
  ]},
  { vendor: /supabase/i, certifications: [
    cert("soc2", "https://supabase.com/security"),
    cert("iso27001", "https://supabase.com/security"),
  ]},
  { vendor: /vercel/i, certifications: [
    cert("soc2", "https://vercel.com/security"),
    cert("iso27001", "https://vercel.com/security"),
  ]},
  { vendor: /okta/i, certifications: [
    cert("soc2", "https://www.okta.com/trust/"),
    cert("iso27001", "https://www.okta.com/trust/"),
  ]},
  { vendor: /ibm/i, certifications: [
    cert("iso27001", "https://www.ibm.com/trust/security-standards"),
    cert("soc2", "https://www.ibm.com/trust/security-standards"),
    cert("fedramp", "https://www.ibm.com/trust/security-standards"),
  ]},
  { vendor: /oracle/i, certifications: [
    cert("iso27001", "https://www.oracle.com/corporate/contracts/cloud-services/trust/"),
    cert("soc2", "https://www.oracle.com/corporate/contracts/cloud-services/trust/"),
    cert("pci-dss", "https://www.oracle.com/corporate/contracts/cloud-services/trust/"),
  ]},
  { vendor: /digitalocean/i, certifications: [
    cert("soc2", "https://www.digitalocean.com/trust/certifications-reports"),
    cert("iso27001", "https://www.digitalocean.com/trust/certifications-reports"),
  ]},
  { vendor: /^aws$/i, certifications: AWS },
  { vendor: /microsoft azure/i, certifications: AZURE },
  { vendor: /^microsoft$/i, certifications: MICROSOFT_TRUST },
  { vendor: /google cloud/i, certifications: GCP },
];

const SLUG_PREFIX_PROFILES: { slug: RegExp; certifications: SecurityCertification[] }[] = [
  { slug: /^(aws-|amazon-)/, certifications: AWS },
  { slug: /^azure-/, certifications: AZURE },
  {
    slug: /^(google-|cloud-run|firebase|cloud-sql|firestore|bigtable|cloud-functions|cloud-workflows|apigee|cloud-endpoints|artifact-registry)/,
    certifications: GCP,
  },
];

/** Rare slug-specific overrides when vendor string is ambiguous. */
const SLUG_OVERRIDES: Record<string, SecurityCertification[]> = {
  bigquery: GCP,
  auth0: [
    cert("soc2", "https://auth0.com/trust-center"),
    cert("iso27001", "https://auth0.com/trust-center"),
  ],
  heroku: [
    cert("soc2", "https://www.heroku.com/policy/security"),
    cert("iso27001", "https://www.heroku.com/policy/security"),
  ],
};

function dedupe(certs: SecurityCertification[]): SecurityCertification[] {
  const seen = new Set<SecurityCertId>();
  return certs.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function resolveSecurityCertifications(
  slug: string,
  vendor: string,
): SecurityCertification[] {
  const slugOverride = SLUG_OVERRIDES[slug];
  if (slugOverride?.length) return dedupe(slugOverride);

  for (const profile of TRUST_PROFILES) {
    if (profile.vendor.test(vendor)) {
      return dedupe(profile.certifications);
    }
  }

  for (const profile of SLUG_PREFIX_PROFILES) {
    if (profile.slug.test(slug)) {
      return dedupe(profile.certifications);
    }
  }

  return [];
}
