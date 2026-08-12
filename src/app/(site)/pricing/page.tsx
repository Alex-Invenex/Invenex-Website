import { generatePageMetadata } from '@/lib/metadata'
import { getCurrency } from '@/lib/get-currency'
import { CurrencyProvider } from '@/components/providers/currency-provider'
import { PricingClient } from './pricing-client'

export const metadata = generatePageMetadata({
  title: 'Pricing',
  description:
    'Every InveneX price, published. Fixed prices for websites, platforms, mobile apps, e-commerce and monthly care — in rupees, dirhams or dollars. No quote call required.',
  path: '/pricing',
  keywords: [
    'web development pricing India',
    'website cost India',
    'website design price Dubai',
    'mobile app development cost India',
    'ecommerce website price',
    'website maintenance plans India',
  ],
})

/**
 * `/pricing` is a DYNAMIC route, deliberately.
 *
 * `getCurrency()` reads the `invenex.currency` cookie and the
 * `x-vercel-ip-country` edge header, which opts this route out of static
 * generation. That is the whole point: the correct currency must be in the
 * first byte of server HTML so a Gulf visitor never sees the India sheet,
 * not even for 200ms. Do NOT add `revalidate`, `force-static`, or move the
 * currency resolution into a client effect.
 */
export default async function PricingPage() {
  const currency = await getCurrency()

  return (
    <CurrencyProvider initialCurrency={currency}>
      <PricingClient />
    </CurrencyProvider>
  )
}
