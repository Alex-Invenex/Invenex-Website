import type { Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { defaultMetadata } from "@/lib/metadata";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        {/* A3: Add js-ready class so GSAP-animated elements hide only when JS is available */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-ready');`,
          }}
        />
      </head>
      <body className="bg-background text-foreground font-sans min-h-screen">
        <OrganizationSchema />
        <WebSiteSchema />
        {children}
        {/* Vercel Analytics & Speed Insights (AC1: Lighthouse Scores) */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
