import { JsonLd } from "./json-ld";
import { areasServed, contactInfo } from "@/lib/constants";
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
    // Koratty, Thrissur — matches the postal address above. (Previously these
    // were Kochi's coordinates, ~50km away, which contradicts the NAP data.)
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.2333,
      longitude: 76.3333,
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
      // Local service radius around Koratty — covers Thrissur, Kochi and Palakkad.
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 10.2333,
          longitude: 76.3333,
        },
        geoRadius: "80000",
      },
      // Everywhere else we take work from.
      ...areasServed.map((name) => ({
        "@type": "Country",
        name,
      })),
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
