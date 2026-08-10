import { generatePageMetadata } from '@/lib/metadata'
import { ProductsClient } from './products-client'

export const metadata = generatePageMetadata({
  title: 'CaterFlow Catering ERP & Our Products',
  description:
    'CaterFlow catering ERP — order management, inventory, staff scheduling and reporting for catering businesses — plus the upcoming Invenex ERP. Built and supported in Kerala, India.',
  path: '/products',
  keywords: [
    'catering ERP software',
    'catering management software India',
    'ERP software for small business',
    'CaterFlow',
  ],
})

export default function ProductsPage() {
  return <ProductsClient />
}
