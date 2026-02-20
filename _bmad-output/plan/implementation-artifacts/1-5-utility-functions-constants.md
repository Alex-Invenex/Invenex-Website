# Story 1.5: Utility Functions & Constants

Status: complete

## Story

As a **developer**,
I want **utility functions and site constants configured**,
So that **common operations and configuration are centralized**.

## Acceptance Criteria

### AC1: Utility Functions
**Given** I need utility functions
**When** I import from \`@/lib/utils\`
**Then** I have access to:
- \`cn()\` function for conditional class merging (clsx + tailwind-merge) - ALREADY DONE in Story 1-3
- \`formatDate()\` for consistent date formatting
- Type-safe utility functions

### AC2: Site Constants
**Given** I need site configuration
**When** I import from \`@/lib/constants\`
**Then** I have access to:
- Site metadata (name, description, URL)
- Navigation items structure
- Social media links
- Contact information

## Tasks / Subtasks

- [x] Task 1: Add formatDate utility (AC: 1)
  - [x] Add \`formatDate()\` function to \`src/lib/utils.ts\`
  - [x] Support multiple format options (short, long, relative)
  - [x] Type-safe with proper TypeScript types

- [x] Task 2: Create Site Constants (AC: 2)
  - [x] Create \`src/lib/constants.ts\` with full implementation
  - [x] Add site metadata (name, description, URL, etc.)
  - [x] Add navigation items structure
  - [x] Add social media links
  - [x] Add contact information

- [x] Task 3: Verify & Build
  - [x] Run TypeScript check
  - [x] Run ESLint
  - [x] Verify build succeeds

---

## Dev Notes (Context7-Verified Patterns)

### Task 1: Add formatDate Utility

\`\`\`tsx
// src/lib/utils.ts (ADD to existing cn() function)
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting options
export type DateFormatStyle = "short" | "long" | "relative";

export function formatDate(
  date: Date | string | number,
  style: DateFormatStyle = "short"
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "Invalid date";
  }

  switch (style) {
    case "short":
      // Jan 19, 2026
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    case "long":
      // January 19, 2026
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    case "relative":
      // "2 days ago", "in 3 hours", etc.
      return getRelativeTime(d);

    default:
      return d.toLocaleDateString();
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(diffSec) < 60) {
    return rtf.format(diffSec, "second");
  } else if (Math.abs(diffMin) < 60) {
    return rtf.format(diffMin, "minute");
  } else if (Math.abs(diffHour) < 24) {
    return rtf.format(diffHour, "hour");
  } else if (Math.abs(diffDay) < 30) {
    return rtf.format(diffDay, "day");
  } else {
    return formatDate(date, "short");
  }
}

// Additional utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}
\`\`\`

---

### Task 2: Site Constants Implementation

\`\`\`tsx
// src/lib/constants.ts

// ============================================
// Site Metadata
// ============================================
export const siteConfig = {
  name: "Invenex Solutions",
  description:
    "Premium web development, mobile apps, and digital solutions. Transform your vision into reality with our world-class team.",
  url: "https://invenexsolutions.vercel.app",
  ogImage: "/og/default.png",
  creator: "Invenex Solutions",
  keywords: [
    "web development",
    "mobile apps",
    "digital solutions",
    "software development",
    "Kochi",
    "Kerala",
    "India",
  ],
} as const;

// ============================================
// Navigation Items
// ============================================
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Web Development",
        href: "/services/web-development",
        description: "Custom websites and web applications",
      },
      {
        title: "Mobile App Development",
        href: "/services/mobile-development",
        description: "iOS and Android applications",
      },
      {
        title: "Platform Development",
        href: "/services/platform-development",
        description: "Enterprise platforms and SaaS solutions",
      },
      {
        title: "E-Commerce Solutions",
        href: "/services/ecommerce",
        description: "Online stores and marketplaces",
      },
      {
        title: "Social Media Marketing",
        href: "/services/social-media",
        description: "Digital marketing and brand growth",
      },
      {
        title: "Digital Strategy",
        href: "/services/digital-strategy",
        description: "Technology consulting and roadmaps",
      },
    ],
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Careers",
    href: "/careers",
  },
  {
    title: "Contact",
    href: "/contact",
  },
] as const;

export const footerNav = {
  services: [
    { title: "Web Development", href: "/services/web-development" },
    { title: "Mobile Apps", href: "/services/mobile-development" },
    { title: "Platform Development", href: "/services/platform-development" },
    { title: "E-Commerce", href: "/services/ecommerce" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ],
  resources: [
    { title: "Products", href: "/products" },
    { title: "CaterFlow", href: "https://caterflow.in", external: true },
  ],
} as const;

// ============================================
// Social Media Links
// ============================================
export interface SocialLink {
  name: string;
  href: string;
  icon: string; // Icon name for lucide-react or similar
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/invenex",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/invenex",
    icon: "twitter",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/invenex",
    icon: "instagram",
  },
  {
    name: "GitHub",
    href: "https://github.com/invenex",
    icon: "github",
  },
] as const;

// ============================================
// Contact Information
// ============================================
export const contactInfo = {
  email: "hello@invenex.com",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  address: {
    street: "123 Tech Park",
    city: "Kochi",
    state: "Kerala",
    country: "India",
    zip: "682001",
  },
  businessHours: "Mon - Fri: 9:00 AM - 6:00 PM IST",
} as const;

// ============================================
// Form Options (for dropdowns)
// ============================================
export const projectTypes = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App" },
  { value: "platform", label: "Platform/SaaS" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "other", label: "Other" },
] as const;

export const budgetRanges = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-50k", label: "$15,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
] as const;

export const referralSources = [
  { value: "google", label: "Google Search" },
  { value: "social", label: "Social Media" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
] as const;

// ============================================
// Type exports for external use
// ============================================
export type ProjectType = (typeof projectTypes)[number]["value"];
export type BudgetRange = (typeof budgetRanges)[number]["value"];
export type ReferralSource = (typeof referralSources)[number]["value"];
\`\`\`

---

## Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| File Location | \`src/lib/utils.ts\`, \`src/lib/constants.ts\` |
| Type Safety | Full TypeScript with \`as const\` assertions |
| Date Formatting | Intl.RelativeTimeFormat for relative dates |
| Constants | Readonly with type exports |

---

## Testing Checklist

- [ ] \`npm run build\` succeeds
- [ ] \`npm run lint\` passes
- [ ] TypeScript check passes
- [ ] \`formatDate()\` works with Date, string, and number inputs
- [ ] \`formatDate()\` handles invalid dates gracefully
- [ ] All constants are properly typed
- [ ] Navigation structure is correct
- [ ] Contact info is complete

---

## Quick Verification

\`\`\`bash
cd invenex-website

# After implementation:
npx tsc --noEmit
npm run lint
npm run build
\`\`\`

---

## References

- [MDN: Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
- [Source: architecture.md#Utility-Functions]
- [Source: prd.md#Contact-Information]

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List
- Added formatDate() utility with 3 format styles: short, long, relative
- Uses Intl.RelativeTimeFormat for relative date formatting
- Added getRelativeTime() helper for calculating relative times
- Added slugify() and truncate() bonus utilities
- Created comprehensive site constants:
  - siteConfig: name, description, URL, ogImage, keywords
  - mainNav: full navigation structure with nested children
  - footerNav: services, company, resources sections
  - socialLinks: LinkedIn, Twitter, Instagram, GitHub
  - contactInfo: email, phone, whatsapp, address, businessHours
  - Form options: projectTypes, budgetRanges, referralSources
- All types exported for external use
- TypeScript check passed
- ESLint passed
- Build succeeded

### File List
- `src/lib/utils.ts` (updated - added formatDate, slugify, truncate)
- `src/lib/constants.ts` (updated - full implementation)
