/**
 * InveneX pricing data — single source of truth.
 *
 * Every number on the site traces back to `01-PRICING-DATA.md`. No price
 * literal should exist anywhere else in the codebase — components must
 * import from here.
 */

import type { Currency } from './currency'

export type PriceSet = Record<Currency, number>

// ---------------------------------------------------------------------------
// Build tiers
// ---------------------------------------------------------------------------

export type TierId = 'launchpad' | 'launch' | 'growth' | 'platform' | 'platformScale'

export interface Tier {
  id: TierId
  name: string
  promise: string
  timeline: string
  price: PriceSet
  includes: string[]
  /** Rendered — never omit. Non-empty for launchpad and launch. */
  excludes: string[]
  /** Only growth is the default tier. */
  isDefault?: true
  /** Only growth carries a badge. */
  badge?: 'Most chosen'
}

export const TIERS: Tier[] = [
  {
    id: 'launchpad',
    name: 'Launchpad',
    promise: 'Live this week. Properly built, deliberately small.',
    timeline: '5 working days',
    price: { INR: 48_000, AED: 3_600, USD: 1_600 },
    includes: [
      'Three pages from a pre-built InveneX template',
      "Client's logo, colours, photos and words applied",
      'Mobile-first, fast, Google Business Profile setup',
      'WhatsApp and call buttons',
      'Live in five working days',
    ],
    excludes: [
      'No custom design — client picks one of three layouts',
      'No CMS',
      'No integrations',
      'No copywriting',
      'One revision round',
    ],
  },
  {
    id: 'launch',
    name: 'Launch',
    promise: 'Be live, be fast, be credible.',
    timeline: '3 weeks',
    price: { INR: 1_45_000, AED: 10_800, USD: 4_750 },
    includes: [
      'Up to 6 pages on Next.js',
      'Mobile-first, Core Web Vitals green',
      'Foundational SEO + Google Business setup',
      'Lead form routed to email and WhatsApp',
      'One revision round',
      '30 days post-launch support',
    ],
    excludes: [
      'No CMS — client emails InveneX for text changes',
      'No integrations, no analytics dashboard',
      'No copywriting — client supplies the words',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    promise: 'Be found, and turn the traffic into revenue.',
    timeline: '6 weeks',
    price: { INR: 3_85_000, AED: 28_400, USD: 12_900 },
    includes: [
      'Everything in Launch',
      'Up to 15 pages + headless CMS (client edits anything themselves)',
      'Conversion-engineered — the funnel is designed, not just the pages',
      'Professional copywriting across all core pages',
      'Analytics + conversion tracking dashboard',
      'Three integrations (CRM, payments, WhatsApp, booking)',
      'Blog engine + full technical SEO',
      'Two revision rounds',
      '90 days post-launch support',
      'First month of Momentum care included',
    ],
    excludes: [],
    isDefault: true,
    badge: 'Most chosen',
  },
  {
    id: 'platform',
    name: 'Platform',
    promise: 'Not a website. The system your business runs on.',
    timeline: '10–14 weeks',
    price: { INR: 9_60_000, AED: 71_500, USD: 32_500 },
    includes: [
      'Everything in Growth',
      'Custom application logic, user accounts, roles, permissions',
      'Admin dashboard + operational reporting',
      'Payments and subscriptions (Razorpay / Stripe)',
      'API layer + third-party integrations',
      'React Native app or installable PWA',
      'Staged environments, CI/CD, load testing',
      'Dedicated channel + weekly live demos',
      '6 months support',
      '3 months Momentum care included',
    ],
    excludes: [],
  },
  {
    id: 'platformScale',
    name: 'Platform Scale',
    promise: 'Everything above, at the size your business actually is.',
    timeline: '16–20 weeks',
    price: { INR: 18_75_000, AED: 1_39_000, USD: 63_000 },
    includes: [
      'Everything in Platform, beyond 25 screens or 6 integrations',
      'A Blueprint produces a fixed price before any code is written',
    ],
    excludes: [],
  },
]

// ---------------------------------------------------------------------------
// The Blueprint (paid diagnostic)
// ---------------------------------------------------------------------------

export interface Blueprint {
  price: PriceSet
  /** Blueprint is only offered above this project value. */
  threshold: PriceSet
  timeline: string
  effort: string
  deliverables: string[]
  guarantees: string[]
}

export const BLUEPRINT: Blueprint = {
  price: { INR: 15_000, AED: 1_750, USD: 595 },
  threshold: { INR: 2_00_000, AED: 15_000, USD: 7_000 },
  timeline: '5–7 working days',
  effort: 'approximately 8 founder-hours of effort',
  deliverables: [
    '90-minute working session with two founders',
    'Written technical architecture: stack, integrations, data model, hosting',
    'Competitor teardown — three named competitors',
    'Scope broken into phases with a fixed price against each phase',
    '12-month roadmap',
    "Delivered as a PDF carrying the client's logo",
  ],
  guarantees: [
    'Credited in full against any build started within 30 days',
    "Refundable if the client doesn't find it useful",
    'Yours to keep either way',
  ],
}

// ---------------------------------------------------------------------------
// Mobile apps
// ---------------------------------------------------------------------------

export type AppTierId = 'appLite' | 'appCrossPlatform' | 'appNative' | 'appCare'

export interface AppTier {
  id: AppTierId
  name: string
  price: PriceSet
  timeline: string
  includesStoreSubmission: boolean
  /** Only App Care is mandatory. */
  mandatory?: true
}

/**
 * App Care — the mandatory monthly plan every app client is on.
 *
 * Exported by name so consumers never have to `find(...)!` their way to it.
 * It is also the last entry of {@link APP_TIERS}, by reference.
 */
export const APP_CARE: AppTier = {
  id: 'appCare',
  name: 'App Care',
  price: { INR: 28_000, AED: 2_100, USD: 950 },
  timeline: 'ongoing',
  includesStoreSubmission: false,
  mandatory: true,
}

export const APP_TIERS: AppTier[] = [
  {
    id: 'appLite',
    name: 'App Lite (PWA)',
    price: { INR: 2_95_000, AED: 21_800, USD: 9_900 },
    timeline: '5 weeks',
    includesStoreSubmission: false,
  },
  {
    id: 'appCrossPlatform',
    name: 'App Cross-Platform (React Native)',
    price: { INR: 6_40_000, AED: 47_500, USD: 21_500 },
    timeline: '8 weeks',
    includesStoreSubmission: true,
  },
  {
    id: 'appNative',
    name: 'App Native (Swift + Kotlin)',
    price: { INR: 11_50_000, AED: 85_000, USD: 38_500 },
    timeline: '14 weeks',
    includesStoreSubmission: true,
  },
  APP_CARE,
]

// ---------------------------------------------------------------------------
// E-commerce — priced by catalogue size, never page count
// ---------------------------------------------------------------------------

export type EcomTierId = 'storefront' | 'commerce' | 'marketplace'

export interface EcomTier {
  id: EcomTierId
  name: string
  price: PriceSet
  /** Upper SKU bound. `null` means multi-vendor / no fixed catalogue ceiling. */
  skuLimit: number | null
  timeline: string
  scope: string[]
}

export const ECOM_TIERS: EcomTier[] = [
  {
    id: 'storefront',
    name: 'Storefront',
    price: { INR: 2_85_000, AED: 21_000, USD: 9_500 },
    skuLimit: 100,
    timeline: '4 weeks',
    scope: ['≤100 SKUs', 'one payment gateway', 'manual stock'],
  },
  {
    id: 'commerce',
    name: 'Commerce',
    price: { INR: 5_40_000, AED: 40_000, USD: 18_000 },
    skuLimit: 1_000,
    timeline: '8 weeks',
    scope: [
      '≤1,000 SKUs',
      'variants',
      'multi-gateway',
      'inventory sync',
      'abandoned cart',
      'shipping integration',
    ],
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    price: { INR: 12_50_000, AED: 92_500, USD: 42_000 },
    skuLimit: null,
    timeline: '14 weeks',
    scope: ['Multi-vendor', 'seller onboarding', 'commission splits', 'payouts'],
  },
]

// ---------------------------------------------------------------------------
// Digital strategy
// ---------------------------------------------------------------------------

export interface StrategyOffer {
  name: string
  price: PriceSet
  timeline?: string
  minimumMonths?: number
}

export const STRATEGY: { sprint: StrategyOffer; advisory: StrategyOffer } = {
  sprint: {
    name: 'Strategy Sprint',
    price: { INR: 1_25_000, AED: 9_200, USD: 4_200 },
    timeline: '2 weeks',
  },
  advisory: {
    name: 'Advisory retainer',
    price: { INR: 55_000, AED: 4_100, USD: 1_850 },
    minimumMonths: 6,
  },
}

// ---------------------------------------------------------------------------
// Care Plans (recurring)
// ---------------------------------------------------------------------------

export type CarePlanId = 'essential' | 'momentum' | 'partner'

export interface CarePlan {
  id: CarePlanId
  name: string
  /** Monthly price. */
  price: PriceSet
  features: string[]
  responseTime: string
  /** Only momentum is the default. */
  isDefault?: true
  /** Only momentum carries a badge. */
  badge?: 'Auto-included'
}

export const CARE_PLANS: CarePlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: { INR: 14_500, AED: 1_100, USD: 450 },
    features: [
      'Hosting',
      'Uptime monitoring',
      'Daily backups',
      'Security patching',
      'Dependency updates',
      '2 hours of content changes monthly',
    ],
    responseTime: '48-hour response',
  },
  {
    id: 'momentum',
    name: 'Momentum',
    price: { INR: 42_000, AED: 3_100, USD: 1_400 },
    features: [
      'Everything in Essential',
      '10 hours of development monthly',
      'Monthly analytics report with recommendations',
      'One conversion experiment run and reported each month',
      'Quarterly strategy call',
    ],
    responseTime: '24-hour response',
    isDefault: true,
    badge: 'Auto-included',
  },
  {
    id: 'partner',
    name: 'Partner',
    price: { INR: 1_15_000, AED: 8_500, USD: 3_900 },
    features: [
      'Everything in Momentum',
      '30 hours monthly',
      'Dedicated Slack channel',
      'Roadmap ownership',
      'Monthly strategy session with a founder',
      'Priority slot on any new build',
    ],
    responseTime: 'Same-day response',
  },
]

