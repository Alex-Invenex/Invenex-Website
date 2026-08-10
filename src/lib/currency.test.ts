import { describe, it, expect } from 'vitest'
import { currencyForCountry, isCurrency, CURRENCIES, CURRENCY_COOKIE } from './currency'

describe('currencyForCountry', () => {
  it.each(['AE', 'SA', 'QA', 'KW', 'OM', 'BH'])('maps Gulf country %s to AED', (c) => {
    expect(currencyForCountry(c)).toBe('AED')
  })

  it.each(['US', 'GB', 'CA', 'AU', 'IE', 'DE', 'FR', 'NL', 'SE', 'NO', 'DK', 'CH', 'BE', 'AT', 'FI', 'NZ'])(
    'maps Western country %s to USD',
    (c) => {
      expect(currencyForCountry(c)).toBe('USD')
    }
  )

  it.each(['IN', 'LK', 'BD', 'NP'])('maps South Asian country %s to INR', (c) => {
    expect(currencyForCountry(c)).toBe('INR')
  })

  it('falls back to INR for unknown or missing country', () => {
    expect(currencyForCountry('ZZ')).toBe('INR')
    expect(currencyForCountry(undefined)).toBe('INR')
    expect(currencyForCountry(null)).toBe('INR')
    expect(currencyForCountry('')).toBe('INR')
  })

  it('is case-insensitive', () => {
    expect(currencyForCountry('ae')).toBe('AED')
    expect(currencyForCountry('us')).toBe('USD')
    expect(currencyForCountry('in')).toBe('INR')
  })
})

describe('isCurrency', () => {
  it.each(CURRENCIES)('accepts %s as a valid currency', (c) => {
    expect(isCurrency(c)).toBe(true)
  })

  it('rejects invalid values', () => {
    expect(isCurrency('EUR')).toBe(false)
    expect(isCurrency('inr')).toBe(false)
    expect(isCurrency('')).toBe(false)
    expect(isCurrency(undefined)).toBe(false)
    expect(isCurrency(null)).toBe(false)
    expect(isCurrency(123)).toBe(false)
    expect(isCurrency({})).toBe(false)
  })
})

describe('constants', () => {
  it('exposes the cookie name', () => {
    expect(CURRENCY_COOKIE).toBe('invenex.currency')
  })

  it('exposes the list of supported currencies', () => {
    expect(CURRENCIES).toEqual(['INR', 'AED', 'USD'])
  })
})
