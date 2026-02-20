---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation', 'v2.1-step-01-validate-prerequisites', 'v2.1-step-02-design-epics', 'v2.1-step-03-create-stories', 'v2.1-step-04-final-validation']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
workflowType: 'create-epics-and-stories'
project_name: 'Invenex Solutions Website'
user_name: 'Seb'
date: '2026-01-18'
v21_date: '2026-02-20'
status: 'complete'
totalEpics: 13
totalStories: 78
v21Epics: [12, 13, 14]
v21Stories: 18
---

# Invenex Solutions Website - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Invenex Solutions Website, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories organized by **user value**.

## Requirements Inventory

### Functional Requirements

**Content Presentation (FR1-FR7):**
- FR1: Visitors can view homepage with company overview, services preview, portfolio highlights, and CTA
- FR2: Visitors can view About page with company story, team members, and values
- FR3: Visitors can browse all services offered
- FR4: Visitors can view detailed information about each individual service
- FR5: Visitors can view Products page showcasing CaterFlow and Invenex ERP
- FR6: Visitors can navigate between all pages using main navigation with mega-menu for Services
- FR7: Visitors can navigate the site on mobile via responsive navigation (hamburger menu)

**Portfolio & Case Studies (FR8-FR13):**
- FR8: Visitors can browse portfolio of completed projects
- FR9: Visitors can filter portfolio projects by category (web, mobile, platform)
- FR10: Visitors can view detailed case studies with challenge, solution, and results
- FR11: Visitors can view project images in gallery format within case studies
- FR12: Visitors can see technologies used for each project
- FR13: Visitors can read client testimonials associated with projects

**Lead Generation (FR14-FR19):**
- FR14: Visitors can submit quote request with name, email, project type, description
- FR15: Visitors can select budget range when requesting quote
- FR16: Visitors can specify how they heard about the company
- FR17: Visitors receive confirmation after submitting quote request
- FR18: Visitors can initiate WhatsApp conversation via floating button
- FR19: Team receives email notification when quote request is submitted

**Talent Acquisition (FR20-FR27):**
- FR20: Visitors can view Careers page with company culture and benefits
- FR21: Visitors can browse open job positions
- FR22: Visitors can filter job listings by department
- FR23: Visitors can view detailed job descriptions with requirements and responsibilities
- FR24: Visitors can apply with name, email, phone, resume, optional cover letter
- FR25: Visitors can include portfolio URL when applying
- FR26: Applicants receive confirmation after submitting application
- FR27: HR receives email notification with resume attachment

**Content Management (FR28-FR35):**
- FR28: Admins can authenticate to access CMS
- FR29: Admins can create, edit, delete portfolio projects
- FR30: Admins can create, edit, delete job listings
- FR31: Admins can create, edit, delete team member profiles
- FR32: Admins can create, edit, delete client testimonials
- FR33: Admins can create, edit, delete service descriptions
- FR34: Admins can preview content changes before publishing
- FR35: Admins can upload and manage images for projects and team

**User Engagement & Sharing (FR36-FR41):**
- FR36: Visitors can share any page via social media (Twitter, LinkedIn, Facebook)
- FR37: Visitors can copy page URL to clipboard
- FR38: Shared links display rich previews (Open Graph)
- FR39: Visitors experience smooth page transitions when navigating
- FR40: Visitors experience scroll-triggered animations
- FR41: Visitors experience hover effects on interactive elements

**Search Engine Discoverability (FR42-FR46):**
- FR42: Search engines can crawl all public pages
- FR43: Each page has unique, descriptive meta title and description
- FR44: Site provides structured data for organization and services
- FR45: Site generates and serves XML sitemap
- FR46: Site provides robots.txt with crawling instructions

**Accessibility & Performance (FR47-FR50):**
- FR47: Visitors can navigate entire site using keyboard only
- FR48: Visitors using screen readers can understand all content
- FR49: Visitors with reduced motion preference see simplified animations
- FR50: Visitors on slow connections experience progressive content loading

**Blog & Content — v2.1 (FR51-FR62):**
- FR51: Visitors can view Blog index with featured post hero and article grid
- FR52: Visitors can filter blog posts by category (AI & ML, Cybersecurity, Startups, Hardware, Cloud, Enterprise)
- FR53: Visitors can read individual blog post detail pages with full content
- FR54: Blog posts display source attribution linking to original TechCrunch articles
- FR55: Visitors can view "This Week's Top Stories" numbered digest section
- FR56: Visitors can subscribe to weekly newsletter via email input
- FR57: Newsletter subscribers receive weekly tech digest email
- FR58: Blog posts are auto-created via Make.com from RSS.app TechCrunch feed into Sanity CMS
- FR59: Admins can create, edit, delete blog posts via Sanity CMS
- FR60: Blog posts display reading time, author, date, and category
- FR61: Visitors can view related posts at bottom of each article
- FR62: Visitors can share blog posts via LinkedIn, Twitter/X, or copy link

**About Page Redesign — v2.1 (FR63-FR66):**
- FR63: About page displays cinematic timeline of company milestones with progressive scroll animation
- FR64: About page shows animated values section with glassmorphic cards and hover expansion
- FR65: About page features editorial-style team section with hover-reveal quotes and social links
- FR66: About page includes animated stats band with counter animations on scroll

**Contact Page Redesign — v2.1 (FR67-FR70):**
- FR67: Contact form uses progressive 3-step flow (service selection → project details → personal info)
- FR68: Contact form step 1 allows multi-select of service categories via interactive cards
- FR69: Contact page displays social proof strip with client count and logos
- FR70: Contact page shows alternative CTA section for phone/WhatsApp preference

### Non-Functional Requirements

**Performance (NFR1-NFR8):**
- NFR1: Page load time < 2 seconds (First Contentful Paint)
- NFR2: Largest Contentful Paint < 2.5 seconds
- NFR3: Interaction to Next Paint < 200ms
- NFR4: Cumulative Layout Shift < 0.1
- NFR5: Lighthouse Performance score ≥ 90
- NFR6: Time to First Byte < 600ms
- NFR7: Initial bundle size < 200KB (JS)
- NFR8: Image optimization with WebP/AVIF and fallback

**Security (NFR9-NFR15):**
- NFR9: HTTPS enforcement
- NFR10: Admin authentication with session management
- NFR11: Form validation server-side via Zod
- NFR12: XSS prevention via React default escaping
- NFR13: CSRF protection via NextAuth.js
- NFR14: Security headers (X-Frame-Options, CSP)
- NFR15: Environment secrets server-only

**Accessibility (NFR16-NFR21):**
- NFR16: WCAG 2.1 Level AA compliance
- NFR17: Color contrast ≥ 4.5:1 for text
- NFR18: 100% keyboard navigation
- NFR19: Screen reader support with semantic HTML and ARIA
- NFR20: Respect prefers-reduced-motion
- NFR21: Visible focus indicators on all interactive elements

**Integration (NFR22-NFR26):**
- NFR22: CMS availability 99.9% uptime (Sanity.io SLA)
- NFR23: Email delivery > 95% rate (Resend with SPF/DKIM)
- NFR24: Real-time analytics (Vercel Analytics)
- NFR25: Global edge caching (Vercel Edge)
- NFR26: Automatic image optimization (Sanity + next/image)

**Reliability (NFR27-NFR30):**
- NFR27: Site availability 99.9% uptime
- NFR28: Graceful error handling via error boundaries
- NFR29: Basic offline page via service worker
- NFR30: Successful builds on every deploy (CI/CD)

**Maintainability (NFR31-NFR34):**
- NFR31: TypeScript strict mode
- NFR32: Zero ESLint errors
- NFR33: Component-level code comments
- NFR34: No-code content updates via Sanity Studio

**v2.1 Integration & Content (NFR35-NFR37):**
- NFR35: Make.com webhook integration maintains reliable content pipeline (99%+ successful posts to Sanity)
- NFR36: Blog pages maintain Lighthouse 90+ with dynamic content loading
- NFR37: Newsletter subscribe integrates with email service (Resend) for automated weekly delivery

### Additional Requirements

**From Architecture:**
- Starter template: `create-next-app@latest` with TypeScript, Tailwind, ESLint, App Router, src-dir, Turbopack
- Upgrade to Tailwind CSS v4 post-initialization
- RSC-first architecture: Server Components by default, Client Components only for interactivity
- Server Actions for form submissions (`submitQuoteRequest`, `submitJobApplication`)
- API Routes for webhooks (`/api/sanity/revalidate`)
- ISR with on-demand revalidation via cache tags
- GSAP lazy loading for complex scroll animations
- NextAuth.js v5 for admin authentication
- Resend for transactional email
- Vercel deployment (Mumbai region - bom1)

