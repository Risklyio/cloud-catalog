"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { SearchBar } from "@/components/search-bar";
import {
  SiteNavMenuButton,
  SiteNavMenuPanel,
} from "@/components/site-nav-menu";

const SCROLL_FADE_DISTANCE = 96;

export function SiteHeader() {
  const pathname = usePathname();
  const showSearch = pathname === "/";
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelId = useId();

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (menuOpen) {
      setHeaderOpacity(1);
      return;
    }

    const onScroll = () => {
      const y = window.scrollY;
      setHeaderOpacity(Math.max(0, 1 - y / SCROLL_FADE_DISTANCE));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 z-50 px-4 pt-4 pb-2 transition-opacity duration-200 sm:px-6 lg:px-8"
      style={{ opacity: menuOpen ? 1 : headerOpacity }}
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ pointerEvents: !menuOpen && headerOpacity < 0.15 ? "none" : "auto" }}
      >
        <div
          className={
            menuOpen
              ? "brand-gradient-border brand-gradient-border--active overflow-hidden rounded-2xl shadow-lg shadow-stone-300/25"
              : ""
          }
        >
          <div
            className={
              menuOpen
                ? "rounded-t-[calc(1rem-2px)] bg-white/95 backdrop-blur-md"
                : "overflow-hidden rounded-full border border-stone-200/90 bg-white/95 shadow-lg shadow-stone-300/25 backdrop-blur-md"
            }
          >
            <div className="flex items-center gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5">
              <Link
                href="/"
                className="shrink-0 rounded-lg outline-none ring-[#6557ff] focus-visible:ring-2 focus-visible:ring-offset-2"
                onClick={closeMenu}
              >
                <Image
                  src="/logo.png"
                  alt="Cloudiscover.io"
                  width={200}
                  height={44}
                  priority
                  unoptimized
                  className="h-8 w-auto max-w-[min(42vw,200px)] object-contain object-left sm:h-9"
                />
              </Link>

              <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3 lg:max-w-xl">
                {showSearch && <SearchBar compact className="sm:max-w-none" />}
                <SiteNavMenuButton
                  open={menuOpen}
                  onToggle={toggleMenu}
                  controlsId={menuPanelId}
                />
              </div>
            </div>
          </div>

          <SiteNavMenuPanel
            open={menuOpen}
            onClose={closeMenu}
            panelId={menuPanelId}
          />
        </div>
      </div>
    </header>
  );
}