export const CARE_PLANS_ANNUAL_PREPAY_NOTE = 'Annual prepay: two months free.'

export const MOMENTUM_INCLUDED_IN_GROWTH = 'First month of Momentum is included in Growth.'

export const MOMENTUM_INCLUDED_IN_PLATFORM = 'First three months of Momentum are included in Platform.'

// ---------------------------------------------------------------------------
// Social & performance retainers
// ---------------------------------------------------------------------------

export type RetainerId = 'presence' | 'performance'

export interface Retainer {
  id: RetainerId
  name: string
  /** Monthly price. */
  price: PriceSet
  scope: string[]
  /**
   * Currency-free half of the ad-spend disclosure. The monetary half lives in
   * {@link MIN_AD_SPEND} / {@link minAdSpendNote} so it can be rendered in the
   * visitor's own currency — see the note on {@link AD_SPEND_DISCLOSURE}.
   */
  adSpendNote: string
}

/**
 * The half of the ad-spend disclosure that carries no money in it.
 *
 * This string used to end "...Minimum useful spend ₹40,000/month.", which put
 * a rupee figure in front of Gulf and Western visitors on a page whose entire
 * purpose is to show each market its own sheet. Never reintroduce a currency
 * symbol or amount into this constant — pair it with {@link minAdSpendNote}
 * instead.
 */
