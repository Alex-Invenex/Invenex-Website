# Story 8.5: Performance Optimization

Status: done

## Story

As a **visitor**,
I want **the site to load quickly**,
So that **I have a smooth browsing experience**.

## Acceptance Criteria

### AC1: Lighthouse Scores
**Given** any page on the site
**When** tested with Lighthouse
**Then** scores are:
- Performance >= 90
- Accessibility >= 90
- Best Practices >= 90
- SEO >= 90

### AC2: Core Web Vitals
**Given** performance metrics
**When** measured
**Then**:
- LCP < 2.5 seconds
- INP < 200ms
- CLS < 0.1
- TTFB < 600ms
- Initial JS bundle < 200KB

### AC3: Image Optimization
**Given** images on the site
**When** they render
**Then**:
- Use `next/image` for optimization
- Serve WebP/AVIF formats
- Lazy load below-fold images
- Provide proper width/height to prevent CLS

## Tasks / Subtasks

- [x] Task 1: Configure Image Optimization (AC: 3)
  - [x] Configure next.config.js for images
  - [x] Set up Sanity image loader
  - [x] Add blur placeholders

- [x] Task 2: Optimize Bundle Size (AC: 2)
  - [x] Analyze bundle with @next/bundle-analyzer
  - [x] Dynamic imports for heavy components
  - [x] Tree shake unused code

- [x] Task 3: Configure Caching (AC: 1, 2)
  - [x] Set proper cache headers
  - [x] Configure ISR for dynamic pages
  - [x] Optimize Sanity fetch caching

- [x] Task 4: Optimize Fonts (AC: 2)
  - [x] Use next/font for Inter
  - [x] Subset only needed characters
  - [x] Preload critical fonts

- [x] Task 5: Add Performance Monitoring (AC: 1)
  - [x] Enable Vercel Analytics
  - [x] Set up Vercel Speed Insights

## Dev Notes

### Next.js Configuration

```tsx
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Enable experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', '@sanity/image-url'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### Font Optimization

```tsx
// src/app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
  variable: '--font-inter',
  preload: true,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### Image Component with Optimization

```tsx
// src/components/ui/optimized-image.tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { Image as SanityImage } from 'sanity'

interface OptimizedImageProps {
  image: SanityImage
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  sizes?: string
}

export function OptimizedImage({
  image,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '100vw',
}: OptimizedImageProps) {
  // Generate blur placeholder
  const blurDataUrl = urlFor(image)
    .width(20)
    .height(Math.round((20 * height) / width))
    .blur(50)
    .url()

  return (
    <Image
      src={urlFor(image).width(width).height(height).auto('format').url()}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurDataUrl}
      sizes={sizes}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
```

### Sanity Image Loader

```tsx
// src/lib/sanity/image-loader.ts
import { urlFor } from './image'

export function sanityLoader({
  src,
  width,
  quality = 75,
}: {
  src: string
  width: number
  quality?: number
}) {
  // If it's already a Sanity URL, optimize it
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src)
    url.searchParams.set('w', width.toString())
    url.searchParams.set('q', quality.toString())
    url.searchParams.set('auto', 'format')
    return url.toString()
  }
  return src
}
```

### Dynamic Imports for Heavy Components

```tsx
// src/components/sections/hero.tsx
import dynamic from 'next/dynamic'

// Lazy load heavy animation components
const HeroAnimation = dynamic(
  () => import('@/components/animations/hero-animation'),
  {
    loading: () => <div className="h-[400px] bg-background-secondary animate-pulse" />,
    ssr: false, // Client-side only for complex animations
  }
)

// Lazy load lightbox component
const Lightbox = dynamic(() => import('@/components/ui/lightbox'), {
  loading: () => null,
})

// Lazy load video player
const VideoPlayer = dynamic(() => import('@/components/ui/video-player'), {
  loading: () => <div className="aspect-video bg-background-secondary animate-pulse" />,
  ssr: false,
})
```

### Skeleton Loading Components

```tsx
// src/components/ui/skeleton.tsx
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-background-secondary',
        className
      )}
    />
  )
}

// Usage examples
export function CardSkeleton() {
  return (
    <div className="p-6 border border-border rounded-lg">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

export function ProjectGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
```

### ISR Configuration

```tsx
// src/app/portfolio/page.tsx
import { sanityFetch } from '@/lib/sanity/client'
import { projectsQuery } from '@/lib/sanity/queries'

// This enables ISR with tag-based revalidation
export const revalidate = 3600 // Fallback: 1 hour

export default async function PortfolioPage() {
  const projects = await sanityFetch({
    query: projectsQuery,
    tags: ['project'], // Revalidate on-demand via webhook
  })

  return (/* render */)
}
```

