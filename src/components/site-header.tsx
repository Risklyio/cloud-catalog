"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { SiteNavMenu } from "@/components/site-nav-menu";

const SCROLL_FADE_DISTANCE = 96;

export function SiteHeader() {
  const pathname = usePathname();
  const showSearch = pathname === "/";
  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHeaderOpacity(Math.max(0, 1 - y / SCROLL_FADE_DISTANCE));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="pointer-events-none sticky top-0 z-50 px-4 pt-4 pb-2 transition-opacity duration-200 sm:px-6 lg:px-8"
      style={{ opacity: headerOpacity }}
    >
      <div
        className="pointer-events-auto mx-auto max-w-7xl"
        style={{ pointerEvents: headerOpacity < 0.15 ? "none" : "auto" }}
      >
        <div className="flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/95 px-2 py-2 shadow-lg shadow-stone-300/25 backdrop-blur-md sm:gap-3 sm:px-3 sm:py-2.5">
          <Link
            href="/"
            className="shrink-0 rounded-lg outline-none ring-[#6557ff] focus-visible:ring-2 focus-visible:ring-offset-2"
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

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-2.5 lg:max-w-xl">
            {showSearch && <SearchBar compact className="sm:max-w-none" />}
            <SiteNavMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}
