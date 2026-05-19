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
            width={220}
            height={48}
            priority
            className="h-9 w-auto object-contain mix-blend-screen sm:h-10"
          />
        </Link>
      </section>
    </header>
  );
}
