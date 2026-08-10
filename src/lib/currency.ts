export type Currency = 'INR' | 'AED' | 'USD'

/** Name of the cookie used to persist an explicit user currency choice. */
export const CURRENCY_COOKIE = 'invenex.currency'

/** All currencies supported by the site, in display/priority order. */
export const CURRENCIES: Currency[] = ['INR', 'AED', 'USD']

const GULF_COUNTRIES = new Set(['AE', 'SA', 'QA', 'KW', 'OM', 'BH'])

const WESTERN_COUNTRIES = new Set([
  'US',
  'GB',
  'CA',
  'AU',
  'IE',
  'NZ',
  'DE',
  'FR',
  'NL',
  'SE',
  'NO',
  'DK',
  'CH',
  'BE',
  'AT',
  'FI',
])

/** Narrows an unknown value to a supported {@link Currency}. */
export function isCurrency(v: unknown): v is Currency {
  return typeof v === 'string' && (CURRENCIES as string[]).includes(v)
}

/**
 * Resolves a display currency from a two-letter ISO country code (e.g. the
 * `x-vercel-ip-country` edge header). Case-insensitive. Falls back to INR for
 * unknown, missing, or empty input.
 */
export function currencyForCountry(country?: string | null): Currency {
  const code = country?.trim().toUpperCase()
  if (!code) return 'INR'
  if (GULF_COUNTRIES.has(code)) return 'AED'
  if (WESTERN_COUNTRIES.has(code)) return 'USD'
  return 'INR'
}
