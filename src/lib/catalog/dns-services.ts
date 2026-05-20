import { createService } from "@/lib/catalog/service-factory";
import type { CloudService } from "@/types";

/** DNS and domain registration providers. */
export const dnsProviders: CloudService[] = [
  createService(
    "1301",
    "GoDaddy",
    "Domain registration, DNS hosting, and website services for businesses worldwide.",
    "GoDaddy",
    "https://www.godaddy.com",
    ["dns", "domains", "registrar"],
    { category: "DNS" },
  ),
  createService(
    "1302",
    "Namecheap",
    "Affordable domains, DNS, and privacy protection for individuals and teams.",
    "Namecheap",
    "https://www.namecheap.com",
    ["dns", "domains", "registrar"],
    { category: "DNS" },
  ),
  createService(
    "1303",
    "Google Domains",
    "Domain registration and DNS management (now Squarespace Domains, formerly Google Domains).",
    "Squarespace",
    "https://domains.squarespace.com",
    ["dns", "domains", "registrar"],
    { category: "DNS", slug: "google-domains" },
  ),
  createService(
    "1304",
    "IONOS (1&1 IONOS)",
    "Domains, DNS, email, and hosting from 1&1 IONOS for European and global customers.",
    "IONOS",
    "https://www.ionos.com",
    ["dns", "domains", "hosting"],
    { category: "DNS", slug: "ionos" },
  ),
  createService(
    "1305",
    "Bluehost",
    "Domain names, DNS, and WordPress-focused hosting for small businesses.",
    "Bluehost",
    "https://www.bluehost.com",
    ["dns", "domains", "wordpress"],
    { category: "DNS" },
  ),
  createService(
    "1306",
    "Gandi.net",
    "Ethical domain registrar with DNS, SSL, and cloud hosting options.",
    "Gandi",
    "https://www.gandi.net",
    ["dns", "domains", "registrar"],
    { category: "DNS", slug: "gandi-net" },
  ),
  createService(
    "1307",
    "123 Reg",
    "UK-focused domain registration, DNS, and business hosting services.",
    "123 Reg",
    "https://www.123-reg.co.uk",
    ["dns", "domains", "uk"],
    { category: "DNS", slug: "123-reg" },
  ),
  createService(
    "1308",
    "Fasthosts",
    "UK domains, DNS, email, and hosting for startups and growing companies.",
    "Fasthosts",
    "https://www.fasthosts.co.uk",
    ["dns", "domains", "uk"],
    { category: "DNS" },
  ),
  createService(
    "1309",
    "Names.co.uk",
    "British domain registrar offering DNS, email, and web hosting packages.",
    "Names.co.uk",
    "https://www.names.co.uk",
    ["dns", "domains", "uk"],
    { category: "DNS", slug: "names-co-uk" },
  ),
];

export const DNS_PROVIDER_IDS = dnsProviders.map((s) => s.id);
