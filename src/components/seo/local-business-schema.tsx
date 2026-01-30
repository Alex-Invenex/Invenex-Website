import { JsonLd } from "./json-ld";
import { contactInfo } from "@/lib/constants";
import { getSiteUrl } from "@/lib/metadata";

/**
 * LocalBusiness/ProfessionalService schema for homepage
 * Helps with local SEO and Google Maps integration
 * @see https://schema.org/ProfessionalService
 */
export function LocalBusinessSchema() {
  const siteUrl = getSiteUrl();

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#localbusiness`,
    name: "Invenex Solutions",
    image: `${siteUrl}/og-image.png`,
    url: siteUrl,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zip,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.9312,
      longitude: 76.2673,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 9.9312,
          longitude: 76.2673,
        },
        geoRadius: "50000",
      },
    ],
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "Platform Development",
      "E-Commerce Solutions",
      "Digital Marketing",
      "Digital Strategy",
    ],
    parentOrganization: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  return <JsonLd data={localBusinessData} />;
}