**From UX Design:**
- Premium black/white aesthetic (#0A0A0A background, #FAFAFA foreground)
- Aceternity UI components (Bento Grid, Spotlight, Text Reveal, Card Hover Effect)
- Magic UI components (Blur Fade, Marquee, Animated Beam)
- Framer Motion for page transitions and micro-interactions
- Mobile-first responsive design
- 8px spacing grid system
- Inter font family
- Premium animation easing: cubic-bezier(0.16, 1, 0.3, 1)

**From UX Design v2.1 (New Pages):**
- About: Cinematic timeline with GSAP drawSVG/path animation for progressive line draw
- About: Editorial team section with magazine-style layout and hover-reveal quotes
- About: Animated stats band using AnimatedCounter component
- Contact: Progressive 3-step form with service selection cards (2x2 glassmorphic grid)
- Contact: Step transitions via GSAP x-tween slide (400ms, power3.out)
- Contact: Social proof strip with client count marquee
- Blog: Magazine-style "The Invenex Weekly" masthead hero
- Blog: Featured post full-width card with gradient abstract image
- Blog: Category filter bar with coral active state pills
- Blog: 3-column glassmorphic article card grid with stagger entrance
- Blog: "This Week's Top Stories" numbered digest (large coral numbers)
- Blog: Newsletter subscribe glassmorphic banner with email input
- Blog: Post detail page with max-width 720px reading column, share sidebar
- Blog: Source attribution banner linking to TechCrunch
- Blog: Related posts section (3 cards, same category)

**From Architecture (Blog Routes — Already Defined):**
- `/blog` route: SSG + ISR (3600s + on-demand revalidation)
- `/blog/[slug]` route: SSG with on-demand revalidation
- Sanity `blogPost` schema needed (title, slug, excerpt, body, category, author, publishedAt, readingTime, featuredImage, sourceUrl, sourceName, isWeeklyDigest, weekNumber)
- Make.com → Sanity HTTP module: POST to `/v1/data/mutate/{dataset}` for automated blog creation
- "Blog" added to primary navigation array in constants.ts
- Category-based gradient fallback images when posts lack featured images

### FR Coverage Map

| FR | Epic | Story | Description |
|----|------|-------|-------------|
| FR1 | 3 | 3.1-3.5 | Homepage sections (Hero, Services, Portfolio, Products+Process, Social+CTA) |
| FR2 | 3 | 3.6 | About page |
| FR3 | 3 | 3.7 | Services overview page |
| FR4 | 3 | 3.8 | Service detail pages |
| FR5 | 3 | 3.9 | Products page |
| FR6 | 2 | 2.2 | Navbar with mega-menu |
| FR7 | 2 | 2.3 | Mobile navigation |
| FR8 | 4 | 4.1 | Portfolio grid |
| FR9 | 4 | 4.2 | Portfolio filtering |
| FR10 | 4 | 4.3 | Case study pages |
| FR11 | 4 | 4.3 | Project gallery |
| FR12 | 4 | 4.1 | Technology tags |
| FR13 | 4 | 4.3 | Project testimonials |
| FR14-FR16 | 5 | 5.1 | Quote request form |
| FR17 | 5 | 5.2 | Form confirmation |
| FR18 | 5 | 5.4 | WhatsApp button |
| FR19 | 5 | 5.2 | Email notifications |
| FR20 | 6 | 6.1 | Careers page |
| FR21-FR22 | 6 | 6.2 | Job listings |
| FR23 | 6 | 6.3 | Job detail pages |
| FR24-FR25 | 6 | 6.4 | Application form |
| FR26-FR27 | 6 | 6.5 | Application notifications |
| FR28 | 7 | 7.5 | Admin authentication |
| FR29-FR35 | 7 | 7.1-7.4 | CMS schemas and management |
| FR36-FR37 | 5 | 5.5 | Social sharing |
| FR38 | 8 | 8.1 | Open Graph metadata |
| FR39 | 2 | 2.5 | Page transitions |
| FR40-FR41 | 2 | 2.6 | Scroll animations |
| FR42-FR46 | 8 | 8.1-8.3 | SEO implementation |
| FR47-FR50 | 8 | 8.4-8.5 | Accessibility |

## Epic List

### Epic 1: Project Foundation & Design System
Initialize the Next.js 15 project with Tailwind CSS 4, create the design system tokens, and build the base UI component library that all other epics depend on.
**FRs covered:** Foundation for all FRs
**NFRs covered:** NFR1-NFR8, NFR31-NFR32

### Epic 2: Site Shell & Navigation
Create the site-wide layout shell including header, footer, navigation systems, and page transition infrastructure.
**FRs covered:** FR6, FR7, FR39, FR40, FR41
**Status:** TESTED - 2026-01-19
**Overall Score:** 78/100

#### Epic 2 Production Test Report (2026-01-19)

| Story | Component | Score | Status | Issues |
|-------|-----------|-------|--------|--------|
| 2.1 | Root Layout & Font | 95/100 | ✅ PASS | Minor: needs visual polish |
| 2.2 | Navbar + Mega-Menu | 80/100 | ⚠️ PARTIAL | Icons 404, mega-menu works |
| 2.3 | Mobile Navigation | 85/100 | ✅ PASS | Icons as letters (L,T,I,G) |
| 2.4 | Footer Component | 80/100 | ✅ PASS | Icon fonts broken |
| 2.5 | Page Transitions | 60/100 | ❌ DEFERRED | All target pages 404 |
| 2.6 | Scroll Animations | 70/100 | ⚠️ PARTIAL | Can't verify - missing content |

**Lighthouse Scores:**
| Device | Performance | Accessibility | Best Practices | SEO |
|--------|-------------|---------------|----------------|-----|
| Desktop | 73% ❌ | 96% ✅ | 96% ✅ | 100% ✅ |
| Mobile | 97% ✅ | 96% ✅ | 100% ✅ | 100% ✅ |

**Critical Blockers Found:**
1. ALL navigation pages return 404: /services, /portfolio, /products, /careers, /contact
2. Homepage showing demo components instead of actual content (Epic 1 showcase)
3. Icon fonts not loading - multiple 404 errors in console
4. Desktop performance (73%) below NFR5 target (≥90%)

**What Works:**
- Root layout with Inter font + dark theme (#0A0A0A)
- Navbar with all 5 navigation links + "Get a Quote" CTA
- Mega-menu for Services showing all 6 services with descriptions
- Mobile hamburger menu with full overlay, close button, social links
- Footer with grouped navigation, contact info, back-to-top
- Skip to main content accessibility link
- Semantic HTML structure (banner, main, contentinfo)

**Deferred/Blocked:**
- Page transitions can't be verified (pages don't exist)
- Scroll animations can't be verified (no scrollable content)
- Header blur-on-scroll effect (needs actual content)

### Epic 3: Homepage & Marketing Pages
Build the homepage and all marketing content pages (About, Services, Products) that showcase company capabilities.
**FRs covered:** FR1, FR2, FR3, FR4, FR5

### Epic 4: Portfolio & Case Studies
Implement the portfolio showcase with filtering and detailed case study pages that prove company expertise.
**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR13

### Epic 5: Lead Generation & Contact
Build the contact and quote request system with form handling, email notifications, WhatsApp integration, and social sharing.
**FRs covered:** FR14, FR15, FR16, FR17, FR18, FR19, FR36, FR37

### Epic 6: Careers & Recruitment
Create the careers section with job listings, filtering, detail pages, and application system with file upload.
**FRs covered:** FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27

### Epic 7: Content Management System
Set up Sanity Studio with all content schemas, webhook revalidation, and admin authentication.
**FRs covered:** FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35

### Epic 8: SEO, Accessibility & Performance
Implement SEO infrastructure, accessibility compliance, and performance optimization to meet all quality requirements.
**FRs covered:** FR38, FR42, FR43, FR44, FR45, FR46, FR47, FR48, FR49, FR50
**NFRs covered:** NFR1-NFR21

### Epic 9: Premium UI/UX Enhancement (Stokt-Inspired)
Transform Invenex into an award-worthy digital experience with sophisticated GSAP animations, bold typography-driven design (inspired by Stokt Creative), refined micro-interactions, and visual polish. Consolidates former Epic 10 (Stokt-Inspired Design).
**FRs covered:** FR39, FR40, FR41 (enhanced)
**NFRs covered:** NFR1-NFR8 (maintained), NFR16-NFR21 (enhanced)

### Epic 11: Content & Real Assets
Replace placeholder content with real business assets to make the site production-ready and authentic.
**Dependencies:** Epic 7, Epic 3, Epic 4

---

## Epic 1: Project Foundation & Design System

**Goal:** Initialize the Next.js 15 project with Tailwind CSS 4, create the design system tokens, and build the base UI component library that enables all future development.

### Story 1.1: Project Initialization with Next.js 15

As a **developer**,
I want **a properly initialized Next.js 15 project with the correct configuration**,
So that **I have a solid foundation for building the Invenex website**.

**Acceptance Criteria:**

**Given** I am setting up a new project
**When** I run the initialization command
**Then** the project is created with:
- Next.js 15 with App Router
- TypeScript in strict mode
- Tailwind CSS (to be upgraded to v4)
- ESLint with Next.js recommended rules
- `src/` directory structure
- `@/*` import alias
- Turbopack for development

**Given** the project is initialized
**When** I upgrade to Tailwind CSS v4
**Then** the configuration uses:
- `@tailwindcss/postcss` plugin
- CSS-based configuration via `@import "tailwindcss"`
- No legacy `tailwind.config.js` for basic setup

**Given** the project is configured
**When** I run `npm run dev`
**Then** the development server starts without errors on port 3000

---

### Story 1.2: Design System Tokens Configuration

As a **developer**,
I want **a complete design token system configured in Tailwind CSS**,
So that **all components use consistent colors, typography, spacing, and animations**.

**Acceptance Criteria:**

**Given** I am configuring the design system
**When** I set up the color tokens
**Then** the following colors are defined:
- `background`: #0A0A0A (primary), #141414 (secondary), #1A1A1A (tertiary)
- `foreground`: #FAFAFA (primary), #A3A3A3 (muted), #737373 (subtle)
- `border`: #262626 (default), #404040 (hover)
- `accent`: #FFFFFF
- Semantic colors: success (#22C55E), warning (#F59E0B), error (#EF4444), info (#3B82F6)

**Given** I am configuring typography
**When** I set up the font system
**Then** Inter font is loaded with:
- Variable font for optimal performance
- Font weights: 400, 500, 600, 700
- Type scale from caption (12px) to hero (96px)

**Given** I am configuring spacing
**When** I set up the spacing scale
**Then** an 8px base grid is established with tokens from space-1 (4px) to space-32 (128px)

**Given** I am configuring animations
**When** I set up animation tokens
**Then** the following are defined:
- Durations: fast (150ms), normal (300ms), slow (500ms)
- Easing: ease-out `cubic-bezier(0.16, 1, 0.3, 1)`

---

### Story 1.3: Base UI Components - Button & Input

As a **developer**,
I want **reusable Button and Input components with all variants**,
So that **forms and CTAs maintain design consistency throughout the site**.

**Acceptance Criteria:**

**Given** I need a Button component
**When** I use the Button with different variants
**Then** it supports:
- Variants: primary (white bg, black text), secondary (transparent, white border), ghost (no border), link (underline)
- Sizes: sm, md, lg
- States: default, hover (scale 1.02, glow), active (scale 0.98), disabled (50% opacity), loading (spinner)
- Full rounded corners (rounded-full)
- Proper focus states for accessibility

**Given** I need an Input component
**When** I use the Input for forms
**Then** it supports:
- Types: text, email, tel, textarea
- States: default, focused (white border glow), error (red border), disabled
- Label above input (not placeholder-only)
- Error message display below field
- Proper ARIA attributes for accessibility

---

### Story 1.4: Base UI Components - Card & Badge

As a **developer**,
I want **reusable Card and Badge components**,
So that **content containers and status indicators are consistent**.

**Acceptance Criteria:**

**Given** I need a Card component
**When** I use the Card for content
**Then** it supports:
- Variants: default, elevated, interactive
- Hover effect: border glow, subtle shadow
- Spotlight effect on hover (gradient radial from white/5)
- Proper padding following spacing system
- Rounded corners (16px)

**Given** I need a Badge component
**When** I use the Badge for categories/status
**Then** it supports:
- Variants: default, success, warning, error, info
- Sizes: sm, md
- Proper contrast for accessibility

---

### Story 1.5: Utility Functions & Constants

As a **developer**,
I want **utility functions and site constants configured**,
So that **common operations and configuration are centralized**.

**Acceptance Criteria:**

**Given** I need utility functions
**When** I import from `@/lib/utils`
**Then** I have access to:
- `cn()` function for conditional class merging (clsx + tailwind-merge)
- `formatDate()` for consistent date formatting
- Type-safe utility functions

**Given** I need site configuration
**When** I import from `@/lib/constants`
**Then** I have access to:
- Site metadata (name, description, URL)
- Navigation items structure
- Social media links
- Contact information

---

## Epic 2: Site Shell & Navigation

**Goal:** Create the site-wide layout shell including header, footer, navigation systems, and page transition infrastructure that wraps all pages.

---

### Story 2.1: Root Layout & Font Configuration
**Test Score: 95/100** | **Status: ✅ PASS**
**Tested:** 2026-01-19 via Playwright MCP + Lighthouse

As a **visitor**,
I want **the site to load with proper fonts and base styling**,
So that **I experience the premium visual quality immediately**.

**Acceptance Criteria:**

**Given** I visit any page on the site
**When** the page loads
**Then** the root layout includes:
- Inter font loaded via next/font
- Dark theme applied (bg-background, text-foreground)
- Proper viewport meta tag
- Base metadata configured

**Given** the layout renders
**When** I inspect the HTML
**Then** semantic structure is correct:
- `<html>` with lang attribute
- Proper `<head>` with charset and viewport
- `<body>` with font classes applied

---

### Story 2.2: Navbar with Mega-Menu
**Test Score: 80/100** | **Status: ⚠️ PARTIAL**
**Tested:** 2026-01-19 | **Issues:** Icon fonts 404, mega-menu functional

As a **visitor**,
I want **a professional navigation bar with a mega-menu for services**,
So that **I can easily navigate to any section of the site**.

**Acceptance Criteria:**

**Given** I am on any page
**When** I view the header
**Then** I see:
- Logo on the left (links to homepage)
- Navigation links: Services, Portfolio, Products, Careers, Contact
- "Get a Quote" CTA button on the right
- Transparent background on hero sections
- Blur backdrop when scrolled (after 100px)

**Given** I hover over "Services" in the navigation
**When** the mega-menu appears
**Then** it displays:
- All 6 service categories with icons
- Brief description for each service
- Links to individual service pages
- Smooth fade-in animation

**Given** I scroll down the page
**When** the header becomes sticky
**Then** it:
- Has blur backdrop effect
- Shows/hides based on scroll direction (show on scroll up)
- Maintains all functionality

---

### Story 2.3: Mobile Navigation
**Test Score: 85/100** | **Status: ✅ PASS**
**Tested:** 2026-01-19 | **Issues:** Social icons as letters (L,T,I,G)

As a **mobile visitor**,
I want **a responsive hamburger menu**,
So that **I can navigate the site on my phone**.

**Acceptance Criteria:**

**Given** I am on a mobile device (< 1024px)
**When** I view the header
**Then** I see:
- Logo on the left
- Hamburger menu icon on the right
- No desktop navigation links visible

**Given** I tap the hamburger menu
**When** the mobile menu opens
**Then** it:
- Displays full-screen overlay with fade-in
- Shows all navigation links with large touch targets (48px min)
- Includes "Get a Quote" CTA
- Has close button (X) in top-right
- Includes social links at bottom

**Given** I tap a navigation link
**When** the page navigates
**Then** the mobile menu closes automatically

**Given** I tap outside the menu or press Escape
**When** the action is detected
**Then** the menu closes with fade-out animation

---

### Story 2.4: Footer Component
**Test Score: 80/100** | **Status: ✅ PASS**
**Tested:** 2026-01-19 | **Issues:** Icon fonts broken, otherwise complete

As a **visitor**,
I want **a comprehensive footer with navigation and contact info**,
So that **I can find additional information and links**.

**Acceptance Criteria:**

**Given** I scroll to the bottom of any page
**When** I view the footer
**Then** I see:
- Company logo and brief description
- Navigation links grouped by category (Services, Company, Resources)
- Contact information (email, phone, address)
- Social media links (LinkedIn, Twitter, Instagram, GitHub)
- Copyright notice with current year
- "Back to top" functionality

**Given** the footer renders
**When** I interact with links
**Then** all links are:
- Properly styled with hover effects
- Accessible via keyboard
- External links open in new tab with proper rel attributes

---

### Story 2.5: Page Transitions with Framer Motion
**Test Score: 60/100** | **Status: ❌ DEFERRED**
**Tested:** 2026-01-19 | **Blocker:** ALL target pages return 404

As a **visitor**,
I want **smooth transitions between pages**,
So that **navigation feels premium and polished**.

**Acceptance Criteria:**

**Given** I click a navigation link
**When** the page transition occurs
**Then** the transition:
- Fades out current page (150ms)
- Routes to new page
- Fades in new page (300ms)
- Uses ease-out easing curve

**Given** I have `prefers-reduced-motion` enabled
**When** page transitions occur
**Then** animations are:
- Reduced to simple instant transitions
- No fade effects applied
- Navigation still functions correctly

---

### Story 2.6: Scroll Animation Infrastructure
**Test Score: 70/100** | **Status: ⚠️ PARTIAL**
**Tested:** 2026-01-19 | **Blocker:** No scrollable content to verify animations

As a **visitor**,
I want **sections to animate as they come into view**,
So that **the browsing experience feels dynamic and engaging**.

**Acceptance Criteria:**

**Given** I am scrolling through a page
**When** a section enters the viewport
**Then** it animates with:
- Fade-up effect (opacity 0→1, y 40→0)
- Duration of 600ms
- Staggered children (100ms delay between items)
- `viewport={{ once: true }}` - only animates once

**Given** I have `prefers-reduced-motion` enabled
**When** sections would animate
**Then** they appear instantly without motion

**Given** the animation infrastructure is built
**When** I use the `AnimatedSection` component
**Then** I can easily wrap any content for scroll-triggered reveals

---

## Epic 3: Homepage & Marketing Pages

**Goal:** Build the homepage and all marketing content pages that showcase company capabilities and convert visitors into leads.

### Story 3.1: Homepage Hero

As a **potential client**,
I want **a commanding hero section that immediately establishes Invenex as premium**,
So that **I'm engaged within the first seconds of landing on the site**.

**Acceptance Criteria:**

**Given** I land on the homepage
**When** the page loads
**Then** I see the Hero section with:
- Bold headline with text reveal animation (GSAP timeline)
- Subtext explaining the value proposition
- Two CTAs: "Get a Quote" (primary) and "View Our Work" (secondary)
- Coral sphere / ambient background effect
- Fast LCP (< 2.5s)

**Given** I am on mobile
**When** the hero renders
**Then** simplified animation (no mouse tracking), stacked layout

**Given** I have `prefers-reduced-motion` enabled
**When** the hero loads
**Then** content appears instantly without animation

**Files:** `src/components/sections/hero-v2.tsx`

---

### Story 3.2: Homepage Services Preview

As a **potential client**,
I want **a services preview that showcases Invenex's capabilities**,
So that **I quickly understand what they offer without leaving the homepage**.

**Acceptance Criteria:**

**Given** I scroll past the hero
**When** I view the Services section
**Then** I see:
- Editorial expanding list layout
- 6 service entries with titles and descriptions
- ClipPath image reveal on hover/expand
- Link to full Services page
- Scroll-triggered entrance animations

**Given** I am on mobile
**When** the services section renders
**Then** accordion-style layout with tap to expand

**Files:** `src/components/sections/services-preview.tsx`

---

### Story 3.3: Homepage Portfolio Preview

As a **potential client**,
I want **a portfolio showcase highlighting featured work**,
So that **I can evaluate the quality of Invenex's projects**.

**Acceptance Criteria:**

**Given** I continue scrolling
**When** I view the Portfolio Showcase section
**Then** I see:
- 3-4 featured project cards
- Cursor parallax effect on hover
- ClipPath hover image reveal
- Project category badges
- Link to full Portfolio page

**Given** I hover over a project card
**When** hover is active
**Then** image reveals with smooth clipPath transition

**Files:** `src/components/sections/portfolio-preview.tsx`

---

### Story 3.4: Homepage Products & Process

As a **visitor**,
I want **to see Invenex's products and how they work**,
So that **I understand their full capabilities and process**.

**Acceptance Criteria:**

**Given** I view the Products section
**When** it renders
**Then** I see:
- CaterFlow 3D showcase with floating metrics
- Invenex ERP teaser
- Clear differentiation messaging ("We build our own products")

**Given** I view the How We Work section
**When** it renders
**Then** I see:
- Pinned horizontal scroll animation (GSAP ScrollTrigger)
- Process steps revealed progressively
- Context panel with supporting content

**Given** I am on mobile
**When** these sections render
**Then** vertical stacked layout replaces horizontal scroll

**Files:** `src/components/sections/products-preview.tsx`, `src/components/sections/why-choose-us.tsx`

---

### Story 3.5: Homepage Social Proof & CTA

As a **potential client**,
I want **social proof and a compelling call-to-action**,
So that **I'm convinced to reach out after seeing testimonials and social presence**.

**Acceptance Criteria:**

**Given** I view the Testimonials section
**When** it renders
**Then** I see:
- GSAP marquee animation with testimonial cards
- Client logo ticker (grayscale)
- Smooth infinite scroll effect

**Given** I view the Social Showcase section
**When** it renders
**Then** I see:
- Fanned card layout (Lando Norris style)
- Instagram/social media content previews

**Given** I view the CTA section
**When** it renders
**Then** I see:
- Character-by-character scroll scrub headline
- Clear call-to-action for quote request
- Two CTAs linking to contact/portfolio

**Files:** `src/components/sections/testimonials.tsx`, `src/components/sections/instagram-reels.tsx`, `src/components/sections/cta-section.tsx`

---

### Story 3.6: About Page

As a **visitor**,
I want **to learn about Invenex's story, team, and values**,
So that **I can trust them as a partner**.

**Acceptance Criteria:**

**Given** I navigate to the About page
**When** the page loads
**Then** I see:
- Hero section with company tagline
- Company story section with timeline or narrative
- Mission and values section
- Team grid with member cards (photo, name, role)
- Office/culture photos (if available)

**Given** I view a team member card
**When** I hover over it
**Then** it displays:
- Hover scale effect
- Social links reveal (LinkedIn)
- Smooth transitions

---

### Story 3.7: Services Overview Page

As a **potential client**,
I want **to see all services Invenex offers**,
So that **I can find the right solution for my needs**.

**Acceptance Criteria:**

**Given** I navigate to the Services page
**When** the page loads
**Then** I see:
- Hero section with "Our Services" headline
- Grid of 6 service cards (large format)
- Each card shows: icon, title, description, "Learn More" link
- Process section explaining how they work
- Technologies section showing tech stack logos
- CTA for consultation

**Given** I click on a service card
**When** the navigation occurs
**Then** I am taken to the individual service detail page

---

### Story 3.8: Service Detail Pages

As a **potential client**,
I want **detailed information about a specific service**,
So that **I can understand if it meets my needs**.

**Acceptance Criteria:**

**Given** I navigate to a service detail page (e.g., /services/web-development)
**When** the page loads
**Then** I see:
- Service title and comprehensive description
- Key features/benefits list
- Relevant portfolio examples
- Technologies used for this service
- Process steps for this service type
- CTA to request a quote for this service

**Given** 6 service pages exist
**When** each is accessed
**Then** unique content is displayed for:
- Web Development
- Mobile App Development
- Platform Development
- E-Commerce Solutions
- Social Media Marketing
- Digital Strategy

---

### Story 3.9: Products Page

As a **visitor**,
I want **to see Invenex's own products**,
So that **I understand they don't just build for clients but create their own solutions**.

**Acceptance Criteria:**

**Given** I navigate to the Products page
**When** the page loads
**Then** I see:
- Hero section emphasizing "We Build Our Own Products"
- CaterFlow showcase section with:
  - Product logo/branding
  - Description of the catering ERP
  - Key features list
  - Screenshot or demo video
  - Link to caterflow.in (external)
- Invenex ERP teaser section with:
  - "Coming Soon" badge
  - Brief description (Zoho One alternative)
  - Interest signup or notification option

**Given** I click the CaterFlow link
**When** the navigation occurs
**Then** it opens in a new tab with proper rel attributes

---

## Epic 4: Portfolio & Case Studies

**Goal:** Implement the portfolio showcase with filtering and detailed case study pages that prove company expertise to potential clients.

### Story 4.1: Portfolio Grid Page

As a **potential client**,
I want **to browse all completed projects**,
So that **I can evaluate the quality of Invenex's work**.

**Acceptance Criteria:**

**Given** I navigate to the Portfolio page
**When** the page loads
**Then** I see:
- Hero section with "Our Work" headline and project count
- Filter tabs for categories: All, Web, Mobile, Platform, E-Commerce
- Grid of project cards (responsive: 1 col mobile, 2 tablet, 3 desktop)
- Each card shows: thumbnail, client name, project type, brief excerpt

**Given** I hover over a project card
**When** the hover effect activates
**Then** I see:
- Image zoom effect
- Border glow
- Overlay with "View Case Study" text

**Given** I click on a project card
**When** the navigation occurs
**Then** I am taken to the case study detail page

---

### Story 4.2: Portfolio Filtering

As a **potential client**,
I want **to filter projects by category**,
So that **I can find relevant examples for my project type**.

**Acceptance Criteria:**

**Given** I am on the Portfolio page
**When** I click a filter tab (e.g., "Mobile")
**Then**:
- The tab becomes active (highlighted)
- Projects filter to show only that category
- Animation shows cards fading out/in
- URL updates with query param (?category=mobile)

**Given** I click "All" filter
**When** the filter applies
**Then** all projects are displayed

**Given** I share a filtered URL
**When** someone opens the link
**Then** the correct filter is pre-applied

---

### Story 4.3: Case Study Detail Pages

As a **potential client**,
I want **to read detailed case studies**,
So that **I can understand how Invenex solves real problems**.

**Acceptance Criteria:**

**Given** I navigate to a case study page
**When** the page loads
**Then** I see:
- Hero with project name, client, and featured image
- **Challenge** section: What problem the client faced
- **Solution** section: How Invenex approached it
- **Results** section: Metrics and outcomes achieved
- Project gallery with multiple images (lightbox view)
- Technologies used badges
- Client testimonial (if available)
- Related projects section
- CTA: "Start Your Project"

**Given** I click an image in the gallery
**When** the lightbox opens
**Then** I can:
- View full-size image
- Navigate between images (arrows)
- Close with X button or Escape key
- Close by clicking outside

**Given** case study content comes from Sanity CMS
**When** the page renders
**Then** rich text content is properly formatted with:
- Headings, paragraphs, lists
- Inline images with captions
- Code blocks (if applicable)

---

## Epic 5: Lead Generation & Contact

**Goal:** Build the contact and quote request system that converts visitors into leads with proper form handling, email notifications, and alternative contact methods.

### Story 5.1: Contact Page with Quote Form

As a **potential client**,
I want **to submit a quote request easily**,
So that **I can start a conversation about my project**.

**Acceptance Criteria:**

**Given** I navigate to the Contact page
**When** the page loads
**Then** I see:
- Hero section with "Let's Build Something Great" headline
- Quote request form with fields:
  - Name (required)
  - Email (required, validated)
  - Project Type (select: Web, Mobile, Platform, E-Commerce, Other)
  - Budget Range (select: <$5K, $5K-$15K, $15K-$50K, $50K+)
  - Project Description (textarea, required)
  - How did you hear about us? (optional select)
- Submit button with loading state
- Alternative contact section (email, phone, WhatsApp, address)

**Given** I fill out the form with valid data
**When** I submit the form
**Then**:
- Button shows loading spinner
- Form data is validated client-side
- Server Action processes the submission
- I see success confirmation message

**Given** I submit with invalid data
**When** validation fails
**Then**:
- Inline error messages appear below invalid fields
- Form is not submitted
- Focus moves to first error field

---

### Story 5.2: Form Submission & Email Notifications

As an **Invenex team member**,
I want **to receive email notifications for quote requests**,
So that **I can respond to leads promptly**.

**Acceptance Criteria:**

**Given** a visitor submits a valid quote request
**When** the Server Action processes it
**Then**:
- Data is validated server-side with Zod
- Notification email is sent to team via Resend
- Confirmation email is sent to the visitor
- Success response is returned to the form

**Given** the team notification email
**When** it arrives
**Then** it contains:
- Visitor's name and email
- Project type and budget range
- Full project description
- How they heard about us
- Timestamp of submission
- Reply-to set to visitor's email

**Given** the visitor confirmation email
**When** it arrives
**Then** it contains:
- Thank you message
- Summary of their submission
- Expected response timeframe
- Alternative contact methods

---

### Story 5.3: Server Actions & Form Infrastructure

As a **developer**,
I want **a robust Server Actions infrastructure for forms**,
So that **form submissions are type-safe and secure**.

**Acceptance Criteria:**

**Given** I need to handle form submissions
**When** I use the form infrastructure
**Then** I have:
- Zod schemas in `@/lib/validations/contact.ts`
- Server Actions in `@/lib/actions/contact.ts`
- `ActionResult<T>` type for consistent responses
- Resend client in `@/lib/resend.ts`
- React Email templates in `@/emails/`

**Given** the `submitContactAction` Server Action
**When** it executes
**Then** it:
- Validates input with Zod
- Returns `{ success: false, error: string }` on validation failure
- Sends emails via Resend
- Returns `{ success: true, data: { id: string } }` on success
- Handles errors gracefully

---

### Story 5.4: WhatsApp Floating Button

As a **visitor**,
I want **a quick way to contact via WhatsApp**,
So that **I can get immediate human connection**.

**Acceptance Criteria:**

**Given** I am on any page
**When** I view the bottom-right corner
**Then** I see a floating WhatsApp button with:
- WhatsApp icon
- Subtle pulse animation
- Proper z-index above other content
- Not overlapping with page content

**Given** I click the WhatsApp button
**When** the action triggers
**Then**:
- WhatsApp opens (app or web)
- Pre-filled message: "Hi! I'm interested in learning more about your services."
- Phone number is pre-configured

**Given** I am on mobile
**When** I view the button
**Then** it has:
- Larger touch target (48px minimum)
- Positioned in thumb-friendly zone
- Proper spacing from screen edge

---

### Story 5.5: Social Sharing Functionality

As a **visitor**,
I want **to share pages on social media**,
So that **I can recommend Invenex to my network**.

**Acceptance Criteria:**

**Given** I am on any page
**When** I look for sharing options
**Then** I see share buttons for:
- Twitter/X
- LinkedIn
- Facebook
- Copy link to clipboard

**Given** I click a social share button
**When** the share dialog opens
**Then**:
- Correct page URL is pre-filled
- Page title is included
- Opens in a new window (appropriate size)

**Given** I click "Copy Link"
**When** the action completes
**Then**:
- URL is copied to clipboard
- Toast notification confirms "Link copied!"
- Button shows checkmark briefly

---

## Epic 6: Careers & Recruitment

**Goal:** Create the careers section that attracts top developer talent by showcasing culture, tech stack, and making it easy to apply.

### Story 6.1: Careers Page with Culture Showcase

As a **job seeker**,
I want **to learn about Invenex's culture and benefits**,
So that **I can decide if this is a workplace I want to join**.

**Acceptance Criteria:**

**Given** I navigate to the Careers page
**When** the page loads
**Then** I see:
- Hero section with "Join Our Team" headline
- Culture statement emphasizing modern tech and growth
- "Life at Invenex" section with:
  - Office/team photos
  - Description of work environment
- Benefits grid showing:
  - Modern tech stack
  - Flexible work
  - Learning opportunities
  - Competitive compensation
- Tech stack showcase (Next.js, TypeScript, Tailwind, etc.)
- Link to open positions section

---

### Story 6.2: Job Listings with Filtering

As a **job seeker**,
I want **to browse open positions and filter by department**,
So that **I can find relevant opportunities**.

**Acceptance Criteria:**

**Given** I view the Open Positions section
**When** it renders
**Then** I see:
- Department filter tabs: All, Engineering, Design, Marketing, Operations
- Job listing cards showing:
  - Job title
  - Department badge
  - Location (Kochi, Remote, Hybrid)
  - Experience level
  - Tech stack tags (for engineering roles)
- "Apply Now" button on each card

**Given** I click a department filter
**When** the filter applies
**Then**:
- Jobs filter to show only that department
- Smooth transition animation
- Count updates

**Given** no jobs exist in a department
**When** I filter to it
**Then** I see "No open positions in this department" message

---

### Story 6.3: Job Detail Pages

As a **job seeker**,
I want **to read full job descriptions**,
So that **I can understand if I'm qualified and interested**.

**Acceptance Criteria:**

**Given** I click on a job listing
**When** the job detail page loads
**Then** I see:
- Job title and department
- Location and employment type
- Experience level required
- Job description (rich text)
- Requirements list
- Responsibilities list
- Tech stack (for engineering roles)
- Benefits reminder
- "Apply for this Position" CTA button

**Given** the job content comes from Sanity CMS
**When** the page renders
**Then** rich text content is properly formatted

---

### Story 6.4: Job Application Form

As a **job seeker**,
I want **to submit my application with resume**,
So that **I can be considered for the position**.

**Acceptance Criteria:**

**Given** I click "Apply Now" on a job
**When** the application form appears
**Then** I see fields for:
- Full Name (required)
- Email (required, validated)
- Phone Number (required)
- Resume Upload (required, PDF/DOC, max 5MB)
- Portfolio URL (optional)
- Cover Letter (optional textarea)
- Submit button

**Given** I need to upload my resume
**When** I interact with the file upload
**Then** I can:
- Click to browse files
- Drag and drop a file
- See file name after selection
- Remove selected file
- See error if wrong file type or too large

**Given** I submit a valid application
**When** the form processes
**Then**:
- Loading state shown on button
- File uploads to Vercel Blob storage
- Server Action processes submission
- Success message displays

---

### Story 6.5: Application Submission & Notifications

As an **HR team member**,
I want **to receive applications with resume attachments**,
So that **I can review candidates**.

**Acceptance Criteria:**

**Given** an application is submitted
**When** the Server Action processes it
**Then**:
- Resume is stored securely (Vercel Blob)
- Notification email sent to HR with:
  - Applicant details
  - Position applied for
  - Resume attachment or secure link
  - Portfolio link (if provided)
  - Cover letter content
- Confirmation email sent to applicant

**Given** the applicant confirmation email
**When** it arrives
**Then** it contains:
- Thank you message
- Position they applied for
- Next steps in the process
- Timeline expectations

---

## Epic 7: Content Management System

**Goal:** Set up Sanity Studio with all content schemas and webhook revalidation so admins can manage site content without developer intervention.

### Story 7.1: Sanity Studio Setup

As an **admin**,
I want **a Sanity Studio configured for the project**,
So that **I can manage all website content**.

**Acceptance Criteria:**

**Given** I need to set up Sanity
**When** the studio is configured
**Then**:
- Sanity project created with dataset
- Studio accessible at `/studio` route
- Environment variables configured:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN`
- Sanity client configured in `@/lib/sanity/client.ts`

**Given** the Sanity client is configured
**When** I use it in Server Components
**Then**:
- `useCdn: false` for ISR/tag-based revalidation
- `apiVersion` set to current date
- Type-safe query functions available

---

### Story 7.2: Content Schemas - Projects & Services

As an **admin**,
I want **schemas for portfolio projects and services**,
So that **I can manage these content types**.

**Acceptance Criteria:**

**Given** I need a Project schema
**When** it's defined in Sanity
**Then** it includes fields for:
- Title (string, required)
- Slug (auto-generated from title)
- Client name (string)
- Category (web, mobile, platform, ecommerce)
- Featured image (image with hotspot)
- Gallery images (array of images)
- Challenge (block content)
- Solution (block content)
- Results (block content)
- Technologies (array of strings)
- Testimonial (reference to testimonial)
- Featured flag (boolean)
- Published date

**Given** I need a Service schema
**When** it's defined in Sanity
**Then** it includes fields for:
- Title (string, required)
- Slug (auto-generated)
- Icon (string for icon name)
- Short description (text)
- Full description (block content)
- Features (array of strings)
- Technologies (array of strings)
- Order (number for sorting)

---

### Story 7.3: Content Schemas - Jobs & Team

As an **admin**,
I want **schemas for job listings and team members**,
So that **I can manage careers content**.

**Acceptance Criteria:**

**Given** I need a Job schema
**When** it's defined in Sanity
**Then** it includes fields for:
- Title (string, required)
- Slug (auto-generated)
- Department (engineering, design, marketing, operations)
- Location (string)
- Employment type (full-time, part-time, contract)
- Experience level (junior, mid, senior, lead)
- Description (block content)
- Requirements (array of strings)
- Responsibilities (array of strings)
- Tech stack (array of strings)
- Active flag (boolean)
- Posted date

**Given** I need a Team Member schema
**When** it's defined in Sanity
**Then** it includes fields for:
- Name (string, required)
- Role (string)
- Photo (image with hotspot)
- Bio (text)
- LinkedIn URL (url)
- Order (number for sorting)
- Active flag (boolean)

---

### Story 7.4: Content Schemas - Testimonials & Blog

As an **admin**,
I want **schemas for testimonials and future blog posts**,
So that **I can manage social proof and content marketing**.

**Acceptance Criteria:**

**Given** I need a Testimonial schema
**When** it's defined in Sanity
**Then** it includes fields for:
- Client name (string, required)
- Client role (string)
- Company (string)
- Quote (text, required)
- Photo (image, optional)
- Project reference (optional)
- Featured flag (boolean)

**Given** I need a Blog Post schema (for Growth phase)
**When** it's defined in Sanity
**Then** it includes fields for:
- Title (string, required)
- Slug (auto-generated)
- Excerpt (text)
- Featured image (image)
- Content (block content with code blocks)
- Author (reference to team member)
- Categories (array of strings)
- Published date
- SEO fields (meta title, description)

---

### Story 7.5: Webhook Revalidation & Admin Auth

As a **developer**,
I want **on-demand revalidation when content changes**,
So that **the site updates automatically after CMS edits**.

**Acceptance Criteria:**

**Given** content is published in Sanity
**When** the webhook fires
**Then**:
- Sanity sends POST to `/api/sanity/revalidate`
- Webhook validates signature with `SANITY_REVALIDATE_SECRET`
- `revalidateTag()` is called with document type
- Next.js regenerates affected pages

**Given** the revalidation API route
**When** it receives a valid webhook
**Then** it:
- Parses body with `parseBody` from `next-sanity/webhook`
- Validates signature
- Extracts document `_type`
- Calls `revalidateTag(body._type)`
- Returns 200 with confirmation

**Given** admin authentication is needed
**When** accessing Sanity Studio
**Then**:
- NextAuth.js v5 protects `/studio` route
- Credentials provider for login
- Session stored in HTTP-only cookie
- CSRF protection enabled

---

## Epic 8: SEO, Accessibility & Performance

**Goal:** Implement SEO infrastructure, accessibility compliance, and performance optimization to meet all quality requirements and ensure the site ranks well and is usable by everyone.

### Story 8.1: Dynamic Metadata & Open Graph

As a **search engine** and **social media platform**,
I want **proper metadata on all pages**,
So that **the site ranks well and shared links display rich previews**.

**Acceptance Criteria:**

**Given** any page on the site
**When** it renders
**Then** it includes:
- Unique `<title>` tag (format: "Page Title | Invenex Solutions")
- Meta description (150-160 characters)
- Canonical URL
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags (twitter:card, twitter:title, twitter:image)

**Given** dynamic pages (portfolio, services, jobs)
**When** `generateMetadata()` runs
**Then** it:
- Fetches page-specific data from Sanity
- Returns dynamic title and description
- Generates appropriate OG image or uses default

**Given** the homepage
**When** its metadata renders
**Then** it includes:
- Full company name and tagline in title
- Comprehensive description
- High-quality OG image (1200x630)

---

### Story 8.2: Structured Data (JSON-LD)

As a **search engine**,
I want **structured data on the site**,
So that **I can understand the content and display rich results**.

**Acceptance Criteria:**

**Given** the site-wide layout
**When** it renders
**Then** it includes JSON-LD for:
- Organization schema (name, logo, URL, social profiles)
- WebSite schema (search action, URL)

**Given** the homepage
**When** it renders
**Then** it includes JSON-LD for:
- LocalBusiness schema (for Kochi office)

**Given** service pages
**When** they render
**Then** they include JSON-LD for:
- Service schema (name, description, provider)

**Given** case study pages
**When** they render
**Then** they include JSON-LD for:
- CreativeWork schema (name, description, creator)

**Given** job detail pages
**When** they render
**Then** they include JSON-LD for:
- JobPosting schema (title, description, location, employment type)

---

### Story 8.3: Sitemap & Robots.txt

As a **search engine**,
I want **a sitemap and robots.txt**,
So that **I can efficiently crawl and index the site**.

**Acceptance Criteria:**

**Given** the site needs a sitemap
**When** `/sitemap.xml` is requested
**Then** it returns:
- XML sitemap with all public pages
- Dynamic entries from Sanity (projects, services, jobs)
- Proper `lastmod` dates
- Priority values based on page importance

**Given** the sitemap generation
**When** it runs
**Then** it:
- Uses Next.js `sitemap.ts` convention
- Fetches all dynamic slugs from Sanity
- Excludes admin/studio routes

**Given** `/robots.txt` is requested
**When** it returns
**Then** it includes:
- Allow all public routes
- Disallow `/studio`, `/api`
- Reference to sitemap URL

---

### Story 8.4: Accessibility Compliance (WCAG 2.1 AA)

As a **visitor with disabilities**,
I want **the site to be fully accessible**,
So that **I can use it with assistive technologies**.

**Acceptance Criteria:**

**Given** any page on the site
**When** tested for accessibility
**Then** it meets WCAG 2.1 AA:
- Color contrast ≥ 4.5:1 for normal text
- Color contrast ≥ 3:1 for large text
- All images have descriptive alt text
- All form inputs have associated labels
- All interactive elements are focusable

**Given** keyboard navigation
**When** I tab through the page
**Then**:
- Focus order is logical (left-to-right, top-to-bottom)
- Focus indicators are clearly visible
- No focus traps (except modals)
- Skip link available to jump to main content
- Escape closes modals/menus

**Given** screen reader usage
**When** content is announced
**Then**:
- Semantic HTML is used correctly
- ARIA labels provide context where needed
- Live regions announce dynamic changes
- Decorative images are hidden from screen readers

---

### Story 8.5: Performance Optimization

As a **visitor**,
I want **the site to load quickly**,
So that **I have a smooth browsing experience**.

**Acceptance Criteria:**

**Given** any page on the site
**When** tested with Lighthouse
**Then** scores are:
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

**Given** performance metrics
**When** measured
**Then**:
- LCP < 2.5 seconds
- INP < 200ms
- CLS < 0.1
- TTFB < 600ms
- Initial JS bundle < 200KB

**Given** images on the site
**When** they render
**Then**:
- Use `next/image` for optimization
- Serve WebP/AVIF formats
- Blur placeholder for LCP images
- Lazy loading for below-fold images

**Given** animations
**When** GSAP is needed
**Then**:
- Dynamically imported (not in main bundle)
- Only loads when component mounts
- Respects `prefers-reduced-motion`

**Given** error handling
**When** errors occur
**Then**:
- Error boundaries catch and display friendly messages
- `error.tsx` files provide fallback UI
- `not-found.tsx` provides custom 404 page
- `loading.tsx` shows skeleton states

---

## Appendix: Technical Context from Context7

### Next.js 15 Patterns (from Context7)

**Data Fetching:**
```typescript
// ISR with revalidation
const data = await fetch(url, { next: { revalidate: 3600 } })

// On-demand revalidation
import { revalidateTag } from 'next/cache'
revalidateTag('posts')

// Cache with tags
const getCachedPosts = unstable_cache(
  async () => db.select().from(posts),
  ['posts'],
  { revalidate: 3600, tags: ['posts'] }
)
```

### Sanity Integration (from Context7)

**Client Setup:**
```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-07-11',
  useCdn: false, // for ISR/tag-based revalidation
})

