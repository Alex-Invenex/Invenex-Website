import { JsonLd } from "./json-ld";
import { contactInfo, socialLinks } from "@/lib/constants";
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
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    description:
      "Premium software development and digital solutions company based in Kerala, India. We deliver world-class web development, mobile apps, and digital transformation services.",
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
