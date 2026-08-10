import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://invenexsolutions.com";

/**
 * Default metadata configuration for the entire site.
 * Used in root layout to provide base metadata that all pages inherit.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // Homepage target: "web development company in India" + brand.
    default: "Web Development Company in India | Invenex Solutions",
    template: "%s | Invenex Solutions",
  },
  description:
    "Invenex Solutions is a web and mobile app development company in Kerala, India, building custom websites, apps and SaaS platforms for clients worldwide. Get a free quote in 24 hours.",
  keywords: [
    // Primary commercial head terms
    "web development company in India",
    "software development company in Kerala",
    "mobile app development company India",
    "custom software development company",
    "SaaS development company",
    "ecommerce website development India",
    // Offshore / global intent
    "offshore development team India",
    "hire Next.js developers India",
    "hire React developers",
    // Local intent
    "web design company Thrissur",
    "software company Kochi",
    "IT company Kerala",
    // Technology qualifiers
    "Next.js development agency",
    "React Native app development",
    "TypeScript development services",
  ],
  authors: [{ name: "Invenex Solutions", url: siteUrl }],
  creator: "Invenex Solutions",
  publisher: "Invenex Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    // Single English site serving India + international traffic. en-IN is the
    // primary variant; x-default catches everyone else so Google does not
    // treat the site as India-only.
    languages: {
      "en-IN": siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    // en_IN as the primary locale, with the international variants declared —
    // matches the "India + worldwide" positioning.
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB", "en_AE"],
    url: siteUrl,
    siteName: "Invenex Solutions",
    title: "Web Development Company in India | Invenex Solutions",
    description:
      "Custom websites, mobile apps and SaaS platforms built by Invenex Solutions — a web development company in Kerala, India, serving clients worldwide.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Invenex Solutions — web and mobile app development company in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Company in India | Invenex Solutions",
    description:
      "Custom websites, mobile apps and SaaS platforms built by Invenex Solutions — a web development company in Kerala, India, serving clients worldwide.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@invenex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Options for generating page-specific metadata
 */
interface PageMetadataOptions {
  /** Page title (will be appended with " | Invenex Solutions") */
  title: string;
  /** Meta description (aim for 150-160 characters) */
  description: string;
  /** Path for canonical URL (e.g., "/about", "/services/web-development") */
  path?: string;
  /** Custom OG image URL (defaults to site OG image) */
  image?: string;
  /** Set to true to prevent search engine indexing */
  noIndex?: boolean;
  /** Page-specific target keywords (replaces the site-wide default set) */
  keywords?: string[];
}

/**
 * Generates consistent metadata for any page.
 * Use this helper for static pages to ensure all required tags are present.
 *
 * @example
 * ```ts
 * export const metadata = generatePageMetadata({
 *   title: 'About Us',
 *   description: 'Learn about Invenex Solutions...',
 *   path: '/about',
 * })
 * ```
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  keywords,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Get the site URL for use in metadata generation
 */
export function getSiteUrl(): string {
  return siteUrl;
}
