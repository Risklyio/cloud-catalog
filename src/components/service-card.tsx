"use client";

import { useState, type ReactNode } from "react";
import { SecurityComplianceMarkers } from "@/components/security-compliance-markers";
import { ServiceRating } from "@/components/service-rating";
import { SAAS_DEPARTMENT_LABELS } from "@/lib/departments";
import { resolveServiceLogoUrl } from "@/lib/logo-url";
import { isTopRatedTrustpilot } from "@/lib/trustpilot-top-rated";
import type { CloudService } from "@/types";

const categoryBadge: Record<CloudService["category"], string> = {
  SaaS: "bg-violet-500/15 text-violet-700 ring-violet-500/25",
  PaaS: "bg-sky-500/15 text-sky-700 ring-sky-500/25",
  IaaS: "bg-amber-500/15 text-amber-800 ring-amber-500/25",
  AI: "bg-gradient-to-r from-[#6557ff]/20 to-[#f74dc7]/20 text-fuchsia-800 ring-fuchsia-500/25",
};

function ServiceLogo({
  name,
  logoUrl,
  topRated,
}: {
  name: string;
  logoUrl: string | null;
  topRated: boolean;
}) {
  const [failed, setFailed] = useState(false);

  const avatar = !logoUrl || failed ? (
    <span
      className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#6557ff] to-[#f74dc7] text-lg font-bold text-white"
      aria-hidden
    >
      {name.charAt(0)}
    </span>
  ) : (
    <img
      src={logoUrl}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-full w-full rounded-lg object-contain p-1"
    />
  );

  if (!topRated) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-stone-200">
        {avatar}
      </span>
    );
  }

  return (
    <span
      className="logo-gradient-ring"
      aria-label="Top rated on Trustpilot"
      title="Top rated: TrustScore 3.5+ with 50+ Trustpilot reviews"
    >
      <span className="logo-gradient-ring__inner">{avatar}</span>
    </span>
  );
}

function CardBody({ service }: { service: CloudService }) {
  const logoSrc = resolveServiceLogoUrl(service.website_url, service.logo_url);
  const topRated = isTopRatedTrustpilot(service.review);

  return (
    <>
      <header className="mb-4 flex items-start justify-between gap-3">
        <ServiceLogo name={service.name} logoUrl={logoSrc} topRated={topRated} />
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${categoryBadge[service.category]}`}
        >
          {service.category}
        </span>
      </header>

      <h3 className="text-lg font-semibold text-stone-900 transition-colors group-hover/card:text-[#6557ff]">
        {service.name}
      </h3>
      <p className="mt-1 text-xs text-stone-500">{service.vendor}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-600">
        {service.description}
      </p>

      {service.category === "SaaS" && service.departments.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1">
          {service.departments.slice(0, 3).map((dept) => (
            <li
              key={dept}
              className="rounded-md bg-violet-500/10 px-2 py-0.5 text-xs text-violet-700"
            >
              {SAAS_DEPARTMENT_LABELS[dept]}
            </li>
          ))}
        </ul>
      )}

      <ServiceRating
        review={service.review}
        websiteUrl={service.website_url}
        topRated={topRated}
      />
    </>
  );
}

function CardShell({
  service,
  children,
}: {
  service: CloudService;
  children: ReactNode;
}) {
  const certs = service.security_certifications ?? [];
  const innerClass =
    "relative z-[1] flex flex-1 flex-col rounded-[14px] bg-white shadow-sm transition duration-300 group-hover/card:-translate-y-0.5 group-hover/card:shadow-md";

  const mainContent = service.website_url ? (
    <a
      href={service.website_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${innerClass} p-5 pb-3`}
    >
      {children}
    </a>
  ) : (
    <article className={`${innerClass} p-5 pb-3`}>
      {children}
    </article>
  );

  return (
    <section className="brand-gradient-border brand-gradient-border--hover service-card-glow group/card flex h-full flex-col">
      <div className="flex h-full flex-col rounded-[14px] bg-white">
        {mainContent}
        <div className="px-5 pb-4">
          <SecurityComplianceMarkers certifications={certs} />
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: CloudService }) {
  return (
    <CardShell service={service}>
      <CardBody service={service} />
    </CardShell>
  );
}
