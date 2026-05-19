/** Security frameworks shown when publicly documented on the provider site. */
export type SecurityCertId =
  | "iso27001"
  | "pci-dss"
  | "soc2"
  | "cyber-essentials"
  | "fedramp";

export interface SecurityCertification {
  id: SecurityCertId;
  label: string;
  evidence_url: string;
}

export const SECURITY_CERT_LABELS: Record<SecurityCertId, string> = {
  iso27001: "ISO 27001",
  "pci-dss": "PCI DSS",
  soc2: "SOC 2",
  "cyber-essentials": "Cyber Essentials",
  fedramp: "FedRAMP",
};

export function createCertification(
  id: SecurityCertId,
  evidence_url: string,
): SecurityCertification {
  return {
    id,
    label: SECURITY_CERT_LABELS[id],
    evidence_url,
  };
}
