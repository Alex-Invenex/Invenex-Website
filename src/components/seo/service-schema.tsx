import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

/**
 * Service schema for service detail pages
 * @see https://schema.org/Service
 */
interface ServiceSchemaProps {
  name: string;
  description: string;
  slug: string;
}

export function ServiceSchema({ name, description, slug }: ServiceSchemaProps) {
  const siteUrl = getSiteUrl();

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Invenex Solutions",
      url: siteUrl,
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}/contact`,
    },
    serviceType: name,
  };

  return <JsonLd data={serviceData} />;
}
