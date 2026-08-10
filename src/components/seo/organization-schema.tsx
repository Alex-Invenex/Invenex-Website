import { JsonLd } from "./json-ld";
import { areasServed, contactInfo, socialLinks } from "@/lib/constants";
import { getSiteUrl } from "@/lib/metadata";

/**
 * Organization schema for site-wide structured data
 * Provides search engines with company information
 * @see https://schema.org/Organization
 */
export function OrganizationSchema() {
  const siteUrl = getSiteUrl();

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Invenex Solutions",
    alternateName: ["Invenex", "Invenex Solutions Pvt Ltd"],
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    description:
      "Web and mobile app development company based in Koratty, Thrissur, Kerala, India. Invenex Solutions builds custom websites, mobile apps, ecommerce stores and SaaS platforms for clients in India and worldwide.",
    slogan: "We craft digital experiences",
    // Topical signals — helps search engines associate the entity with the
    // services and technologies we want to rank for.
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Mobile App Development",
      "React Native",
      "SaaS Platform Development",
      "Ecommerce Development",
      "Shopify",
      "Digital Marketing",
      "Digital Transformation",
    ],
    areaServed: areasServed.map((name) => ({
      "@type": "Country",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zip,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.phone,
      contactType: "customer service",
      email: contactInfo.email,
      availableLanguage: ["English", "Hindi", "Malayalam"],
    },
    sameAs: socialLinks.map((link) => link.href),
    foundingDate: "2024",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "10-50",
    },
  };

  return <JsonLd data={organizationData} />;
}
