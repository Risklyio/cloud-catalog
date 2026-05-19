import type { Metadata } from "next";
import Link from "next/link";
import { LegalProse, LegalSection } from "@/components/legal-prose";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Cloudiscover.io",
  description:
    "How Cloudiscover.io handles personal data in line with UK GDPR and the EU General Data Protection Regulation.",
};

const LAST_UPDATED = "19 May 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-medium text-[#6557ff]">Legal</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-stone-600">
          This policy explains how Cloudiscover.io processes personal data when you use our
          read-only cloud service catalog. It is written to align with the UK GDPR and the EU
          General Data Protection Regulation (GDPR).
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
              <a href="#controller" className="hover:text-[#f74dc7]">
                Who we are
              </a>
            </li>
            <li>
              <a href="#data-we-collect" className="hover:text-[#f74dc7]">
                Data we collect
              </a>
            </li>
            <li>
              <a href="#purposes" className="hover:text-[#f74dc7]">
                Purposes and legal bases
              </a>
            </li>
            <li>
              <a href="#cookies" className="hover:text-[#f74dc7]">
                Cookies and similar technologies
              </a>
            </li>
            <li>
              <a href="#sharing" className="hover:text-[#f74dc7]">
                Sharing and processors
              </a>
            </li>
            <li>
              <a href="#transfers" className="hover:text-[#f74dc7]">
                International transfers
              </a>
            </li>
            <li>
              <a href="#retention" className="hover:text-[#f74dc7]">
                Retention
              </a>
            </li>
            <li>
              <a href="#rights" className="hover:text-[#f74dc7]">
                Your rights
              </a>
            </li>
            <li>
              <a href="#children" className="hover:text-[#f74dc7]">
                Children
              </a>
            </li>
            <li>
              <a href="#changes" className="hover:text-[#f74dc7]">
                Changes
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
          <LegalSection id="controller" title="1. Who we are (data controller)">
            <p>
              <strong>Cloudiscover.io</strong> operates this website as an informational,
              read-only catalog of cloud services. For the purposes of data protection law, we act
              as the <strong>data controller</strong> for personal data described in this policy.
            </p>
            <p>
              Contact for privacy matters:{" "}
              <a
                href="mailto:privacy@cloudiscover.io"
                className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
              >
                privacy@cloudiscover.io
              </a>
            </p>
          </LegalSection>

          <LegalSection id="data-we-collect" title="2. Data we collect">
            <p>
              Cloudiscover.io is designed as a <strong>read-only</strong> site. We do not offer
              user accounts, sign-in, checkout, or forms that ask you to submit personal
              information.
            </p>
            <p>We may nevertheless process limited data, including:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Technical and usage data</strong> — such as IP address, browser type,
                device information, referring URL, and pages viewed. This may be collected
                automatically by our hosting and infrastructure providers to deliver the site,
                maintain security, and diagnose errors.
              </li>
              <li>
                <strong>Local storage on your device</strong> — for example, preferences held in
                your browser session while you use search and filters. This data stays on your
                device unless a feature explicitly sends it to our servers (we do not require
                registration to browse the catalog).
              </li>
              <li>
                <strong>Communications</strong> — if you email us, we process the content of your
                message and your email address to respond.
              </li>
            </ul>
            <p>
              When you follow links to third-party vendors (e.g. product websites), their privacy
              policies apply. We do not control those sites.
            </p>
          </LegalSection>

          <LegalSection id="purposes" title="3. Purposes and legal bases (GDPR Article 6)">
            <p>We process personal data only where we have a lawful basis:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Legitimate interests</strong> (Art. 6(1)(f)) — operating, securing, and
                improving the catalog; understanding aggregated use of the site; preventing abuse.
                Our interests are balanced against your rights, given the limited, non-intrusive
                nature of processing on a public information site.
              </li>
              <li>
                <strong>Contract</strong> (Art. 6(1)(b)) — where processing is necessary to
                provide the service you request (e.g. delivering page content).
              </li>
              <li>
                <strong>Legal obligation</strong> (Art. 6(1)(c)) — where we must comply with law.
              </li>
              <li>
                <strong>Consent</strong> (Art. 6(1)(a)) — only where we use non-essential cookies
                or similar technologies that require consent under ePrivacy rules. See section 4.
              </li>
            </ul>
            <p>We do not use your data for automated decision-making or profiling that produces legal or similarly significant effects.</p>
          </LegalSection>

          <LegalSection id="cookies" title="4. Cookies and similar technologies">
            <p>
              <strong>Strictly necessary</strong> technologies may be used to run the site (e.g.
              security, load balancing). These do not require consent under UK/EU rules.
            </p>
            <p>
              <strong>Non-essential</strong> cookies (e.g. analytics or marketing) are not required
              to browse the catalog. If we introduce them in future, we will ask for your consent
              before they are set, and you may withdraw consent at any time.
            </p>
            <p>
              You can control cookies through your browser settings. Blocking cookies may affect
              how some features work.
            </p>
          </LegalSection>

          <LegalSection id="sharing" title="5. Sharing and processors">
            <p>We do not sell your personal data. We may share data with:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Hosting and deployment</strong> — e.g. Vercel (delivery, logs, security).
              </li>
              <li>
                <strong>Data backend</strong> — e.g. Supabase (public catalog content served via
                read-only access; no account required to view the site).
              </li>
              <li>
                <strong>Content delivery</strong> — e.g. favicon or logo requests to third-party
                hosts when displaying vendor branding.
              </li>
              <li>
                <strong>Professional advisers or authorities</strong> — where required by law or to
                protect rights and safety.
              </li>
            </ul>
            <p>
              These providers act as <strong>processors</strong> under GDPR where they process
              data on our instructions. We use agreements that require appropriate safeguards.
            </p>
          </LegalSection>

          <LegalSection id="transfers" title="6. International transfers">
            <p>
              Some providers may process data outside the UK or European Economic Area (EEA). Where
              this occurs, we rely on appropriate safeguards such as the UK International Data
              Transfer Agreement, EU Standard Contractual Clauses, or an adequacy decision, as
              applicable.
            </p>
          </LegalSection>

          <LegalSection id="retention" title="7. Retention">
            <p>
              We keep personal data only as long as needed for the purposes above, including legal,
              accounting, or reporting requirements. Server logs are typically retained for a limited
              period defined by our hosting provider. Emails you send us are kept only as long as
              needed to handle your enquiry and any follow-up obligations.
            </p>
          </LegalSection>

          <LegalSection id="rights" title="8. Your rights">
            <p>
              If you are in the UK or EEA, you have rights under GDPR, including:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong>Access</strong> — request a copy of your personal data.</li>
              <li><strong>Rectification</strong> — correct inaccurate data.</li>
              <li><strong>Erasure</strong> — request deletion in certain circumstances.</li>
              <li><strong>Restriction</strong> — limit how we use your data in certain cases.</li>
              <li><strong>Portability</strong> — receive data you provided in a structured format, where applicable.</li>
              <li><strong>Object</strong> — object to processing based on legitimate interests.</li>
              <li><strong>Withdraw consent</strong> — where processing is based on consent.</li>
            </ul>
            <p>
              To exercise these rights, contact{" "}
              <a
                href="mailto:privacy@cloudiscover.io"
                className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
              >
                privacy@cloudiscover.io
              </a>
              . We will respond within <strong>one month</strong>, as required by GDPR (extendable
              by two months for complex requests).
            </p>
            <p>
              You also have the right to lodge a complaint with a supervisory authority, for example:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                UK: Information Commissioner&apos;s Office (ICO) —{" "}
                <a
                  href="https://ico.org.uk"
                  className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ico.org.uk
                </a>
              </li>
              <li>
                EU: your local data protection authority in the country where you live or work.
              </li>
            </ul>
          </LegalSection>

          <LegalSection id="children" title="9. Children">
            <p>
              The catalog is intended for business and professional use. We do not knowingly
              collect personal data from children under 16. If you believe a child has provided us
              personal data, please contact us and we will delete it where required.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="10. Changes to this policy">
            <p>
              We may update this policy from time to time. The &quot;Last updated&quot; date at the
              top will change when we do. Material changes may be highlighted on the site where
              appropriate.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="11. Contact">
            <p>
              Questions about this policy or our use of personal data:
            </p>
            <p>
              <a
                href="mailto:privacy@cloudiscover.io"
                className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
              >
                privacy@cloudiscover.io
              </a>
            </p>
            <p className="pt-4">
              <Link
                href="/"
                className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
              >
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
