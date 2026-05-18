"use client";

import Image from "next/image";
import { SAAS_DEPARTMENT_LABELS } from "@/lib/departments";
import type { CloudService } from "@/types";

const categoryBadge: Record<CloudService["category"], string> = {
  SaaS: "bg-violet-500/15 text-violet-700 ring-violet-500/25 dark:text-violet-300",
  PaaS: "bg-sky-500/15 text-sky-700 ring-sky-500/25 dark:text-sky-300",
  IaaS: "bg-amber-500/15 text-amber-800 ring-amber-500/25 dark:text-amber-300",
};

function ServiceLogo({ name, logoUrl }: { name: string; logoUrl: string | null }) {
  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 rounded-xl bg-white object-contain p-1 ring-1 ring-slate-200/80 dark:bg-slate-800 dark:ring-slate-700"
        unoptimized
      />
    );
  }

  return (
    <span
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-lg font-bold text-white"
      aria-hidden
    >
      {name.charAt(0)}
    </span>
  );
}

export function ServiceCard({ service }: { service: CloudService }) {
  const content = (
    <>
      <div className="mb-4 flex items-start justify-between gap-3">
        <ServiceLogo name={service.name} logoUrl={service.logo_url} />
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${categoryBadge[service.category]}`}
        >
          {service.category}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-700 dark:text-slate-100 dark:group-hover:text-sky-400">
        {service.name}
      </h3>
      <p className="mt-1 text-xs text-slate-500">{service.vendor}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {service.description}
      </p>

      {service.category === "SaaS" && service.departments.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1">
          {service.departments.slice(0, 3).map((dept) => (
            <li
              key={dept}
              className="rounded-md bg-violet-500/10 px-2 py-0.5 text-xs text-violet-700 dark:text-violet-300"
            >
              {SAAS_DEPARTMENT_LABELS[dept]}
            </li>
          ))}
        </ul>
      )}

      <section className="mt-4 flex flex-wrap gap-1.5">
        {service.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
          >
            {tag}
          </span>
        ))}
        {service.tags.length > 4 && (
          <span className="px-1 text-xs text-slate-400">+{service.tags.length - 4}</span>
        )}
      </section>
    </>
  );

  const className =
    "group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-sky-800";

  if (service.website_url) {
    return (
      <a
        href={service.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}