export const AD_SPEND_DISCLOSURE =
  'Ad spend is billed separately and never marked up.'

/**
 * Minimum monthly ad spend below which a campaign cannot gather enough data
 * to be worth running. Converted from the ₹40,000 baseline at the sheet rates
 * used throughout `01-PRICING-DATA.md` (₹23.5/AED, ₹86/USD) and rounded to a
 * credible round figure, as every other retainer-adjacent number is.
 */
export const MIN_AD_SPEND: PriceSet = { INR: 40_000, AED: 1_800, USD: 475 }

/**
 * Builds the monetary half of the ad-spend disclosure. The caller formats the
 * amount for the active currency (`formatPrice(MIN_AD_SPEND[currency], currency)`)
 * so this module stays free of formatting concerns.
 */
export function minAdSpendNote(formattedMinimum: string): string {
  return `Minimum useful spend ${formattedMinimum}/month.`
}

export const RETAINERS: Retainer[] = [
  {
    id: 'presence',
    name: 'Presence',
    price: { INR: 32_000, AED: 2_400, USD: 1_100 },
    scope: ['12 static posts + 8 reels monthly', 'community management', 'monthly report'],
    adSpendNote: AD_SPEND_DISCLOSURE,
  },
  {
    id: 'performance',
    name: 'Performance',
    price: { INR: 68_000, AED: 5_000, USD: 2_300 },
    scope: [
      'Everything in Presence',
      'paid campaign management',
      'landing pages',
      'weekly optimisation',
    ],
    adSpendNote: AD_SPEND_DISCLOSURE,
  },
]

