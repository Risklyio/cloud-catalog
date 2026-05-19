import { hasVerifiedCompliance } from "@/lib/search/filter-services";
import { isTopRatedTrustpilot } from "@/lib/trustpilot-top-rated";
import type { CloudService } from "@/types";

export function formatTrustpilotExportLine(service: CloudService): string {
  const review = service.review;
  if (!review) {
    return "Trustpilot: No reviews found";
  }
  const count = new Intl.NumberFormat("en-US").format(review.review_count);
  const topRated = isTopRatedTrustpilot(review) ? " · Top rated" : "";
  return `Trustpilot: ${review.rating.toFixed(1)} / 5 · ${count} reviews${topRated}`;
}

export function formatComplianceExportLine(service: CloudService): string {
  const certs = service.security_certifications ?? [];
  if (!hasVerifiedCompliance(service)) {
    return "Compliance: Unverified compliance";
  }
  const labels = certs.map((c) => c.label);
  const joined =
    labels.length <= 4
      ? labels.join(", ")
      : `${labels.slice(0, 4).join(", ")} +${labels.length - 4} more`;
  return `Compliance: Verified · ${joined}`;
}
