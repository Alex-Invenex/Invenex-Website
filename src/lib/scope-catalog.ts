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
 * Each group owns a numeric band (see the comment above each track) so new
 * features can be appended without disturbing existing IDs. Never reuse a
 * retired ID and never renumber a live one — add at the end of the band.
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
     Bands: core 01–19 · content 20–39 · e-commerce 40–79
     ═══════════════════════════════════════════════════════ */
  {
    id: 'website',
    code: 'WEB',
    title: 'Website',
    tagline: 'Your public face',
    blurb:
      'A fast, premium site built for phones first — with a full online store on top if you sell products.',
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
          {
            id: 'WEB-10',
            title: 'Cookie consent & privacy compliance',
            desc: 'Consent banner, privacy policy and terms pages.',
            tier: 'recommended',
          },
          {
            id: 'WEB-11',
            title: 'Live chat widget',
            desc: 'Answer visitors while they are still on the page.',
            tier: 'optional',
          },
          {
            id: 'WEB-12',
            title: 'Newsletter signup & mailing list',
            desc: 'Capture emails and sync them to your mail platform.',
            tier: 'optional',
          },
          {
            id: 'WEB-13',
            title: 'Multi-language (including RTL)',
            desc: 'A full second or third language across the whole site.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'web-content',
        title: 'Content & CMS',
        desc: 'How pages, images and offers get updated after launch.',
        features: [
          {
            id: 'WEB-20',
            title: 'Content editing without a developer',
            desc: 'Your team edits pages, banners and offers themselves.',
            tier: 'recommended',
          },
          {
            id: 'WEB-21',
            title: 'Blog / news section',
            desc: 'For updates, articles and search visibility.',
            tier: 'recommended',
          },
          {
            id: 'WEB-22',
            title: 'Photo & video gallery',
            desc: 'Showcase your work or your premises properly.',
            tier: 'recommended',
          },
          {
            id: 'WEB-23',
            title: 'Testimonials & case studies',
            desc: 'Proof that you do what you say you do.',
            tier: 'recommended',
          },
          {
            id: 'WEB-24',
            title: 'FAQ section with search',
            desc: 'Answers the questions your inbox keeps receiving.',
            tier: 'optional',
          },
          {
            id: 'WEB-25',
            title: 'Careers / jobs section',
            desc: 'Job listings with an online application form.',
            tier: 'optional',
          },
          {
            id: 'WEB-26',
            title: 'Downloadable brochures & documents',
            desc: 'Gated or open, tracked either way.',
            tier: 'optional',
          },
          {
            id: 'WEB-27',
            title: 'Team & leadership profiles',
            desc: 'The people behind the business.',
            tier: 'optional',
          },
          {
            id: 'WEB-28',
            title: 'Copywriting for every page',
            desc: 'We write the words, you approve them.',
            tier: 'optional',
          },
          {
            id: 'WEB-29',
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
            id: 'WEB-40',
            title: 'Product catalogue & product pages',
            desc: 'Gallery, specifications, variants, stock and delivery estimate.',
            tier: 'optional',
          },
          {
            id: 'WEB-41',
            title: 'Cart & secure checkout',
            desc: 'Guest or account checkout, saved addresses.',
            tier: 'optional',
          },
          {
            id: 'WEB-42',
            title: 'Payment gateway',
            desc: 'Razorpay, Stripe, UPI, cards and netbanking.',
            tier: 'optional',
          },
          {
            id: 'WEB-43',
            title: 'Filter, search & sorting',
            desc: 'By category, brand, price and availability.',
            tier: 'optional',
          },
          {
            id: 'WEB-44',
            title: 'Inventory & stock management',
            desc: 'Live stock counts, low-stock alerts, out-of-stock handling.',
            tier: 'optional',
          },
          {
            id: 'WEB-45',
            title: 'Shipping, delivery zones & tracking',
            desc: 'Courier integration and tracking visible to the customer.',
            tier: 'optional',
          },
          {
            id: 'WEB-46',
            title: 'Click & collect at branch',
            desc: 'Buy online, pick up in store.',
            tier: 'optional',
          },
          {
            id: 'WEB-47',
            title: 'Discounts, coupons & gift cards',
            desc: 'Run offers yourself, without calling us.',
            tier: 'optional',
          },
          {
            id: 'WEB-48',
            title: 'Customer accounts & order history',
            desc: 'Everything a customer has bought, in one place.',
            tier: 'optional',
          },
          {
            id: 'WEB-49',
            title: 'Product reviews & ratings',
            desc: 'With verified-purchase marking and photo reviews.',
            tier: 'optional',
          },
          {
            id: 'WEB-50',
            title: 'Wishlist & save for later',
            desc: 'Lets people come back to what they nearly bought.',
            tier: 'optional',
          },
          {
            id: 'WEB-51',
            title: 'Bundles & complete-your-kit offers',
            desc: 'Raise the average order value.',
            tier: 'optional',
          },
          {
            id: 'WEB-52',
            title: 'Subscriptions & repeat orders',
            desc: 'For anything a customer buys again and again.',
            tier: 'optional',
          },
          {
            id: 'WEB-53',
            title: 'Loyalty points & rewards',
            desc: 'Earned on every order, spendable on the next one.',
            tier: 'optional',
          },
          {
            id: 'WEB-54',
            title: 'Returns & refunds workflow',
            desc: 'Tracked from request through to resolution.',
            tier: 'optional',
          },
          {
            id: 'WEB-55',
            title: 'Abandoned cart recovery',
            desc: 'Automatic follow-up to people who nearly bought.',
            tier: 'optional',
          },
          {
            id: 'WEB-56',
            title: 'Automatic GST invoices',
            desc: 'Generated and emailed on every order.',
            tier: 'optional',
          },
          {
            id: 'WEB-57',
            title: 'Stock per branch or warehouse',
            desc: 'Know what is where.',
            tier: 'optional',
          },
          {
            id: 'WEB-58',
            title: 'Marketplace sync',
            desc: 'Amazon, Flipkart and Meta catalogue kept in step with your store.',
            tier: 'optional',
          },
          {
            id: 'WEB-59',
            title: 'Migrate an existing catalogue',
            desc: 'All products, images, prices and stock moved across and cleaned up.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     02 — MOBILE APP
     Bands: foundation 01–19 · user 20–39 · admin 40–59
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
            title: 'Biometric login & device security',
            desc: 'Face ID, fingerprint and secure token storage.',
            tier: 'recommended',
          },
          {
            id: 'APP-08',
            title: 'Deep links & universal links',
            desc: 'A link in a message opens the right screen in the app.',
            tier: 'optional',
          },
          {
            id: 'APP-09',
            title: 'Offline mode & local caching',
            desc: 'Keeps working when the signal drops.',
            tier: 'optional',
          },
          {
            id: 'APP-10',
            title: 'Tablet & landscape layouts',
            desc: 'Beyond the phone screen.',
            tier: 'optional',
          },
          {
            id: 'APP-11',
            title: 'Accessibility support',
            desc: 'Dynamic type, screen readers and contrast.',
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
            id: 'APP-20',
            title: 'Sign up & login',
            desc: 'Email, mobile OTP, Google and Apple sign-in.',
            tier: 'recommended',
          },
          {
            id: 'APP-21',
            title: 'User profiles & preferences',
            desc: 'Saved details, settings and history.',
            tier: 'recommended',
          },
          {
            id: 'APP-22',
            title: 'Push notifications',
            desc: 'The single biggest reason people come back to an app.',
            tier: 'recommended',
          },
          {
            id: 'APP-23',
            title: 'Notification preference centre',
            desc: 'Users choose what they hear about — fewer uninstalls.',
            tier: 'recommended',
          },
          {
            id: 'APP-24',
            title: 'In-app payments & subscriptions',
            desc: 'One-off purchases or recurring billing.',
            tier: 'optional',
          },
          {
            id: 'APP-25',
            title: 'In-app chat & messaging',
            desc: 'Between users, or with your support team.',
            tier: 'optional',
          },
          {
            id: 'APP-26',
            title: 'Maps, location & directions',
            desc: 'Live location, nearby search and turn-by-turn hand-off.',
            tier: 'optional',
          },
          {
            id: 'APP-27',
            title: 'Camera, uploads & QR scanning',
            desc: 'Photos, documents and scan-to-verify.',
            tier: 'optional',
          },
          {
            id: 'APP-28',
            title: 'Favourites & saved items',
            desc: 'Bookmarks, wishlists and quick access.',
            tier: 'optional',
          },
          {
            id: 'APP-29',
            title: 'Calendar sync & reminders',
            desc: 'Bookings and events land in the phone calendar.',
            tier: 'optional',
          },
          {
            id: 'APP-30',
            title: 'Social sharing & referrals',
            desc: 'Users bring in the next users.',
            tier: 'optional',
          },
          {
            id: 'APP-31',
            title: 'In-app review prompts',
            desc: 'Asked at the right moment, so your store rating climbs.',
            tier: 'optional',
          },
          {
            id: 'APP-32',
            title: 'Multi-language support',
            desc: 'The full app in more than one language.',
            tier: 'optional',
          },
          {
            id: 'APP-33',
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
            id: 'APP-40',
            title: 'Admin panel',
            desc: 'Manage content, catalogue and everything the app shows.',
            tier: 'recommended',
          },
          {
            id: 'APP-41',
            title: 'User management & roles',
            desc: 'Search users, suspend accounts, set permissions.',
            tier: 'recommended',
          },
          {
            id: 'APP-42',
            title: 'Usage & retention dashboard',
            desc: 'Who uses what, how often, and where they drop off.',
            tier: 'optional',
          },
          {
            id: 'APP-43',
            title: 'Push campaign manager',
            desc: 'Send targeted notifications without a developer.',
            tier: 'optional',
          },
          {
            id: 'APP-44',
            title: 'In-app announcements & banners',
            desc: 'Tell users about an offer without shipping an update.',
            tier: 'optional',
          },
          {
            id: 'APP-45',
            title: 'Feature flags & A/B testing',
            desc: 'Roll a change out to 10% before you give it to everyone.',
            tier: 'optional',
          },
          {
            id: 'APP-46',
            title: 'App Store optimisation (ASO)',
            desc: 'Listing, keywords and screenshots tuned to be found.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     03 — BOOKING PLATFORM
     Bands: engine 01–19 · payments 20–39 · customer 40–59 ·
            memberships 60–79 · operations 80–99
     ═══════════════════════════════════════════════════════ */
  {
    id: 'booking',
    code: 'BKG',
    title: 'Booking Platform',
    tagline: 'Turn enquiries into paid bookings',
    blurb:
      'Courts, rooms, tables, appointments, classes or equipment — booked and paid for online, with your front desk on the same live calendar.',
    groups: [
      {
        id: 'bkg-engine',
        title: 'Booking Engine',
        desc: 'The core that turns messages and phone calls into confirmed bookings.',
        features: [
          {
            id: 'BKG-01',
            title: 'Live availability calendar',
            desc: 'Real-time, with no double booking, ever.',
            tier: 'core',
          },
          {
            id: 'BKG-02',
            title: 'Book any resource type',
            desc: 'Courts, rooms, tables, staff, vehicles, equipment — whatever you rent out.',
            tier: 'core',
          },
          {
            id: 'BKG-03',
            title: 'Opening hours, holidays & seasons',
            desc: 'Different hours per day, per location, per time of year.',
            tier: 'core',
          },
          {
            id: 'BKG-04',
            title: 'Booking rules & buffer times',
            desc: 'Minimum notice, maximum stay, gaps between bookings, cut-off times.',
            tier: 'core',
          },
          {
            id: 'BKG-05',
            title: 'Peak / off-peak / weekend pricing',
            desc: 'Different rates per resource, per time band, per season.',
            tier: 'recommended',
          },
          {
            id: 'BKG-06',
            title: 'Recurring & block bookings',
            desc: 'Same slot every Tuesday for eight weeks, booked in one go.',
            tier: 'recommended',
          },
          {
            id: 'BKG-07',
            title: 'Add-ons at checkout',
            desc: 'Equipment hire, coaching, catering, lighting — sold with the slot.',
            tier: 'recommended',
          },
          {
            id: 'BKG-08',
            title: 'Waitlist & auto slot release',
            desc: 'A cancellation is offered to the next customer instantly.',
            tier: 'optional',
          },
          {
            id: 'BKG-09',
            title: 'Group booking & split payment',
            desc: 'Everyone gets a link and pays their own share.',
            tier: 'optional',
          },
          {
            id: 'BKG-10',
            title: 'Capacity & overbooking controls',
            desc: 'For classes, events and anything sold by the head.',
            tier: 'optional',
          },
          {
            id: 'BKG-11',
            title: 'Embeddable booking widget',
            desc: 'Drop the booking flow into any existing website or landing page.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'bkg-payments',
        title: 'Payments & Deposits',
        desc: 'Collect the money when the booking is made, not after.',
        features: [
          {
            id: 'BKG-20',
            title: 'Online payment at booking',
            desc: 'Cards, UPI, netbanking and wallets through your gateway.',
            tier: 'core',
          },
          {
            id: 'BKG-21',
            title: 'Cancellation & refund rules',
            desc: 'Your policy, enforced automatically, with refunds from your dashboard.',
            tier: 'core',
          },
          {
            id: 'BKG-22',
            title: 'Deposit now, balance at the venue',
            desc: 'Configurable per resource type.',
            tier: 'recommended',
          },
          {
            id: 'BKG-23',
            title: 'Automatic GST invoices',
            desc: 'Generated and sent on every transaction.',
            tier: 'recommended',
          },
          {
            id: 'BKG-24',
            title: 'Pay at venue / cash bookings',
            desc: 'Reserve online, settle in person, tracked either way.',
            tier: 'recommended',
          },
          {
            id: 'BKG-25',
            title: 'Customer wallet & credit balance',
            desc: 'A cancellation credit can be spent on the next booking.',
            tier: 'optional',
          },
          {
            id: 'BKG-26',
            title: 'Promo codes, vouchers & gift cards',
            desc: 'Run offers without calling us.',
            tier: 'optional',
          },
          {
            id: 'BKG-27',
            title: 'Corporate credit accounts',
            desc: 'Companies book now and are invoiced monthly.',
            tier: 'optional',
          },
          {
            id: 'BKG-28',
            title: 'Automatic recurring billing',
            desc: 'For memberships and ongoing packages.',
            tier: 'optional',
          },
          {
            id: 'BKG-29',
            title: 'Security deposits & damage holds',
            desc: 'Held at booking, released or claimed afterwards.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'bkg-customer',
        title: 'Customer Experience',
        desc: 'What the person booking actually sees and does.',
        features: [
          {
            id: 'BKG-40',
            title: 'Confirmations & reminders',
            desc: 'Sent automatically by WhatsApp, email and SMS.',
            tier: 'core',
          },
          {
            id: 'BKG-41',
            title: 'Customer accounts & booking history',
            desc: 'Everything they have ever booked, in one place.',
            tier: 'recommended',
          },
          {
            id: 'BKG-42',
            title: 'Self-service cancel & reschedule',
            desc: 'Under the rules you set, with no phone call.',
            tier: 'recommended',
          },
          {
            id: 'BKG-43',
            title: 'One-tap rebooking',
            desc: 'Saved favourite slots, resources and times.',
            tier: 'recommended',
          },
          {
            id: 'BKG-44',
            title: 'Automatic review requests',
            desc: 'Asked after the visit, pointed at Google.',
            tier: 'recommended',
          },
          {
            id: 'BKG-45',
            title: 'QR check-in at the venue',
            desc: 'Your front desk sees exactly who is in right now.',
            tier: 'optional',
          },
          {
            id: 'BKG-46',
            title: 'Family, child & guest profiles',
            desc: 'A parent books and manages bookings for their children.',
            tier: 'optional',
          },
          {
            id: 'BKG-47',
            title: 'Digital passes & wallet tickets',
            desc: 'Apple Wallet and Google Wallet passes for each booking.',
            tier: 'optional',
          },
          {
            id: 'BKG-48',
            title: 'Find a partner / join a group',
            desc: 'Players and attendees find each other. This builds a community.',
            tier: 'optional',
          },
          {
            id: 'BKG-49',
            title: 'Booking in the customer app',
            desc: 'The same booking flow inside your iOS and Android app.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'bkg-memberships',
        title: 'Memberships, Classes & Coaching',
        desc: 'Turn one-off visitors into recurring monthly revenue.',
        features: [
          {
            id: 'BKG-60',
            title: 'Membership tiers',
            desc: 'Monthly, annual, family, corporate, student, off-peak.',
            tier: 'optional',
          },
          {
            id: 'BKG-61',
            title: 'Member benefits engine',
            desc: 'Discounts, priority booking, guest passes, included extras.',
            tier: 'optional',
          },
          {
            id: 'BKG-62',
            title: 'Auto-renewal & failed payment recovery',
            desc: 'Members renew without being chased.',
            tier: 'optional',
          },
          {
            id: 'BKG-63',
            title: 'Digital membership card with QR',
            desc: 'Valid at any of your locations.',
            tier: 'optional',
          },
          {
            id: 'BKG-64',
            title: 'Session packages & prepaid credits',
            desc: 'Buy ten sessions, use them across the term.',
            tier: 'optional',
          },
          {
            id: 'BKG-65',
            title: 'Instructor & coach profiles',
            desc: 'Certification, languages, photo, rating and their own calendar.',
            tier: 'optional',
          },
          {
            id: 'BKG-66',
            title: 'One-to-one & group coaching booking',
            desc: 'Booked online with no clash against resource bookings.',
            tier: 'optional',
          },
          {
            id: 'BKG-67',
            title: 'Classes, batches & camps',
            desc: 'Capacity limits, waitlists and term scheduling.',
            tier: 'optional',
          },
          {
            id: 'BKG-68',
            title: 'Attendance & progress notes',
            desc: 'Parents and members can see how they are doing.',
            tier: 'optional',
          },
          {
            id: 'BKG-69',
            title: 'Instructor payout reports',
            desc: 'Based on sessions actually delivered.',
            tier: 'optional',
          },
          {
            id: 'BKG-70',
            title: 'Events, tournaments & leagues',
            desc: 'Event pages, online entry and payment, fixtures and leaderboards.',
            tier: 'optional',
          },
        ],
      },
      {
        id: 'bkg-operations',
        title: 'Staff & Operations',
        desc: 'One control room for everyone who runs the place.',
        features: [
          {
            id: 'BKG-80',
            title: 'Front-desk booking mode',
            desc: 'Walk-ins and phone bookings use the same live calendar.',
            tier: 'core',
          },
          {
            id: 'BKG-81',
            title: 'Maintenance & event block-outs',
            desc: 'Close a resource for repairs, tournaments or private hire.',
            tier: 'core',
          },
          {
            id: 'BKG-82',
            title: 'Manage bookings end to end',
            desc: 'Search, amend, reschedule, cancel and refund — with an audit trail.',
            tier: 'core',
          },
          {
            id: 'BKG-83',
            title: 'Staff roles & permissions',
            desc: 'Branch managers see their branch. You see everything.',
            tier: 'recommended',
          },
          {
            id: 'BKG-84',
            title: 'Utilisation reporting',
            desc: 'See exactly which hours never sell.',
            tier: 'recommended',
          },
          {
            id: 'BKG-85',
            title: 'Revenue reports',
            desc: 'By location, resource, channel and revenue line.',
            tier: 'recommended',
          },
          {
            id: 'BKG-86',
            title: 'Multi-branch / multi-venue',
            desc: 'Separate locations under one head-office view.',
            tier: 'optional',
          },
          {
            id: 'BKG-87',
            title: 'Staff rosters & availability',
            desc: 'Who is working, and therefore what can be booked.',
            tier: 'optional',
          },
          {
            id: 'BKG-88',
            title: 'No-show tracking & penalties',
            desc: 'Flag repeat no-shows and apply your own rules.',
            tier: 'optional',
          },
          {
            id: 'BKG-89',
            title: 'Fill your dead hours automatically',
            desc: 'The system spots slots that never sell and suggests discounts.',
            tier: 'optional',
          },
          {
            id: 'BKG-90',
            title: 'Channel manager / OTA sync',
            desc: 'Keep third-party listing sites in step with your own calendar.',
            tier: 'optional',
          },
          {
            id: 'BKG-91',
            title: 'Access control & gate integration',
            desc: 'A confirmed booking opens the door or the turnstile.',
            tier: 'optional',
          },
          {
            id: 'BKG-92',
            title: 'Accounting export',
            desc: 'Tally, Zoho Books or QuickBooks.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     04 — CUSTOM PLATFORM / ERP / SAAS
     Bands: foundation 01–19 · operations 20–49 · data 50–69
     ═══════════════════════════════════════════════════════ */
  {
    id: 'platform',
    code: 'PLT',
    title: 'Custom Platform / ERP',
    tagline: 'Software for how you actually work',
    blurb:
      'Internal systems, dashboards and multi-tenant SaaS — built to your process rather than bending your process to someone else’s software.',
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
            title: 'Two-factor authentication',
            desc: 'For anyone with access to sensitive records.',
            tier: 'recommended',
          },
          {
            id: 'PLT-08',
            title: 'Single sign-on (SSO)',
            desc: 'Google Workspace or Microsoft 365 login.',
            tier: 'optional',
          },
          {
            id: 'PLT-09',
            title: 'Multi-branch / multi-location',
            desc: 'Separate branches under one head office view.',
            tier: 'optional',
          },
          {
            id: 'PLT-10',
            title: 'Multi-tenant SaaS architecture',
            desc: 'If you intend to sell this platform to other businesses.',
            tier: 'optional',
          },
          {
            id: 'PLT-11',
            title: 'Data retention & privacy tooling',
            desc: 'Export, anonymise and delete on request.',
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
            id: 'PLT-20',
            title: 'Custom workflows & approvals',
            desc: 'Your approval chain, enforced by the system.',
            tier: 'recommended',
          },
          {
            id: 'PLT-21',
            title: 'Inventory & stock control',
            desc: 'Stock by location, transfers, reorder levels.',
            tier: 'optional',
          },
          {
            id: 'PLT-22',
            title: 'Billing, invoicing & GST',
            desc: 'Quotes, invoices, payments and tax compliance.',
            tier: 'optional',
          },
          {
            id: 'PLT-23',
            title: 'CRM & lead pipeline',
            desc: 'Leads, follow-ups, deal stages and conversion reporting.',
            tier: 'optional',
          },
          {
            id: 'PLT-24',
            title: 'HR, attendance & payroll',
            desc: 'Staff records, leave, shifts and salary processing.',
            tier: 'optional',
          },
          {
            id: 'PLT-25',
            title: 'Purchase & vendor management',
            desc: 'Purchase orders, vendor records, goods received.',
            tier: 'optional',
          },
          {
            id: 'PLT-26',
            title: 'Project & task management',
            desc: 'Who is doing what, by when, and what it is costing.',
            tier: 'optional',
          },
          {
            id: 'PLT-27',
            title: 'Ticketing & internal helpdesk',
            desc: 'Requests raised, assigned, resolved and measured.',
            tier: 'optional',
          },
          {
            id: 'PLT-28',
            title: 'Document storage & e-signatures',
            desc: 'Contracts and files attached to the right record.',
            tier: 'optional',
          },
          {
            id: 'PLT-29',
            title: 'Contracts, renewals & reminders',
            desc: 'Nothing lapses because someone forgot a date.',
            tier: 'optional',
          },
          {
            id: 'PLT-30',
            title: 'Scheduling & resource allocation',
            desc: 'Jobs, rooms, vehicles or people assigned without clashes.',
            tier: 'optional',
          },
          {
            id: 'PLT-31',
            title: 'Asset & equipment tracking',
            desc: 'What you own, where it is, and when it was last serviced.',
            tier: 'optional',
          },
          {
            id: 'PLT-32',
            title: 'Quality control & inspections',
            desc: 'Checklists completed on site, with photo evidence.',
            tier: 'optional',
          },
          {
            id: 'PLT-33',
            title: 'Field staff mobile app',
            desc: 'For teams who are not sitting at a desk.',
            tier: 'optional',
          },
          {
            id: 'PLT-34',
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
            id: 'PLT-50',
            title: 'Dashboards & live KPIs',
            desc: 'The numbers that matter, on one screen.',
            tier: 'recommended',
          },
          {
            id: 'PLT-51',
            title: 'Custom reports & scheduled exports',
            desc: 'Excel and PDF, on demand or emailed on a schedule.',
            tier: 'recommended',
          },
          {
            id: 'PLT-52',
            title: 'Data migration from your current system',
            desc: 'Your existing records moved across and verified.',
            tier: 'recommended',
          },
          {
            id: 'PLT-53',
            title: 'Real-time alerts & thresholds',
            desc: 'Told the moment a number crosses a line you care about.',
            tier: 'recommended',
          },
          {
            id: 'PLT-54',
            title: 'Accounting integration',
            desc: 'Tally, Zoho Books or QuickBooks.',
            tier: 'optional',
          },
          {
            id: 'PLT-55',
            title: 'Payment gateway integration',
            desc: 'Collect payments inside the platform.',
            tier: 'optional',
          },
          {
            id: 'PLT-56',
            title: 'Third-party API integrations',
            desc: 'Whatever else you run — we connect to it.',
            tier: 'optional',
          },
          {
            id: 'PLT-57',
            title: 'Webhooks & event feeds',
            desc: 'Push changes out to other systems as they happen.',
            tier: 'optional',
          },
          {
            id: 'PLT-58',
            title: 'Public API for your own developers',
            desc: 'Documented endpoints so you are never locked in.',
            tier: 'optional',
          },
          {
            id: 'PLT-59',
            title: 'Forecasting & trend analysis',
            desc: 'What the numbers say is about to happen.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     05 — AI, WHATSAPP & AUTOMATION
     Bands: whatsapp 01–19 · assistant 20–39 · automation 40–59
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
            title: 'Payment links inside the chat',
            desc: 'The customer pays without leaving WhatsApp.',
            tier: 'recommended',
          },
          {
            id: 'AIA-06',
            title: 'Product catalogue in WhatsApp',
            desc: 'Browse and order from inside the conversation.',
            tier: 'optional',
          },
          {
            id: 'AIA-07',
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
            id: 'AIA-20',
            title: 'AI assistant trained on your business',
            desc: 'Knows your products, prices, timings, locations and policies.',
            tier: 'recommended',
          },
          {
            id: 'AIA-21',
            title: 'AI takes orders & bookings in chat',
            desc: 'Checks availability, confirms, and sends a payment link.',
            tier: 'recommended',
          },
          {
            id: 'AIA-22',
            title: 'Handover to a real person',
            desc: 'Complaints, refunds and big enquiries reach a human.',
            tier: 'recommended',
          },
          {
            id: 'AIA-23',
            title: 'AI chat widget on your website',
            desc: 'The same assistant, on your site.',
            tier: 'recommended',
          },
          {
            id: 'AIA-24',
            title: 'Trained on your documents',
            desc: 'Price lists, brochures and policies become answers.',
            tier: 'recommended',
          },
          {
            id: 'AIA-25',
            title: 'Ongoing AI retraining',
            desc: 'Kept current as your prices and offering change.',
            tier: 'recommended',
          },
          {
            id: 'AIA-26',
            title: 'Multi-language conversation',
            desc: 'Serves every side of your customer base.',
            tier: 'optional',
          },
          {
            id: 'AIA-27',
            title: 'Instagram & Messenger inbox',
            desc: 'The same assistant on your social channels.',
            tier: 'optional',
          },
          {
            id: 'AIA-28',
            title: 'Sentiment & escalation detection',
            desc: 'An angry customer reaches a human before they reach Google reviews.',
            tier: 'optional',
          },
          {
            id: 'AIA-29',
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
            id: 'AIA-40',
            title: 'Lead capture straight into your CRM',
            desc: 'No enquiry sits unanswered in an inbox.',
            tier: 'recommended',
          },
          {
            id: 'AIA-41',
            title: 'Abandoned cart & enquiry recovery',
            desc: 'Follows up on people who nearly bought.',
            tier: 'recommended',
          },
          {
            id: 'AIA-42',
            title: 'Automatic review collection',
            desc: 'Asks for a Google review after every purchase or visit.',
            tier: 'recommended',
          },
          {
            id: 'AIA-43',
            title: 'Auto-tagging & routing of enquiries',
            desc: 'Every message reaches the right person first time.',
            tier: 'recommended',
          },
          {
            id: 'AIA-44',
            title: 'Win back lapsed customers',
            desc: 'Regulars who stop coming get flagged, with an offer ready.',
            tier: 'optional',
          },
          {
            id: 'AIA-45',
            title: 'Automated reports to your inbox',
            desc: 'Sales, leads and performance, sent on a schedule.',
            tier: 'optional',
          },
          {
            id: 'AIA-46',
            title: 'Internal workflow automation',
            desc: 'Connect the tools your team already uses so data stops being retyped.',
            tier: 'optional',
          },
          {
            id: 'AIA-47',
            title: 'Document & invoice data extraction',
            desc: 'Bills and forms read automatically into your system.',
            tier: 'optional',
          },
          {
            id: 'AIA-48',
            title: 'AI-written product descriptions',
            desc: 'SEO copy for a whole catalogue, without months of typing.',
            tier: 'optional',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     06 — MARKETING, BRANDING & SUPPORT
     Bands: brand 01–19 · seo 20–39 · social 40–59 · support 60–79
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
          {
            id: 'MKT-06',
            title: 'Rebrand rollout',
            desc: 'Applying a new identity everywhere the old one appears.',
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
            id: 'MKT-20',
            title: 'On-page SEO & technical audit',
            desc: 'Everything a search engine sees, fixed.',
            tier: 'recommended',
          },
          {
            id: 'MKT-21',
            title: 'Local SEO & Google Business Profile',
            desc: 'Win “near me” searches in every area you operate.',
            tier: 'recommended',
          },
          {
            id: 'MKT-22',
            title: 'Keyword research & content plan',
            desc: 'What to write, in what order, and why.',
            tier: 'optional',
          },
          {
            id: 'MKT-23',
            title: 'Content writing retainer',
            desc: 'Articles published every month, written to rank.',
            tier: 'optional',
          },
          {
            id: 'MKT-24',
            title: 'E-commerce & product SEO',
            desc: 'Category and product pages built to be found.',
            tier: 'optional',
          },
          {
            id: 'MKT-25',
            title: 'Monthly SEO retainer',
            desc: 'Ongoing content, links and ranking work.',
            tier: 'optional',
          },
          {
            id: 'MKT-26',
            title: 'Google Ads management',
            desc: 'Search and shopping campaigns, run to a target cost per lead.',
            tier: 'optional',
          },
          {
            id: 'MKT-27',
            title: 'Meta (Facebook & Instagram) Ads',
            desc: 'Creative, targeting and reporting.',
            tier: 'optional',
          },
          {
            id: 'MKT-28',
            title: 'Competitor tracking',
            desc: 'What they rank for that you do not.',
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
            id: 'MKT-40',
            title: 'Account setup & optimisation',
            desc: 'Profiles, bios, highlights and linking, done properly.',
            tier: 'optional',
          },
          {
            id: 'MKT-41',
            title: 'Monthly content calendar & posting',
            desc: 'Planned, designed, scheduled and published.',
            tier: 'optional',
          },
          {
            id: 'MKT-42',
            title: 'Reels & short-form video production',
            desc: 'Shot and edited for the platforms that reward video.',
            tier: 'optional',
          },
          {
            id: 'MKT-43',
            title: 'Graphic design for posts',
            desc: 'On-brand creative for every post.',
            tier: 'optional',
          },
          {
            id: 'MKT-44',
            title: 'Community management',
            desc: 'Comments and DMs answered, in your voice.',
            tier: 'optional',
          },
          {
            id: 'MKT-45',
            title: 'YouTube channel management',
            desc: 'Long-form video, thumbnails, titles and descriptions.',
            tier: 'optional',
          },
          {
            id: 'MKT-46',
            title: 'LinkedIn & B2B content',
            desc: 'For businesses selling to other businesses.',
            tier: 'optional',
          },
          {
            id: 'MKT-47',
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
            id: 'MKT-60',
            title: 'Hosting, backups & security monitoring',
            desc: 'Managed by us, watched continuously.',
            tier: 'recommended',
          },
          {
            id: 'MKT-61',
            title: 'Team training & documentation',
            desc: 'Your people are taught how to run it.',
            tier: 'recommended',
          },
          {
            id: 'MKT-62',
            title: 'Annual maintenance contract (AMC)',
            desc: 'Updates, patches and fixes on a fixed yearly fee.',
            tier: 'recommended',
          },
          {
            id: 'MKT-63',
            title: 'Monthly change allowance',
            desc: 'Hours reserved each month for small updates.',
            tier: 'recommended',
          },
          {
            id: 'MKT-64',
            title: 'Uptime monitoring & alerts',
            desc: 'We know it is down before your customers tell you.',
            tier: 'recommended',
          },
          {
            id: 'MKT-65',
            title: 'Security patching & dependency updates',
            desc: 'Kept current so it does not become a liability.',
            tier: 'recommended',
          },
          {
            id: 'MKT-66',
            title: 'Priority support SLA',
            desc: 'A guaranteed response time on anything affecting revenue.',
            tier: 'optional',
          },
          {
            id: 'MKT-67',
            title: 'Monthly performance report',
            desc: 'What happened, what it means, and what to do next.',
            tier: 'optional',
          },
          {
            id: 'MKT-68',
            title: 'Quarterly strategy review',
            desc: 'A working session on what to build or change next.',
            tier: 'optional',
          },
          {
            id: 'MKT-69',
            title: 'New location onboarding',
            desc: 'Priority setup as you expand.',
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

const entries = scopeTracks.flatMap((track) =>
  track.groups.flatMap((group) =>
    group.features.map(
      (feature) => [feature.id, { feature, group, track }] as const
    )
  )
);

// A duplicate ID would silently drop a feature from the index and from every
// email. Fail loudly at import time instead.
if (new Set(entries.map(([id]) => id)).size !== entries.length) {
  const seen = new Set<string>();
  const dupes = entries
    .map(([id]) => id)
    .filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
  throw new Error(`scope-catalog: duplicate feature IDs: ${[...new Set(dupes)].join(', ')}`);
}

/** Every feature in the catalog, keyed by its stable ID. */
export const featureIndex: ReadonlyMap<string, FeatureLocation> = new Map(entries);

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
