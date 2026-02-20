# Story 4.3: Case Study Detail Pages

Status: ready-for-dev

## Story

As a **potential client**,
I want **to read detailed case studies**,
So that **I can understand how Invenex solves real problems**.

## Acceptance Criteria

### AC1: Case Study Content
**Given** I navigate to a case study page
**When** the page loads
**Then** I see:
- Hero with project name, client, and featured image
- **Challenge** section: What problem the client faced
- **Solution** section: How Invenex approached it
- **Results** section: Metrics and outcomes achieved
- Project gallery with multiple images (lightbox view)
- Technologies used badges
- Client testimonial (if available)
- Related projects section
- CTA: "Start Your Project"

### AC2: Image Gallery
**Given** I click an image in the gallery
**When** the lightbox opens
**Then** I can:
- View full-size image
- Navigate between images (arrows)
- Close with X button or Escape key
- Close by clicking outside

### AC3: Rich Content
**Given** case study content comes from Sanity CMS
**When** the page renders
**Then** rich text content is properly formatted with:
- Headings, paragraphs, lists
- Inline images with captions
- Code blocks (if applicable)

## Tasks / Subtasks

- [ ] Task 1: Create Dynamic Route (AC: 1)
  - [ ] Create `src/app/portfolio/[slug]/page.tsx`
  - [ ] Add generateStaticParams
  - [ ] Add generateMetadata

- [ ] Task 2: Build Case Study Layout (AC: 1)
  - [ ] Hero section
  - [ ] Challenge/Solution/Results sections
  - [ ] Technologies badges
  - [ ] Testimonial block
  - [ ] Related projects

- [ ] Task 3: Build Image Gallery (AC: 2)
  - [ ] Create `src/components/ui/image-gallery.tsx`
  - [ ] Lightbox functionality
  - [ ] Keyboard navigation

## Dev Notes

### Case Study Page

```tsx
// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnimatedSection } from '@/components/ui/animated-section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ImageGallery } from '@/components/ui/image-gallery'
import Link from 'next/link'

// Sample data - will come from Sanity
const projects = {
  'project-one': {
    title: 'Project One',
    client: 'Client A',
    category: 'web',
    featuredImage: '/projects/1.jpg',
    challenge: 'The client needed a modern e-commerce platform to scale their business...',
    solution: 'We built a custom Next.js application with headless commerce...',
    results: [
      { metric: '150%', label: 'Increase in Sales' },
      { metric: '2.1s', label: 'Page Load Time' },
      { metric: '45%', label: 'Better Conversion' },
    ],
    technologies: ['Next.js', 'Stripe', 'Sanity'],
    gallery: ['/projects/1-1.jpg', '/projects/1-2.jpg'],
    testimonial: {
      quote: 'Invenex delivered beyond our expectations.',
      author: 'John Doe',
      role: 'CEO, Client A',
    },
  },
}

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects[params.slug]
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} - Case Study`,
    description: project.challenge.substring(0, 160),
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug]
  if (!project) notFound()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <Badge className="mb-4">{project.category}</Badge>
            <h1 className="text-5xl font-bold">{project.title}</h1>
            <p className="mt-4 text-xl text-foreground-muted">{project.client}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-foreground-muted max-w-3xl">{project.challenge}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
            <p className="text-foreground-muted max-w-3xl">{project.solution}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-8">
            <h2 className="text-2xl font-bold">The Results</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {project.results.map((result, i) => (
              <AnimatedSection key={result.label} delay={i * 0.1}>
                <Card className="p-8 text-center">
                  <div className="text-4xl font-bold text-foreground">{result.metric}</div>
                  <div className="text-foreground-muted mt-2">{result.label}</div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-8">
            <h2 className="text-2xl font-bold">Project Gallery</h2>
          </AnimatedSection>
          <ImageGallery images={project.gallery} />
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <blockquote className="text-2xl italic text-center max-w-2xl mx-auto">
                "{project.testimonial.quote}"
              </blockquote>
              <div className="mt-4 text-center">
                <div className="font-medium">{project.testimonial.author}</div>
                <div className="text-foreground-muted">{project.testimonial.role}</div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
```

### Image Gallery Component

```tsx
// src/components/ui/image-gallery.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex(Math.max(0, lightboxIndex - 1))
      if (e.key === 'ArrowRight') setLightboxIndex(Math.min(images.length - 1, lightboxIndex + 1))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, images.length])

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="aspect-video bg-background-secondary rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
          >
            <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/10" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </button>
            <button
              className="absolute left-4 text-white p-4"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.max(0, lightboxIndex - 1)) }}
            >
              ←
            </button>
            <button
              className="absolute right-4 text-white p-4"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.min(images.length - 1, lightboxIndex + 1)) }}
            >
              →
            </button>
            <div className="max-w-4xl w-full aspect-video bg-background-secondary rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

### Testing Checklist

- [ ] Challenge/Solution/Results sections display
- [ ] Technologies badges show
- [ ] Gallery opens lightbox
- [ ] Lightbox navigation works
- [ ] Escape closes lightbox
- [ ] CTA links to contact

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
