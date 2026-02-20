# Story 7.1: Sanity Studio Setup

Status: ready-for-dev

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

- [ ] Task 1: Install Sanity Dependencies (AC: 1)
  - [ ] Install next-sanity
  - [ ] Install @sanity/vision
  - [ ] Install sanity package

- [ ] Task 2: Create Sanity Project (AC: 1)
  - [ ] Run sanity init or create project in dashboard
  - [ ] Configure dataset (production)
  - [ ] Generate API tokens

- [ ] Task 3: Configure Environment (AC: 1)
  - [ ] Add env variables to .env.local
  - [ ] Add env variables to Vercel

- [ ] Task 4: Setup Sanity Client (AC: 2)
  - [ ] Create `src/lib/sanity/client.ts`
  - [ ] Create `src/lib/sanity/queries.ts`
  - [ ] Create type definitions

- [ ] Task 5: Create Studio Route (AC: 1)
  - [ ] Create `src/app/studio/[[...tool]]/page.tsx`
  - [ ] Configure sanity.config.ts
  - [ ] Add studio layout

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
{{agent_model_name_version}}

### Completion Notes List

### File List
