import type { SaasSegment } from "@/lib/saas-segments";
import type { CloudService } from "@/types";

export function inferSaasSegment(service: CloudService): SaasSegment | null {
  if (service.category !== "SaaS") return null;
  if (service.saas_segment) return service.saas_segment;

  const departments = service.departments;
  if (departments.includes("cyber-security")) return "cyber-security";
  if (departments.includes("compliance-platforms")) return "compliance";
  if (
    departments.includes("it") ||
    departments.includes("site-operations") ||
    departments.includes("engineering")
  ) {
    return "it";
  }

  return null;
}
