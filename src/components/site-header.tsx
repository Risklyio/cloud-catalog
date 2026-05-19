"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/search-bar";
import { SiteNavMenu } from "@/components/site-nav-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const showSearch = pathname === "/";

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 pb-2 sm:px-6">
      <div className="mx-auto max-w-5xl">
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

          <div className="ml-auto flex min-w-0 items-center justify-end gap-2 sm:gap-2.5">
            {showSearch && <SearchBar compact />}
            <SiteNavMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}
