---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments:
  - '_bmad-output/analysis/brainstorming-session-2026-01-18.md'
  - '_bmad-output/planning-artifacts/invenex-website-implementation-spec.md'
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 1
  projectDocs: 1
projectType: 'greenfield'
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'low-medium'
  projectContext: 'greenfield'
---

# Product Requirements Document: Invenex Solutions Website

**Author:** Vmj
**Date:** 2026-01-18
**Version:** 1.1

---

## Executive Summary

### Vision

Invenex Solutions is not just another web development agency—it's a **product company** that builds and operates its own SaaS products (CaterFlow, Invenex ERP) while delivering premium client solutions. The website must communicate this differentiation instantly.

### Product Differentiator

**"We don't just build for clients—we build our own products."**

Unlike typical agencies showing client portfolios, Invenex demonstrates capability through live, operational SaaS products. This proof eliminates the "can they actually deliver?" question.

### Target Users

| User Type | Primary Goal | Success Indicator |
|-----------|--------------|-------------------|
| Potential Clients | Find premium dev partner | Submit quote request |
| Job Seekers | Discover modern tech workplace | Submit application |
| Admins | Manage content efficiently | Update via CMS |
| Referrals | Share impressive site | Forward to network |

### Core Premise

The website itself is a product demonstration. Premium black/white aesthetic, Awwwards-quality animations, and flawless performance prove Invenex's technical excellence before a single conversation.

### Services Offered

Six core service categories to showcase:

| Service | Description |
|---------|-------------|
| **Web Development** | Custom websites, landing pages, web applications |
| **Mobile App Development** | iOS, Android, cross-platform mobile apps |
| **Platform Development** | SaaS platforms, marketplaces, complex web systems |
| **E-Commerce Solutions** | Online stores, payment integration, inventory systems |
| **Social Media Marketing** | Strategy, content, campaigns, analytics |
| **Digital Strategy** | Consulting, roadmaps, technology advisory |

---

## Success Criteria

### User Success

- Visitors immediately perceive Invenex as a **premium, world-class agency** on par with international brands (Apple, Stripe, Linear, Vercel benchmarks)
- The site experience demonstrates technical excellence and design sophistication
- Users feel compelled to request a quote OR share the site with others
- Job seekers see Invenex as a desirable, cutting-edge workplace

### Business Success

| Metric | Target | Timeline |
|--------|--------|----------|
| Quote requests | 100/month | 6 months post-launch |
| Visitor-to-quote conversion | 10-15% | Ongoing |
| Job applications | 10/month | 3 months post-launch |
| Local SEO ranking | Page 1 | 12 months (Kochi, Thrissur) |
| Site shares | Track growth | Ongoing |
| Design recognition | Awwwards submission | Post-launch |

### Technical Success

All technical metrics defined in NFR1-NFR8 (Performance section). Key targets:
- Lighthouse scores: 90+ across all categories
- LCP < 2.5s, INP < 200ms, CLS < 0.1
- Zero critical bugs at launch
- WCAG 2.1 AA accessibility compliance

---

## Product Scope & Phased Development

### MVP Philosophy

**Experience MVP** - The site itself is the product proof. Must be polished enough to demonstrate capability, not just functional.

**Core Question:** What's the minimum that makes visitors say "These people clearly know what they're doing"?

### Phase 1: MVP (Launch)

**All Four User Journeys Supported:**

| Category | Deliverables |
|----------|--------------|
| **Pages** | Homepage, About, Services (6), Portfolio, Careers, Contact, Products |
| **Portfolio** | 3-5 case studies with challenge/solution/results |
| **Products** | CaterFlow showcase + Invenex ERP teaser |
| **Careers** | Job listings by department + application form with file upload |
| **Contact** | Quote request form + WhatsApp floating button |
| **Design** | Premium black/white theme, Framer Motion transitions, Aceternity UI |
| **CMS** | Sanity for projects, jobs, team, testimonials |
| **Email** | Resend for form notifications |
| **SEO** | Meta tags, Open Graph, schema markup, sitemap, robots.txt |
| **Share** | Social share buttons + copy link |
| **Performance** | Lighthouse 90+, Core Web Vitals optimized |
| **Accessibility** | WCAG 2.1 AA compliance |

