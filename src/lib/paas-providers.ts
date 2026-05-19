/** Hyperscaler backing a PaaS offering (filter + curated sub-groups). */
export type PaasProvider = "aws" | "azure" | "gcp";

export const PAAS_PROVIDERS: { id: PaasProvider; label: string }[] = [
  { id: "aws", label: "AWS" },
  { id: "azure", label: "Azure" },
  { id: "gcp", label: "Google Cloud" },
];

export const PAAS_PROVIDER_LABELS: Record<PaasProvider, string> = Object.fromEntries(
  PAAS_PROVIDERS.map((p) => [p.id, p.label]),
) as Record<PaasProvider, string>;