// Fetch with caching
const posts = await client.fetch(POSTS_QUERY, {}, {
  next: { revalidate: 3600, tags: ['post'] }
})
```

### Framer Motion Patterns (from Context7)

**Scroll Animations:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
/>
```

### Tailwind CSS 4 (from Context7)

**Dark Mode:**
```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

---

## Epic 9: Premium UI/UX Enhancement (Stokt-Inspired)

**Goal:** Transform Invenex Solutions into an award-worthy, bold, typography-driven digital experience inspired by Stokt Creative (Awwwards SOTD). Combines sophisticated GSAP animations, refined micro-interactions, and visual polish with a "text-first, image-second" design philosophy where headlines fill the viewport and motion serves the brand story.

**Note:** This epic consolidates the former Epic 10 (Stokt-Inspired Design). Overlapping stories were merged, unique stories were added as 9.10-9.11. See `epic-10-stokt-inspired-design.md` (marked superseded) for original reference.

**FRs covered:** FR39, FR40, FR41 (enhanced)
**NFRs covered:** NFR1-NFR8 (maintained), NFR16-NFR21 (enhanced)
**Dependencies:** Epic 1, Epic 2, Epic 3, Epic 4

**Design Principles (from Stokt):**
1. Typography is Architecture — Headlines fill the viewport, not float in it
2. Text First, Image Second — Portfolio shows names prominently, images on hover
3. Motion is Meaning — Every animation serves the brand story
4. Bold Voice — Copy has personality

**Success Metrics:**
- Maintain Lighthouse Performance >90
- Increase time on page by 30%
- Increase portfolio views by 40%
- Achieve scroll depth of 70%+ for 80% of users

---

### Story 9.1: Advanced Scroll Animation System

As a **visitor**,
I want **sophisticated scroll-triggered animations**,
So that **the browsing experience feels immersive and engaging**.

**Acceptance Criteria:**

**Given** GSAP ScrollTrigger is needed
**When** I install and configure it
**Then**:
- GSAP and ScrollTrigger installed via npm
- Configured with React integration (useGSAP hook)
- Tree-shaking enabled for minimal bundle impact

**Given** I scroll through a page
**When** sections enter the viewport
**Then**:
- Parallax backgrounds at 0.5-0.7 speed ratio
- Staggered element entrances with 50-100ms delays
- Scroll-linked opacity/scale transformations

**Given** long-form pages exist
**When** I scroll through them
**Then** scroll progress indicators show my position

**Given** scroll animations trigger *(merged from Epic 10, Story 10.2)*
**When** sections enter the viewport
**Then**:
- Animations trigger at 20% viewport entry (not earlier)
- No janky or stuttering motion — smooth 60fps
- Batch animations for performance (GSAP ScrollTrigger.batch)
- Lazy load GSAP on first scroll

**Given** reduced motion preference is enabled
**When** animations would trigger
**Then** they are disabled or simplified

---

### Story 9.2: Custom Cursor System

As a **visitor**,
I want **a subtle custom cursor**,
So that **the site feels premium and polished**.

**Acceptance Criteria:**

**Given** I am using a mouse on desktop
**When** I move the cursor
**Then** I see:
- Inner dot (8px) following cursor exactly
- Outer outline (32px) following with 0.15s delay (lerp)
- Mix-blend-mode: difference for visibility on all backgrounds

**Given** I hover over interactive elements
**When** the cursor enters the element
**Then** the cursor outline scales up (1.5x)

**Given** I am on a touch device
**When** the page loads
**Then** custom cursor is hidden, native behavior preserved

**Given** JavaScript is disabled
**When** the page renders
**Then** native cursor works normally

---

### Story 9.3: Cinematic Page Transitions

As a **visitor**,
I want **cinematic transitions between pages**,
So that **navigation feels like a premium experience**.

**Acceptance Criteria:**

**Given** I click a navigation link
**When** the page transition occurs
**Then**:
- Current page fades/slides out (300ms)
- Optional blur effect during transition
- New page fades/slides in (400ms)
- Total transition duration: 500-700ms

**Given** routes with data fetching
**When** they are loading
**Then** a branded loader appears with Invenex logo animation

**Given** browser back/forward navigation
**When** I use history navigation
**Then** transitions work correctly

**Given** reduced motion preference
**When** transitions occur
**Then** instant state changes without animation

---

### Story 9.4: Coral Accent Color Integration

As a **developer**,
I want **a warm coral accent color in the design system**,
So that **CTAs stand out and the site has visual warmth**.

**Acceptance Criteria:**

**Given** I need the coral accent color
**When** I use it in components
**Then**:
- Primary token: `--color-accent-coral: #FF6B35`
- 5-step gradient scale available (50, 100, 300, 500, 700)
- Utility classes: `bg-coral-*`, `text-coral-*`, `border-coral-*`

