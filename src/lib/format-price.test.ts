import { describe, it, expect } from 'vitest'
import { formatPrice } from './format-price'

describe('formatPrice', () => {
  // Indian lakh grouping, not Western thousands. ₹3,85,000 — never ₹385,000.
  it('formats INR in lakh grouping', () => {
    expect(formatPrice(3_85_000, 'INR')).toBe('₹3,85,000')
    expect(formatPrice(18_75_000, 'INR')).toBe('₹18,75,000')
    expect(formatPrice(48_000, 'INR')).toBe('₹48,000')
  })

  it('formats USD in Western grouping', () => {
    expect(formatPrice(12_900, 'USD')).toBe('$12,900')
    expect(formatPrice(1_600, 'USD')).toBe('$1,600')
  })

  // AED has no universally-agreed Intl currency symbol, and currencyDisplay:'code'
  // inserts a non-breaking space (U+00A0) between the code and the digits on some
  // ICU builds (verified locally: Node 20's ICU does this). Relying on that raw
  // output would make the test pass locally but fail on Vercel's ICU (or vice
  // versa) if the whitespace character differs. So the implementation formats the
  // number with plain en-US grouping and manually prefixes "AED " (a normal
  // space, U+0020) — this is deterministic across every ICU build because it
  // never touches Intl's currency-symbol/space logic at all.
  it('formats AED with a deterministic manual prefix', () => {
    expect(formatPrice(28_400, 'AED')).toBe('AED 28,400')
    expect(formatPrice(28_400, 'AED')).toMatch(/28,400/)
  })

  it('never shows decimal places', () => {
    expect(formatPrice(48_000, 'INR')).not.toContain('.')
    expect(formatPrice(1_600, 'USD')).not.toContain('.')
    expect(formatPrice(28_400, 'AED')).not.toContain('.')
  })

  it('never prefixes a price with "from" or suffixes it with "+"', () => {
    const out = formatPrice(9_60_000, 'INR')
    expect(out).not.toMatch(/from|starting|\+/i)
  })
})
