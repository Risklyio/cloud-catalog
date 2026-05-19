"use client";

import Link from "next/link";
import { useState } from "react";
import type { SecurityCertification } from "@/types/security-certification";

function ShieldVerifiedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7.5 3v5.25c0 4.28-3.15 8.28-7.5 9.25-4.35-.97-7.5-4.97-7.5-9.25V6L12 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 12.5l1.75 1.75 3.5-3.75"
      />
    </svg>
  );
}

function ShieldUnverifiedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7.5 3v5.25c0 4.28-3.15 8.28-7.5 9.25-4.35-.97-7.5-4.97-7.5-9.25V6L12 3z"
      />
    </svg>
  );
}

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      } ${className ?? ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const verifiedStyles = {
  buttonHover: "hover:bg-emerald-50/60",
  label: "text-emerald-800",
  icon: "text-emerald-600",
  chevron: "text-emerald-600",
  chip: "border-emerald-200/80 bg-emerald-50/90 text-emerald-900 hover:border-emerald-300 hover:bg-emerald-100 hover:text-emerald-950",
} as const;

const unverifiedStyles = {
  buttonHover: "hover:bg-orange-50/80",
  label: "text-orange-800",
  icon: "text-orange-500",
  chevron: "text-orange-500",
  message: "text-orange-800/90",
} as const;

export function SecurityComplianceMarkers({
  certifications,
}: {
  certifications: SecurityCertification[];
}) {
  const [open, setOpen] = useState(false);
  const hasVerified = certifications.length > 0;
  const styles = hasVerified ? verifiedStyles : unverifiedStyles;

  return (
    <section
      className="border-t border-stone-100 pt-3"
      aria-label={
        hasVerified
          ? "Documented security certifications"
          : "Unverified compliance"
      }
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-lg py-1 text-left transition ${styles.buttonHover}`}
      >
        <span className={`flex items-center gap-1.5 text-xs font-medium ${styles.label}`}>
          {hasVerified ? (
            <>
              <ShieldVerifiedIcon className={`h-4 w-4 shrink-0 ${styles.icon}`} />
              Verified compliance
            </>
          ) : (
            <>
              <ShieldUnverifiedIcon className={`h-4 w-4 shrink-0 ${styles.icon}`} />
              Unverified compliance
            </>
          )}
        </span>
        <ChevronIcon open={open} className={styles.chevron} />
      </button>

      {open && hasVerified && (
        <>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <a
                  href={cert.evidence_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${cert.label} — view evidence on provider site`}
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition ${verifiedStyles.chip}`}
                >
                  {cert.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] leading-snug text-stone-500">
            Public evidence only—not a guarantee of your compliance scope.{" "}
            <Link
              href="/verified-compliance"
              className="font-medium text-[#6557ff] hover:text-[#f74dc7]"
            >
              Learn more
            </Link>
          </p>
        </>
      )}

      {open && !hasVerified && (
        <p className={`mt-2 text-[11px] leading-snug ${unverifiedStyles.message}`}>
          We could not link this service to public compliance documentation in our
          catalog. That does not mean the vendor is non-compliant—only that evidence
          is not verified here.{" "}
          <Link
            href="/verified-compliance"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            Learn more
          </Link>
        </p>
      )}
    </section>
  );
}