**Given** primary CTAs
**When** they render
**Then** they use coral accent with hover glow

**Given** contrast requirements
**When** coral is used with text
**Then** WCAG AA contrast ratios are maintained

---

### Story 9.5: Enhanced Micro-interactions

As a **visitor**,
I want **polished micro-interactions on interactive elements**,
So that **the site feels responsive and tactile**.

**Acceptance Criteria:**

**Given** I click a button
**When** the click occurs
**Then** a ripple effect expands from the click point

**Given** I focus on a form input
**When** focus is applied
**Then**:
- Border glows with accent color
- Subtle scale (1.01) applied
- Smooth transition (200ms)

**Given** I hover over a card
**When** hover is active
**Then**:
- Card lifts 8px (translateY)
- Shadow increases to shadow-2xl
- Smooth transition with ease-out-expo

**Given** toast notifications appear
**When** they render
**Then** they slide in from bottom-right with fade

**Given** I hover over a navigation link *(merged from Epic 10, Story 10.6)*
**When** hover is active
**Then**:
- Underline animates from left to right (not instant appear)
- 200-300ms duration with ease-out timing
- Consistent animation across all nav items
- Files: `src/components/layout/navbar.tsx`, `src/app/globals.css`

---

### Story 9.6: Hero Section 2.0 (Massive Typography + Interactive)

