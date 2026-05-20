import { createService } from "@/lib/catalog/service-factory";
import type { CloudService } from "@/types";

const FM_CATALOG_URL =
  "https://tfx.treasury.gov/fmqsmo/marketplace-catalog/commercial-vendors";

const FM_NOTE =
  "Pre-vetted offering on the U.S. Treasury FM QSMO Marketplace Catalog (SIN 518210FM).";

type FmEntry = {
  id: string;
  name: string;
  vendor: string;
  url: string;
  tags?: string[];
  slug?: string;
};

/** Technology solutions from the FM Marketplace commercial vendors catalog. */
const FM_TECHNOLOGY_SOLUTIONS: FmEntry[] = [
  { id: "1501", name: "Actus", vendor: "Actus", url: FM_CATALOG_URL, tags: ["fm", "federal", "financial-management"] },
  { id: "1502", name: "Allocore Unified Fraud Platform (UFP)", vendor: "Allocore", url: "https://allocore.com", tags: ["fm", "fraud", "federal"] },
  { id: "1503", name: "Allocore Unified Loans Platform (ULP)", vendor: "Allocore", url: "https://allocore.com", tags: ["fm", "loans", "federal"] },
  { id: "1504", name: "ATOM Federal Data and Intelligent Automation Platform", vendor: "ATOM", url: FM_CATALOG_URL, tags: ["fm", "automation", "federal"] },
  { id: "1505", name: "cBEYONDLab", vendor: "cBEYONData", url: "https://www.cbeyondata.com", tags: ["fm", "analytics", "federal"], slug: "cbeyondlab" },
  { id: "1506", name: "CFO Control Tower", vendor: "CGI", url: "https://www.cgi.com", tags: ["fm", "erp", "federal"] },
  { id: "1507", name: "CGI Fraud, Waste, and Abuse (FWA) Prevention Platform", vendor: "CGI", url: "https://www.cgi.com", tags: ["fm", "fraud", "federal"], slug: "cgi-fwa-prevention" },
  { id: "1508", name: "CGI Momentum", vendor: "CGI", url: "https://www.cgi.com", tags: ["fm", "erp", "federal"] },
  { id: "1509", name: "Elevate FM", vendor: "Elevate", url: FM_CATALOG_URL, tags: ["fm", "federal"] },
  { id: "1510", name: "GovConnect360", vendor: "GovConnect", url: FM_CATALOG_URL, tags: ["fm", "federal", "integration"] },
  { id: "1511", name: "GovCycle", vendor: "GovCycle", url: FM_CATALOG_URL, tags: ["fm", "federal", "workflow"] },
  { id: "1512", name: "iBudgetFlow (iBF)", vendor: "iBudgetFlow", url: FM_CATALOG_URL, tags: ["fm", "budget", "federal"] },
  { id: "1513", name: "JPMorgan Banking and Payment Services", vendor: "JPMorgan", url: "https://www.jpmorgan.com", tags: ["fm", "payments", "banking", "federal"] },
  { id: "1514", name: "JPMorgan Trust and Safety Services", vendor: "JPMorgan", url: "https://www.jpmorgan.com", tags: ["fm", "payments", "federal"] },
  { id: "1515", name: "Oracle Cloud Federal Financials", vendor: "Oracle", url: "https://www.oracle.com/industries/government/federal-financials/", tags: ["fm", "erp", "federal"], slug: "oracle-cloud-federal-financials" },
  { id: "1516", name: "Oracle Fusion Cloud EPM", vendor: "Oracle", url: "https://www.oracle.com/performance-management/", tags: ["fm", "epm", "planning", "federal"] },
  { id: "1517", name: "Oracle Fusion Cloud ERP", vendor: "Oracle", url: "https://www.oracle.com/erp/", tags: ["fm", "erp", "federal"] },
  { id: "1518", name: "PNC Fraud Risk Management (FRM)", vendor: "PNC", url: "https://www.pnc.com", tags: ["fm", "fraud", "federal"] },
  { id: "1519", name: "PNC Integrated Payables Management (IPM)", vendor: "PNC", url: "https://www.pnc.com", tags: ["fm", "payables", "federal"] },
  { id: "1520", name: "PNC Integrated Receivables Management (IRM)", vendor: "PNC", url: "https://www.pnc.com", tags: ["fm", "receivables", "federal"] },
  { id: "1521", name: "SAP Analytics Cloud (SAC)", vendor: "SAP", url: "https://www.sap.com/products/technology-platform/analytics.html", tags: ["fm", "analytics", "federal"] },
  { id: "1522", name: "SAP Business Technology Platform (BTP)", vendor: "SAP", url: "https://www.sap.com/products/technology-platform.html", tags: ["fm", "platform", "federal"] },
  { id: "1523", name: "SAP S/4HANA Cloud", vendor: "SAP", url: "https://www.sap.com/products/erp/s4hana.html", tags: ["fm", "erp", "federal"], slug: "sap-s4hana-cloud-fm" },
  { id: "1524", name: "Sunflower", vendor: "CGI", url: "https://www.cgi.com", tags: ["fm", "federal", "financial-management"] },
  { id: "1525", name: "TrackLight Suite", vendor: "TrackLight", url: "https://tracklight.ai", tags: ["fm", "fraud", "federal"] },
  { id: "1526", name: "Workiva Platform", vendor: "Workiva", url: "https://www.workiva.com", tags: ["fm", "reporting", "compliance", "federal"] },
];

