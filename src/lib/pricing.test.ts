import { describe, it, expect } from 'vitest'
import {
  TIERS,
  CARE_PLANS,
  AD_SPEND_DISCLOSURE,
  APP_CARE,
  APP_TIERS,
  MIN_AD_SPEND,
  minAdSpendNote,
  ECOM_TIERS,
  BLUEPRINT,
  RETAINERS,
  STRATEGY,
  OUT_OF_SCOPE_RATE,
  PAYMENT_TERMS,
  REGIONAL_SCOPE,
  getBudgetBands,
  CARE_PLANS_ANNUAL_PREPAY_NOTE,
  MOMENTUM_INCLUDED_IN_GROWTH,
  MOMENTUM_INCLUDED_IN_PLATFORM,
} from './pricing'

describe('pricing data — build tiers', () => {
  it('has exactly five build tiers in ladder order', () => {
    expect(TIERS.map((t) => t.id)).toEqual([
      'launchpad',
      'launch',
      'growth',
      'platform',
      'platformScale',
    ])
  })

  it('prices every tier in all three currencies', () => {
    for (const tier of TIERS) {
      expect(tier.price.INR).toBeGreaterThan(0)
      expect(tier.price.AED).toBeGreaterThan(0)
      expect(tier.price.USD).toBeGreaterThan(0)
    }
  })

  // Guards the anti-negotiation rule: precise numbers draw smaller counter-offers
  // than round ones. If someone "tidies" 3,85,000 into 4,00,000, this fails.
  it('uses the exact published INR prices, unrounded', () => {
    const byId = Object.fromEntries(TIERS.map((t) => [t.id, t.price.INR]))
    expect(byId).toEqual({
      launchpad: 48_000,
      launch: 1_45_000,
      growth: 3_85_000,
      platform: 9_60_000,
      platformScale: 18_75_000,
    })
  })

  it('uses the exact published AED and USD prices', () => {
    const aed = Object.fromEntries(TIERS.map((t) => [t.id, t.price.AED]))
    const usd = Object.fromEntries(TIERS.map((t) => [t.id, t.price.USD]))
    expect(aed).toEqual({
      launchpad: 3_600,
      launch: 10_800,
      growth: 28_400,
      platform: 71_500,
      platformScale: 1_39_000,
    })
    expect(usd).toEqual({
      launchpad: 1_600,
      launch: 4_750,
      growth: 12_900,
      platform: 32_500,
      platformScale: 63_000,
    })
  })

  it('marks growth as the only default tier', () => {
    expect(TIERS.filter((t) => t.isDefault).map((t) => t.id)).toEqual(['growth'])
  })

  it('gives growth the "Most chosen" badge and no other tier a badge', () => {
    const growth = TIERS.find((t) => t.id === 'growth')!
    expect(growth.badge).toBe('Most chosen')
    for (const tier of TIERS) {
      if (tier.id !== 'growth') expect(tier.badge).toBeUndefined()
    }
  })

  it('carries the copy-deck §1 promise line for every tier', () => {
    const promises = Object.fromEntries(TIERS.map((t) => [t.id, t.promise]))
    expect(promises).toEqual({
      launchpad: 'Live this week. Properly built, deliberately small.',
      launch: 'Be live, be fast, be credible.',
      growth: 'Be found, and turn the traffic into revenue.',
      platform: 'Not a website. The system your business runs on.',
      platformScale: 'Everything above, at the size your business actually is.',
    })
  })

  // Exclusion lists are load-bearing: they make serious buyers self-select upward.
  it('gives launchpad and launch non-empty exclusion lists', () => {
    for (const id of ['launchpad', 'launch']) {
      const tier = TIERS.find((t) => t.id === id)!
      expect(tier.excludes.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('allows empty exclusion lists for growth, platform, and platformScale', () => {
    for (const id of ['growth', 'platform', 'platformScale']) {
      const tier = TIERS.find((t) => t.id === id)!
      expect(tier.excludes).toEqual([])
    }
  })

  it('gives every tier a non-empty includes list and timeline', () => {
    for (const tier of TIERS) {
      expect(tier.includes.length).toBeGreaterThan(0)
      expect(tier.timeline.length).toBeGreaterThan(0)
    }
  })

  it('prices ascend monotonically across the ladder', () => {
    const inr = TIERS.map((t) => t.price.INR)
    expect([...inr].sort((a, b) => a - b)).toEqual(inr)
    const aed = TIERS.map((t) => t.price.AED)
    expect([...aed].sort((a, b) => a - b)).toEqual(aed)
    const usd = TIERS.map((t) => t.price.USD)
    expect([...usd].sort((a, b) => a - b)).toEqual(usd)
  })

  it('records the published timelines', () => {
    const timelines = Object.fromEntries(TIERS.map((t) => [t.id, t.timeline]))
    expect(timelines).toEqual({
      launchpad: '5 working days',
      launch: '3 weeks',
      growth: '6 weeks',
      platform: '10–14 weeks',
      platformScale: '16–20 weeks',
    })
  })
})

describe('pricing data — blueprint', () => {
  it('prices the blueprint at the published figures', () => {
    expect(BLUEPRINT.price).toEqual({ INR: 15_000, AED: 1_750, USD: 595 })
  })

  it('sets the blueprint threshold above the launch tier price', () => {
    expect(BLUEPRINT.threshold.INR).toBe(2_00_000)
    expect(BLUEPRINT.threshold.INR).toBeGreaterThan(
      TIERS.find((t) => t.id === 'launch')!.price.INR,
    )
  })

  it('sets the blueprint threshold in all three currencies', () => {
    expect(BLUEPRINT.threshold).toEqual({ INR: 2_00_000, AED: 15_000, USD: 7_000 })
  })

  it('lists the blueprint deliverables and guarantees', () => {
    expect(BLUEPRINT.deliverables.length).toBeGreaterThanOrEqual(5)
    expect(BLUEPRINT.guarantees.length).toBeGreaterThanOrEqual(3)
  })
})

describe('pricing data — mobile apps', () => {
  it('has exactly four app tiers including App Care', () => {
    expect(APP_TIERS.map((t) => t.id)).toEqual(['appLite', 'appCrossPlatform', 'appNative', 'appCare'])
  })

  it('uses the exact published app prices', () => {
    const byId = Object.fromEntries(APP_TIERS.map((t) => [t.id, t.price]))
    expect(byId).toEqual({
      appLite: { INR: 2_95_000, AED: 21_800, USD: 9_900 },
      appCrossPlatform: { INR: 6_40_000, AED: 47_500, USD: 21_500 },
      appNative: { INR: 11_50_000, AED: 85_000, USD: 38_500 },
      appCare: { INR: 28_000, AED: 2_100, USD: 950 },
    })
  })

  it('marks app care as mandatory, not optional', () => {
    expect(APP_TIERS.find((t) => t.id === 'appCare')!.mandatory).toBe(true)
  })

  // Exported by name so no consumer has to reach for `find(...)!`.
  it('exports App Care by name, and it is the same object in APP_TIERS', () => {
    expect(APP_CARE.id).toBe('appCare')
    expect(APP_CARE.mandatory).toBe(true)
    expect(APP_CARE.price).toEqual({ INR: 28_000, AED: 2_100, USD: 950 })
    expect(APP_TIERS).toContain(APP_CARE)
    expect(APP_TIERS.filter((t) => t.mandatory)).toEqual([APP_CARE])
  })

  it('marks the non-care app tiers as not mandatory', () => {
    for (const id of ['appLite', 'appCrossPlatform', 'appNative']) {
      expect(APP_TIERS.find((t) => t.id === id)!.mandatory).toBeFalsy()
    }
  })
})

describe('pricing data — e-commerce', () => {
  it('prices e-commerce by catalogue size, not page count', () => {
    for (const tier of ECOM_TIERS) expect(tier.skuLimit).toBeDefined()
  })

  it('uses the exact published e-commerce prices', () => {
    const byId = Object.fromEntries(ECOM_TIERS.map((t) => [t.id, t.price]))
    expect(byId).toEqual({
      storefront: { INR: 2_85_000, AED: 21_000, USD: 9_500 },
      commerce: { INR: 5_40_000, AED: 40_000, USD: 18_000 },
      marketplace: { INR: 12_50_000, AED: 92_500, USD: 42_000 },
    })
  })

  it('records the published SKU limits', () => {
    const byId = Object.fromEntries(ECOM_TIERS.map((t) => [t.id, t.skuLimit]))
    expect(byId).toEqual({
      storefront: 100,
      commerce: 1_000,
      marketplace: null,
    })
  })
})

describe('pricing data — care plans', () => {
  it('has exactly three care plans', () => {
    expect(CARE_PLANS.map((p) => p.id)).toEqual(['essential', 'momentum', 'partner'])
  })

  it('uses the exact published monthly care prices', () => {
    const byId = Object.fromEntries(CARE_PLANS.map((p) => [p.id, p.price]))
    expect(byId).toEqual({
      essential: { INR: 14_500, AED: 1_100, USD: 450 },
      momentum: { INR: 42_000, AED: 3_100, USD: 1_400 },
      partner: { INR: 1_15_000, AED: 8_500, USD: 3_900 },
    })
  })

  it('marks momentum as the default care plan', () => {
    expect(CARE_PLANS.filter((p) => p.isDefault).map((p) => p.id)).toEqual(['momentum'])
  })

  it('badges momentum "Auto-included" and no other plan', () => {
    const momentum = CARE_PLANS.find((p) => p.id === 'momentum')!
    expect(momentum.badge).toBe('Auto-included')
    for (const plan of CARE_PLANS) {
      if (plan.id !== 'momentum') expect(plan.badge).toBeUndefined()
    }
  })

  it('gives every care plan a non-empty feature list', () => {
    for (const plan of CARE_PLANS) {
      expect(plan.features.length).toBeGreaterThan(0)
    }
  })

  it('records the published response times', () => {
    const byId = Object.fromEntries(CARE_PLANS.map((p) => [p.id, p.responseTime]))
    expect(byId).toEqual({
      essential: '48-hour response',
      momentum: '24-hour response',
      partner: 'Same-day response',
    })
  })

  it('states the annual prepay discount', () => {
    expect(CARE_PLANS_ANNUAL_PREPAY_NOTE).toMatch(/two months free/i)
  })

  it('states which tiers include Momentum care free', () => {
    expect(MOMENTUM_INCLUDED_IN_GROWTH).toMatch(/first month/i)
    expect(MOMENTUM_INCLUDED_IN_PLATFORM).toMatch(/three months|3 months/i)
  })
})

describe('pricing data — retainers', () => {
  it('has exactly two social/performance retainers', () => {
    expect(RETAINERS.map((r) => r.id)).toEqual(['presence', 'performance'])
  })

  it('uses the exact published retainer prices', () => {
    const byId = Object.fromEntries(RETAINERS.map((r) => [r.id, r.price]))
    expect(byId).toEqual({
      presence: { INR: 32_000, AED: 2_400, USD: 1_100 },
      performance: { INR: 68_000, AED: 5_000, USD: 2_300 },
    })
  })

  it('carries the ad-spend-billed-separately note on both retainers', () => {
    for (const retainer of RETAINERS) {
      expect(retainer.adSpendNote).toMatch(/billed separately/i)
      expect(retainer.adSpendNote).toMatch(/never marked up/i)
    }
  })

  // The disclosure used to end "...Minimum useful spend ₹40,000/month.", which
  // put the India sheet in front of Gulf and Western visitors. The monetary
  // half now lives in MIN_AD_SPEND and is formatted per currency at render.
  it('keeps every currency symbol and amount out of the ad-spend note', () => {
    for (const retainer of RETAINERS) {
      expect(retainer.adSpendNote).toBe(AD_SPEND_DISCLOSURE)
      expect(retainer.adSpendNote).not.toMatch(/₹|\$|AED|\d/)
    }
    expect(AD_SPEND_DISCLOSURE).not.toMatch(/₹|\$|AED|\d/)
  })

  it('publishes the minimum useful ad spend in all three currencies', () => {
    expect(MIN_AD_SPEND).toEqual({ INR: 40_000, AED: 1_800, USD: 475 })
  })

  it('builds the minimum-spend sentence around a pre-formatted amount', () => {
    expect(minAdSpendNote('AED 1,800')).toBe(
      'Minimum useful spend AED 1,800/month.'
    )
    expect(minAdSpendNote('₹40,000')).toBe(
      'Minimum useful spend ₹40,000/month.'
    )
  })
})

describe('pricing data — digital strategy', () => {
  it('uses the exact published strategy prices', () => {
    expect(STRATEGY.sprint.price).toEqual({ INR: 1_25_000, AED: 9_200, USD: 4_200 })
    expect(STRATEGY.advisory.price).toEqual({ INR: 55_000, AED: 4_100, USD: 1_850 })
  })

  it('records the sprint timeline and advisory minimum term', () => {
    expect(STRATEGY.sprint.timeline).toMatch(/2 weeks/i)
    expect(STRATEGY.advisory.minimumMonths).toBe(6)
  })
})

describe('pricing data — out-of-scope rate', () => {
  it('uses the exact published hourly rate and minimum block', () => {
    expect(OUT_OF_SCOPE_RATE.hourly).toEqual({ INR: 2_400, AED: 175, USD: 75 })
    expect(OUT_OF_SCOPE_RATE.minimumHours).toBe(4)
  })

  it('notes written approval is required before work begins', () => {
    expect(OUT_OF_SCOPE_RATE.note).toMatch(/writing/i)
  })
})

describe('pricing data — payment terms', () => {
  it('has exactly three staged payments summing to 100%', () => {
    expect(PAYMENT_TERMS.length).toBe(3)
    expect(PAYMENT_TERMS.reduce((sum, stage) => sum + stage.share, 0)).toBe(100)
  })

  it('uses the exact published stages, in order', () => {
    expect(PAYMENT_TERMS.map((s) => ({ label: s.label, share: s.share }))).toEqual([
      { label: 'Deposit', share: 50 },
      { label: 'Midpoint', share: 30 },
      { label: 'Launch', share: 20 },
    ])
  })

  it('describes when each stage is due', () => {
    for (const stage of PAYMENT_TERMS) {
      expect(stage.when.length).toBeGreaterThan(0)
    }
  })
})

describe('pricing data — regional scope differences', () => {
  it('has a baseline entry for India and additional-deliverable lists for Gulf and US/UK', () => {
    expect(REGIONAL_SCOPE.india.length).toBeGreaterThanOrEqual(1)
    expect(REGIONAL_SCOPE.gulf.length).toBeGreaterThanOrEqual(2)
    expect(REGIONAL_SCOPE.usUk.length).toBeGreaterThanOrEqual(4)
  })

  it('never lets an identical deliverable carry two prices — scope differs, not just price', () => {
    const gulfText = REGIONAL_SCOPE.gulf.join(' ').toLowerCase()
    expect(gulfText).toMatch(/whatsapp/)
    const usUkText = REGIONAL_SCOPE.usUk.join(' ').toLowerCase()
    expect(usUkText).toMatch(/project manager/)
    expect(usUkText).toMatch(/24-hour|24 hour/)
  })
})

describe('pricing data — budget bands', () => {
  for (const currency of ['INR', 'AED', 'USD'] as const) {
    it(`returns exactly four bands, highest first, for ${currency}`, () => {
      const bands = getBudgetBands(currency)
      expect(bands.length).toBe(4)
      expect(bands.map((b) => b.value)).toEqual(['band-4', 'band-3', 'band-2', 'band-1'])
    })
  }

  it('floors the lowest INR band at Under ₹1,00,000', () => {
    const bands = getBudgetBands('INR')
    const lowest = bands[bands.length - 1]
    expect(lowest.label).toMatch(/Under ₹1,00,000/)
  })

  it('floors the lowest AED band at Under AED 5,000', () => {
    const bands = getBudgetBands('AED')
    const lowest = bands[bands.length - 1]
    expect(lowest.label).toMatch(/Under AED 5,000/)
  })

  it('floors the lowest USD band at Under $1,250', () => {
    const bands = getBudgetBands('USD')
    const lowest = bands[bands.length - 1]
    expect(lowest.label).toMatch(/Under \$1,250/)
  })

  it('gives every band a non-empty label distinct from the others', () => {
    for (const currency of ['INR', 'AED', 'USD'] as const) {
      const labels = getBudgetBands(currency).map((b) => b.label)
      expect(new Set(labels).size).toBe(labels.length)
      for (const label of labels) expect(label.length).toBeGreaterThan(0)
    }
  })
})
