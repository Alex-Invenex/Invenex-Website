# Story 5.1: Contact Page with Quote Form

Status: ready-for-dev

## Story

As a **potential client**,
I want **to submit a quote request easily**,
So that **I can start a conversation about my project**.

## Acceptance Criteria

### AC1: Form Fields
**Given** I navigate to the Contact page
**When** the page loads
**Then** I see:
- Hero section with "Let's Build Something Great" headline
- Quote request form with fields:
  - Name (required)
  - Email (required, validated)
  - Project Type (select: Web, Mobile, Platform, E-Commerce, Other)
  - Budget Range (select: <$5K, $5K-$15K, $15K-$50K, $50K+)
  - Project Description (textarea, required)
  - How did you hear about us? (optional select)
- Submit button with loading state
- Alternative contact section (email, phone, WhatsApp, address)

### AC2: Form Submission
**Given** I fill out the form with valid data
**When** I submit the form
**Then**:
- Button shows loading spinner
- Form data is validated client-side
- Server Action processes the submission
- I see success confirmation message

### AC3: Validation
**Given** I submit with invalid data
**When** validation fails
**Then**:
- Inline error messages appear below invalid fields
- Form is not submitted
- Focus moves to first error field

## Tasks / Subtasks

- [ ] Task 1: Create Contact Page (AC: 1)
  - [ ] Create `src/app/contact/page.tsx`
  - [ ] Add hero section
  - [ ] Add alternative contact info

- [ ] Task 2: Build Quote Form (AC: 1, 2, 3)
  - [ ] Create `src/components/forms/quote-form.tsx`
  - [ ] All form fields
  - [ ] Client-side validation
  - [ ] Loading and success states

## Dev Notes

### Contact Page

```tsx
// src/app/contact/page.tsx
import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/animated-section'
import { QuoteForm } from '@/components/forms/quote-form'
import { siteConfig } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Invenex Solutions for your next project.',
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h1 className="text-5xl font-bold">Let's Build Something Great</h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <QuoteForm />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href={`mailto:${siteConfig.email}`} className="text-foreground-muted hover:text-foreground">
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-foreground-muted hover:text-foreground">
                    {siteConfig.phone}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-foreground-muted">
                    {siteConfig.address.city}, {siteConfig.address.state}<br />
                    {siteConfig.address.country}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
```

### Quote Form Component

```tsx
// src/components/forms/quote-form.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const projectTypes = ['Web Development', 'Mobile App', 'Platform', 'E-Commerce', 'Other']
const budgetRanges = ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+']
const hearAboutOptions = ['Google', 'Social Media', 'Referral', 'Other']

export function QuoteForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    // Client-side validation
    const newErrors: Record<string, string> = {}
    if (!data.name) newErrors.name = 'Name is required'
    if (!data.email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) {
      newErrors.email = 'Invalid email address'
    }
    if (!data.description) newErrors.description = 'Please describe your project'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Submit to Server Action (Story 5.3)
    try {
      // await submitQuoteRequest(data)
      setIsSuccess(true)
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-foreground-muted">We'll get back to you within 24 hours.</p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        name="name"
        label="Your Name"
        placeholder="John Doe"
        error={errors.name}
        required
      />

      <Input
        name="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        error={errors.email}
        required
      />

      <div>
        <label className="block text-sm font-medium mb-2">Project Type</label>
        <select
          name="projectType"
          className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg"
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Budget Range</label>
        <select
          name="budget"
          className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg"
        >
          {budgetRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Project Description</label>
        <textarea
          name="description"
          rows={4}
          className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg resize-none"
          placeholder="Tell us about your project..."
        />
        {errors.description && <p className="mt-2 text-sm text-error">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">How did you hear about us? (Optional)</label>
        <select
          name="source"
          className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg"
        >
          <option value="">Select...</option>
          {hearAboutOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {errors.form && <p className="text-error">{errors.form}</p>}

      <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

### Testing Checklist

- [ ] All form fields render
- [ ] Validation shows errors inline
- [ ] Loading state on submit
- [ ] Success message after submission
- [ ] Alternative contact info displays

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
