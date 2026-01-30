# Story 3.2: About Page

Status: done

## Story

As a **visitor**,
I want **to learn about Invenex's story, team, and values**,
So that **I can trust them as a partner**.

## Acceptance Criteria

### AC1: About Page Content
**Given** I navigate to the About page
**When** the page loads
**Then** I see:
- Hero section with company tagline
- Company story section with timeline or narrative
- Mission and values section
- Team grid with member cards (photo, name, role)
- Office/culture photos (if available)

### AC2: Team Member Cards
**Given** I view a team member card
**When** I hover over it
**Then** it displays:
- Hover scale effect
- Social links reveal (LinkedIn)
- Smooth transitions

## Tasks / Subtasks

- [x] Task 1: Create About Page Route (AC: 1)
  - [x] Create `src/app/about/page.tsx`
  - [x] Add page metadata

- [x] Task 2: Build About Hero Section
  - [x] Create hero with tagline
  - [x] Add animated background

- [x] Task 3: Build Company Story Section
  - [x] Create narrative content
  - [x] Optional timeline component (skipped - used narrative approach)

- [x] Task 4: Build Mission & Values Section
  - [x] Display mission statement
  - [x] List core values with icons

- [x] Task 5: Build Team Grid (AC: 2)
  - [x] Create `src/components/sections/team-grid.tsx`
  - [x] TeamMemberCard with hover effects
  - [x] LinkedIn link reveal

## Dev Notes

### About Page Structure

```tsx
// src/app/about/page.tsx
import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/animated-section'
import { TeamGrid } from '@/components/sections/team-grid'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Invenex Solutions - our story, mission, team, and values.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold">
              Building the Future,
              <br />
              <span className="text-foreground-muted">One Project at a Time</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-foreground-muted">
                <p>
                  Founded in Kochi, Kerala, Invenex Solutions started with a simple mission:
                  deliver world-class digital solutions that help businesses thrive in the digital age.
                </p>
                <p>
                  Today, we're a team of passionate developers, designers, and strategists
                  who believe in the power of technology to transform businesses.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              {/* Placeholder for image/illustration */}
              <div className="aspect-video bg-background-secondary rounded-lg" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Values</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="text-center">
                  <span className="text-4xl mb-4 block">{value.icon}</span>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-foreground-muted">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold">Meet the Team</h2>
            <p className="mt-4 text-foreground-muted">The people behind the magic</p>
          </AnimatedSection>
          <TeamGrid />
        </div>
      </section>
    </>
  )
}

const values = [
  { icon: '🎯', title: 'Excellence', description: 'We deliver nothing but the best' },
  { icon: '🤝', title: 'Partnership', description: 'Your success is our success' },
  { icon: '💡', title: 'Innovation', description: 'Always pushing boundaries' },
  { icon: '⚡', title: 'Speed', description: 'Fast delivery without compromise' },
]
```

### Team Grid Component

```tsx
// src/components/sections/team-grid.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { StaggerContainer, StaggerItem } from '@/components/ui/animated-section'

const team = [
  { name: 'Team Member 1', role: 'CEO & Founder', image: '/team/placeholder.jpg', linkedin: '#' },
  // ... more members
]

export function TeamGrid() {
  return (
    <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {team.map((member) => (
        <StaggerItem key={member.name}>
          <TeamMemberCard member={member} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}

function TeamMemberCard({ member }: { member: typeof team[0] }) {
  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-square bg-background-secondary rounded-lg overflow-hidden mb-4">
        {/* Image placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/10" />
      </div>
      <h3 className="font-semibold">{member.name}</h3>
      <p className="text-sm text-foreground-muted">{member.role}</p>

      {/* LinkedIn on hover */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background-secondary rounded-full p-2"
      >
        <span className="sr-only">LinkedIn</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    </motion.div>
  )
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Page Route | /about with metadata |
| Content | Server Component by default |
| Team Cards | Client Component for hover |
| Images | Placeholder for now, CMS later |

### Testing Checklist

- [x] Page loads with correct title
- [x] All sections visible
- [x] Team cards show hover effect
- [x] LinkedIn links open in new tab
- [x] Mobile responsive layout

### References

- [Source: prd.md#FR2-About-Page]
- [Source: ux-design-specification.md#About-Page]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List
- Implemented About page with 4 sections: Hero, Story, Values, Team
- Created TeamGrid component with animated team member cards
- Hero section includes animated gradient orbs matching homepage style
- Values section displays 4 core values with emoji icons and descriptions
- Team member cards have hover scale effect (1.02x) and LinkedIn icon reveal
- All animations use existing AnimatedSection component with stagger delays
- Page metadata configured for SEO (title: "About Us")
- Playwright e2e tests created covering AC1 and AC2 acceptance criteria
- Build passes successfully, lint passes with no new warnings

### File List
- src/app/about/page.tsx (new)
- src/components/sections/team-grid.tsx (new)
- tests/about.spec.ts (new)

## Change Log
- 2026-01-23: Initial implementation of About page (Story 3.2) - All tasks complete
- 2026-01-24: Code review: 3 issues found and fixed (1 MEDIUM test fix, 2 LOW accessibility)

## Senior Developer Review (AI)

**Review Date:** 2026-01-24
**Reviewer:** Claude Opus 4.5 (TEA Agent - Adversarial Review)
**Outcome:** ✅ Approved (after fixes)

### Summary
Story implementation validated against acceptance criteria. Found 3 issues (1 MEDIUM, 2 LOW). All issues fixed automatically.

### Issues Found & Resolution

| # | Severity | Issue | Resolution |
|---|----------|-------|------------|
| 1 | MEDIUM | Test fails - "Innovation" text matches two elements | Fixed: Use getByRole('heading') for value items |
| 2 | LOW | Missing aria-labelledby on sections | Fixed: Added to all 4 sections |
| 3 | LOW | Missing data-testid on sections | Fixed: Added to all 4 sections |

### Files Modified in Review
- `src/app/about/page.tsx` (accessibility landmarks)
- `tests/about.spec.ts` (fixed test selector)

### Acceptance Criteria Validation
- **AC1 (About Page Content):** ✅ Implemented - Hero, Story, Values, Team sections
- **AC2 (Team Member Cards):** ✅ Implemented - Hover effects, LinkedIn reveal
