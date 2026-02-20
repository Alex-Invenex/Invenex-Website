# Story 6.4: Job Application Form

Status: ready-for-dev

## Story

As a **job seeker**,
I want **to submit my application with resume**,
So that **I can be considered for the position**.

## Acceptance Criteria

### AC1: Application Form Fields
**Given** I click "Apply Now" on a job
**When** the application form appears
**Then** I see fields for:
- Full Name (required)
- Email (required, validated)
- Phone Number (required)
- Resume Upload (required, PDF/DOC, max 5MB)
- Portfolio URL (optional)
- Cover Letter (optional textarea)
- Submit button

### AC2: File Upload
**Given** I need to upload my resume
**When** I interact with the file upload
**Then** I can:
- Click to browse files
- Drag and drop a file
- See file name after selection
- Remove selected file
- See error if wrong file type or too large

### AC3: Form Submission
**Given** I submit a valid application
**When** the form processes
**Then**:
- Loading state shown on button
- File uploads to Vercel Blob storage
- Server Action processes submission
- Success message displays

## Tasks / Subtasks

- [ ] Task 1: Create Application Page (AC: 1)
  - [ ] Create `src/app/careers/[slug]/apply/page.tsx`
  - [ ] Display job title and back link

- [ ] Task 2: Create Application Form (AC: 1, 2, 3)
  - [ ] Create `src/components/forms/application-form.tsx`
  - [ ] All form fields
  - [ ] File upload component

- [ ] Task 3: Create File Upload Component (AC: 2)
  - [ ] Create `src/components/ui/file-upload.tsx`
  - [ ] Drag and drop support
  - [ ] File validation

## Dev Notes

### Application Page

```tsx
// src/app/careers/[slug]/apply/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/animated-section'
import { ApplicationForm } from '@/components/forms/application-form'

// Use same jobs data from detail page
const jobs = { /* ... */ }

export default function ApplyPage({ params }: { params: { slug: string } }) {
  const job = jobs[params.slug]
  if (!job) notFound()

  return (
    <section className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-2xl">
        <AnimatedSection>
          <Link href={`/careers/${params.slug}`} className="text-foreground-muted hover:text-foreground mb-6 inline-block">
            ← Back to {job.title}
          </Link>
          <h1 className="text-3xl font-bold mb-2">Apply for {job.title}</h1>
          <p className="text-foreground-muted mb-8">Fill out the form below to submit your application.</p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ApplicationForm jobSlug={params.slug} jobTitle={job.title} />
        </AnimatedSection>
      </div>
    </section>
  )
}
```

### Application Form

```tsx
// src/components/forms/application-form.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Card } from '@/components/ui/card'

interface ApplicationFormProps {
  jobSlug: string
  jobTitle: string
}

export function ApplicationForm({ jobSlug, jobTitle }: ApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    formData.append('jobSlug', jobSlug)
    formData.append('jobTitle', jobTitle)

    if (resumeFile) {
      formData.append('resume', resumeFile)
    }

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.get('name')) newErrors.name = 'Name is required'
    if (!formData.get('email')) newErrors.email = 'Email is required'
    if (!formData.get('phone')) newErrors.phone = 'Phone is required'
    if (!resumeFile) newErrors.resume = 'Resume is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // Submit to Server Action (Story 6.5)
      // await submitJobApplication(formData)
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
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
        <p className="text-foreground-muted">
          Thanks for applying! We'll review your application and get back to you within a week.
        </p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input name="name" label="Full Name" placeholder="John Doe" error={errors.name} required />
      <Input name="email" type="email" label="Email" placeholder="john@example.com" error={errors.email} required />
      <Input name="phone" type="tel" label="Phone Number" placeholder="+91 98765 43210" error={errors.phone} required />

      <div>
        <label className="block text-sm font-medium mb-2">Resume (PDF or DOC, max 5MB)</label>
        <FileUpload
          accept=".pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024}
          onFileSelect={setResumeFile}
          error={errors.resume}
        />
      </div>

      <Input name="portfolio" type="url" label="Portfolio URL (Optional)" placeholder="https://your-portfolio.com" />

      <div>
        <label className="block text-sm font-medium mb-2">Cover Letter (Optional)</label>
        <textarea
          name="coverLetter"
          rows={4}
          className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg resize-none"
          placeholder="Tell us why you're interested in this role..."
        />
      </div>

      {errors.form && <p className="text-error">{errors.form}</p>}

      <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  )
}
```

### File Upload Component

```tsx
// src/components/ui/file-upload.tsx
'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  accept: string
  maxSize: number
  onFileSelect: (file: File | null) => void
  error?: string
}

export function FileUpload({ accept, maxSize, onFileSelect, error }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (selectedFile: File) => {
    setFileError(null)

    if (selectedFile.size > maxSize) {
      setFileError(`File too large. Max size is ${maxSize / 1024 / 1024}MB`)
      return
    }

    const extension = selectedFile.name.split('.').pop()?.toLowerCase()
    const allowedExtensions = accept.split(',').map(e => e.trim().replace('.', ''))

    if (!extension || !allowedExtensions.includes(extension)) {
      setFileError(`Invalid file type. Allowed: ${accept}`)
      return
    }

    setFile(selectedFile)
    onFileSelect(selectedFile)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
    onFileSelect(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          dragActive ? 'border-foreground bg-foreground/5' : 'border-border',
          (error || fileError) && 'border-error'
        )}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center justify-between">
            <span className="text-foreground">{file.name}</span>
            <button type="button" onClick={removeFile} className="text-error hover:underline">
              Remove
            </button>
          </div>
        ) : (
          <>
            <p className="text-foreground-muted mb-2">Drag and drop your file here, or</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-foreground underline"
            >
              browse files
            </button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </div>
      {(error || fileError) && (
        <p className="mt-2 text-sm text-error">{error || fileError}</p>
      )}
    </div>
  )
}
```

### Testing Checklist

- [ ] Form displays all fields
- [ ] File upload accepts PDF/DOC
- [ ] File size limit enforced
- [ ] Drag and drop works
- [ ] Remove file works
- [ ] Validation shows errors
- [ ] Success message displays

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
