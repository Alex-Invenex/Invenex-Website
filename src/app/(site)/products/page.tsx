import { generatePageMetadata } from '@/lib/metadata'
import { getCurrency } from '@/lib/get-currency'
import { CurrencyProvider } from '@/components/providers/currency-provider'
import { ProductsClient } from './products-client'

export const metadata = generatePageMetadata({
  title: 'CaterFlow Catering Management Software & Our Products',
  description:
    'CaterFlow catering management software — order management, inventory, staff scheduling and reporting for catering businesses — plus the upcoming Invenex ERP. Built and supported in Kerala, India.',
  path: '/products',
  keywords: [
    'catering management software',
    'catering management software India',
    'ERP software for small business',
    'CaterFlow',
  ],
})

export default async function ProductsPage() {
  const currency = await getCurrency()
  return (
    <CurrencyProvider initialCurrency={currency}>
      <ProductsClient />
    </CurrencyProvider>
  )
}
