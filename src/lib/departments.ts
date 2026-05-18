/** Business departments used to classify SaaS applications. */
export type SaasDepartment =
  | "marketing"
  | "recruitment"
  | "finance"
  | "site-operations"
  | "health-safety"
  | "training"
  | "hr"
  | "it"
  | "legal"
  | "procurement"
  | "customer-support"
  | "operations"
  | "engineering";

export const SAAS_DEPARTMENTS: {
  id: SaasDepartment;
  label: string;
}[] = [
  { id: "marketing", label: "Marketing" },
  { id: "recruitment", label: "Recruitment" },
  { id: "finance", label: "Finance" },
  { id: "site-operations", label: "Site operations" },
  { id: "health-safety", label: "Health & safety" },
  { id: "training", label: "Training" },
  { id: "hr", label: "HR" },
  { id: "it", label: "IT" },
  { id: "legal", label: "Legal" },
  { id: "procurement", label: "Procurement" },
  { id: "customer-support", label: "Customer support" },
  { id: "operations", label: "Operations" },
  { id: "engineering", label: "Engineering" },
];

export const SAAS_DEPARTMENT_LABELS: Record<SaasDepartment, string> =
  Object.fromEntries(SAAS_DEPARTMENTS.map((d) => [d.id, d.label])) as Record<
    SaasDepartment,
    string
  >;