### Phase 2: Growth (Post-MVP)

*Note: Blog deferred to Growth phase as SEO can be prioritized after launch. Portfolio/case studies provide sufficient bottom-funnel content for MVP.*

| Feature | Rationale |
|---------|-----------|
| Blog with CMS | SEO + thought leadership |
| Video testimonials | Social proof + engagement (competitor feature) |
| Advanced GSAP animations | Premium differentiation |
| Newsletter + automation | Lead nurturing |
| Local SEO landing pages | Kochi/Thrissur visibility |
| Google Business Profile | Local search presence |

### Phase 3: Vision (Expansion)

| Feature | Rationale |
|---------|-----------|
| UAE/UK landing pages | International expansion |
| Multi-language support | Market accessibility (if needed) |
| Client project portal | Client retention |
| AI chatbot | 24/7 lead qualification |
| Awwwards submission | Industry recognition |

### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Animation performance on mobile | Medium | High | Early low-end device testing, `prefers-reduced-motion`, lazy GSAP |
| Sanity API rate limits | Low | Medium | Aggressive caching, ISR with long revalidation |
| Solo dev bandwidth | Medium | High | Strict MVP scope, component libraries |
| Low initial traffic | High | Medium | SEO foundation ready, social sharing built-in |

---

## User Journeys

### Journey 1: Priya - The Startup Founder (Potential Client)

**Persona:** Priya runs a growing D2C skincare brand in Kochi. She's been using Shopify but needs a custom platform as she scales. She's talked to 3 agencies already—all felt generic and overpriced.

**Opening Scene:**
Priya searches "best web development agency Kochi" at 11pm after a frustrating call with her current vendor. She clicks on Invenex Solutions.

**Rising Action:**
- Site loads instantly—she notices immediately (her current site is slow)
- Hero section feels premium—"these people know design"
- Scrolls to portfolio—sees a case study for another e-commerce brand
- Clicks into case study—reads challenge, solution, results with actual metrics
- Checks services page—sees they do platforms, not just websites
- Looks at team page—real people, not stock photos

**Climax:**
She clicks "Get a Quote"—form is simple (name, email, project type, brief description). Submits at 11:47pm.

**Resolution:**
Gets confirmation email immediately. Feels confident she found the right partner. Shares the site with her co-founder on WhatsApp: "Check these guys out."

**Requirements Revealed:** Fast loading, premium design, portfolio with case studies, simple quote form, email confirmation, share functionality

---

### Journey 2: Arjun - The Developer Looking for Work (Job Seeker)

**Persona:** Arjun is a mid-level React developer in Thrissur. He's tired of his current company's outdated tech stack (jQuery, PHP). Wants to work with modern tools and grow his skills.

**Opening Scene:**
Arjun sees an Instagram post from Invenex showing their office. Clicks through to the website.

**Rising Action:**
- Site itself impresses him—"they actually use React/Next.js"
- Navigates to Careers—sees "Life at Invenex" photos, benefits listed
- Finds "Senior Frontend Developer" role—reads requirements
- Sees tech stack: Next.js, TypeScript, Tailwind—exactly what he wants
- Checks portfolio to see the quality of work he'd be doing

**Climax:**
Clicks Apply—uploads resume, adds portfolio link, writes a brief cover note. Submits.

**Resolution:**
Gets confirmation email with next steps. Feels excited about the possibility. Tells his friend: "Finally found a company in Kerala doing modern web dev."

**Requirements Revealed:** Careers page, job listings with tech stack details, culture showcase, application form with file upload, email confirmation

---

### Journey 3: Vmj - The Admin Managing Content

**Persona:** Invenex team member managing website content—adding portfolio projects, posting jobs, checking submissions.

