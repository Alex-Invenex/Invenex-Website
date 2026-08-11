import { generatePageMetadata } from '@/lib/metadata';
import { getCurrency } from '@/lib/get-currency';
import { CurrencyProvider } from '@/components/providers/currency-provider';
import { ContactClient } from './contact-client';

export const metadata = generatePageMetadata({
  title: 'Contact — Book a 15-min fit call',
  description:
    "Not a sales call. We'll ask what you're trying to do, tell you honestly whether we're the right people, and point you elsewhere if we're not.",
  path: '/contact',
  keywords: [
    'hire web developers India',
    'website development quote',
    'contact software company Kerala',
    'app development cost India',
  ],
});

/**
 * `/contact` is a DYNAMIC route, deliberately — same rationale as
 * `/pricing`'s page.tsx: the fallback form's budget select must show the
 * visitor's own currency in the first byte of server HTML, never a flash of
 * the India sheet for a Gulf visitor. Do NOT add `revalidate` or
 * `force-static`, and don't move currency resolution into a client effect.
 */
export default async function ContactPage() {
  const currency = await getCurrency();

  return (
    <CurrencyProvider initialCurrency={currency}>
      <ContactClient />
    </CurrencyProvider>
  );
}
