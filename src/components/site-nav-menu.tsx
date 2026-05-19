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
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6557ff]/40 focus-visible:ring-offset-2 ${
        open
          ? "border-[#6557ff]/40 bg-gradient-to-br from-[#6557ff]/12 to-[#f74dc7]/10 text-[#6557ff] shadow-inner"
          : "border-stone-200/90 bg-stone-50/90 text-stone-700 hover:border-[#6557ff]/30 hover:bg-white hover:text-[#6557ff]"
      }`}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-haspopup="true"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onToggle}
    >
      <span className="sr-only">{open ? "Close" : "Menu"}</span>
      <span className="relative block h-3.5 w-4" aria-hidden>
        <span
          className={`absolute left-0 top-0 block h-0.5 w-4 rounded-full bg-current transition-all duration-200 ${
            open ? "top-[6px] rotate-45" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-[6px] block h-0.5 w-4 rounded-full bg-current transition-all duration-200 ${
            open ? "scale-x-0 opacity-0" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-3 block h-0.5 w-4 rounded-full bg-current transition-all duration-200 ${
            open ? "top-[6px] -rotate-45" : ""
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
      className="border-t border-stone-200/80 px-4 py-5 sm:px-6 sm:py-6"
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-8">
        {NAV_GROUPS.map((group) => (
          <section key={group.title} aria-labelledby={`nav-${group.title}`}>
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
