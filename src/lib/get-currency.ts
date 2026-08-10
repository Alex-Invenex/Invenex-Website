// Server-only module: imports `next/headers`, which throws if evaluated in a
// client component or in vitest. Do not import this from `currency.ts`,
// client components, or any *.test.ts file. Not unit tested here — covered
// by e2e tests against the deployed edge runtime instead.
import { cookies, headers } from 'next/headers'
import { CURRENCY_COOKIE, currencyForCountry, isCurrency, type Currency } from './currency'

/**
 * Resolves the visitor's display currency for the current request.
 * An explicit cookie choice always wins over geo-detection; otherwise the
 * currency is inferred from the `x-vercel-ip-country` edge header.
 */
export async function getCurrency(): Promise<Currency> {
  const c = (await cookies()).get(CURRENCY_COOKIE)?.value
  if (isCurrency(c)) return c

  const country = (await headers()).get('x-vercel-ip-country')
  return currencyForCountry(country)
}