### Vercel Analytics Setup

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Bundle Analysis

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

### Preload Critical Assets

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Optimize Third-Party Scripts

```tsx
// src/components/analytics/third-party-scripts.tsx
import Script from 'next/script'

export function ThirdPartyScripts() {
  return (
    <>
      {/* Load analytics after page is interactive */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        strategy="afterInteractive"
      />

      {/* Load chat widget when idle */}
      <Script
        src="https://widget.chat.com/loader.js"
        strategy="lazyOnload"
      />
    </>
  )
}
```

### Performance Budget

| Metric | Budget | Target |
|--------|--------|--------|
| LCP | < 2.5s | < 1.8s |
| INP | < 200ms | < 100ms |
| CLS | < 0.1 | < 0.05 |
| TTFB | < 600ms | < 400ms |
| Total JS | < 200KB | < 150KB |
| Total CSS | < 50KB | < 30KB |
| Hero image | < 100KB | < 80KB |

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| next/image | All images use Image component |
| ISR | On-demand revalidation via tags |
| Edge caching | Vercel Edge Network |
| Code splitting | Dynamic imports for heavy components |

### Testing Checklist

> **Note:** Lighthouse and Core Web Vitals metrics require post-deployment verification
> on production. Run `npx lighthouse https://invenexsolutions.vercel.app --view` after deploy.

**Lighthouse Scores (verify post-deployment):**
- [ ] Lighthouse Performance >= 90
- [ ] Lighthouse Accessibility >= 90
- [ ] Lighthouse Best Practices >= 90
- [ ] Lighthouse SEO >= 90

**Core Web Vitals (verify post-deployment via Vercel Analytics):**
- [ ] LCP < 2.5s on mobile
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Initial bundle < 200KB

**Implementation Verified (via Playwright tests):**
- [x] Images serve WebP/AVIF (next.config.ts formats configured)
- [x] Fonts preloaded (next/font with preload:true)
- [x] No layout shifts on load (width/height specified)
- [x] Vercel Analytics tracking (components added to layout)
- [x] Bundle analyzer installed
- [x] Dynamic imports for heavy components

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5

### Completion Notes List

- **Task 1 - Image Optimization**: Configured next.config.ts with AVIF/WebP formats, Sanity CDN remotePatterns, and optimized device/image sizes. Created OptimizedImage component with blur placeholders and sanityLoader utility.

- **Task 2 - Bundle Optimization**: Installed @next/bundle-analyzer, configured experimental.optimizePackageImports for framer-motion, @sanity/image-url, and lucide-react. Added dynamic import for ImageGallery component to reduce initial page load. Created Skeleton component for loading states.

- **Task 3 - Caching**: Cache headers already configured in next.config.ts (1 year immutable for static assets). ISR and Sanity fetch caching already implemented via tag-based revalidation from Story 7-5.

- **Task 4 - Font Optimization**: Inter font already configured with next/font: latin subset, display:swap (FOIT prevention), preload:true, and system font fallbacks.

- **Task 5 - Performance Monitoring**: Installed @vercel/analytics and @vercel/speed-insights. Added Analytics and SpeedInsights components to root layout. Added preconnect/dns-prefetch for Sanity CDN.

- **Test Updates**: Added 500ms hydration wait to case-study lightbox tests to account for dynamically loaded ImageGallery component.

### Change Log

- 2026-01-30: Code review - Updated Testing Checklist to clarify that Lighthouse/CWV metrics require post-deployment verification
- 2026-01-29: Story 8-5 Performance Optimization implementation complete

### File List

- next.config.ts (modified - image config, headers, bundle analyzer)
- package.json (modified - added @vercel/analytics, @vercel/speed-insights, @next/bundle-analyzer)
- src/app/layout.tsx (modified - Analytics, SpeedInsights, preconnect)
- src/lib/sanity/index.ts (modified - export sanityLoader)
- src/lib/sanity/image-loader.ts (new - Sanity image loader utility)
- src/components/ui/optimized-image.tsx (new - OptimizedImage component)
- src/components/ui/skeleton.tsx (new - Skeleton loading component)
- src/components/ui/animated-section.tsx (modified - fixed TypeScript types)
- src/app/(site)/portfolio/[slug]/case-study-client.tsx (modified - dynamic import ImageGallery)
- tests/performance.spec.ts (new - 13 performance tests)
- tests/case-study.spec.ts (modified - hydration waits for dynamic gallery)
