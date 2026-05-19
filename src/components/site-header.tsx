import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/90 bg-eggshell">
      <section className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-lg outline-none ring-sky-500 focus-visible:ring-2"
        >
          <Image
            src="/logo.png"
            alt="Cloudiscover.io"
            width={240}
            height={52}
            priority
            unoptimized
            className="h-10 w-auto max-w-[min(100%,240px)] object-contain object-left"
          />
        </Link>
      </section>
    </header>
  );
}
