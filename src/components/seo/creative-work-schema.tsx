import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

/**
 * CreativeWork schema for portfolio/case study pages
 * @see https://schema.org/CreativeWork
 */
interface CreativeWorkSchemaProps {
  name: string;
  description: string;
  slug: string;
  client: string;
  image?: string;
  datePublished?: string;
}

export function CreativeWorkSchema({
  name,
  description,
  slug,
  client,
  image,
  datePublished,
}: CreativeWorkSchemaProps) {
  const siteUrl = getSiteUrl();
  const ogImage = image || `${siteUrl}/og-image.png`;

  const creativeWorkData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: `${siteUrl}/portfolio/${slug}`,
    image: ogImage,
    datePublished: datePublished || new Date().toISOString().split("T")[0],
    creator: {
      "@type": "Organization",
      name: "Invenex Solutions",
      url: siteUrl,
      "@id": `${siteUrl}/#organization`,
    },
    provider: {
      "@type": "Organization",
      name: "Invenex Solutions",
      url: siteUrl,
    },
    about: {
      "@type": "Organization",
      name: client,
    },
    genre: "Software Development Case Study",
    learningResourceType: "Case Study",
  };

  return <JsonLd data={creativeWorkData} />;
}
