import { generatePageMetadata } from '@/lib/metadata'
import { ProductsClient } from './products-client'

export const metadata = generatePageMetadata({
  title: 'Our Products',
  description: 'Discover our own products - CaterFlow catering ERP and upcoming Invenex ERP. We build products that solve real business problems.',
  path: '/products',
})

export default function ProductsPage() {
  return <ProductsClient />
}
