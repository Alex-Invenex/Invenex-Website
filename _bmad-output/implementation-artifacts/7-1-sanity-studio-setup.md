# Story 7.1: Sanity Studio Setup

Status: in-progress

## Story

As an **admin**,
I want **a Sanity Studio configured for the project**,
So that **I can manage all website content**.

## Acceptance Criteria

### AC1: Sanity Project Setup
**Given** I need to set up Sanity
**When** the studio is configured
**Then**:
- Sanity project created with dataset
- Studio accessible at `/studio` route
- Environment variables configured:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN`
- Sanity client configured in `@/lib/sanity/client.ts`

### AC2: Sanity Client Configuration
**Given** the Sanity client is configured
**When** I use it in Server Components
**Then**:
- `useCdn: false` for ISR/tag-based revalidation
- `apiVersion` set to current date
- Type-safe query functions available

## Tasks / Subtasks

- [x] Task 1: Install Sanity Dependencies (AC: 1)
  - [x] Install next-sanity
  - [x] Install @sanity/vision
  - [x] Install sanity package

- [x] Task 2: Create Sanity Project (AC: 1)
  - [x] Run sanity init or create project in dashboard
  - [x] Configure dataset (production)
  - [x] Generate API tokens

- [x] Task 3: Configure Environment (AC: 1)
  - [x] Add env variables to .env.local
  - [x] Add env variables to Vercel

- [x] Task 4: Setup Sanity Client (AC: 2)
  - [x] Create `src/lib/sanity/client.ts`
  - [x] Create `src/lib/sanity/queries.ts`
  - [x] Create type definitions

- [x] Task 5: Create Studio Route (AC: 1)
  - [x] Create `src/app/studio/[[...tool]]/page.tsx`
  - [x] Configure sanity.config.ts
  - [x] Add studio layout

## Dev Notes

### Install Dependencies

```bash
npm install next-sanity @sanity/vision sanity @sanity/image-url
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
SANITY_REVALIDATE_SECRET=your_secret_key
```

### Sanity Client

```tsx
// src/lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // for ISR/tag-based revalidation
})

// For server-side queries with cache tags
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags,
      revalidate: 3600, // 1 hour fallback
    },
  })
}
```

### Sanity Queries

```tsx
// src/lib/sanity/queries.ts
import { groq } from 'next-sanity'

export const projectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    category,
    featuredImage,
    excerpt,
    technologies
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    category,
    featuredImage,
    gallery,
    challenge,
    solution,
    results,
    technologies,
    testimonial->,
    publishedAt
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    shortDescription,
    technologies
  }
`
```

### Sanity Config

```tsx
// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'invenex',
  title: 'Invenex Solutions',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})
```

### Studio Route

```tsx
// src/app/studio/[[...tool]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

### Studio Layout (No Site Shell)

```tsx
// src/app/studio/[[...tool]]/layout.tsx
export const metadata = {
  title: 'Invenex Studio',
  description: 'Content management for Invenex Solutions',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Image URL Builder

```tsx
// src/lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| next-sanity client | Using createClient with correct options |
| Cache tags | sanityFetch uses next.tags for revalidation |
| useCdn: false | Required for ISR with tag-based revalidation |
| TypeScript | Typed queries and responses |

### Testing Checklist

- [ ] Sanity project accessible in dashboard
- [ ] Studio loads at /studio route
- [ ] Client can fetch content
- [ ] Cache tags work correctly
- [ ] Image URL builder works

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List
- Installed Sanity dependencies: next-sanity@12.0.15, sanity@5.7.0, @sanity/vision@5.7.0, @sanity/image-url@2.0.3
- Created Sanity client with `useCdn: false` for ISR/tag-based revalidation
- Created comprehensive GROQ queries for projects, services, jobs, team, testimonials, and blog
- Created image URL builder utility with proper TypeScript types
- Created sanity.config.ts at project root with structureTool and visionTool plugins
- Created Studio route at `/studio` with separate layout (no site shell)
- Studio layout includes noindex robots meta for SEO protection
- Added environment variables to .env.local (project ID: enl6t2el, dataset: production)
- TypeScript compilation passes with no errors
- Note: Local dev server requires Node.js 20+ (system has 18.19.1) - will work on Vercel
- Created basic Playwright tests for studio route accessibility

### Completed Configuration
- API token provided by user and configured
- Revalidate secret generated and configured
- All environment variables added to Vercel production environment

### File List
- package.json (modified - added Sanity dependencies)
- package-lock.json (modified)
- .env.local (modified - added Sanity env vars)
- sanity.config.ts (new)
- src/lib/sanity/client.ts (new)
- src/lib/sanity/queries.ts (new)
- src/lib/sanity/image.ts (new)
- src/lib/sanity/index.ts (new)
- src/sanity/schemas/index.ts (new - empty, ready for Story 7-2)
- src/app/studio/[[...tool]]/page.tsx (new)
- src/app/studio/[[...tool]]/layout.tsx (new)
- tests/sanity-studio.spec.ts (new)

## Change Log
- 2026-01-29: Initial Sanity Studio setup - installed dependencies, created client, queries, studio route
