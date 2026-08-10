import { generatePageMetadata } from '@/lib/metadata';
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

export default function ContactPage() {
  return <ContactClient />;
}