// ---------------------------------------------------------------------------
// Out-of-scope work
// ---------------------------------------------------------------------------

export interface OutOfScopeRate {
  hourly: PriceSet
  minimumHours: 4
  note: string
}

export const OUT_OF_SCOPE_RATE: OutOfScopeRate = {
  hourly: { INR: 2_400, AED: 175, USD: 75 },
  minimumHours: 4,
  note: 'Approved in writing, with an estimate, before work begins. Never after.',
}

// ---------------------------------------------------------------------------
// Payment terms
// ---------------------------------------------------------------------------

export interface PaymentStage {
  label: 'Deposit' | 'Midpoint' | 'Launch'
  share: number
  when: string
}

export const PAYMENT_TERMS: PaymentStage[] = [
  {
    label: 'Deposit',
    share: 50,
    when: 'On signature — this is what reserves the slot',
  },
  {
    label: 'Midpoint',
    share: 30,
    when: 'At design sign-off, before build begins',
  },
  {
    label: 'Launch',
    share: 20,
    when: 'On go-live. Not 30 days after — on the day.',
  },
]

export const LATE_PAYMENT_NOTE = 'Late payment: 2% per month after 30 days.'
export const CANCELLATION_NOTE = 'Cancellation after work starts: 25% kill fee.'

// ---------------------------------------------------------------------------
// Regional scope differences
// ---------------------------------------------------------------------------

export interface RegionalScope {
  india: string[]
  gulf: string[]
  usUk: string[]
}

export const REGIONAL_SCOPE: RegionalScope = {
  india: ['Baseline'],
  gulf: ['Arabic / multi-locale readiness', 'WhatsApp-first support'],
  usUk: [
    'Named project manager',
    'Overlapping working hours',
    'Contractual 24-hour SLA',
    'Accessibility audit',
    'DPA',
    'Code escrow option',
  ],
}

// ---------------------------------------------------------------------------
// Budget bands (contact / intake form)
// ---------------------------------------------------------------------------

export interface BudgetBand {
  /** Currency-agnostic identifier, stable across currencies. */
  value: 'band-1' | 'band-2' | 'band-3' | 'band-4'
  /** Currency-specific display label. */
  label: string
}

const BUDGET_BAND_LABELS: Record<Currency, [string, string, string, string]> = {
  // Ordered lowest → highest to match band-1 .. band-4.
  INR: ['Under ₹1,00,000', '₹1,00,000 – ₹4,00,000', '₹4,00,000 – ₹10,00,000', '₹10,00,000+'],
  AED: ['Under AED 5,000', 'AED 5,000 – AED 30,000', 'AED 30,000 – AED 75,000', 'AED 75,000+'],
  USD: ['Under $1,250', '$1,250 – $13,500', '$13,500 – $32,500', '$32,500+'],
}

/**
 * Returns the four budget bands for the given currency, highest first.
 * `value` is currency-agnostic (`band-4` … `band-1`) so callers can persist
 * a selection independent of the visitor's currency; `label` is localised.
 */
export function getBudgetBands(currency: Currency): BudgetBand[] {
  const [band1, band2, band3, band4] = BUDGET_BAND_LABELS[currency]
  return [
    { value: 'band-4', label: band4 },
    { value: 'band-3', label: band3 },
    { value: 'band-2', label: band2 },
    { value: 'band-1', label: band1 },
  ]
}
