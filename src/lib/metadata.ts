import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://invenexsolutions.vercel.app";

/**
 * Default metadata configuration for the entire site.
 * Used in root layout to provide base metadata that all pages inherit.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Invenex Solutions - Premium Web Development & Digital Solutions",
    template: "%s | Invenex Solutions",
  },
  description:
    "Invenex Solutions delivers premium web development, mobile apps, and digital transformation services. Based in India, serving clients worldwide.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "digital solutions",
    "Thrissur",
    "Kerala",
    "India",
    "Next.js",
    "React",
    "TypeScript",
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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Invenex Solutions",
    title: "Invenex Solutions - Premium Web Development & Digital Solutions",
    description:
      "Invenex Solutions delivers premium web development, mobile apps, and digital transformation services.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Invenex Solutions - Premium Web Development & Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invenex Solutions - Premium Web Development & Digital Solutions",
    description:
      "Invenex Solutions delivers premium web development, mobile apps, and digital transformation services.",
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
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
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
