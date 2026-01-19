import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: {
    default: "Invenex Solutions | Premium Web Development & Digital Solutions",
    template: "%s | Invenex Solutions",
  },
  description:
    "Premium web development, mobile apps, and digital solutions for businesses worldwide. Based in Kochi, serving clients globally.",
  keywords: [
    "web development",
    "mobile apps",
    "digital solutions",
    "Kochi",
    "India",
  ],
  authors: [{ name: "Invenex Solutions" }],
  creator: "Invenex Solutions",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://invenexsolutions.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Invenex Solutions",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@invenex",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-background text-foreground font-sans min-h-screen">
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
