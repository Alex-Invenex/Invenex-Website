# Story 4.1: Portfolio Grid Page

Status: ready-for-dev

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

- [ ] Task 1: Create Portfolio Page (AC: 1)
  - [ ] Create `src/app/portfolio/page.tsx`
  - [ ] Add hero with project count
  - [ ] Add filter tabs

- [ ] Task 2: Create Project Card Component (AC: 2, 3)
  - [ ] Create `src/components/ui/project-card.tsx`
  - [ ] Image with zoom on hover
  - [ ] Overlay with CTA
  - [ ] Link to detail page

- [ ] Task 3: Build Project Grid (AC: 1)
  - [ ] Responsive grid layout
  - [ ] Sample project data

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

- [ ] Hero shows project count
- [ ] Grid responsive (1/2/3 columns)
- [ ] Cards show hover effects
- [ ] Cards link to detail pages
- [ ] Category badges display

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
