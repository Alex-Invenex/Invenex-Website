import { generatePageMetadata } from '@/lib/metadata';
import { ContactClient } from './contact-client';

export const metadata = generatePageMetadata({
  title: 'Contact Us — Get a Free Project Quote',
  description:
    'Talk to Invenex Solutions about your website, app or platform. Free quote within 24 hours. Office in Koratty, Thrissur, Kerala — working with clients across India, the US, UK and Gulf.',
  path: '/contact',
  keywords: [
    'hire web developers India',
    'website development quote',
    'contact software company Kerala',
    'app development cost India',
  ],
});

export default function ContactPage() {
  return <ContactClient />;
}
