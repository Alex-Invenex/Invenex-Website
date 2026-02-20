# Story 5.2: Form Submission & Email Notifications

Status: ready-for-dev

## Story

As an **Invenex team member**,
I want **to receive email notifications for quote requests**,
So that **I can respond to leads promptly**.

## Acceptance Criteria

### AC1: Server-Side Processing
**Given** a visitor submits a valid quote request
**When** the Server Action processes it
**Then**:
- Data is validated server-side with Zod
- Notification email is sent to team via Resend
- Confirmation email is sent to the visitor
- Success response is returned to the form

### AC2: Team Notification Email
**Given** the team notification email
**When** it arrives
**Then** it contains:
- Visitor's name and email
- Project type and budget range
- Full project description
- How they heard about us
- Timestamp of submission
- Reply-to set to visitor's email

### AC3: Visitor Confirmation Email
**Given** the visitor confirmation email
**When** it arrives
**Then** it contains:
- Thank you message
- Summary of their submission
- Expected response timeframe
- Alternative contact methods

## Tasks / Subtasks

- [ ] Task 1: Install Resend (AC: 1)
  - [ ] Install resend package
  - [ ] Configure API key

- [ ] Task 2: Create Email Templates (AC: 2, 3)
  - [ ] Create `src/emails/team-notification.tsx`
  - [ ] Create `src/emails/quote-confirmation.tsx`

- [ ] Task 3: Create Server Action (AC: 1, 2, 3)
  - [ ] Create `src/lib/actions/contact.ts`
  - [ ] Zod validation
  - [ ] Send both emails

## Dev Notes

### Install Resend

```bash
npm install resend @react-email/components
```

### Resend Client

```tsx
// src/lib/resend.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

### Zod Schema

```tsx
// src/lib/validations/contact.ts
import { z } from 'zod'

export const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  projectType: z.string(),
  budget: z.string(),
  description: z.string().min(10, 'Please provide more details'),
  source: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>
```

### Server Action

```tsx
// src/lib/actions/contact.ts
'use server'

import { resend } from '@/lib/resend'
import { quoteFormSchema } from '@/lib/validations/contact'
import TeamNotification from '@/emails/team-notification'
import QuoteConfirmation from '@/emails/quote-confirmation'
import { siteConfig } from '@/lib/constants'

export async function submitQuoteRequest(formData: FormData) {
  const data = Object.fromEntries(formData)

  // Validate
  const result = quoteFormSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: result.error.errors[0].message }
  }

  try {
    // Send team notification
    await resend.emails.send({
      from: 'Invenex Website <noreply@invenex.in>',
      to: [siteConfig.email],
      replyTo: result.data.email,
      subject: `New Quote Request from ${result.data.name}`,
      react: TeamNotification(result.data),
    })

    // Send visitor confirmation
    await resend.emails.send({
      from: 'Invenex Solutions <noreply@invenex.in>',
      to: [result.data.email],
      subject: 'Thank you for your inquiry!',
      react: QuoteConfirmation(result.data),
    })

    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
```

### Team Notification Email

```tsx
// src/emails/team-notification.tsx
import { Html, Head, Body, Container, Heading, Text, Hr, Section } from '@react-email/components'

interface TeamNotificationProps {
  name: string
  email: string
  projectType: string
  budget: string
  description: string
  source?: string
}

export default function TeamNotification(props: TeamNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', background: '#f4f4f4', padding: '20px' }}>
        <Container style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <Heading>New Quote Request</Heading>
          <Section>
            <Text><strong>Name:</strong> {props.name}</Text>
            <Text><strong>Email:</strong> {props.email}</Text>
            <Text><strong>Project Type:</strong> {props.projectType}</Text>
            <Text><strong>Budget:</strong> {props.budget}</Text>
            <Text><strong>Source:</strong> {props.source || 'Not specified'}</Text>
          </Section>
          <Hr />
          <Section>
            <Heading as="h3">Project Description</Heading>
            <Text>{props.description}</Text>
          </Section>
          <Hr />
          <Text style={{ color: '#666', fontSize: '12px' }}>
            Submitted at {new Date().toLocaleString()}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### Confirmation Email

```tsx
// src/emails/quote-confirmation.tsx
import { Html, Head, Body, Container, Heading, Text, Section, Link } from '@react-email/components'

export default function QuoteConfirmation({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', background: '#f4f4f4', padding: '20px' }}>
        <Container style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <Heading>Thank You, {name}!</Heading>
          <Text>
            We've received your quote request and will get back to you within 24 hours.
          </Text>
          <Section>
            <Text>In the meantime, you can:</Text>
            <Text>• Check out our <Link href="https://invenex.in/portfolio">portfolio</Link></Text>
            <Text>• WhatsApp us for quick questions</Text>
          </Section>
          <Text style={{ marginTop: '20px' }}>
            Best regards,<br />
            The Invenex Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Testing Checklist

- [ ] Server Action validates data
- [ ] Team receives notification email
- [ ] Visitor receives confirmation email
- [ ] Reply-to is set correctly
- [ ] Error handling works

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
