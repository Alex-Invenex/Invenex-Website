import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Image optimization (AC3: Image Optimization)
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  // Enable experimental optimizations (AC2: Bundle Size)
  experimental: {
    optimizePackageImports: ["framer-motion", "@sanity/image-url", "lucide-react", "@/components/ui", "@/components/transitions"],
  },

  // Compiler optimizations (AC2: Core Web Vitals)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Headers for caching (AC1, AC2: Performance)
  async headers() {
    return [
      {
        // Static images: 1 year cache, immutable
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Static JS/CSS: 1 year cache, immutable (hashed filenames)
        source: "/:all*(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Fonts: 1 year cache, immutable
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
