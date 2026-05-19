/** IaaS offerings grouped by cloud provider for platform navigation. */

export const IAAS_AWS_IDS = ["11"] as const;

export const IAAS_AZURE_IDS = ["13"] as const;

export const IAAS_GCP_IDS = ["12"] as const;

export const IAAS_INDEPENDENT_IDS = [
  "1001",
  "1002",
  "1003",
  "1004",
  "1005",
  "1006",
  "1007",
] as const;

export const IAAS_ALL_IDS = [
  ...IAAS_AWS_IDS,
  ...IAAS_AZURE_IDS,
  ...IAAS_GCP_IDS,
  ...IAAS_INDEPENDENT_IDS,
] as const;
