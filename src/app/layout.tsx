import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { CatalogProvider } from "@/components/catalog-provider";
import { SiteHeader } from "@/components/site-header";
import { getCatalog } from "@/lib/catalog/get-catalog";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloudiscover.io — Discover SaaS, PaaS & IaaS",
  description:
    "A fast, read-only catalog for discovering cloud services with search, filters, and curated groups.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const catalog = await getCatalog();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-page font-sans antialiased text-stone-800`}
      >
        <CatalogProvider data={catalog}>
          <SiteHeader />
          {children}
        </CatalogProvider>
      </body>
    </html>
  );
}