As a **visitor**,
I want **a hero that commands attention with dramatic typography and interactive depth**,
So that **I immediately perceive Invenex as a bold, confident agency**.

**Note:** Merges Epic 9 Story 9.6 (interactive parallax) with Epic 10 Story 10.1 (massive typography).

**Acceptance Criteria:**

**Given** the hero loads
**When** the animation sequence plays
**Then**:
- Headline uses massive typography: `clamp(3rem, 10vw, 8rem)` or larger
- Text is stacked vertically: "WE BUILD" / "DIGITAL" / "EXCELLENCE"
- Each word animates with GSAP SplitText (char stagger 0.02s, duration 0.8s, `power4.out`)
- Subtext fades up after headline animation completes
- Stats row appears: "50+ Projects", "5+ Years", "98% Satisfaction"
- CTA buttons scale in with bounce easing

**Given** I view the homepage hero
**When** I move my mouse
**Then**:
- Floating orbs / coral sphere responds to mouse position (parallax depth)
- Background gradient subtly follows cursor
- Depth multipliers range from 0.02-0.05

**Given** I scroll past the hero
**When** scroll position increases
**Then** hero elements fade and scale down

**Given** I am on mobile
**When** the hero renders
**Then** simplified animation (no mouse tracking), responsive font sizing

