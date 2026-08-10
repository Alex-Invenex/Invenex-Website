import { generatePageMetadata } from '@/lib/metadata';
import { ScopeClient } from './scope-client';

export const metadata = generatePageMetadata({
  title: 'Website & App Cost Calculator',
  description:
    'Scope your project in minutes: pick the website, mobile app, platform, AI automation or marketing features you need and get pricing from Invenex Solutions. Free, no obligation.',
  path: '/build-your-project',
  keywords: [
    'website development cost calculator',
    'app development cost estimate India',
    'website price quote',
    'software project scoping tool',
  ],
});

export default function BuildYourProjectPage() {
  return <ScopeClient />;
}
