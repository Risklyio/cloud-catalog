import type { Metadata } from "next";
import Link from "next/link";
import { LegalProse, LegalSection } from "@/components/legal-prose";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Service — Cloudiscover.io",
  description:
    "Terms governing use of the Cloudiscover.io cloud service catalog, including third-party links and disclaimers.",
};

const LAST_UPDATED = "19 May 2026";

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-medium text-[#6557ff]">Legal</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-stone-600">
          These terms govern your use of Cloudiscover.io. By accessing or using this website,
          you agree to them. If you do not agree, please do not use the site.
        </p>
        <p className="mt-2 text-sm text-stone-500">Last updated: {LAST_UPDATED}</p>
      </header>

      <LegalProse>
        <nav
          aria-label="Contents"
          className="mb-10 rounded-xl border border-stone-100 bg-stone-50/80 p-4 text-sm"
        >
          <p className="font-medium text-stone-800">On this page</p>
          <ol className="mt-2 list-inside list-decimal space-y-1 text-[#6557ff]">
            <li>
              <a href="#about" className="hover:text-[#f74dc7]">
                About Cloudiscover.io
              </a>
            </li>
            <li>
              <a href="#third-party-links" className="hover:text-[#f74dc7]">
                Third-party links
              </a>
            </li>
            <li>
              <a href="#no-endorsement" className="hover:text-[#f74dc7]">
                No endorsement
              </a>
            </li>
            <li>
              <a href="#information-only" className="hover:text-[#f74dc7]">
                Information only
              </a>
            </li>
            <li>
              <a href="#accuracy" className="hover:text-[#f74dc7]">
                Accuracy of content
              </a>
            </li>
            <li>
              <a href="#ip" className="hover:text-[#f74dc7]">
                Intellectual property
              </a>
            </li>
            <li>
              <a href="#liability" className="hover:text-[#f74dc7]">
                Limitation of liability
              </a>
            </li>
            <li>
              <a href="#acceptable-use" className="hover:text-[#f74dc7]">
                Acceptable use
              </a>
            </li>
            <li>
              <a href="#changes" className="hover:text-[#f74dc7]">
                Changes to these terms
              </a>
            </li>
            <li>
              <a href="#law" className="hover:text-[#f74dc7]">
                Governing law
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#f74dc7]">
                Contact
              </a>
            </li>
          </ol>
        </nav>

        <div className="space-y-10">
          <LegalSection id="about" title="1. About Cloudiscover.io">
            <p>
              Cloudiscover.io is a <strong>read-only</strong>, informational website that helps
              visitors discover and compare cloud services (including SaaS, PaaS, IaaS, and AI
              offerings). We do not sell, provision, or operate third-party cloud products. We
              do not require you to create an account to browse the catalog.
            </p>
          </LegalSection>

          <LegalSection id="third-party-links" title="2. Third-party links">
            <p>
              This website contains links to third-party websites, including vendor homepages
              and product pages. These links are provided so you can{" "}
              <strong>find out more information</strong> about a cloud service that interests you.
            </p>
            <p>
              <strong>Third-party sites are not controlled by Cloudiscover.io.</strong> When you
              leave our website by following a link, you are subject to that third party&apos;s
              own terms, privacy policy, and practices. We are not responsible for:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>The availability, security, or content of any linked website;</li>
              <li>Products, pricing, or services offered by third parties;</li>
              <li>Any transaction, agreement, or relationship you enter into with a third party;</li>
              <li>Loss or damage arising from your use of linked sites.</li>
            </ul>
            <p>
              You access third-party links <strong>at your own risk</strong>. We encourage you
              to read the applicable policies of any site you visit before sharing personal data
              or making purchasing decisions.
            </p>
          </LegalSection>

          <LegalSection id="no-endorsement" title="3. No endorsement">
            <p>
              Listing a cloud service in our catalog does <strong>not</strong> constitute an
              endorsement, recommendation, partnership, or sponsorship by Cloudiscover.io. The
              presence of a name, logo, or description does not mean we vouch for a vendor&apos;s
              products, security, compliance, or fitness for your purposes.
            </p>
            <p>
              Any decision to adopt, purchase, or rely on a third-party service is solely your
              responsibility. You should conduct your own due diligence.
            </p>
          </LegalSection>

          <LegalSection id="information-only" title="4. Information only — not professional advice">
            <p>
              Content on Cloudiscover.io is for <strong>general information</strong> only. It
              does not constitute legal, financial, technical, or procurement advice. You should
              obtain independent professional advice before making business or technology decisions.
            </p>
          </LegalSection>

          <LegalSection id="accuracy" title="5. Accuracy of content">
            <p>
              We aim to keep catalog information accurate and up to date, but we do not
              guarantee that descriptions, categories, tags, logos, or links are complete,
              current, or error-free. Third-party offerings change frequently.{" "}
              <strong>You should verify all material details</strong> directly with the vendor
              before relying on them.
            </p>
          </LegalSection>

          <LegalSection id="ip" title="6. Intellectual property">
            <p>
              The Cloudiscover.io name, branding, layout, and original text on this site are
              protected by applicable intellectual property laws. Vendor names, logos, and
              trademarks belong to their respective owners and are used here for identification
              and informational purposes only.
            </p>
            <p>
              You may not copy, scrape, or republish substantial portions of this site for
              commercial purposes without our prior written permission, except as permitted by law.
            </p>
          </LegalSection>

          <LegalSection id="liability" title="7. Limitation of liability">
            <p>
              To the fullest extent permitted by law, Cloudiscover.io and its operators shall not
              be liable for any indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits, data, or goodwill, arising from your use of—or inability to
              use—this website or any linked third-party site.
            </p>
            <p>
              Nothing in these terms excludes or limits liability that cannot be excluded or
              limited under applicable law (including liability for death or personal injury
              caused by negligence, or fraud).
            </p>
          </LegalSection>

          <LegalSection id="acceptable-use" title="8. Acceptable use">
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the site in any unlawful manner or for unlawful purposes;</li>
              <li>Attempt to disrupt, overload, or compromise the security of the site;</li>
              <li>Automated scraping or harvesting that unreasonably burdens our infrastructure;</li>
              <li>Misrepresent your affiliation with Cloudiscover.io or any listed vendor.</li>
            </ul>
          </LegalSection>

          <LegalSection id="changes" title="9. Changes to these terms">
            <p>
              We may update these Terms of Service from time to time. The &quot;Last updated&quot;
              date at the top will change when we do. Continued use of the site after changes
              are posted constitutes acceptance of the revised terms, where permitted by law.
            </p>
          </LegalSection>

          <LegalSection id="law" title="10. Governing law">
            <p>
              These terms are governed by the laws of England and Wales, without regard to
              conflict-of-law principles. Courts in England and Wales shall have exclusive
              jurisdiction, subject to any mandatory consumer protections in your country of
              residence.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="11. Contact">
            <p>Questions about these terms:</p>
            <p>
              <a
                href="mailto:legal@cloudiscover.io"
                className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
              >
                legal@cloudiscover.io
              </a>
            </p>
            <p className="pt-4">
              See also our{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="pt-2">
              <Link href="/" className="font-medium text-[#6557ff] hover:text-[#f74dc7]">
                ← Back to catalog
              </Link>
            </p>
          </LegalSection>
        </div>
      </LegalProse>

      <SiteFooter />
    </main>
  );
}