**Files:** `src/components/sections/hero-v2.tsx`, `src/lib/gsap.ts`

---

### Story 9.7: Text-First Portfolio (Stokt-Inspired)

As a **visitor**,
I want **a portfolio that showcases project names prominently**,
So that **the work speaks through confident typography, not thumbnail grids**.

**Note:** Supersedes original Bento Box Portfolio Grid. Implements Epic 10 Story 10.3's text-first editorial direction. Current implementation already follows this pattern.

**Acceptance Criteria:**

**Given** I view the Featured Work section
**When** it renders
**Then**:
- Project names displayed in large text (~2-3rem)
- Each project is a full-width row
- Categories displayed as subtle text beside title
- Minimal, editorial layout

**Given** I hover over a project
**When** hover is active
**Then**:
- Project image fades in (positioned right side)
- Title may shift slightly or get underline
- Smooth 300ms transition

**Given** I filter projects
**When** the filter applies
**Then** layout animates with FLIP transitions (Framer Motion layoutId)

**Given** the grid loads
**When** cards appear
**Then** they stagger in with entrance animation

**Files:** `src/components/sections/portfolio-preview.tsx`

---

### Story 9.8: Section Transition Effects

As a **visitor**,
I want **visual continuity between page sections**,
So that **the page feels cohesive rather than blocky**.

**Acceptance Criteria:**

**Given** multiple sections exist on a page
**When** they render
**Then**:
- Ambient gradient orbs span multiple sections
- Some elements overlap section boundaries intentionally

**Given** section dividers
**When** they render
**Then** diagonal or curved dividers (SVG or clip-path) are used

**Given** section backgrounds
**When** they transition
**Then** smooth color transitions occur between sections

**Given** parallax depth
**When** scrolling
**Then** foreground and background layers move at different speeds

---

### Story 9.9: Branded Page Loader

As a **visitor**,
I want **a polished loading experience**,
So that **even loading feels premium**.

**Acceptance Criteria:**

**Given** initial page load
**When** the site loads for the first time
**Then**:
- Centered Invenex logo appears
- Logo animates in (fade + scale or draw effect)
- Minimum display time: 500ms for brand moment
- Dismisses with fade after content ready

**Given** repeat visits (same session)
**When** the site loads
**Then** loader is skipped (sessionStorage check)

**Given** async content areas
**When** they are loading
**Then**:
- Skeleton screens match content shape
- Shimmer effect on placeholders

---

### Story 9.10: Bold CTA Section (Stokt-Inspired)

As a **visitor**,
I want **a memorable call-to-action**,
So that **I feel compelled to reach out**.

**Note:** Added from Epic 10 Story 10.4.

**Acceptance Criteria:**

**Given** I scroll to the CTA section
**When** it renders
**Then**:
- Headline is bold and personality-driven (e.g., "LET'S BUILD SOMETHING EPIC.")
- Typography is large (4-6rem, `clamp(2.5rem, 6vw, 6rem)`)
- Two CTAs: "Talk to Us" + "View Our Work"
- Minimal design, text-focused
- Scroll-triggered entrance animation

**Copy Options:**
- "LET'S BUILD SOMETHING EPIC."
- "READY TO STAND OUT?"
- "LET'S MAKE IT HAPPEN."

**Files:** `src/components/sections/cta-section.tsx`

---

### Story 9.11: Bold Stats Section (Stokt-Inspired)

As a **visitor**,
I want **impressive statistics displayed prominently**,
So that **I immediately understand Invenex's credibility**.

**Note:** Added from Epic 10 Story 10.5.

**Acceptance Criteria:**

**Given** I scroll to the stats section
**When** it enters viewport
**Then**:
- Numbers count up from 0 to final value (GSAP or Framer Motion)
- Each stat has large number (4-6rem) + small label below
- Subtle stagger between stats (100ms)
- Stats: "50+" Projects Delivered, "5+" Years Experience, "98%" Satisfaction

**Given** I am on mobile
**When** the stats render
**Then** numbers scale down responsively, stacked vertically if needed

**Files:** `src/components/sections/stats-section.tsx` (new or extract from hero)

---

### Story 9.12: Accessibility & Performance Audit

As a **developer**,
I want **comprehensive audit of all new features**,
So that **enhancements don't break accessibility or performance**.

**Acceptance Criteria:**

**Given** all new animations
**When** tested with prefers-reduced-motion
**Then** all respect the preference

**Given** the custom cursor
**When** tested for accessibility
**Then** native fallback works, no interference with form inputs

**Given** keyboard navigation
**When** tested
**Then** all interactive elements remain keyboard accessible with visible focus

**Given** Lighthouse audit
**When** run on all pages
**Then**:
- Performance score >90
- First Contentful Paint <1.5s
- Cumulative Layout Shift <0.1
- Total Blocking Time <200ms

**Given** screen reader testing
**When** performed
**Then** all new components have appropriate ARIA labels

---

---

## Epic 11: Content & Real Assets

**Goal:** Replace placeholder content with real business assets to make the site production-ready and authentic. This epic focuses on gathering and integrating actual company content rather than writing code.

**Dependencies:** Epic 7 (CMS), Epic 3 (Marketing Pages), Epic 4 (Portfolio)
**Type:** Content Integration (minimal code changes)

---

### Story 11.1: Portfolio Screenshots

As a **potential client**,
I want **to see real screenshots of completed projects**,
So that **I can evaluate the actual quality of Invenex's work**.

**Acceptance Criteria:**

**Given** I view the portfolio or case study pages
**When** they render
**Then** I see:
- Real screenshots from CaterFlow (dashboard, orders, menu management)
- Real screenshots from client projects (CoolTech, GrabToGo, OnMyWay AI, etc.)
- High-quality images (1920x1080 minimum for desktop views)
- Mobile screenshots where applicable
- No gradient placeholder boxes

**Given** CaterFlow is the flagship product
**When** viewing its case study
**Then** I see at least 5-8 screenshots showing:
- Login/Dashboard
- Key feature screens
- Mobile responsive views
- Before/after comparisons (if available)

**Content Required:**
- CaterFlow: 5-8 production screenshots
- CoolTech International: 3-5 screenshots
- GrabToGo: 3-5 screenshots
- OnMyWay AI: 3-5 screenshots
- Other portfolio items: 2-3 screenshots each

---

### Story 11.2: Team & Founder Photos

As a **visitor**,
I want **to see the real people behind Invenex**,
So that **I can connect with the team and build trust**.

**Acceptance Criteria:**

**Given** I view the About page
**When** the team section renders
**Then** I see:
- Professional photos of founder(s)
- Consistent photo style (similar backgrounds, lighting)
- Photos sized appropriately (400x400 minimum, square crop)
- Real names and actual roles

**Given** team members exist
**When** their profiles show
**Then** each has:
- Professional headshot
- Name and role
- Brief bio (optional)
- LinkedIn link (optional)

**Content Required:**
- Founder photo(s): 1-2 high-quality professional shots
- Team member photos: As available
- Consistent style guide for future photos

---

### Story 11.3: Client Testimonials

As a **potential client**,
I want **to read real testimonials from actual clients**,
So that **I can trust Invenex based on others' experiences**.

**Acceptance Criteria:**

**Given** I view testimonials on homepage or case studies
**When** they render
**Then** I see:
- Real client names and companies
- Actual quotes (not fabricated)
- Client photos or company logos
- Project context (what was built)

**Given** testimonials are displayed
**When** I read them
**Then** they feel authentic:
- Specific details about the project
- Measurable outcomes mentioned
- Natural language (not overly polished)

**Content Required:**
- 3-5 real client testimonials
- Permission to use client names/logos
- Client photos (optional but preferred)
- Company logos for logo carousel

---

### Story 11.4: Office & Culture Photos

As a **job seeker**,
I want **to see what it's like to work at Invenex**,
So that **I can envision myself as part of the team**.

**Acceptance Criteria:**

**Given** I view the Careers page
**When** the "Life at Invenex" section renders
**Then** I see:
- Photos of the Kochi office/workspace
- Team collaboration or work-in-progress shots
- Kerala/local context where appropriate
- Modern, inviting workspace imagery

**Given** culture photos exist
**When** they're displayed
**Then** they show:
- Real workspace (not stock photos)
- Team members working (candid preferred)
- Tech setup and environment
- Local Kochi/Kerala character

**Content Required:**
- 3-5 office/workspace photos
- 2-3 team collaboration shots
- Optional: Event or team outing photos

---

### Story 11.5: CaterFlow Product Showcase

As a **visitor**,
I want **to see CaterFlow presented as a polished product**,
So that **I understand Invenex builds professional-grade software**.

**Acceptance Criteria:**

**Given** I view the Products page
**When** the CaterFlow section renders
**Then** I see:
- CaterFlow logo/branding
- Hero screenshot or product mockup
- Feature highlights with screenshots
- Link to live product (caterflow.in)

**Given** CaterFlow is showcased
**When** I explore the section
**Then** I can see:
- Dashboard overview
- Key features (orders, menu, analytics)
- Mobile app screens (if available)
- Customer testimonial (if available)

**Content Required:**
- CaterFlow logo (SVG preferred)
- 3-5 product screenshots
- Feature descriptions
- Optional: Demo video or GIF

---

---

## v2.1 FR Coverage Map (Epics 12-14)

| FR | Epic | Description |
|----|------|-------------|
| FR2 (enhanced) | 12 | About page cinematic redesign |
| FR14-FR17 (enhanced) | 13 | Progressive contact form |
| FR51 | 14 | Blog index with featured post + grid |
| FR52 | 14 | Blog category filtering |
| FR53 | 14 | Blog post detail pages |
| FR54 | 14 | Source attribution (TechCrunch links) |
| FR55 | 14 | "This Week's Top Stories" digest |
| FR56 | 14 | Newsletter email subscribe |
| FR57 | 14 | Weekly digest email delivery |
| FR58 | 14 | Make.com → Sanity auto-creation |
| FR59 | 14 | Blog CMS management in Sanity |
| FR60 | 14 | Post metadata (reading time, date, category) |
| FR61 | 14 | Related posts |
| FR62 | 14 | Blog share (LinkedIn, X, copy link) |
| FR63 | 12 | Cinematic timeline |
| FR64 | 12 | Animated values section |
| FR65 | 12 | Editorial team section |
| FR66 | 12 | Animated stats band |
| FR67 | 13 | 3-step progressive form |
| FR68 | 13 | Service selection cards |
| FR69 | 13 | Social proof strip |
| FR70 | 13 | Alternative CTA (phone/WhatsApp) |

---

## Epic 12: About Page Cinematic Redesign

**Goal:** Transform the About page from a static information layout into a cinematic narrative experience. Visitors will scroll through Invenex's story via an animated timeline, discover the team through an editorial magazine-style showcase, and see values and stats brought to life through purposeful GSAP animations.

**FRs covered:** FR2 (enhanced), FR63, FR64, FR65, FR66
**NFRs addressed:** NFR1-NFR5, NFR16-NFR21
**Dependencies:** Epic 1, Epic 9

---

### Story 12.1: About Page Hero & Layout Restructure

As a **visitor**,
I want **a cinematic hero section on the About page with weight-contrast typography and atmospheric effects**,
So that **I immediately perceive Invenex as a premium, story-driven company**.

**Acceptance Criteria:**

**Given** I navigate to the About page
**When** it loads
**Then**:
- SubpageHero renders with left-aligned variant
- Tag pill shows "ABOUT INVENEX" with monospace styling
- Headline displays "OUR" (weight 200) + "STORY" (weight 900, coral gradient via `text-gradient-orange`)
- Subtitle reads "Building digital experiences that move businesses forward"
- GSAP entrance choreography: orbs fade → tag slides → headline words stagger → subtitle fades
- Atmospheric coral orbs render in background at 0.04 opacity
- Page structure is refactored to use new section components (timeline, values, team, stats, CTA)

