/** Extract hostname for Trustpilot review URLs (client-safe). */
export function trustpilotDomainFromWebsite(
  websiteUrl: string | null | undefined,
): string | null {
  if (!websiteUrl) return null;
  try {
    const host = new URL(websiteUrl).hostname.toLowerCase();
    return host.startsWith("www.") ? host.slice(4) : host;
  } catch {
    return null;
  }
}

export function trustpilotReviewUrl(domain: string): string {
  return `https://www.trustpilot.com/review/${domain.replace(/^www\./, "")}`;
}
