/** Clearbit Logo API is deprecated; resolve favicons from the service website instead. */
export function resolveServiceLogoUrl(
  websiteUrl: string | null,
  logoUrl: string | null,
): string | null {
  if (logoUrl && !logoUrl.includes("logo.clearbit.com")) {
    return logoUrl;
  }

  if (!websiteUrl) return null;

  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, "");
    if (!hostname) return null;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
  } catch {
    return null;
  }
}