**Given** reduced motion is preferred
**When** page loads
**Then** all elements appear immediately without animation

---

### Story 12.2: Company Timeline Section

As a **visitor**,
I want **to scroll through a cinematic timeline of Invenex's journey with progressive scroll animations**,
So that **I understand the company's growth story and feel emotionally connected to their mission**.

**Acceptance Criteria:**

**Given** I scroll past the hero section
**When** the timeline section enters the viewport
**Then**:
- Vertical timeline renders with coral dot markers at each milestone year
- Connecting line on the left side draws progressively as I scroll (GSAP ScrollTrigger `scrub: 1`)
- Milestone cards fade in and slide up at each marker point (`opacity: 0, y: 40` → `opacity: 1, y: 0`)
- Each milestone displays: year in large coral text, title in bold white, description in muted text
- Milestone content includes: 2024 "Founded with a vision", 2025 "50+ projects delivered", 2026 "Expanding globally"
- Each milestone card uses glassmorphic styling (`backdrop-blur-xl bg-white/[0.06] border border-white/[0.08]`)

**Given** I view the page on mobile (< 768px)
**When** the timeline section renders
**Then**:
- Timeline line shifts to left edge
- Content takes full width to the right
- Milestones stack vertically with generous spacing

**Given** reduced motion is preferred
**When** the timeline section enters viewport
**Then** all milestones and the line appear immediately without scroll animation

---

### Story 12.3: Values Section Redesign

As a **visitor**,
I want **to see Invenex's core values presented through animated glassmorphic cards**,
So that **I understand what drives the company and feel aligned with their principles**.

**Acceptance Criteria:**

**Given** I scroll to the values section
**When** it enters the viewport
**Then**:
- Section header displays monospace label "WHAT DRIVES US" + "Our Principles" in weight-contrast
- 2x2 grid of glassmorphic cards renders (1-column on mobile)
- Each card displays: coral icon (Diamond, Handshake, Lightbulb, Zap), value name in bold, one-line description
- Cards enter with GSAP stagger (`stagger: 0.15, opacity: 0, y: 40` → visible)

**Given** I hover over a value card
**When** my cursor enters the card
**Then**:
- Card lifts slightly (`translateY(-4px)`)
- Coral top-border reveals (0 → 2px height, `duration-300`)
- Card border transitions to `border-[#FF6A37]/20`

**Given** I view on mobile
**When** the values section renders
**Then** cards display in a single column, full-width, with 16px gap

---

### Story 12.4: Editorial Team Section

As a **visitor**,
I want **to see the Invenex founders presented in an editorial magazine-style layout**,
So that **I connect with real people behind the company and feel trust in their expertise**.

**Acceptance Criteria:**

**Given** I scroll to the team section
**When** it enters the viewport
**Then**:
- Section header shows monospace label "THE FOUNDERS"
- 4 team members render in a horizontal row (desktop), 2x2 (tablet), single column (mobile)
- Each member shows: large portrait placeholder area (dark gray, 3:4 aspect ratio), name in bold white, role in coral text
- Members enter with GSAP stagger (`stagger: 0.15, opacity: 0, y: 30, rotate: 2` → `opacity: 1, y: 0, rotate: 0`)

**Given** I hover over a team member
**When** my cursor enters their card
**Then**:
- Personal quote appears in italic muted text below the role
- LinkedIn icon slides in from the right side
- Transitions use `duration-300` ease

**Given** I click the LinkedIn icon
**When** it's clicked
**Then** it opens the member's LinkedIn profile in a new tab

**Given** I view on mobile
**When** I tap a team member
**Then** quote and LinkedIn icon are visible by default (no hover state required)

---

### Story 12.5: Animated Stats Band

As a **visitor**,
I want **to see key Invenex achievements animated as counting numbers**,
So that **I quickly grasp the company's scale and credibility**.

**Acceptance Criteria:**

**Given** I scroll to the stats band section
**When** it enters the viewport
**Then**:
- Full-width dark band renders with 4 stats in a row (desktop), 2x2 (mobile)
- Stats display: "50+" Projects Delivered, "4" Continents Served, "2024" Founded, "100%" Client Satisfaction
- Numbers animate from 0 to target value using `AnimatedCounter` component with GSAP
- Number text uses coral color, labels below in muted text
- Counter animation triggers once on scroll entry (ScrollTrigger `once: true`)
- Animation duration: ~2 seconds with `power3.out` easing

**Given** reduced motion is preferred
**When** stats band enters viewport
**Then** numbers display at final values immediately (no counting animation)

---

## Epic 13: Contact Page Progressive Experience

**Goal:** Replace the standard contact form with a guided 3-step conversational flow that reduces friction and increases conversion. Visitors start by selecting what they need, then provide project details, then share contact info — with social proof reinforcing confidence at the point of commitment.

**FRs covered:** FR14-FR17 (enhanced), FR67, FR68, FR69, FR70
**NFRs addressed:** NFR11, NFR16-NFR21, NFR23
**Dependencies:** Epic 1, Epic 5

---

### Story 13.1: Progressive Form Shell & Step Navigation

As a **visitor**,
I want **a multi-step form with clear progress indication and smooth transitions**,
So that **the contact process feels like a conversation rather than a bureaucratic form**.

**Acceptance Criteria:**

**Given** I navigate to the Contact page
**When** it loads
**Then**:
- SubpageHero renders centered variant with "LET'S BUILD" (weight 200) + "SOMETHING GREAT" (weight 900, coral gradient)
- Tag pill shows "GET IN TOUCH", subtitle: "Tell us about your project and we'll get back within 24 hours"
- Two-column layout renders: left (60%) glassmorphic form panel, right (40%) contact info cards
- Progress indicator shows 3 dots at top of form panel (dot 1 active/coral, dots 2-3 muted)
- Form panel fades in from left (`opacity: 0, y: 30` → visible, 0.8s GSAP)

**Given** I complete a step and advance
**When** I click "Next"
**Then**:
- Current step slides out left, next step slides in from right (GSAP `x` tween, 400ms, `power3.out`)
- Progress dot for completed step shows coral checkmark
- Next dot fills coral as active
- Focus moves to first input of new step (accessibility)

**Given** I click "Back" on step 2 or 3
**When** the transition occurs
**Then** previous step slides in from left, current slides out right, progress dots update accordingly

**Given** I view on mobile (< 768px)
**When** page renders
**Then**:
- Form takes full width, contact info cards stack below
- Progress dots centered above form
- Step transitions remain smooth

---

### Story 13.2: Service Selection Cards (Step 1)

As a **visitor**,
I want **to select what services I need by tapping visual cards rather than filling dropdowns**,
So that **I can quickly communicate my needs without thinking about form fields**.

**Acceptance Criteria:**

**Given** I'm on step 1 of the contact form
**When** it renders
**Then**:
- Heading displays "What do you need?"
- 2x2 grid of glassmorphic service cards renders:
  - Web Development (Globe icon, coral)
  - Mobile Apps (Smartphone icon, coral)
  - ERP Solutions (Database icon, coral)
  - AI & Automation (Brain icon, coral)
- Each card shows coral icon + service name in white text
- Cards use `backdrop-blur-xl bg-white/[0.06] border border-white/[0.08]`

**Given** I click a service card
**When** it's selected
**Then**:
- Card border transitions to coral glow (`border-[#FF6A37] shadow-[0_0_15px_rgba(255,106,55,0.2)]`)
- Subtle checkmark appears in top-right corner
- Multiple cards can be selected (multi-select)
- "Next" button appears/enables at bottom (coral, slides in from bottom)

**Given** I click a selected card again
**When** it's toggled off
**Then** card returns to default state, checkmark removed

**Given** I try to advance without selecting any card
**When** I click "Next"
**Then** subtle shake animation on the grid + muted text "Please select at least one service"

**Given** I view on mobile
**When** step 1 renders
**Then** 2x2 grid maintained with smaller cards, touch targets meet 44px minimum

---

### Story 13.3: Project Details & Personal Info (Steps 2-3)

As a **visitor**,
I want **to provide project details and my contact information in focused, separate steps**,
So that **I'm never overwhelmed by a wall of form fields**.

**Acceptance Criteria:**

**Given** I advance to step 2
**When** it renders
**Then**:
- Heading displays "Tell us more"
- Project description textarea (glassmorphic, 4 rows, placeholder "Describe your project...")
- Budget range dropdown: "Under $5K", "$5K–$15K", "$15K–$50K", "$50K+", "Let's discuss"
- Timeline dropdown: "ASAP", "1–3 months", "3–6 months", "6+ months", "Flexible"
- Only description is required; budget and timeline are optional
- "Back" (ghost) + "Next" (coral) buttons at bottom

**Given** I advance to step 3
**When** it renders
**Then**:
- Heading displays "How do we reach you?"
- Name input (required, glassmorphic styling with focus glow)
- Email input (required, validates email format on blur)
- Phone input (optional, with country code prefix)
- "How did you hear about us?" dropdown (optional): Google, LinkedIn, Referral, Blog, Other
- "Back" (ghost) + "Send Message" (coral with glow shadow, full-width on mobile)

**Given** I submit with invalid email
**When** validation runs
**Then** inline red error message below email field, field border turns red, shake animation on field

**Given** all inputs use glassmorphic styling
**When** I focus an input
**Then** border transitions to white glow (`shadow-[0_0_0_3px_rgba(255,255,255,0.1)]`)

---

### Story 13.4: Contact Info Cards & Social Proof

As a **visitor**,
I want **to see alternative contact methods alongside the form and social proof near the submit area**,
So that **I can choose my preferred communication channel and feel confident about reaching out**.

**Acceptance Criteria:**

**Given** the contact page loads
**When** the right column renders (desktop) or below-form section renders (mobile)
**Then**:
- 5 glassmorphic contact info cards stack vertically with 16px gap
- Each card shows: coral icon left, info text right
  - Email: hello@invenexsolutions.com (clickable `mailto:` link)
  - Phone: clickable `tel:` link
  - WhatsApp: green accent icon, opens WhatsApp deep link with prefilled message
  - Location: "Melbourne, Australia"
  - Hours: "Mon–Fri 9am–6pm AEST"
- Cards enter with GSAP stagger from right (`opacity: 0, x: 30`, stagger 0.12s)

**Given** I hover over a contact info card
**When** my cursor enters
**Then** card border transitions to coral (`duration-300`)

**Given** the social proof strip section renders
**When** it's visible below the form area
**Then**:
- "Trusted by 50+ businesses" text displays
- Muted client logo placeholders in horizontal row (auto-scroll marquee)
- Strip uses subtle `border-t border-white/[0.08]` separator

**Given** the alternative CTA section renders below social proof
**When** visible
**Then**:
- "PREFER TO TALK?" displays in large weight-contrast text
- "Schedule a Call" button (coral) + "WhatsApp Us" button (green-accented ghost)

---

### Story 13.5: Form Submission, Validation & Success State

As a **visitor**,
I want **instant feedback when I submit my inquiry and a delightful confirmation experience**,
So that **I feel confident my message was received and know what to expect next**.

**Acceptance Criteria:**

**Given** I click "Send Message" with valid data
**When** submission is processing
**Then**:
- Button shows loading spinner, text changes to "Sending..."
- Button disabled to prevent double-submit
- All form fields disabled during submission

**Given** submission succeeds
**When** server action returns success
**Then**:
- Form panel morphs into confirmation state (smooth fade transition)
- Checkmark animation renders (coral circle with white check, scale-in)
- Heading: "Message Sent!"
- Text: "We'll be in touch within 24 hours"
- Secondary text: "Check your email for a confirmation"
- Confirmation email sent to visitor via Resend (existing email infrastructure)
- Team notification email sent with all form data (selected services, description, budget, timeline, contact info)

**Given** submission fails
**When** server action returns error
**Then**:
- Toast notification shows error: "Something went wrong. Please try again."
- Form remains in current state with data preserved
- Submit button re-enables

**Given** I submit the form
**When** server-side validation runs
**Then**:
- Zod schema validates: name (required, 2+ chars), email (required, valid format), description (required, 10+ chars), services (required, at least 1)
- Invalid fields return inline error messages
- Form data includes: selectedServices[], description, budget, timeline, name, email, phone, referralSource

