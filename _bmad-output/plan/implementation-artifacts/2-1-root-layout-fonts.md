# Story 2.1: Root Layout & Font Configuration

Status: complete

## Story

As a **visitor**,
I want **the site to load with proper fonts and base styling**,
So that **I experience the premium visual quality immediately**.

## Acceptance Criteria

### AC1: Root Layout Structure
**Given** I visit any page on the site
**When** the page loads
**Then** the root layout includes:
- Inter font loaded via next/font
- Dark theme applied (bg-background, text-foreground)
- Proper viewport meta tag
- Base metadata configured

### AC2: Semantic HTML Structure
**Given** the layout renders
**When** I inspect the HTML
**Then** semantic structure is correct:
- `<html>` with lang attribute
- Proper `<head>` with charset and viewport
- `<body>` with font classes applied

## Tasks / Subtasks

- [ ] Task 1: Update Root Layout (AC: 1, 2)
  - [ ] Configure Inter font with next/font
  - [ ] Apply dark theme classes to body
  - [ ] Set lang="en" on html element
  - [ ] Configure base metadata

- [ ] Task 2: Create Metadata Configuration
  - [ ] Set default title template
  - [ ] Set default description
  - [ ] Configure viewport settings
  - [ ] Add theme-color meta

- [ ] Task 3: Add Skip Link for Accessibility
  - [ ] Create skip-to-main link
  - [ ] Style for screen reader and keyboard users

## Dev Notes

### Root Layout Implementation

```tsx
// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export const metadata: Metadata = {
  title: {
    default: 'Invenex Solutions | Premium Web Development & Digital Solutions',
    template: '%s | Invenex Solutions',
  },
  description: 'Premium web development, mobile apps, and digital solutions for businesses worldwide. Based in Kochi, serving clients globally.',
  keywords: ['web development', 'mobile apps', 'digital solutions', 'Kochi', 'India'],
  authors: [{ name: 'Invenex Solutions' }],
  creator: 'Invenex Solutions',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Invenex Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@invenex',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md"
        >
          Skip to main content
        </a>

        {/* Main Content */}
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Font Loading | next/font for no layout shift |
| Theme | Dark mode by default |
| Accessibility | Skip link included |
| SEO | Metadata API used |

### Dependencies

- Requires Epic 1 completed (design system, utilities)

### Testing Checklist

- [ ] Inter font loads correctly
- [ ] Dark background (#0A0A0A) visible
- [ ] White text (#FAFAFA) readable
- [ ] Skip link works with keyboard (Tab)
- [ ] HTML validates (no warnings)
- [ ] Metadata appears in page source

### References

- [Source: architecture.md#Root-Layout]
- [Source: ux-design-specification.md#Typography]
- [Source: prd.md#SEO-Requirements]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
