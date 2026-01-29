# Story 6.1: Careers Page with Culture Showcase

Status: done

## Story

As a **job seeker**,
I want **to learn about Invenex's culture and benefits**,
So that **I can decide if this is a workplace I want to join**.

## Acceptance Criteria

### AC1: Careers Page Content
**Given** I navigate to the Careers page
**When** the page loads
**Then** I see:
- Hero section with "Join Our Team" headline
- Culture statement emphasizing modern tech and growth
- "Life at Invenex" section with office/team photos and description
- Benefits grid showing: Modern tech stack, Flexible work, Learning opportunities, Competitive compensation
- Tech stack showcase (Next.js, TypeScript, Tailwind, etc.)
- Link to open positions section

## Tasks / Subtasks

- [x] Task 1: Create Careers Page (AC: 1)
  - [x] Create `src/app/careers/page.tsx`
  - [x] Add page metadata
  - [x] Build hero section
  - [x] Build culture section
  - [x] Build benefits grid
  - [x] Build tech stack showcase

## Dev Notes

### Careers Page

```tsx
// src/app/careers/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animated-section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Invenex Solutions - Work with modern tech, grow your career, and build amazing products.',
}

const benefits = [
  { icon: '💻', title: 'Modern Tech Stack', description: 'Work with Next.js, TypeScript, React, and more' },
  { icon: '🏠', title: 'Flexible Work', description: 'Remote-friendly with flexible hours' },
  { icon: '📚', title: 'Learning Budget', description: 'Annual budget for courses and conferences' },
  { icon: '💰', title: 'Competitive Pay', description: 'Market-rate compensation + bonuses' },
]

const techStack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Sanity', 'Vercel']

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <Badge className="mb-6">We're Hiring</Badge>
            <h1 className="text-5xl md:text-6xl font-bold">
              Join Our Team
            </h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              Build amazing products with a team that values innovation, growth, and work-life balance.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="#positions">View Open Positions</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Life at Invenex */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6">Life at Invenex</h2>
              <div className="space-y-4 text-foreground-muted">
                <p>
                  We're a small, focused team that believes in doing meaningful work.
                  Based in Kochi with remote team members, we combine the best of
                  in-person collaboration with the flexibility of remote work.
                </p>
                <p>
                  Our culture is built on trust, ownership, and continuous learning.
                  We ship fast, learn from our users, and iterate quickly.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Card className="aspect-video flex items-center justify-center">
                <span className="text-6xl">🏢</span>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why Join Us?</h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <Card className="p-6 text-center h-full">
                  <span className="text-4xl block mb-4">{benefit.icon}</span>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-foreground-muted">{benefit.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Tech Stack</h2>
            <p className="mt-4 text-foreground-muted">Work with modern, industry-leading tools</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <Badge key={tech} size="md" className="text-base px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Open Positions - placeholder, populated by Story 6.2 */}
      <section id="positions" className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold">Open Positions</h2>
            <p className="mt-4 text-foreground-muted">Find your next opportunity</p>
          </AnimatedSection>
          {/* JobListings component will be added in Story 6.2 */}
          <div className="text-center text-foreground-muted">
            <p>Job listings will appear here</p>
          </div>
        </div>
      </section>
    </>
  )
}
```

### Testing Checklist

- [x] Hero displays with CTA
- [x] Culture section shows content
- [x] Benefits grid displays 4 items
- [x] Tech stack badges show
- [x] Open positions anchor works

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List
- Created `src/app/careers/page.tsx` with full careers page implementation
- Page includes 5 sections: Hero, Life at Invenex, Benefits, Tech Stack, Open Positions
- Enhanced Dev Notes template with proper accessibility attributes (aria-labelledby, data-testid)
- Added animated gradient background matching other pages (About, Services)
- Used StaggerContainer/StaggerItem for benefits grid animation
- Open positions section has placeholder for JobListings component (Story 6-2)
- Created comprehensive Playwright test file with 18 test cases per viewport
- Verified all functionality via Playwright MCP browser automation
- Navigation link already exists in mainNav and footerNav.company

### File List
- src/app/(site)/careers/page.tsx (new)
- tests/careers.spec.ts (new)

## Senior Developer Review (AI)

**Reviewer:** Claude Opus 4.5
**Date:** 2026-01-29
**Outcome:** ✅ APPROVED (with fixes applied)

### Issues Found & Fixed:

| # | Severity | Issue | Status |
|---|----------|-------|--------|
| 1 | 🟡 MEDIUM | File path in story listed `src/app/careers/page.tsx` but actual is `src/app/(site)/careers/page.tsx` | ✅ Fixed |
| 2 | 🟡 MEDIUM | Test selectors too broad - `getByText(/kochi/i)` matched 6 elements across page | ✅ Fixed - Scoped to section |
| 3 | 🟡 MEDIUM | Test selectors too broad - `getByText('Next.js')` matched job card badges | ✅ Fixed - Scoped to tech section |
| 4 | 🟢 LOW | Dev Notes show different import structure than actual code | Noted |

### Files Modified:
- `tests/careers.spec.ts` - Fixed non-specific selectors by scoping to appropriate sections
- `_bmad-output/implementation-artifacts/6-1-careers-page-culture.md` - Updated file path

## Change Log
- 2026-01-27: Story 6-1 implemented - Careers page with hero, culture, benefits, tech stack, and open positions sections
- 2026-01-28: Code review - Corrected completion notes (removed false claim about careers@invenex.in)
- 2026-01-29: Code review - Fixed test selectors and corrected file path documentation
