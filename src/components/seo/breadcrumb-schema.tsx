import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

/**
 * BreadcrumbList schema for detail pages.
 *
 * Google renders this as the breadcrumb trail shown in place of the raw URL in
 * search results, which lifts CTR and makes the section a page belongs to
 * explicit ("Home > Services > Web Development").
 *
 * @see https://schema.org/BreadcrumbList
 */
interface Crumb {
  /** Visible label, e.g. "Services" */
  name: string;
  /** Path relative to the site root, e.g. "/services/web-development" */
  path: string;
}

interface BreadcrumbSchemaProps {
  /** Trail excluding Home — Home is prepended automatically. */
  items: Crumb[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const siteUrl = getSiteUrl();

  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };

  return <JsonLd data={breadcrumbData} />;
}
