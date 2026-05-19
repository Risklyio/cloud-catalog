/** Primary solution area for SaaS catalog filtering and curated groups. */
export type SaasSegment = "it" | "cyber-security" | "compliance";

export const SAAS_SEGMENTS: { id: SaasSegment; label: string }[] = [
  { id: "it", label: "IT" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "compliance", label: "Compliance" },
];

export const SAAS_SEGMENT_LABELS: Record<SaasSegment, string> = Object.fromEntries(
  SAAS_SEGMENTS.map((s) => [s.id, s.label]),
) as Record<SaasSegment, string>;