**Opening Scene:**
New project just launched for a client. Time to add it to the portfolio.

**Rising Action:**
- Logs into Sanity CMS dashboard
- Creates new project entry—uploads images, writes case study
- Sets category, technologies used, client testimonial
- Previews how it looks on the live site
- Publishes

**Climax:**
Project appears on portfolio page within seconds. No developer needed.

**Resolution:**
Checks quote submissions dashboard—sees 3 new leads from this week. Exports to respond.

**Requirements Revealed:** Sanity CMS integration, project/job/blog management, submission tracking, preview capability, no-code content updates

---

### Journey 4: Rahul - The Referred Visitor

**Persona:** Rahul is a marketing manager in Dubai. His friend shared the Invenex site with him on WhatsApp saying "check out this agency's website."

**Opening Scene:**
Rahul clicks the shared link during lunch break. Has 2 minutes to form an opinion.

**Rising Action:**
- Site loads fast despite being in UAE
- Immediately notices premium design—"okay, this is different"
- Scrolls through quickly—sees portfolio, services
- Doesn't need services right now but bookmarks it

**Climax:**
Shares it with his own network: "If you ever need web dev, check these guys. Their site alone is impressive."

**Resolution:**
Becomes a future lead when his company needs a platform rebuild 6 months later. Remembers "that impressive agency site."

**Requirements Revealed:** Share metadata (OG tags), fast global CDN loading, memorable first impression, social proof elements

---

## Innovation & Novel Patterns

### Product-First Positioning

Unlike typical service agencies, Invenex builds and operates its own SaaS products:

| Aspect | Typical Kerala/India Agency | Invenex |
|--------|----------------------------|---------|
| Revenue Model | Project-based only | Services + Recurring SaaS |
| Proof of Capability | Client portfolio | Live SaaS products + portfolio |
| Positioning | "We build for clients" | "We build our own products AND for clients" |
| Risk for Clients | "Can they deliver?" | "They already ship and operate products" |

### Products to Showcase

**CaterFlow** (caterflow.in)
- All-in-one ERP for Indian catering businesses
- Manages: Customers, Events, Menus, Quotes, Deliveries
- Built with Next.js (same stack)
- Status: Live

**Invenex ERP** (upcoming)
- Zoho One alternative for SMBs
- Status: In development

### Website Impact

- Add **Products** section to showcase CaterFlow and Invenex ERP
- Position as **"Product Studio"** not just "Agency"
- Use live products as ultimate portfolio proof
- New user journey consideration: Product visitor (potential CaterFlow/ERP customer)

---

## Web Application Requirements

### Rendering Strategy

| Page Type | Method | Rationale |
|-----------|--------|-----------|
| Homepage | SSG + ISR | Fast load, periodic testimonial/portfolio updates |
| Services | SSG | Static content, rebuild on change |
| Portfolio | SSG + ISR | New projects via CMS, hourly revalidation |
| Case Studies | SSG | Static per project |
| Careers | SSR | Frequent job listing changes |
| Blog | SSG + ISR | Revalidate on publish |
| Contact | SSR | Server-side form handling |
| Products | SSG | Static product showcases |

### Browser Support

| Browser | Version |
|---------|---------|
| Chrome/Edge | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Mobile Safari | iOS 14+ |
| Chrome Mobile | Android 10+ |

No IE11 support—modern browsers only.

### SEO Strategy

**Technical SEO:**
- Server-side rendering for all public pages
- Dynamic meta tags per page (title, description, OG images)
- Structured data: Organization, LocalBusiness, WebSite, Product schemas
- Auto-generated sitemap.xml and robots.txt
- Canonical URLs for all pages

**Local SEO:**
- Target keywords: Kochi, Thrissur (MVP), UAE/UK (Vision)
- Google Business Profile optimization (Growth phase)
- Location-specific landing pages (Growth phase)

**2026 SEO Trends:**
- GEO (Generative Engine Optimization) for AI Overview visibility
- E-E-A-T signals through case studies, team expertise, live products
- Bottom-funnel content priority (portfolio, case studies over blog)

### Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum for text |
| Keyboard navigation | Full site navigable via keyboard |
| Screen reader | Semantic HTML, ARIA labels |
| Focus indicators | Visible states on all interactive elements |
| Alt text | Descriptive alt for all images |
| Form labels | All inputs properly labeled |
| Skip links | Skip to main content |
| Reduced motion | Respect `prefers-reduced-motion` |

### Real-time Features

| Feature | Implementation | Priority |
|---------|----------------|----------|
| WhatsApp chat widget | Floating button linking to WhatsApp | MVP |
| Form notifications | Email via Resend (instant) | MVP |
| Live visitor count | Vercel Analytics | Growth |

### Progressive Web App

- Web manifest with app name, icons, theme
- Add to homescreen capability
- Basic offline page for network errors

### Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

---

## Functional Requirements

### Content Presentation (FR1-FR7)

| ID | Requirement |
|----|-------------|
| FR1 | Visitors can view homepage with company overview, services preview, portfolio highlights, and CTA |
| FR2 | Visitors can view About page with company story, team members, and values |
| FR3 | Visitors can browse all services offered |
| FR4 | Visitors can view detailed information about each individual service |
| FR5 | Visitors can view Products page showcasing CaterFlow and Invenex ERP |
| FR6 | Visitors can navigate between all pages using main navigation with mega-menu for Services |
| FR7 | Visitors can navigate the site on mobile via responsive navigation (hamburger menu) |

### Portfolio & Case Studies (FR8-FR13)

| ID | Requirement |
|----|-------------|
| FR8 | Visitors can browse portfolio of completed projects |
| FR9 | Visitors can filter portfolio projects by category (web, mobile, platform) |
| FR10 | Visitors can view detailed case studies with challenge, solution, and results |
| FR11 | Visitors can view project images in gallery format within case studies |
| FR12 | Visitors can see technologies used for each project |
| FR13 | Visitors can read client testimonials associated with projects |

### Lead Generation (FR14-FR19)

| ID | Requirement |
|----|-------------|
| FR14 | Visitors can submit quote request with name, email, project type, description |
| FR15 | Visitors can select budget range when requesting quote |
| FR16 | Visitors can specify how they heard about the company |
| FR17 | Visitors receive confirmation after submitting quote request |
| FR18 | Visitors can initiate WhatsApp conversation via floating button |
| FR19 | Team receives email notification when quote request is submitted |

### Talent Acquisition (FR20-FR27)

| ID | Requirement |
|----|-------------|
| FR20 | Visitors can view Careers page with company culture and benefits |
| FR21 | Visitors can browse open job positions |
| FR22 | Visitors can filter job listings by department |
| FR23 | Visitors can view detailed job descriptions with requirements and responsibilities |
| FR24 | Visitors can apply with name, email, phone, resume, optional cover letter |
| FR25 | Visitors can include portfolio URL when applying |
| FR26 | Applicants receive confirmation after submitting application |
| FR27 | HR receives email notification with resume attachment |

### Content Management (FR28-FR35)

| ID | Requirement |
|----|-------------|
| FR28 | Admins can authenticate to access CMS |
| FR29 | Admins can create, edit, delete portfolio projects |
| FR30 | Admins can create, edit, delete job listings |
| FR31 | Admins can create, edit, delete team member profiles |
| FR32 | Admins can create, edit, delete client testimonials |
| FR33 | Admins can create, edit, delete service descriptions |
| FR34 | Admins can preview content changes before publishing |
| FR35 | Admins can upload and manage images for projects and team |

### User Engagement & Sharing (FR36-FR41)

| ID | Requirement |
|----|-------------|
| FR36 | Visitors can share any page via social media (Twitter, LinkedIn, Facebook) |
| FR37 | Visitors can copy page URL to clipboard |
| FR38 | Shared links display rich previews (Open Graph) |
| FR39 | Visitors experience smooth page transitions when navigating |
| FR40 | Visitors experience scroll-triggered animations |
| FR41 | Visitors experience hover effects on interactive elements |

