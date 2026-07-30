/**
 * Scope Catalog — the single source of truth for /build-your-project.
 *
 * Pure data. Consumed by the client UI, the server action and both email
 * templates, so a new feature is a one-line edit in exactly one place.
 *
 * Tiers:
 *   core        — locked in. The track does not work without it.
 *   recommended — pre-ticked when the track is chosen, but removable.
 *   optional    — starts empty, the customer opts in.
 *
 * Feature IDs are the contract between browser and server: the client submits
 * IDs only and the server re-derives every human-readable label from here.
 * Never renumber an existing ID — add new ones at the end of a group.
 */

export type FeatureTier = 'core' | 'recommended' | 'optional';

export interface ScopeFeature {
  id: string;
  title: string;
  desc: string;
  tier: FeatureTier;
}

export interface ScopeGroup {
  id: string;
  title: string;
  desc: string;
  features: ScopeFeature[];
}

export interface ScopeTrack {
  id: string;
  code: string;
  title: string;
  tagline: string;
  blurb: string;
  groups: ScopeGroup[];
}

export const scopeTracks: ScopeTrack[] = [
  /* ═══════════════════════════════════════════════════════
     01 — WEBSITE
     ═══════════════════════════════════════════════════════ */
  {
    id: 'website',
    code: 'WEB',
    title: 'Website',
    tagline: 'Your public face',
    blurb:
      'A fast, premium site built for phones first — with an online store or a booking engine on top if you need one.',
    groups: [
      {
        id: 'web-core',
        title: 'Core Build',
        desc: 'The foundation every website we ship is built on.',
        features: [
          {
            id: 'WEB-01',
            title: 'Custom design & build',
            desc: 'Designed around your business, not dropped into a template.',
            tier: 'core',
          },
          {
            id: 'WEB-02',
            title: 'Mobile-first responsive layout',
            desc: 'Built for the phone first, then scaled up to desktop.',
            tier: 'core',
          },
          {
            id: 'WEB-03',
            title: 'Speed & performance engineering',
            desc: 'Target under two seconds to load on a phone on 4G.',
            tier: 'core',
          },
          {
            id: 'WEB-04',
            title: 'SEO foundation',
            desc: 'Structure, sitemaps, schema and meta data, built in from day one.',
            tier: 'core',
          },
          {
            id: 'WEB-05',
            title: 'Enquiry & contact forms',
            desc: 'Straight to your inbox, with spam protection.',
            tier: 'core',
          },
          {
            id: 'WEB-06',
            title: 'Hosting, SSL & domain setup',
            desc: 'Deployed, secured and pointed at your domain by us.',
            tier: 'core',
          },
          {
            id: 'WEB-07',
            title: 'Analytics & conversion tracking',
            desc: 'Google Analytics, Tag Manager and Meta Pixel wired up.',
            tier: 'recommended',
          },
          {
            id: 'WEB-08',
            title: 'Accessibility (WCAG AA)',
            desc: 'Keyboard navigation, screen readers and contrast handled properly.',
            tier: 'recommended',
          },
          {
            id: 'WEB-09',
            title: 'WhatsApp & click-to-call buttons',
            desc: 'The fastest route from visitor to conversation.',
            tier: 'recommended',
          },
        ],
      },
      {
        id: 'web-content',
        title: 'Content & CMS',
        desc: 'How pages, images and offers get updated after launch.',
        features: [
          {
            id: 'WEB-10',
            title: 'Content editing without a developer',
            desc: 'Your team edits pages, banners and offers themselves.',
            tier: 'recommended',
          },
          {
            id: 'WEB-11',
            title: 'Blog / news section',
            desc: 'For updates, articles and search visibility.',
            tier: 'recommended',
          },
          {
            id: 'WEB-12',
            title: 'Photo & video gallery',
            desc: 'Showcase your work or your premises properly.',
            tier: 'recommended',
          },
          {
            id: 'WEB-13',
            title: 'Careers / jobs section',
            desc: 'Job listings with an online application form.',
            tier: 'optional',
          },
          {
            id: 'WEB-14',
            title: 'Multi-language (including RTL)',
            desc: 'A full second or third language across the whole site.',
            tier: 'optional',
          },
          {
            id: 'WEB-15',
            title: 'Copywriting for every page',
            desc: 'We write the words, you approve them.',
            tier: 'optional',
          },
          {
            id: 'WEB-16',
            title: 'Photography & video shoot',
            desc: 'Original imagery instead of stock.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'web-ecommerce',
        title: 'E-Commerce / Online Store',
        desc: 'Open this if you are selling products online.',
        features: [
          {
            id: 'WEB-20',
            title: 'Product catalogue & product pages',
            desc: 'Gallery, specifications, variants, stock and delivery estimate.',
            tier: 'optional',
          },
          {
            id: 'WEB-21',
            title: 'Cart & secure checkout',
            desc: 'Guest or account checkout, saved addresses.',
            tier: 'optional',
          },
          {
            id: 'WEB-22',
            title: 'Payment gateway',
            desc: 'Razorpay, Stripe, UPI, cards and netbanking.',
            tier: 'optional',
          },
          {
            id: 'WEB-23',
            title: 'Filter, search & sorting',
            desc: 'By category, brand, price and availability.',
            tier: 'optional',
          },
          {
            id: 'WEB-24',
            title: 'Inventory & stock management',
            desc: 'Live stock counts, low-stock alerts, out-of-stock handling.',
            tier: 'optional',
          },
          {
            id: 'WEB-25',
            title: 'Shipping, delivery zones & tracking',
            desc: 'Courier integration and tracking visible to the customer.',
            tier: 'optional',
          },
          {
            id: 'WEB-26',
            title: 'Discounts, coupons & gift cards',
            desc: 'Run offers yourself, without calling us.',
            tier: 'optional',
          },
          {
            id: 'WEB-27',
            title: 'Customer accounts & order history',
            desc: 'Everything a customer has bought, in one place.',
            tier: 'optional',
          },
          {
            id: 'WEB-28',
            title: 'Product reviews & ratings',
            desc: 'With verified-purchase marking and photo reviews.',
            tier: 'optional',
          },
          {
            id: 'WEB-29',
            title: 'Returns & refunds workflow',
            desc: 'Tracked from request through to resolution.',
            tier: 'optional',
          },
          {
            id: 'WEB-30',
            title: 'Abandoned cart recovery',
            desc: 'Automatic follow-up to people who nearly bought.',
            tier: 'optional',
          },
          {
            id: 'WEB-31',
            title: 'Automatic GST invoices',
            desc: 'Generated and emailed on every order.',
            tier: 'optional',
          },
          {
            id: 'WEB-32',
            title: 'Migrate an existing catalogue',
            desc: 'All products, images, prices and stock moved across and cleaned up.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'web-booking',
        title: 'Booking & Appointments',
        desc: 'Open this if customers need to book a slot, a table or a service.',
        features: [
          {
            id: 'WEB-40',
            title: 'Live availability calendar',
            desc: 'Real-time, with no double booking.',
            tier: 'optional',
          },
          {
            id: 'WEB-41',
            title: 'Online slot & appointment booking',
            desc: 'By service, staff member, resource or time band.',
            tier: 'optional',
          },
          {
            id: 'WEB-42',
            title: 'Payment or deposit at booking',
            desc: 'Collect the money when the booking is made, not after.',
            tier: 'optional',
          },
          {
            id: 'WEB-43',
            title: 'Automated confirmations & reminders',
            desc: 'Sent by WhatsApp, email and SMS.',
            tier: 'optional',
          },
          {
            id: 'WEB-44',
            title: 'Customer cancel & reschedule',
            desc: 'Self-service, under the rules you set.',
            tier: 'optional',
          },
          {
            id: 'WEB-45',
            title: 'Admin booking dashboard',
            desc: 'Walk-ins and phone bookings on the same live calendar.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     02 — MOBILE APP
     ═══════════════════════════════════════════════════════ */
  {
    id: 'mobile-app',
    code: 'APP',
    title: 'Mobile App',
    tagline: 'iOS & Android',
    blurb:
      'A native-feeling app on both stores, built from one codebase so you pay once and ship twice.',
    groups: [
      {
        id: 'app-core',
        title: 'App Foundation',
        desc: 'What every app we build needs in order to exist.',
        features: [
          {
            id: 'APP-01',
            title: 'UI/UX design for mobile',
            desc: 'Screens, flows and a prototype you approve before we build.',
            tier: 'core',
          },
          {
            id: 'APP-02',
            title: 'iOS & Android from one codebase',
            desc: 'Both platforms, one build, one bill.',
            tier: 'core',
          },
          {
            id: 'APP-03',
            title: 'Secure backend & API',
            desc: 'The server, database and endpoints the app runs on.',
            tier: 'core',
          },
          {
            id: 'APP-04',
            title: 'App Store & Play Store submission',
            desc: 'Listing, assets, review process and release, handled by us.',
            tier: 'core',
          },
          {
            id: 'APP-05',
            title: 'Crash reporting & analytics',
            desc: 'You find out about a problem before your users tell you.',
            tier: 'recommended',
          },
          {
            id: 'APP-06',
            title: 'Over-the-air updates',
            desc: 'Ship fixes without waiting on a store review.',
            tier: 'recommended',
          },
          {
            id: 'APP-07',
            title: 'Offline mode & local caching',
            desc: 'Keeps working when the signal drops.',
            tier: 'optional',
          },
          {
            id: 'APP-08',
            title: 'Tablet & landscape layouts',
            desc: 'Beyond the phone screen.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'app-user',
        title: 'User Features',
        desc: 'What the person holding the phone can actually do.',
        features: [
          {
            id: 'APP-10',
            title: 'Sign up & login',
            desc: 'Email, mobile OTP, Google and Apple sign-in.',
            tier: 'recommended',
          },
          {
            id: 'APP-11',
            title: 'User profiles & preferences',
            desc: 'Saved details, settings and history.',
            tier: 'recommended',
          },
          {
            id: 'APP-12',
            title: 'Push notifications',
            desc: 'The single biggest reason people come back to an app.',
            tier: 'recommended',
          },
          {
            id: 'APP-13',
            title: 'In-app payments & subscriptions',
            desc: 'One-off purchases or recurring billing.',
            tier: 'optional',
          },
          {
            id: 'APP-14',
            title: 'In-app chat & messaging',
            desc: 'Between users, or with your support team.',
            tier: 'optional',
          },
          {
            id: 'APP-15',
            title: 'Maps, location & directions',
            desc: 'Live location, nearby search and turn-by-turn hand-off.',
            tier: 'optional',
          },
          {
            id: 'APP-16',
            title: 'Camera, uploads & QR scanning',
            desc: 'Photos, documents and scan-to-verify.',
            tier: 'optional',
          },
          {
            id: 'APP-17',
            title: 'Social sharing & referrals',
            desc: 'Users bring in the next users.',
            tier: 'optional',
          },
          {
            id: 'APP-18',
            title: 'Multi-language support',
            desc: 'The full app in more than one language.',
            tier: 'optional',
          },
          {
            id: 'APP-19',
            title: 'Dark mode',
            desc: 'A second theme that follows the phone setting.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'app-admin',
        title: 'Admin & Growth',
        desc: 'How you run the app once it is live.',
        features: [
          {
            id: 'APP-20',
            title: 'Admin panel',
            desc: 'Manage content, catalogue and everything the app shows.',
            tier: 'recommended',
          },
          {
            id: 'APP-21',
            title: 'User management & roles',
            desc: 'Search users, suspend accounts, set permissions.',
            tier: 'recommended',
          },
          {
            id: 'APP-22',
            title: 'Usage & retention dashboard',
            desc: 'Who uses what, how often, and where they drop off.',
            tier: 'optional',
          },
          {
            id: 'APP-23',
            title: 'Push campaign manager',
            desc: 'Send targeted notifications without a developer.',
            tier: 'optional',
          },
          {
            id: 'APP-24',
            title: 'App Store optimisation (ASO)',
            desc: 'Listing, keywords and screenshots tuned to be found.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     03 — CUSTOM PLATFORM / ERP / SAAS
     ═══════════════════════════════════════════════════════ */
  {
    id: 'platform',
    code: 'PLT',
    title: 'Custom Platform / ERP',
    tagline: 'Software for how you actually work',
    blurb:
      'Internal systems, dashboards, booking engines and multi-tenant SaaS — built to your process rather than bending your process to someone else’s software.',
    groups: [
      {
        id: 'plt-core',
        title: 'Platform Foundation',
        desc: 'The base every custom system stands on.',
        features: [
          {
            id: 'PLT-01',
            title: 'Requirement mapping & system design',
            desc: 'We document how you work now before we build anything.',
            tier: 'core',
          },
          {
            id: 'PLT-02',
            title: 'Secure login, roles & permissions',
            desc: 'Managers see their branch. You see everything.',
            tier: 'core',
          },
          {
            id: 'PLT-03',
            title: 'Central database & data model',
            desc: 'One record of truth instead of five spreadsheets.',
            tier: 'core',
          },
          {
            id: 'PLT-04',
            title: 'Admin control panel',
            desc: 'One control room for the whole system.',
            tier: 'core',
          },
          {
            id: 'PLT-05',
            title: 'Automated backups & recovery',
            desc: 'Daily backups, tested restores.',
            tier: 'core',
          },
          {
            id: 'PLT-06',
            title: 'Audit trail & activity log',
            desc: 'Who changed what, and when.',
            tier: 'recommended',
          },
          {
            id: 'PLT-07',
            title: 'Multi-branch / multi-location',
            desc: 'Separate branches under one head office view.',
            tier: 'optional',
          },
          {
            id: 'PLT-08',
            title: 'Multi-tenant SaaS architecture',
            desc: 'If you intend to sell this platform to other businesses.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'plt-ops',
        title: 'Operations & Workflow',
        desc: 'The modules that run the day-to-day. Pick only what you need.',
        features: [
          {
            id: 'PLT-10',
            title: 'Custom workflows & approvals',
            desc: 'Your approval chain, enforced by the system.',
            tier: 'recommended',
          },
          {
            id: 'PLT-11',
            title: 'Inventory & stock control',
            desc: 'Stock by location, transfers, reorder levels.',
            tier: 'optional',
          },
          {
            id: 'PLT-12',
            title: 'Billing, invoicing & GST',
            desc: 'Quotes, invoices, payments and tax compliance.',
            tier: 'optional',
          },
          {
            id: 'PLT-13',
            title: 'CRM & lead pipeline',
            desc: 'Leads, follow-ups, deal stages and conversion reporting.',
            tier: 'optional',
          },
          {
            id: 'PLT-14',
            title: 'HR, attendance & payroll',
            desc: 'Staff records, leave, shifts and salary processing.',
            tier: 'optional',
          },
          {
            id: 'PLT-15',
            title: 'Purchase & vendor management',
            desc: 'Purchase orders, vendor records, goods received.',
            tier: 'optional',
          },
          {
            id: 'PLT-16',
            title: 'Document storage & e-signatures',
            desc: 'Contracts and files attached to the right record.',
            tier: 'optional',
          },
          {
            id: 'PLT-17',
            title: 'Scheduling & resource allocation',
            desc: 'Jobs, rooms, vehicles or people assigned without clashes.',
            tier: 'optional',
          },
          {
            id: 'PLT-18',
            title: 'Field staff mobile app',
            desc: 'For teams who are not sitting at a desk.',
            tier: 'optional',
          },
          {
            id: 'PLT-19',
            title: 'Customer-facing portal',
            desc: 'Your clients log in and see their own orders, tickets or bookings.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'plt-data',
        title: 'Reporting & Integrations',
        desc: 'Getting data out, and connecting to what you already run.',
        features: [
          {
            id: 'PLT-20',
            title: 'Dashboards & live KPIs',
            desc: 'The numbers that matter, on one screen.',
            tier: 'recommended',
          },
          {
            id: 'PLT-21',
            title: 'Custom reports & scheduled exports',
            desc: 'Excel and PDF, on demand or emailed on a schedule.',
            tier: 'recommended',
          },
          {
            id: 'PLT-22',
            title: 'Data migration from your current system',
            desc: 'Your existing records moved across and verified.',
            tier: 'recommended',
          },
          {
            id: 'PLT-23',
            title: 'Accounting integration',
            desc: 'Tally, Zoho Books or QuickBooks.',
            tier: 'optional',
          },
          {
            id: 'PLT-24',
            title: 'Payment gateway integration',
            desc: 'Collect payments inside the platform.',
            tier: 'optional',
          },
          {
            id: 'PLT-25',
            title: 'Third-party API integrations',
            desc: 'Whatever else you run — we connect to it.',
            tier: 'optional',
          },
          {
            id: 'PLT-26',
            title: 'Public API for your own developers',
            desc: 'Documented endpoints so you are never locked in.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     04 — AI, WHATSAPP & AUTOMATION
     ═══════════════════════════════════════════════════════ */
  {
    id: 'ai-automation',
    code: 'AIA',
    title: 'AI, WhatsApp & Automation',
    tagline: 'Your busiest channel, answering by itself',
    blurb:
      'An assistant that knows your business, answers on WhatsApp and your website, and takes orders while you sleep.',
    groups: [
      {
        id: 'aia-whatsapp',
        title: 'WhatsApp Business',
        desc: 'The official platform, verified under your business.',
        features: [
          {
            id: 'AIA-01',
            title: 'WhatsApp Business API setup',
            desc: 'Official account, verified, with a green tick application.',
            tier: 'core',
          },
          {
            id: 'AIA-02',
            title: 'Automated order & booking messages',
            desc: 'Confirmation, reminder, thank-you, review request.',
            tier: 'recommended',
          },
          {
            id: 'AIA-03',
            title: 'Shared team inbox',
            desc: 'Your staff see and continue any conversation.',
            tier: 'recommended',
          },
          {
            id: 'AIA-04',
            title: 'Broadcast campaigns',
            desc: 'Offers and announcements to opted-in customers.',
            tier: 'recommended',
          },
          {
            id: 'AIA-05',
            title: 'Click-to-WhatsApp on site & ads',
            desc: 'One tap from an ad straight into a conversation.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'aia-assistant',
        title: 'AI Assistant',
        desc: 'Trained on your prices, products, timings and policies.',
        features: [
          {
            id: 'AIA-10',
            title: 'AI assistant trained on your business',
            desc: 'Knows your products, prices, timings, locations and policies.',
            tier: 'recommended',
          },
          {
            id: 'AIA-11',
            title: 'AI takes orders & bookings in chat',
            desc: 'Checks availability, confirms, and sends a payment link.',
            tier: 'recommended',
          },
          {
            id: 'AIA-12',
            title: 'Handover to a real person',
            desc: 'Complaints, refunds and big enquiries reach a human.',
            tier: 'recommended',
          },
          {
            id: 'AIA-13',
            title: 'AI chat widget on your website',
            desc: 'The same assistant, on your site.',
            tier: 'recommended',
          },
          {
            id: 'AIA-14',
            title: 'Ongoing AI retraining',
            desc: 'Kept current as your prices and offering change.',
            tier: 'recommended',
          },
          {
            id: 'AIA-15',
            title: 'Multi-language conversation',
            desc: 'Serves every side of your customer base.',
            tier: 'optional',
          },
          {
            id: 'AIA-16',
            title: 'Instagram & Messenger inbox',
            desc: 'The same assistant on your social channels.',
            tier: 'optional',
          },
          {
            id: 'AIA-17',
            title: 'AI voice call assistant',
            desc: 'Answers the phone, books, and passes on what it cannot handle.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'aia-automation',
        title: 'Automation & Growth',
        desc: 'The follow-ups nobody in your team has time to do.',
        features: [
          {
            id: 'AIA-20',
            title: 'Lead capture straight into your CRM',
            desc: 'No enquiry sits unanswered in an inbox.',
            tier: 'recommended',
          },
          {
            id: 'AIA-21',
            title: 'Abandoned cart & enquiry recovery',
            desc: 'Follows up on people who nearly bought.',
            tier: 'recommended',
          },
          {
            id: 'AIA-22',
            title: 'Automatic review collection',
            desc: 'Asks for a Google review after every purchase or visit.',
            tier: 'recommended',
          },
          {
            id: 'AIA-23',
            title: 'Win back lapsed customers',
            desc: 'Regulars who stop coming get flagged, with an offer ready.',
            tier: 'optional',
          },
          {
            id: 'AIA-24',
            title: 'Automated reports to your inbox',
            desc: 'Sales, leads and performance, sent on a schedule.',
            tier: 'optional',
          },
          {
            id: 'AIA-25',
            title: 'Internal workflow automation',
            desc: 'Connect the tools your team already uses so data stops being retyped.',
            tier: 'optional',
          },
          {
            id: 'AIA-26',
            title: 'AI-written product descriptions',
            desc: 'SEO copy for a whole catalogue, without months of typing.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     05 — MARKETING, BRANDING & SUPPORT
     ═══════════════════════════════════════════════════════ */
  {
    id: 'marketing',
    code: 'MKT',
    title: 'Marketing, Branding & Support',
    tagline: 'Getting found, and staying live',
    blurb:
      'Identity, visibility and the after-launch care a system carrying live revenue actually needs.',
    groups: [
      {
        id: 'mkt-brand',
        title: 'Branding & Identity',
        desc: 'How you look before anyone reads a word.',
        features: [
          {
            id: 'MKT-01',
            title: 'Logo design',
            desc: 'Concepts, revisions, and every file format you will ever need.',
            tier: 'optional',
          },
          {
            id: 'MKT-02',
            title: 'Brand guidelines',
            desc: 'Colours, typography and usage rules, documented.',
            tier: 'optional',
          },
          {
            id: 'MKT-03',
            title: 'Brand messaging & tone of voice',
            desc: 'What you say about yourself, and how you say it.',
            tier: 'optional',
          },
          {
            id: 'MKT-04',
            title: 'Business stationery & collateral',
            desc: 'Cards, letterheads, brochures, signage.',
            tier: 'optional',
          },
          {
            id: 'MKT-05',
            title: 'Packaging & product design',
            desc: 'For businesses selling something physical.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'mkt-seo',
        title: 'SEO & Paid Growth',
        desc: 'So people find you before they find a competitor.',
        features: [
          {
            id: 'MKT-10',
            title: 'On-page SEO & technical audit',
            desc: 'Everything a search engine sees, fixed.',
            tier: 'recommended',
          },
          {
            id: 'MKT-11',
            title: 'Local SEO & Google Business Profile',
            desc: 'Win “near me” searches in every area you operate.',
            tier: 'recommended',
          },
          {
            id: 'MKT-12',
            title: 'Keyword research & content plan',
            desc: 'What to write, in what order, and why.',
            tier: 'optional',
          },
          {
            id: 'MKT-13',
            title: 'Monthly SEO retainer',
            desc: 'Ongoing content, links and ranking work.',
            tier: 'optional',
          },
          {
            id: 'MKT-14',
            title: 'Google Ads management',
            desc: 'Search and shopping campaigns, managed against a target cost per lead.',
            tier: 'optional',
          },
          {
            id: 'MKT-15',
            title: 'Meta (Facebook & Instagram) Ads',
            desc: 'Creative, targeting and reporting.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'mkt-social',
        title: 'Social Media',
        desc: 'Ongoing presence, run by us.',
        features: [
          {
            id: 'MKT-20',
            title: 'Account setup & optimisation',
            desc: 'Profiles, bios, highlights and linking, done properly.',
            tier: 'optional',
          },
          {
            id: 'MKT-21',
            title: 'Monthly content calendar & posting',
            desc: 'Planned, designed, scheduled and published.',
            tier: 'optional',
          },
          {
            id: 'MKT-22',
            title: 'Reels & short-form video production',
            desc: 'Shot and edited for the platforms that reward video.',
            tier: 'optional',
          },
          {
            id: 'MKT-23',
            title: 'Graphic design for posts',
            desc: 'On-brand creative for every post.',
            tier: 'optional',
          },
          {
            id: 'MKT-24',
            title: 'Community management',
            desc: 'Comments and DMs answered, in your voice.',
            tier: 'optional',
          },
          {
            id: 'MKT-25',
            title: 'Influencer & collaboration campaigns',
            desc: 'Sourced, briefed and measured.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'mkt-support',
        title: 'After Launch',
        desc: 'Anything carrying live revenue has to be looked after.',
        features: [
          {
            id: 'MKT-30',
            title: 'Hosting, backups & security monitoring',
            desc: 'Managed by us, watched continuously.',
            tier: 'recommended',
          },
          {
            id: 'MKT-31',
            title: 'Team training & documentation',
            desc: 'Your people are taught how to run it.',
            tier: 'recommended',
          },
          {
            id: 'MKT-32',
            title: 'Annual maintenance contract (AMC)',
            desc: 'Updates, patches and fixes on a fixed yearly fee.',
            tier: 'recommended',
          },
          {
            id: 'MKT-33',
            title: 'Monthly change allowance',
            desc: 'Hours reserved each month for small updates.',
            tier: 'recommended',
          },
          {
            id: 'MKT-34',
            title: 'Priority support SLA',
            desc: 'A guaranteed response time on anything affecting revenue.',
            tier: 'optional',
          },
          {
            id: 'MKT-35',
            title: 'Monthly performance report',
            desc: 'What happened, what it means, and what to do next.',
            tier: 'optional',
          },
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   Derived lookups — built once at module load.
   ═══════════════════════════════════════════════════════════ */

export interface FeatureLocation {
  feature: ScopeFeature;
  group: ScopeGroup;
  track: ScopeTrack;
}

/** Every feature in the catalog, keyed by its stable ID. */
export const featureIndex: ReadonlyMap<string, FeatureLocation> = new Map(
  scopeTracks.flatMap((track) =>
    track.groups.flatMap((group) =>
      group.features.map(
        (feature) => [feature.id, { feature, group, track }] as const
      )
    )
  )
);

/** Every track, keyed by ID. */
export const trackIndex: ReadonlyMap<string, ScopeTrack> = new Map(
  scopeTracks.map((track) => [track.id, track] as const)
);

/** All feature IDs belonging to a track. */
export function featureIdsForTrack(trackId: string): string[] {
  const track = trackIndex.get(trackId);
  if (!track) return [];
  return track.groups.flatMap((group) => group.features.map((f) => f.id));
}

/** Core features of a track — locked in, cannot be removed. */
export function coreFeatureIdsForTrack(trackId: string): string[] {
  const track = trackIndex.get(trackId);
  if (!track) return [];
  return track.groups.flatMap((group) =>
    group.features.filter((f) => f.tier === 'core').map((f) => f.id)
  );
}

/**
 * What gets ticked the moment a track is chosen:
 * core (locked) plus recommended (removable).
 */
export function defaultFeatureIdsForTrack(trackId: string): string[] {
  const track = trackIndex.get(trackId);
  if (!track) return [];
  return track.groups.flatMap((group) =>
    group.features
      .filter((f) => f.tier === 'core' || f.tier === 'recommended')
      .map((f) => f.id)
  );
}

/** Total number of features across the whole catalog. */
export const totalFeatureCount = featureIndex.size;

/* ═══════════════════════════════════════════════════════════
   Summary building — turns a set of IDs into a structure the
   emails can render. Titles always come from the catalog, never
   from anything the browser submitted.
   ═══════════════════════════════════════════════════════════ */

export interface SummaryFeature {
  id: string;
  title: string;
  tier: FeatureTier;
}

export interface SummaryGroup {
  title: string;
  features: SummaryFeature[];
}

export interface SummaryTrack {
  code: string;
  title: string;
  selectedCount: number;
  totalCount: number;
  groups: SummaryGroup[];
}

export interface ScopeSummary {
  tracks: SummaryTrack[];
  selectedCount: number;
}

/**
 * Groups the selected feature IDs by track and group, in catalog order.
 * Unknown IDs and empty groups are dropped.
 */
export function buildScopeSummary(featureIds: readonly string[]): ScopeSummary {
  const selected = new Set(featureIds);

  const tracks = scopeTracks
    .map((track) => {
      const groups = track.groups
        .map((group) => ({
          title: group.title,
          features: group.features
            .filter((f) => selected.has(f.id))
            .map(({ id, title, tier }) => ({ id, title, tier })),
        }))
        .filter((g) => g.features.length > 0);

      const selectedCount = groups.reduce((n, g) => n + g.features.length, 0);

      return {
        code: track.code,
        title: track.title,
        selectedCount,
        totalCount: featureIdsForTrack(track.id).length,
        groups,
      };
    })
    .filter((t) => t.selectedCount > 0);

  return {
    tracks,
    selectedCount: tracks.reduce((n, t) => n + t.selectedCount, 0),
  };
}

/** Target go-live options for the details step. */
export const timelineOptions = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: 'Within 3 months' },
  { value: '3-6-months', label: '3 – 6 months' },
  { value: '6-plus-months', label: '6+ months' },
  { value: 'flexible', label: 'Flexible / still exploring' },
] as const;

export function timelineLabel(value: string): string {
  return timelineOptions.find((t) => t.value === value)?.label || value;
}
