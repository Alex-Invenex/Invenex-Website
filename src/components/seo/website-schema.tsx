import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

/**
 * WebSite schema for site-wide structured data
 * Enables sitelinks search box in Google results
 * @see https://schema.org/WebSite
 */
export function WebSiteSchema() {
  const siteUrl = getSiteUrl();

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Invenex Solutions",
    url: siteUrl,
    description:
      "Premium web development, mobile apps, and digital solutions. Transform your vision into reality.",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-US",
  };

  return <JsonLd data={websiteData} />;
}
