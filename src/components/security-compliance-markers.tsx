"use client";

import { useState } from "react";
import type { SecurityCertification } from "@/types/security-certification";

function ShieldIcon({ className }: { className?: string }) {
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-emerald-600 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
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

export function SecurityComplianceMarkers({
  certifications,
}: {
  certifications: SecurityCertification[];
}) {
  const [open, setOpen] = useState(false);

  if (certifications.length === 0) return null;

  return (
    <section
      className="border-t border-stone-100 pt-3"
      aria-label="Documented security certifications"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-lg py-1 text-left transition hover:bg-emerald-50/60"
      >
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
          <ShieldIcon className="h-4 w-4 shrink-0 text-emerald-600" />
          Verified compliance
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {certifications.map((cert) => (
            <li key={cert.id}>
              <a
                href={cert.evidence_url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${cert.label} — view evidence on provider site`}
                className="inline-flex items-center rounded-md border border-emerald-200/80 bg-emerald-50/90 px-2 py-0.5 text-xs font-medium text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-100 hover:text-emerald-950"
              >
                {cert.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
