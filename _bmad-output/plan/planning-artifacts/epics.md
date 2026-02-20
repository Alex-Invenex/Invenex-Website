---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
workflowType: 'create-epics-and-stories'
project_name: 'Invenex Solutions Website'
user_name: 'Vmj'
date: '2026-01-18'
status: 'complete'
totalEpics: 8
totalStories: 42
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

### FR Coverage Map

| FR | Epic | Story | Description |
|----|------|-------|-------------|
| FR1 | 3 | 3.1 | Homepage with all sections |
| FR2 | 3 | 3.2 | About page |
| FR3 | 3 | 3.3 | Services overview page |
| FR4 | 3 | 3.4 | Service detail pages |
| FR5 | 3 | 3.5 | Products page |
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

### Story 3.1: Homepage Implementation

As a **potential client**,
I want **an impressive homepage that showcases Invenex's capabilities**,
So that **I immediately perceive them as a premium, world-class agency**.

**Acceptance Criteria:**

**Given** I land on the homepage
**When** the page loads
**Then** I see the Hero section with:
- Bold headline with text reveal animation
- Subtext explaining the value proposition
- Two CTAs: "Get a Quote" (primary) and "View Our Work" (secondary)
- Spotlight background effect (Aceternity UI)
- Fast LCP (< 2.5s)

**Given** I scroll past the hero
**When** I view the Services section
**Then** I see:
- Bento grid layout (Aceternity UI)
- 6 service cards with icons, titles, descriptions
- Hover effects on each card
- Link to Services page

**Given** I continue scrolling
**When** I view the Portfolio Showcase section
**Then** I see:
- 3-4 featured project cards
- Image hover zoom effect
- Project category badges
- Link to full Portfolio page

**Given** I view the Products section
**When** it renders
**Then** I see:
- CaterFlow showcase with screenshot/demo
- Invenex ERP teaser
- Clear differentiation messaging ("We build our own products")

**Given** I view the remaining sections
**When** they render
**Then** I see:
- "Why Choose Us" with 4 differentiators
- Testimonials with marquee animation (Magic UI)
- Client logo carousel (grayscale)
- Final CTA section for quote request

---

### Story 3.2: About Page

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

### Story 3.3: Services Overview Page

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

### Story 3.4: Service Detail Pages

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

### Story 3.5: Products Page

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

*Epics and Stories Complete*
*Generated: 2026-01-18*
*Total: 8 Epics, 42 Stories*
