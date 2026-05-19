import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/90 bg-eggshell">
      <section className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg outline-none ring-sky-500 focus-visible:ring-2"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
          <span className="text-lg font-semibold tracking-tight text-stone-800">
            Cloud Catalog
          </span>
        </Link>
      </section>
    </header>
  );
}
