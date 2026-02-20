# Story 6.5: Application Submission & Notifications

Status: ready-for-dev

## Story

As an **HR team member**,
I want **to receive applications with resume attachments**,
So that **I can review candidates**.

## Acceptance Criteria

### AC1: Server-Side Processing
**Given** an application is submitted
**When** the Server Action processes it
**Then**:
- Resume is stored securely (Vercel Blob)
- Notification email sent to HR with applicant details, position, resume link, portfolio, cover letter
- Confirmation email sent to applicant

### AC2: Applicant Confirmation
**Given** the applicant confirmation email
**When** it arrives
**Then** it contains:
- Thank you message
- Position they applied for
- Next steps in the process
- Timeline expectations

## Tasks / Subtasks

- [ ] Task 1: Install Vercel Blob (AC: 1)
  - [ ] Install @vercel/blob

- [ ] Task 2: Create Validation Schema (AC: 1)
  - [ ] Create job application schema in validations

- [ ] Task 3: Create Server Action (AC: 1)
  - [ ] Create `src/lib/actions/application.ts`
  - [ ] Upload file to Vercel Blob
  - [ ] Send emails

- [ ] Task 4: Create Email Templates (AC: 1, 2)
  - [ ] HR notification email
  - [ ] Applicant confirmation email

## Dev Notes

### Install Vercel Blob

```bash
npm install @vercel/blob
```

### Validation Schema

```tsx
// src/lib/validations/application.ts
import { z } from 'zod'

export const jobApplicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  portfolio: z.string().url().optional().or(z.literal('')),
  coverLetter: z.string().optional(),
  jobSlug: z.string(),
  jobTitle: z.string(),
})

export type JobApplicationData = z.infer<typeof jobApplicationSchema>
```

### Server Action

```tsx
// src/lib/actions/application.ts
'use server'

import { put } from '@vercel/blob'
import { resend } from '@/lib/resend'
import { jobApplicationSchema } from '@/lib/validations/application'
import type { ActionResult } from '@/types'
import HRNotification from '@/emails/hr-notification'
import ApplicantConfirmation from '@/emails/applicant-confirmation'
import { siteConfig } from '@/lib/constants'

const HR_EMAIL = 'hr@invenex.in'

export async function submitJobApplication(
  formData: FormData
): Promise<ActionResult> {
  // Parse form data
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    portfolio: formData.get('portfolio') || '',
    coverLetter: formData.get('coverLetter') || '',
    jobSlug: formData.get('jobSlug'),
    jobTitle: formData.get('jobTitle'),
  }

  // Validate
  const result = jobApplicationSchema.safeParse(rawData)
  if (!result.success) {
    return { success: false, error: result.error.errors[0].message }
  }

  const data = result.data

  // Handle resume upload
  const resumeFile = formData.get('resume') as File
  if (!resumeFile || resumeFile.size === 0) {
    return { success: false, error: 'Resume is required' }
  }

  try {
    // Upload to Vercel Blob
    const blob = await put(`resumes/${Date.now()}-${resumeFile.name}`, resumeFile, {
      access: 'public',
    })

    // Send HR notification
    await resend.emails.send({
      from: 'Invenex Careers <careers@invenex.in>',
      to: [HR_EMAIL],
      replyTo: data.email,
      subject: `New Application: ${data.jobTitle} - ${data.name}`,
      react: HRNotification({
        ...data,
        resumeUrl: blob.url,
      }),
    })

    // Send applicant confirmation
    await resend.emails.send({
      from: 'Invenex Solutions <careers@invenex.in>',
      to: [data.email],
      subject: `Application Received - ${data.jobTitle}`,
      react: ApplicantConfirmation({
        name: data.name,
        jobTitle: data.jobTitle,
      }),
    })

    return { success: true }
  } catch (error) {
    console.error('Application submission error:', error)
    return { success: false, error: 'Failed to submit application' }
  }
}
```

### HR Notification Email

```tsx
// src/emails/hr-notification.tsx
import { Html, Head, Body, Container, Heading, Text, Hr, Section, Link } from '@react-email/components'

interface HRNotificationProps {
  name: string
  email: string
  phone: string
  jobTitle: string
  resumeUrl: string
  portfolio?: string
  coverLetter?: string
}

export default function HRNotification(props: HRNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', background: '#f4f4f4', padding: '20px' }}>
        <Container style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <Heading>New Job Application</Heading>
          <Section>
            <Text><strong>Position:</strong> {props.jobTitle}</Text>
            <Text><strong>Name:</strong> {props.name}</Text>
            <Text><strong>Email:</strong> {props.email}</Text>
            <Text><strong>Phone:</strong> {props.phone}</Text>
            {props.portfolio && (
              <Text><strong>Portfolio:</strong> <Link href={props.portfolio}>{props.portfolio}</Link></Text>
            )}
          </Section>
          <Hr />
          <Section>
            <Text><strong>Resume:</strong> <Link href={props.resumeUrl}>Download Resume</Link></Text>
          </Section>
          {props.coverLetter && (
            <>
              <Hr />
              <Section>
                <Heading as="h3">Cover Letter</Heading>
                <Text>{props.coverLetter}</Text>
              </Section>
            </>
          )}
        </Container>
      </Body>
    </Html>
  )
}
```

### Applicant Confirmation Email

```tsx
// src/emails/applicant-confirmation.tsx
import { Html, Head, Body, Container, Heading, Text, Section } from '@react-email/components'

interface ApplicantConfirmationProps {
  name: string
  jobTitle: string
}

export default function ApplicantConfirmation({ name, jobTitle }: ApplicantConfirmationProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', background: '#f4f4f4', padding: '20px' }}>
        <Container style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <Heading>Thank You for Your Application!</Heading>
          <Text>Hi {name},</Text>
          <Text>
            We've received your application for the <strong>{jobTitle}</strong> position at Invenex Solutions.
          </Text>
          <Section>
            <Heading as="h3">What's Next?</Heading>
            <Text>1. Our team will review your application</Text>
            <Text>2. If there's a match, we'll reach out within 5-7 business days</Text>
            <Text>3. The process typically includes a technical assessment and interviews</Text>
          </Section>
          <Text style={{ marginTop: '20px' }}>
            Best of luck!<br />
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
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
```

### Testing Checklist

- [ ] Resume uploads to Vercel Blob
- [ ] HR receives notification with resume link
- [ ] Applicant receives confirmation
- [ ] Emails contain correct information
- [ ] Error handling works

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
