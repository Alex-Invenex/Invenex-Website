# Story 4.1: Portfolio Grid Page

Status: done

## Story

As a **potential client**,
I want **to browse all completed projects**,
So that **I can evaluate the quality of Invenex's work**.

## Acceptance Criteria

### AC1: Portfolio Page Layout
**Given** I navigate to the Portfolio page
**When** the page loads
**Then** I see:
- Hero section with "Our Work" headline and project count
- Filter tabs for categories: All, Web, Mobile, Platform, E-Commerce
- Grid of project cards (responsive: 1 col mobile, 2 tablet, 3 desktop)
- Each card shows: thumbnail, client name, project type, brief excerpt

### AC2: Project Card Hover
**Given** I hover over a project card
**When** the hover effect activates
**Then** I see:
- Image zoom effect
- Border glow
- Overlay with "View Case Study" text

### AC3: Project Navigation
**Given** I click on a project card
**When** the navigation occurs
**Then** I am taken to the case study detail page

## Tasks / Subtasks

- [x] Task 1: Create Portfolio Page (AC: 1)
  - [x] Create `src/app/portfolio/page.tsx`
  - [x] Add hero with project count
  - [x] Add filter tabs

- [x] Task 2: Create Project Card Component (AC: 2, 3)
  - [x] Create `src/components/ui/project-card.tsx`
  - [x] Image with zoom on hover
  - [x] Overlay with CTA
  - [x] Link to detail page

- [x] Task 3: Build Project Grid (AC: 1)
  - [x] Responsive grid layout
  - [x] Sample project data

## Dev Notes

### Portfolio Page

```tsx
// src/app/portfolio/page.tsx
import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/animated-section'
import { ProjectGrid } from '@/components/sections/project-grid'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Browse our portfolio of web, mobile, and platform development projects.',
}

// Sample projects data
const projects = [
  { id: '1', title: 'Project One', client: 'Client A', category: 'web', excerpt: 'E-commerce platform...', image: '/projects/1.jpg', slug: 'project-one' },
  { id: '2', title: 'Project Two', client: 'Client B', category: 'mobile', excerpt: 'Mobile banking app...', image: '/projects/2.jpg', slug: 'project-two' },
  // ... more projects
]

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold">Our Work</h1>
            <p className="mt-6 text-xl text-foreground-muted">
              {projects.length} projects delivered with excellence
            </p>
          </AnimatedSection>
        </div>
      </section>
      <ProjectGrid projects={projects} />
    </>
  )
}
```

### Project Card Component

```tsx
// src/components/ui/project-card.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface ProjectCardProps {
  project: {
    title: string
    client: string
    category: string
    excerpt: string
    image: string
    slug: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${project.slug}`}>
      <motion.div
        className="group relative overflow-hidden rounded-lg border border-border"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-background-secondary">
          <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/10 group-hover:scale-110 transition-transform duration-500" />
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-medium">View Case Study →</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <Badge size="sm" className="mb-2">{project.category}</Badge>
          <h3 className="font-semibold text-lg">{project.title}</h3>
          <p className="text-sm text-foreground-muted mt-1">{project.client}</p>
        </div>
      </motion.div>
    </Link>
  )
}
```

### Dependencies

- Requires Epic 2 for layout
- Uses Badge, AnimatedSection components

### Testing Checklist

- [x] Hero shows project count
- [x] Grid responsive (1/2/3 columns)
- [x] Cards show hover effects
- [x] Cards link to detail pages
- [x] Category badges display

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Implementation Plan
- Implemented portfolio page with hero section showing dynamic project count
- Created ProjectCard component with hover effects (image zoom, border glow, overlay)
- Created ProjectGrid component with category filter tabs and responsive layout
- Added 8 sample projects spanning all categories (Platform, E-Commerce, Web, Mobile)
- Added comprehensive Playwright tests (12 tests covering all ACs)
- Ensured accessibility with aria-labelledby, aria-pressed, focus-visible styles

### Completion Notes List
- All 3 tasks completed and verified with passing tests
- AC1: Portfolio page layout with hero (project count), filter tabs, responsive grid (1/2/3 cols)
- AC2: Project card hover effects with image zoom, border glow, "View Case Study" overlay
- AC3: Project cards link to `/portfolio/[slug]` case study detail pages
- 24 tests passing (12 desktop + 12 mobile)
- Full regression suite (90 tests) passing with no regressions

### File List
- src/app/portfolio/page.tsx (created)
- src/components/ui/project-card.tsx (created)
- src/components/sections/project-grid.tsx (created)
- src/lib/projects.ts (created - shared project data source)
- tests/portfolio.spec.ts (created - Story 4-1 & 4-2 tests)
- tests/portfolio-grid.spec.ts (created - Story 4-1 desktop/mobile/performance tests)

### Change Log
- 2026-01-24: Story implemented - Portfolio grid page with filter tabs, project cards, hover effects, and responsive layout
- 2026-01-24: Code review complete - Added src/lib/projects.ts to File List. All 12 tests passing. Status → done.
- 2026-01-27: Code review (adversarial) - Fixed data-testid mismatch (portfolio-hero-section→portfolio-hero), added project-count testid, updated File List with portfolio-grid.spec.ts, fixed stale TODO in portfolio-preview.tsx, refactored Project type to import from projects.ts.
