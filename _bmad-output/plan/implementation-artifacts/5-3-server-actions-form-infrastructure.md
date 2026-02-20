# Story 5.3: Server Actions & Form Infrastructure

Status: ready-for-dev

## Story

As a **developer**,
I want **a robust Server Actions infrastructure for forms**,
So that **form submissions are type-safe and secure**.

## Acceptance Criteria

### AC1: Infrastructure Files
**Given** I need to handle form submissions
**When** I use the form infrastructure
**Then** I have:
- Zod schemas in `@/lib/validations/contact.ts`
- Server Actions in `@/lib/actions/contact.ts`
- `ActionResult<T>` type for consistent responses
- Resend client in `@/lib/resend.ts`
- React Email templates in `@/emails/`

### AC2: Action Result Type
**Given** the `submitContactAction` Server Action
**When** it executes
**Then** it:
- Validates input with Zod
- Returns `{ success: false, error: string }` on validation failure
- Sends emails via Resend
- Returns `{ success: true, data: { id: string } }` on success
- Handles errors gracefully

## Tasks / Subtasks

- [ ] Task 1: Create Types (AC: 1)
  - [ ] Create ActionResult type in `@/types/index.ts`

- [ ] Task 2: Create Validation Schemas (AC: 1)
  - [ ] Quote form schema
  - [ ] Job application schema (for Epic 6)

- [ ] Task 3: Create Server Actions (AC: 1, 2)
  - [ ] submitQuoteRequest action
  - [ ] Error handling pattern

- [ ] Task 4: Create useFormAction Hook
  - [ ] Reusable hook for form state management

## Dev Notes

### ActionResult Type

```tsx
// src/types/index.ts (add to existing)
export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }
```

### Validation Schemas

```tsx
// src/lib/validations/contact.ts
import { z } from 'zod'

export const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  projectType: z.enum(['Web Development', 'Mobile App', 'Platform', 'E-Commerce', 'Other']),
  budget: z.enum(['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+']),
  description: z.string().min(10, 'Please provide more details about your project'),
  source: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>
```

### Server Action Pattern

```tsx
// src/lib/actions/contact.ts
'use server'

import { resend } from '@/lib/resend'
import { quoteFormSchema, type QuoteFormData } from '@/lib/validations/contact'
import type { ActionResult } from '@/types'
import TeamNotification from '@/emails/team-notification'
import QuoteConfirmation from '@/emails/quote-confirmation'
import { siteConfig } from '@/lib/constants'

export async function submitQuoteRequest(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  // Parse form data
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    projectType: formData.get('projectType'),
    budget: formData.get('budget'),
    description: formData.get('description'),
    source: formData.get('source') || undefined,
  }

  // Validate with Zod
  const validationResult = quoteFormSchema.safeParse(rawData)

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.errors[0].message,
    }
  }

  const data = validationResult.data

  try {
    // Send team notification
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Invenex Website <noreply@invenex.in>',
      to: [siteConfig.email],
      replyTo: data.email,
      subject: `New Quote Request from ${data.name}`,
      react: TeamNotification(data),
    })

    if (emailError) {
      console.error('Team email error:', emailError)
      return { success: false, error: 'Failed to send notification' }
    }

    // Send visitor confirmation
    await resend.emails.send({
      from: 'Invenex Solutions <noreply@invenex.in>',
      to: [data.email],
      subject: 'Thank you for your inquiry - Invenex Solutions',
      react: QuoteConfirmation({ name: data.name }),
    })

    return {
      success: true,
      data: { id: emailData?.id || 'success' },
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
```

### useFormAction Hook

```tsx
// src/hooks/use-form-action.ts
'use client'

import { useActionState } from 'react'
import type { ActionResult } from '@/types'

export function useFormAction<T>(
  action: (prevState: ActionResult<T>, formData: FormData) => Promise<ActionResult<T>>
) {
  const [state, formAction, isPending] = useActionState(action, { success: false, error: '' })

  return {
    state,
    formAction,
    isPending,
    isSuccess: state.success,
    error: !state.success ? state.error : null,
  }
}
```

### Updated Quote Form with Hook

```tsx
// src/components/forms/quote-form.tsx
'use client'

import { useFormAction } from '@/hooks/use-form-action'
import { submitQuoteRequest } from '@/lib/actions/contact'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function QuoteForm() {
  const { formAction, isPending, isSuccess, error } = useFormAction(submitQuoteRequest)

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
    <form action={formAction} className="space-y-6">
      {/* Form fields... */}
      {error && <p className="text-error">{error}</p>}
      <Button type="submit" size="lg" className="w-full" isLoading={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

### Testing Checklist

- [ ] ActionResult type works for success/error
- [ ] Zod validation catches invalid data
- [ ] Server Action returns proper response
- [ ] useFormAction hook manages state
- [ ] isPending shows loading state

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