### Search Engine Discoverability (FR42-FR46)

| ID | Requirement |
|----|-------------|
| FR42 | Search engines can crawl all public pages |
| FR43 | Each page has unique, descriptive meta title and description |
| FR44 | Site provides structured data for organization and services |
| FR45 | Site generates and serves XML sitemap |
| FR46 | Site provides robots.txt with crawling instructions |

### Accessibility & Performance (FR47-FR50)

| ID | Requirement |
|----|-------------|
| FR47 | Visitors can navigate entire site using keyboard only |
| FR48 | Visitors using screen readers can understand all content |
| FR49 | Visitors with reduced motion preference see simplified animations |
| FR50 | Visitors on slow connections experience progressive content loading |

---

## Non-Functional Requirements

### Performance (NFR1-NFR8)

| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NFR1 | Page load time | < 2 seconds | First Contentful Paint |
| NFR2 | Largest Contentful Paint | < 2.5 seconds | Core Web Vitals |
| NFR3 | Interaction to Next Paint | < 200ms | Core Web Vitals |
| NFR4 | Cumulative Layout Shift | < 0.1 | Core Web Vitals |
| NFR5 | Lighthouse Performance score | ≥ 90 | Lighthouse audit |
| NFR6 | Time to First Byte | < 600ms | WebPageTest |
| NFR7 | Initial bundle size | < 200KB (JS) | Bundle analyzer |
| NFR8 | Image optimization | WebP/AVIF with fallback | next/image |

### Security (NFR9-NFR15)

| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR9 | HTTPS enforcement | Vercel automatic |
| NFR10 | Admin authentication | NextAuth.js with session management |
| NFR11 | Form validation | Server-side validation via Zod |
| NFR12 | XSS prevention | React default escaping |
| NFR13 | CSRF protection | NextAuth.js token-based |
| NFR14 | Security headers | Vercel headers config (X-Frame-Options, CSP) |
| NFR15 | Environment secrets | Server-only env vars |

### Accessibility (NFR16-NFR21)

| ID | Requirement | Target |
|----|-------------|--------|
| NFR16 | WCAG compliance | Level AA (WCAG 2.1) |
| NFR17 | Color contrast | ≥ 4.5:1 for text |
| NFR18 | Keyboard navigation | 100% site navigable |
| NFR19 | Screen reader support | Semantic HTML, ARIA |
| NFR20 | Motion sensitivity | Respect prefers-reduced-motion |
| NFR21 | Focus indicators | Visible on all interactive elements |

### Integration (NFR22-NFR26)

| ID | Requirement | Target |
|----|-------------|--------|
| NFR22 | CMS availability | 99.9% uptime (Sanity.io SLA) |
| NFR23 | Email delivery | > 95% delivery rate (Resend with SPF/DKIM) |
| NFR24 | Analytics tracking | Real-time (Vercel Analytics) |
| NFR25 | CDN distribution | Global edge caching (Vercel Edge) |
| NFR26 | Image CDN | Automatic optimization (Sanity + next/image) |

### Reliability (NFR27-NFR30)

| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR27 | Site availability | 99.9% uptime (Vercel infrastructure) |
| NFR28 | Error handling | Graceful fallbacks via error boundaries |
| NFR29 | Offline support | Basic offline page via service worker |
| NFR30 | Build reliability | Successful builds on every deploy (CI/CD) |

### Maintainability (NFR31-NFR34)

| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR31 | Code quality | TypeScript strict mode |
| NFR32 | Linting | Zero ESLint errors (pre-commit hooks) |
| NFR33 | Documentation | Component-level code comments |
| NFR34 | Content updates | No-code via Sanity Studio |

---

*End of PRD v1.1 - Ready for Architecture Phase*

**Changelog:**
- v1.1: Added specific services list, mega-menu navigation, GEO/AI Overview SEO strategy, clarified Blog phase
