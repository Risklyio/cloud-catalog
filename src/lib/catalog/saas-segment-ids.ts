/** Curated SaaS solution-area service lists (fallback / groups). */

export const SAAS_IT_IDS = [
  "1",
  "2",
  "3",
  "5",
  "6",
  "7",
  "8",
  "15",
  "208",
  "215",
  "216",
] as const;

export const SAAS_CYBER_IDS = [
  "1101",
  "1102",
  "1103",
  "1104",
  "1105",
  "1106",
  "1107",
  "1108",
  "1401",
  "1402",
  "1403",
  "1404",
  "1405",
  "1406",
  "1407",
  "1408",
  "1409",
] as const;

export const SAAS_COMPLIANCE_IDS = [
  "505",
  "801",
  "802",
  "803",
  "1201",
  "1202",
  "1203",
  "1204",
  "1205",
  "1206",
  "1207",
  "1208",
] as const;

export const SAAS_SOLUTION_IDS = [
  ...SAAS_IT_IDS,
  ...SAAS_CYBER_IDS,
  ...SAAS_COMPLIANCE_IDS,
];
