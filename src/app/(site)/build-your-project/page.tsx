import { generatePageMetadata } from '@/lib/metadata';
import { ScopeClient } from './scope-client';

export const metadata = generatePageMetadata({
  title: 'Build Your Project',
  description:
    'Choose the services you need — website, mobile app, custom platform, AI automation, marketing — tick the exact features you want, and send your requirements to Invenex Solutions for pricing.',
  path: '/build-your-project',
});

export default function BuildYourProjectPage() {
  return <ScopeClient />;
}
