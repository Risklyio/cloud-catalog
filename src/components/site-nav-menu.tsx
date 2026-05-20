"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId } from "react";

export type NavLink = { href: string; label: string };

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Catalog",
    links: [{ href: "/", label: "Browse all services" }],
  },
  {
    title: "Reference",
    links: [
      { href: "/cloud-definitions", label: "How cloud services are defined" },
      { href: "/verified-compliance", label: "Verified Compliance" },
      { href: "/trustpilot-ratings", label: "Trustpilot ratings" },
    ],
  },
  {
    title: "Providers",
    links: [
      {
        href: "/for-cloud-service-providers",
        label: "For cloud service providers",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

type SiteNavMenuButtonProps = {
  open: boolean;
  onToggle: () => void;
  controlsId: string;
};

export function SiteNavMenuButton({
  open,
  onToggle,
  controlsId,
}: SiteNavMenuButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-[color,background-color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6557ff]/40 focus-visible:ring-offset-2 ${
        open
          ? "rounded-xl border-[#6557ff]/40 bg-gradient-to-br from-[#6557ff]/12 to-[#f74dc7]/10 text-[#6557ff] shadow-inner"
          : "rounded-full border-stone-200/90 bg-stone-50/90 text-stone-700 hover:border-[#6557ff]/30 hover:bg-white hover:text-[#6557ff]"
      }`}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-haspopup="true"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onToggle}
    >
      <span className="sr-only">{open ? "Close" : "Menu"}</span>
      <span className="relative block h-4 w-4" aria-hidden>
        <span
          className={`absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 rounded-full bg-current transition-[transform,opacity] duration-300 ease-in-out ${
            open
              ? "-translate-y-1/2 rotate-45"
              : "-translate-y-[5px]"
          }`}
        />
        <span
          className={`absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 rounded-full bg-current transition-[transform,opacity] duration-300 ease-in-out ${
            open
              ? "-translate-y-1/2 scale-x-0 opacity-0"
              : "-translate-y-1/2 opacity-100"
          }`}
        />
        <span
          className={`absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 rounded-full bg-current transition-[transform,opacity] duration-300 ease-in-out ${
            open
              ? "-translate-y-1/2 -rotate-45"
              : "-translate-x-1/2 translate-y-[5px]"
          }`}
        />
      </span>
    </button>
  );
}

type SiteNavMenuPanelProps = {
  open: boolean;
  onClose: () => void;
  panelId: string;
};

export function SiteNavMenuPanel({ open, onClose, panelId }: SiteNavMenuPanelProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <nav
      id={panelId}
      aria-label="Site"
      className="rounded-b-[calc(1rem-2px)] border-t border-stone-200/80 bg-white/95 px-4 py-2 backdrop-blur-md sm:px-6 sm:py-3"
    >
      <div className="flex flex-col divide-y divide-stone-200/90 lg:grid lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {NAV_GROUPS.map((group, index) => (
          <section
            key={group.title}
            aria-labelledby={`nav-${group.title}`}
            className={`py-5 sm:py-6 ${
              index > 0 ? "lg:pl-6" : ""
            } ${index < NAV_GROUPS.length - 1 ? "lg:pr-6" : ""}`}
          >
            <h2
              id={`nav-${group.title}`}
              className="text-[11px] font-semibold uppercase tracking-wider text-[#6557ff]"
            >
              {group.title}
            </h2>
            <ul className="mt-3 space-y-0.5">
              {group.links.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium leading-snug transition ${
                        active
                          ? "bg-gradient-to-r from-[#6557ff]/10 to-[#f74dc7]/10 text-[#6557ff]"
                          : "text-stone-700 hover:bg-stone-50 hover:text-[#6557ff]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
