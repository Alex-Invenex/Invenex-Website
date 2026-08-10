import { generatePageMetadata } from '@/lib/metadata'
import { getCurrency } from '@/lib/get-currency'
import { CurrencyProvider } from '@/components/providers/currency-provider'
import { BlueprintClient } from './blueprint-client'

export const metadata = generatePageMetadata({
  title: 'The Blueprint',
  description:
    "The InveneX Blueprint is a paid 90-minute working session with two founders, followed by a written technical architecture, competitor teardown and phased fixed price -- yours to keep whether you hire us or not.",
  path: '/blueprint',
})

/**
 * `/blueprint` is a DYNAMIC route, deliberately -- same rationale as
 * `/pricing`. The Blueprint's price and threshold notice must be in the
 * visitor's currency from the first byte of server HTML, so a Gulf visitor
 * never sees the India sheet even briefly. Do NOT add `revalidate`,
 * `force-static`, or move the currency resolution into a client effect.
 */
export default async function BlueprintPage() {
  const currency = await getCurrency()

  return (
    <CurrencyProvider initialCurrency={currency}>
      <BlueprintClient />
    </CurrencyProvider>
  )
}
