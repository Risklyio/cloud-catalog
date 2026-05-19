import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-200 pt-8">
      <section className="flex flex-col items-center justify-between gap-4 text-center text-sm text-stone-500 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Cloudiscover.io · Read-only catalog</p>
        <nav aria-label="Site" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link
            href="/cloud-definitions"
            className="font-medium text-[#6557ff] transition hover:text-[#f74dc7]"
          >
            Cloud definitions
          </Link>
          <Link
            href="/verified-compliance"
            className="font-medium text-[#6557ff] transition hover:text-[#f74dc7]"
          >
            Verified Compliance
          </Link>
          <Link
            href="/trustpilot-ratings"
            className="font-medium text-[#6557ff] transition hover:text-[#f74dc7]"
          >
            Trustpilot ratings
          </Link>
          <Link
            href="/privacy"
            className="font-medium text-[#6557ff] transition hover:text-[#f74dc7]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-medium text-[#6557ff] transition hover:text-[#f74dc7]"
          >
            Terms of Service
          </Link>
        </nav>
      </section>
    </footer>
  );
}
