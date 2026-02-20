# Story 6.3: Job Detail Pages

Status: ready-for-dev

## Story

As a **job seeker**,
I want **to read full job descriptions**,
So that **I can understand if I'm qualified and interested**.

## Acceptance Criteria

### AC1: Job Detail Content
**Given** I click on a job listing
**When** the job detail page loads
**Then** I see:
- Job title and department
- Location and employment type
- Experience level required
- Job description (rich text)
- Requirements list
- Responsibilities list
- Tech stack (for engineering roles)
- Benefits reminder
- "Apply for this Position" CTA button

### AC2: CMS Content
**Given** the job content comes from Sanity CMS
**When** the page renders
**Then** rich text content is properly formatted

## Tasks / Subtasks

- [ ] Task 1: Create Dynamic Route (AC: 1)
  - [ ] Create `src/app/careers/[slug]/page.tsx`
  - [ ] Add generateStaticParams
  - [ ] Add generateMetadata

- [ ] Task 2: Build Job Detail Layout (AC: 1, 2)
  - [ ] Job header with meta info
  - [ ] Description section
  - [ ] Requirements and responsibilities
  - [ ] Apply CTA

## Dev Notes

### Job Detail Page

```tsx
// src/app/careers/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/animated-section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Sample data - will come from Sanity
const jobs = {
  'senior-frontend-developer': {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Kochi / Remote',
    type: 'Full-time',
    experience: 'Senior (5+ years)',
    description: `We're looking for a Senior Frontend Developer to join our team and help build amazing web experiences for our clients.

You'll work on a variety of projects using modern technologies like Next.js, React, and TypeScript. This is a great opportunity to work with a talented team and grow your skills.`,
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with Next.js',
      'Understanding of web performance optimization',
      'Excellent communication skills',
    ],
    responsibilities: [
      'Lead frontend development on client projects',
      'Mentor junior developers',
      'Collaborate with designers and backend developers',
      'Participate in code reviews',
      'Contribute to technical decisions',
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
}

type JobSlug = keyof typeof jobs

export function generateStaticParams() {
  return Object.keys(jobs).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const job = jobs[params.slug as JobSlug]
  if (!job) return { title: 'Job Not Found' }
  return {
    title: `${job.title} - Careers`,
    description: `Apply for ${job.title} at Invenex Solutions. ${job.location}, ${job.type}.`,
  }
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = jobs[params.slug as JobSlug]
  if (!job) notFound()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <Link href="/careers" className="text-foreground-muted hover:text-foreground mb-4 inline-block">
              ← Back to Careers
            </Link>
            <Badge className="mb-4">{job.department}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">{job.title}</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-foreground-muted">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>📊 {job.experience}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection>
                <h2 className="text-2xl font-bold mb-4">About This Role</h2>
                <div className="prose prose-invert max-w-none">
                  {job.description.split('\n\n').map((p, i) => (
                    <p key={i} className="text-foreground-muted mb-4">{p}</p>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-success">✓</span>
                      <span className="text-foreground-muted">{req}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-foreground-muted">•</span>
                      <span className="text-foreground-muted">{resp}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {job.techStack && (
                <AnimatedSection delay={0.3}>
                  <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.4}>
                <Card className="p-6 sticky top-24">
                  <h3 className="font-semibold mb-4">Ready to Apply?</h3>
                  <p className="text-sm text-foreground-muted mb-6">
                    Submit your application and we'll get back to you within a week.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <Link href={`/careers/${params.slug}/apply`}>Apply Now</Link>
                  </Button>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

### Testing Checklist

- [ ] Job header displays all meta info
- [ ] Description renders properly
- [ ] Requirements list displays
- [ ] Responsibilities list displays
- [ ] Tech stack badges show
- [ ] Apply button links to application form
- [ ] Back link works

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