/** Commercial vendor offerings from the FM Marketplace catalog. */
const FM_COMMERCIAL_VENDORS: FmEntry[] = [
  { id: "1531", name: "Accenture Federal Services", vendor: "Accenture", url: "https://www.accenture.com/us-en/industries/federal-government" },
  { id: "1532", name: "Ascella Technologies", vendor: "Ascella Technologies", url: "https://www.ascella.com" },
  { id: "1533", name: "Blake Willson Group", vendor: "Blake Willson Group", url: FM_CATALOG_URL },
  { id: "1534", name: "Booz Allen Hamilton", vendor: "Booz Allen Hamilton", url: "https://www.boozallen.com" },
  { id: "1535", name: "BroadPoint Federal", vendor: "BroadPoint Federal", url: "https://www.broadpointfederal.com" },
  { id: "1536", name: "CACI International", vendor: "CACI", url: "https://www.caci.com" },
  { id: "1537", name: "Carahsoft Technology", vendor: "Carahsoft", url: "https://www.carahsoft.com" },
  { id: "1538", name: "cBEYONData", vendor: "cBEYONData", url: "https://www.cbeyondata.com" },
  { id: "1539", name: "CGI Federal", vendor: "CGI", url: "https://www.cgi.com/en/federal" },
  { id: "1540", name: "Creoal Consulting", vendor: "Creoal", url: "https://www.creoal.com" },
  { id: "1541", name: "Deloitte Consulting", vendor: "Deloitte", url: "https://www.deloitte.com/us/en/industries/government-public-services.html" },
  { id: "1542", name: "eMentum", vendor: "eMentum", url: "https://www.ementum.com" },
  { id: "1543", name: "Equinoxys", vendor: "Equinoxys", url: FM_CATALOG_URL },
  { id: "1544", name: "Ernst & Young (EY)", vendor: "EY", url: "https://www.ey.com/en_us/government-public-sector" },
  { id: "1545", name: "Goldschmitt and Associates", vendor: "Goldschmitt and Associates", url: FM_CATALOG_URL },
  { id: "1546", name: "Guidehouse Digital", vendor: "Guidehouse", url: "https://guidehouse.com" },
  { id: "1547", name: "HIC International", vendor: "HIC International", url: FM_CATALOG_URL },
  { id: "1548", name: "Huron Consulting Services", vendor: "Huron", url: "https://www.huronconsultinggroup.com" },
  { id: "1549", name: "i360technologies", vendor: "i360technologies", url: FM_CATALOG_URL },
  { id: "1550", name: "IBM Federal Financial Management", vendor: "IBM", url: "https://www.ibm.com/industries/federal", slug: "ibm-federal-fm" },
  { id: "1551", name: "ITC Federal", vendor: "ITC Federal", url: FM_CATALOG_URL },
  { id: "1552", name: "JPMorgan Chase Bank", vendor: "JPMorgan", url: "https://www.jpmorgan.com", slug: "jpmorgan-chase-fm-vendor" },
  { id: "1553", name: "Kearney & Company", vendor: "Kearney & Company", url: "https://www.kearneyco.com" },
  { id: "1554", name: "Kilda Group", vendor: "Kilda Group", url: FM_CATALOG_URL },
  { id: "1555", name: "Louisiana Technology Group", vendor: "Louisiana Technology Group", url: FM_CATALOG_URL },
  { id: "1556", name: "Mythics", vendor: "Mythics", url: "https://www.mythics.com" },
  { id: "1557", name: "NeevSys", vendor: "NeevSys", url: FM_CATALOG_URL },
  { id: "1558", name: "Packaged Agile", vendor: "Packaged Agile", url: FM_CATALOG_URL },
  { id: "1559", name: "Paperless Innovations", vendor: "Paperless Innovations", url: "https://www.paperlessinnovations.com" },
  { id: "1560", name: "PNC Bank", vendor: "PNC", url: "https://www.pnc.com", slug: "pnc-bank-fm-vendor" },
  { id: "1561", name: "Rapid Cycle Solutions", vendor: "Rapid Cycle Solutions", url: FM_CATALOG_URL },
  { id: "1562", name: "Savantage Financial Services", vendor: "Savantage", url: "https://www.savantage.com" },
  { id: "1563", name: "Summit Technology Consulting Group", vendor: "RiverNorth", url: FM_CATALOG_URL, slug: "summit-technology-consulting" },
];

function toFmService(entry: FmEntry): CloudService {
  return createService(
    entry.id,
    entry.name,
    `${FM_NOTE} Source: ${FM_CATALOG_URL}.`,
    entry.vendor,
    entry.url,
    [...(entry.tags ?? ["fm", "federal"]), "financial-management", "fm-qsmo"],
    { departments: ["finance"], slug: entry.slug },
  );
}

export const financialManagementServices: CloudService[] = [
  ...FM_TECHNOLOGY_SOLUTIONS.map(toFmService),
  ...FM_COMMERCIAL_VENDORS.map(toFmService),
];

export const FINANCIAL_MANAGEMENT_IDS = financialManagementServices.map((s) => s.id);
