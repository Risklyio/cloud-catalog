"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Catalog" },
  { href: "/cloud-definitions", label: "How cloud services are defined" },
  { href: "/verified-compliance", label: "Verified Compliance" },
  { href: "/trustpilot-ratings", label: "Trustpilot ratings" },
  {
    href: "/for-cloud-service-providers",
    label: "For cloud service providers",
  },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

type SiteNavMenuProps = {
  align?: "left" | "right";
};

export function SiteNavMenu({ align = "right" }: SiteNavMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, close]);

  const panelPosition =
    align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right";

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/90 bg-stone-50/90 text-stone-700 transition hover:border-[#6557ff]/30 hover:bg-white hover:text-[#6557ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6557ff]/40 focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
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

      {open && (
        <div
          ref={panelRef}
          id={menuId}
          role="menu"
          className={`absolute z-50 mt-2 w-[min(100vw-2rem,18rem)] ${panelPosition}`}
        >
          <div className="brand-gradient-border brand-gradient-border--active overflow-hidden rounded-2xl shadow-lg">
            <nav
              className="rounded-[calc(1rem-2px)] bg-white py-2"
              aria-label="Site"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 hover:text-[#6557ff]"
                  onClick={close}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
