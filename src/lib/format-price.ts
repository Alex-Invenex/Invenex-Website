import type { Currency } from './currency'

/**
 * Formats a whole-number amount as a display price for the given currency.
 *
 * - INR uses `en-IN` so digits group in lakhs/crores (₹3,85,000), not
 *   Western thousands (₹385,000).
 * - USD uses `en-US` currency formatting ($12,900).
 * - AED is formatted manually: the number is grouped with plain `en-US`
 *   digit grouping and prefixed with the literal "AED " (a normal space,
 *   U+0020). We deliberately avoid `style: 'currency', currency: 'AED'` and
 *   `currencyDisplay: 'code'` because different ICU builds (Node locally vs.
 *   Vercel's runtime) can render the space between the code and the digits
 *   differently (a non-breaking space, U+00A0, has been observed on Node
 *   20's bundled ICU). Building the string ourselves keeps the output
 *   byte-for-byte identical across every environment.
 *
 * No decimals are ever shown, and no "from"/"starting"/"+" qualifiers are
 * added -- callers are responsible for any such framing (e.g. a "/mo" suffix).
 */
export function formatPrice(amount: number, currency: Currency): string {
  if (currency === 'AED') {
    const grouped = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(amount)
    return `AED ${grouped}`
  }

  const locale = currency === 'INR' ? 'en-IN' : 'en-US'
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)

  // Defensive normalization: some ICU builds insert a non-breaking space
  // (U+00A0) or narrow no-break space (U+202F) between the currency symbol
  // and the digits. Strip any such whitespace so the output is always the
  // tight literal form (e.g. the INR test's exact '₹3,85,000').
  return formatted.replace(/\s/g, '')
}
