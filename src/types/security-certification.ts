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
