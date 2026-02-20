# Story 7.3: Content Schemas - Jobs & Team

Status: ready-for-dev

## Story

As an **admin**,
I want **schemas for job listings and team members**,
So that **I can manage careers content**.

## Acceptance Criteria

### AC1: Job Schema
**Given** I need a Job schema
**When** it's defined in Sanity
**Then** it includes fields for:
- Title (string, required)
- Slug (auto-generated)
- Department (engineering, design, marketing, operations)
- Location (string)
- Employment type (full-time, part-time, contract)
- Experience level (junior, mid, senior, lead)
- Description (block content)
- Requirements (array of strings)
- Responsibilities (array of strings)
- Tech stack (array of strings)
- Active flag (boolean)
- Posted date

### AC2: Team Member Schema
**Given** I need a Team Member schema
**When** it's defined in Sanity
**Then** it includes fields for:
- Name (string, required)
- Role (string)
- Photo (image with hotspot)
- Bio (text)
- LinkedIn URL (url)
- Order (number for sorting)
- Active flag (boolean)

## Tasks / Subtasks

- [ ] Task 1: Create Job Schema (AC: 1)
  - [ ] Create `src/sanity/schemas/job.ts`
  - [ ] Define all fields
  - [ ] Add to schema index

- [ ] Task 2: Create Team Member Schema (AC: 2)
  - [ ] Create `src/sanity/schemas/teamMember.ts`
  - [ ] Define all fields
  - [ ] Add to schema index

- [ ] Task 3: Update Schema Index
  - [ ] Export new schemas

## Dev Notes

### Job Schema

```tsx
// src/sanity/schemas/job.ts
import { defineField, defineType } from 'sanity'

export const job = defineType({
  name: 'job',
  title: 'Job Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'Design', value: 'design' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Operations', value: 'operations' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Kochi", "Remote", "Hybrid"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Junior (0-2 years)', value: 'junior' },
          { title: 'Mid (2-5 years)', value: 'mid' },
          { title: 'Senior (5+ years)', value: 'senior' },
          { title: 'Lead (7+ years)', value: 'lead' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'blockContent',
      description: 'Detailed role description',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Must-have qualifications',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Day-to-day duties',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Required technologies (for engineering roles)',
    }),
    defineField({
      name: 'salary',
      title: 'Salary Range',
      type: 'string',
      description: 'Optional salary range (e.g., "₹8-15 LPA")',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this position currently open?',
      initialValue: true,
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      active: 'active',
    },
    prepare({ title, department, active }) {
      return {
        title,
        subtitle: `${department} ${active ? '✓ Active' : '✗ Closed'}`,
      }
    },
  },
})
```

### Team Member Schema

```tsx
// src/sanity/schemas/teamMember.ts
import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Job title (e.g., "Lead Developer", "UX Designer")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Short biography (2-3 sentences)',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter/X URL',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show on website?',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
```

### GROQ Queries

```tsx
// src/lib/sanity/queries.ts (add to existing)

export const jobsQuery = groq`
  *[_type == "job" && active == true] | order(postedAt desc) {
    _id,
    title,
    slug,
    department,
    location,
    employmentType,
    experienceLevel,
    techStack,
    postedAt
  }
`

export const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    department,
    location,
    employmentType,
    experienceLevel,
    description,
    requirements,
    responsibilities,
    techStack,
    salary,
    postedAt
  }
`

export const teamQuery = groq`
  *[_type == "teamMember" && active == true] | order(order asc) {
    _id,
    name,
    role,
    photo,
    bio,
    linkedIn,
    twitter,
    github
  }
`
```

### TypeScript Types

```tsx
// src/types/sanity.ts (add to existing)

export interface Job {
  _id: string
  _type: 'job'
  title: string
  slug: Slug
  department: 'engineering' | 'design' | 'marketing' | 'operations'
  location: string
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead'
  description?: PortableTextBlock[]
  requirements?: string[]
  responsibilities?: string[]
  techStack?: string[]
  salary?: string
  active: boolean
  postedAt: string
}

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  role: string
  photo?: Image
  bio?: string
  linkedIn?: string
  twitter?: string
  github?: string
  order?: number
  active: boolean
}
```

### Update Schema Index

```tsx
// src/sanity/schemas/index.ts
import { project } from './project'
import { service } from './service'
import { job } from './job'
import { teamMember } from './teamMember'
import { blockContent } from './blockContent'

export const schemaTypes = [
  project,
  service,
  job,
  teamMember,
  blockContent,
]
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Active filtering | Boolean field for soft-delete |
| Department enum | Predefined list for consistency |
| Experience levels | Standardized options |
| Social links | URL validation |

### Testing Checklist

- [ ] Job schema visible in Studio
- [ ] Team member schema visible in Studio
- [ ] Active flag filtering works
- [ ] Department dropdown works
- [ ] Photo uploads with hotspot
- [ ] GROQ queries return correct data

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
