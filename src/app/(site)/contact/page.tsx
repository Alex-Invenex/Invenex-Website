import { generatePageMetadata } from '@/lib/metadata';
import { ContactClient } from './contact-client';

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Invenex Solutions. Request a quote, discuss your project, or visit our office in Thrissur, Kerala. We respond within 24 hours.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactClient />;
}