---

## Epic 14: Blog "The Invenex Weekly"

**Goal:** Create a magazine-style blog platform powered by automated content from TechCrunch via Make.com and RSS.app. The blog positions Invenex as tech thought leaders through curated weekly digests, drives organic traffic via SEO, and builds a subscriber pipeline that converts readers into clients over time.

**FRs covered:** FR51-FR62
**NFRs addressed:** NFR1-NFR8, NFR35-NFR37
**Dependencies:** Epic 1, Epic 7

---

### Story 14.1: Blog Sanity Schema & CMS Setup

As an **admin**,
I want **a blog post content type in Sanity CMS with all necessary fields**,
So that **blog content can be created, managed, and delivered to the website**.

**Acceptance Criteria:**

**Given** I access Sanity Studio
**When** I navigate to blog content
**Then**:
- `blogPost` document type exists with fields:
  - `title` (string, required)
  - `slug` (slug, auto-generated from title)
  - `excerpt` (text, 3 rows)
  - `body` (blockContent / Portable Text with rich formatting)
  - `category` (string, list: "AI & ML", "Cybersecurity", "Startups", "Hardware", "Cloud", "Enterprise")
  - `author` (string, default: "Invenex Team")
  - `publishedAt` (datetime, required)
  - `readingTime` (number, minutes)
  - `featuredImage` (image, optional, with alt text)
  - `sourceUrl` (url, link to original TechCrunch article)
  - `sourceName` (string, default: "TechCrunch")
  - `isWeeklyDigest` (boolean, default: false)
  - `weekNumber` (number, for digest grouping)

**Given** I create a new blog post
**When** I fill in required fields and publish
**Then**:
- Post is accessible via GROQ query
- Sanity webhook fires revalidation to `/api/sanity/revalidate`
- Blog pages regenerate via ISR on next request

**Given** the Sanity schema is deployed
**When** queried from Next.js
**Then**:
- `getBlogPosts` query returns all published posts ordered by `publishedAt` desc
- `getBlogPostBySlug` query returns single post with full body
- `getBlogPostsByCategory` query filters by category
- `getFeaturedBlogPost` returns the most recent post (or one marked featured)
- All queries use `sanityFetch` with `tags: ['sanity']` for cache revalidation

---

### Story 14.2: Blog Index Page with Hero & Featured Post

As a **visitor**,
I want **a magazine-style blog landing page with a branded masthead and featured article**,
So that **I'm drawn into reading and perceive Invenex as tech thought leaders**.

**Acceptance Criteria:**

**Given** I navigate to `/blog`
**When** the page loads
**Then**:
- Page metadata: title "The Invenex Weekly | Tech Insights", appropriate OG tags
- Hero section renders with:
  - Tag pill "TECH INSIGHTS"
  - Headline "THE INVENEX" (weight 200) + "WEEKLY" (weight 900, coral gradient)
  - Subtitle "Our weekly take on the stories shaping tech"
  - Clean typographic focus, minimal atmospheric effects
- GSAP entrance: tag → headline words stagger → subtitle fade

**Given** blog posts exist in Sanity
**When** the featured post section renders
**Then**:
- Full-width glassmorphic card displays most recent post
- Two-column layout: left — gradient abstract image (coral-to-purple, category-based fallback if no image), right — category pill (coral), title in large bold white, "Invenex Team", date formatted, reading time, 2-line excerpt
- Hover: subtle `scale(1.01)` + coral border glow
- Click navigates to `/blog/[slug]`

**Given** no blog posts exist yet
**When** the page loads
**Then**:
- Featured section shows placeholder: "First post coming soon — stay tuned for our weekly tech digest"
- Newsletter subscribe section still renders

**Given** I view on mobile
**When** featured post renders
**Then** image stacks above content, full-width

---

### Story 14.3: Blog Article Grid & Category Filter

As a **visitor**,
I want **to browse articles by category and scan a grid of post cards**,
So that **I can quickly find tech topics that interest me**.

**Acceptance Criteria:**

**Given** the blog index page loads
**When** the category filter renders
**Then**:
- Horizontal row of pill buttons: "All" (default active, coral fill), "AI & ML", "Cybersecurity", "Startups", "Hardware", "Cloud", "Enterprise"
- Active pill: `bg-[#FF6A37] text-white`
- Inactive pills: `bg-white/5 border border-white/10 text-foreground-muted`
- Hover on inactive: coral border
- Mobile: horizontal scroll with gradient fade-out at edges

**Given** I click a category pill
**When** the filter activates
**Then**:
- Blog grid smoothly transitions (opacity fade) to show only matching posts
- Active pill updates to coral fill, previous deactivates
- URL updates with query param (`/blog?category=ai-ml`) for shareability
- "All" shows all posts

**Given** the blog grid renders
**When** posts are available
**Then**:
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Each card: glassmorphic rectangle with gradient abstract image top (category-based hue), category pill overlay top-left, title (bold white, 2 lines truncated), excerpt (muted, 2 lines), bottom: "Invenex Team" + date + "X min read"
- Cards enter with GSAP stagger (`stagger: 0.1, opacity: 0, y: 30`)
- Hover: `translateY(-4px)` + coral border glow
- Click navigates to `/blog/[slug]`
- 6 cards per page (2 rows of 3)

**Given** I scroll past the initial 6 posts
**When** I click "Load More" (centered ghost button with coral hover)
**Then** next 6 posts append to grid with stagger animation, button text shows "Showing X of Y posts"

---

### Story 14.4: Blog Post Detail Page

As a **visitor**,
I want **to read a full blog article with optimized typography and source attribution**,
So that **I can consume the content comfortably and verify its TechCrunch origin**.

**Acceptance Criteria:**

**Given** I navigate to `/blog/[slug]`
**When** the post loads
**Then**:
- Page metadata: title from post, excerpt as description, OG image from featured image or category gradient
- Post header renders: category pill, title (h1, large bold), "Invenex Team" + formatted date + "X min read", featured image (full-width, gradient fallback)
- Post body renders via Sanity Portable Text with custom serializers:
  - Reading column: `max-width: 720px`, centered, `text-lg leading-relaxed` (1.8 line-height)
  - Headings styled with proper hierarchy
  - Code blocks with syntax highlighting
  - Blockquotes with coral left border accent
  - Links in coral with underline on hover

**Given** the post has a `sourceUrl`
**When** the source attribution section renders
**Then**:
- Banner displays: "Originally reported by {sourceName}" with external link to source URL
- Link opens in new tab with `rel="noopener noreferrer"`
- Banner uses subtle glassmorphic styling

**Given** I view on mobile
**When** the post renders
**Then**:
- Full-width body, comfortable reading margins (24px padding)
- Images scale to full width
- Typography scales appropriately (h1 responsive via `clamp()`)

---

### Story 14.5: "This Week's Top Stories" Digest Section

As a **visitor**,
I want **a quick-scan numbered list of the week's biggest stories**,
So that **I can get a rapid overview without reading full articles**.

**Acceptance Criteria:**

**Given** the blog index page loads
**When** the weekly digest section renders (below the grid)
**Then**:
- Section header: "THIS WEEK'S TOP STORIES" in monospace label styling
- 5 numbered items display vertically
- Each item: large coral number (40px, bold), title in white, "via TechCrunch" source tag in muted
- Numbers enter with GSAP stagger from left, titles fade in from right
- Items are clickable — navigate to full post (`/blog/[slug]`) or original source URL

**Given** fewer than 5 posts exist for the current week
**When** the section renders
**Then** it shows however many exist (minimum 1 to render, hidden if 0)

**Given** I view on mobile
**When** the digest renders
**Then** full-width band layout, numbers and titles stack naturally, comfortable touch targets

---

### Story 14.6: Newsletter Subscribe Component

As a **visitor**,
I want **to subscribe to the weekly tech digest via email**,
So that **I receive curated content without needing to revisit the site**.

**Acceptance Criteria:**

**Given** the blog index page loads
**When** the newsletter section renders (above footer)
**Then**:
- Full-width glassmorphic banner with:
  - "STAY IN THE LOOP" headline (weight contrast)
  - "Get our weekly tech digest straight to your inbox." description
  - Email input (glassmorphic, placeholder "your@email.com") + coral "Subscribe" button inline (stacks on mobile)

**Given** I enter a valid email and click Subscribe
**When** submission processes
**Then**:
- Button shows loading state
- Server action validates email via Zod
- Email stored (Sanity document type `newsletterSubscriber` or Resend audience list)
- Input + button morph into success state: "You're in! Check your inbox." with coral checkmark
- Welcome email sent via Resend confirming subscription

**Given** I enter an invalid email
**When** I click Subscribe
**Then** inline error below input: "Please enter a valid email address"

**Given** I'm already subscribed
**When** I submit the same email
**Then** success state shows: "You're already subscribed!" (no duplicate)

**Given** the newsletter component appears on a blog post detail page
**When** it renders at the bottom of the post
**Then** same component, same behavior, consistent across all blog pages

---

### Story 14.7: Blog Share Bar & Related Posts

As a **visitor**,
I want **to share interesting articles and discover related content**,
So that **I can spread valuable content to my network and continue reading**.

**Acceptance Criteria:**

**Given** I'm reading a blog post
**When** the share bar renders
**Then**:
- Desktop: fixed left sidebar with share icons (LinkedIn, Twitter/X, Copy Link)
- Mobile: bottom sticky bar with same icons
- Icons use coral color, hover: scale(1.1) transition
- Copy Link: clicking copies URL to clipboard, icon briefly changes to checkmark, toast shows "Link copied!"
- LinkedIn: opens share dialog with post title and URL pre-filled
- Twitter/X: opens tweet compose with title and URL

**Given** I scroll to the bottom of a blog post
**When** the related posts section renders
**Then**:
- Section header: "Related Articles"
- 3 article cards in horizontal row (same category as current post)
- Standard blog card format (image, category, title, excerpt, date)
- If fewer than 3 same-category posts exist, fill with most recent posts
- Cards link to their respective `/blog/[slug]` pages

**Given** I view on mobile
**When** related posts render
**Then** single-column stack, full-width cards

---

### Story 14.8: Make.com → Sanity Integration & Navigation Update

As an **admin**,
I want **blog posts to be automatically created in Sanity when Make.com processes TechCrunch articles**,
So that **the blog publishes fresh content weekly without manual intervention**.

**Acceptance Criteria:**

**Given** Make.com scenario runs (triggered by RSS.app TechCrunch feed)
**When** AI processes an article and generates blog content
**Then**:
- Make.com Sanity HTTP module sends POST to Sanity API (`/v1/data/mutate/{dataset}`)
- Blog post document created with: title, slug (auto-generated), excerpt, body (Portable Text), category (auto-assigned by AI), author ("Invenex Team"), publishedAt, readingTime (calculated), sourceUrl, sourceName ("TechCrunch")
- Sanity webhook triggers ISR revalidation on the Next.js site
- New post appears on `/blog` within minutes of creation

**Given** the blog system is live
**When** the site navigation renders
**Then**:
- "Blog" added to primary navigation between "Products" and "Careers"
- Navigation constant updated in `src/lib/constants.ts`
- Mobile hamburger menu includes Blog link
- Footer navigation includes Blog link
- Blog page accessible at `/blog` route

**Given** Make.com creates a weekly digest post
**When** `isWeeklyDigest: true` is set
**Then**:
- Post is flagged as the weekly digest
- Featured post section on `/blog` index prioritizes digest posts
- `weekNumber` field tracks the week for grouping

**Given** I need to set up Make.com
**When** configuring the Sanity module
**Then**:
- Documentation provided: Sanity API token (write access) needed as Make.com credential
- Sanity dataset and project ID configured in Make.com HTTP module
- Mutation format documented for blog post creation
- Test post successfully created and visible on site

---

*Epics and Stories Document*
*Generated: 2026-01-18*
*Updated: 2026-02-20 (v2.1 — Epics 12-14: About redesign, Contact progressive form, Blog "The Invenex Weekly")*
*Total: 14 Epics, 75 Stories (57 original + 18 v2.1)*
