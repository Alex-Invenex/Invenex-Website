# Story 6.2: Job Listings with Filtering

Status: ready-for-dev

## Story

As a **job seeker**,
I want **to browse open positions and filter by department**,
So that **I can find relevant opportunities**.

## Acceptance Criteria

### AC1: Job Listings Display
**Given** I view the Open Positions section
**When** it renders
**Then** I see:
- Department filter tabs: All, Engineering, Design, Marketing, Operations
- Job listing cards showing: Job title, Department badge, Location, Experience level, Tech stack tags
- "Apply Now" button on each card

### AC2: Filter Functionality
**Given** I click a department filter
**When** the filter applies
**Then**:
- Jobs filter to show only that department
- Smooth transition animation
- Count updates

### AC3: Empty State
**Given** no jobs exist in a department
**When** I filter to it
**Then** I see "No open positions in this department" message

## Tasks / Subtasks

- [ ] Task 1: Create JobListings Component (AC: 1, 2, 3)
  - [ ] Create `src/components/sections/job-listings.tsx`
  - [ ] Department filter tabs
  - [ ] Job cards grid
  - [ ] Empty state

- [ ] Task 2: Create JobCard Component (AC: 1)
  - [ ] Create `src/components/ui/job-card.tsx`
  - [ ] Display all job info
  - [ ] Apply button

- [ ] Task 3: Integrate with Careers Page
  - [ ] Replace placeholder in careers page

## Dev Notes

### Job Listings Component

```tsx
// src/components/sections/job-listings.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { JobCard } from '@/components/ui/job-card'

const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Operations']

// Sample data - will come from Sanity
const jobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Kochi / Remote',
    experience: 'Senior',
    techStack: ['React', 'Next.js', 'TypeScript'],
    slug: 'senior-frontend-developer',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Kochi',
    experience: 'Mid',
    techStack: ['Node.js', 'React', 'PostgreSQL'],
    slug: 'full-stack-developer',
  },
  // ... more jobs
]

export function JobListings() {
  const [activeDepartment, setActiveDepartment] = useState('All')

  const filteredJobs = activeDepartment === 'All'
    ? jobs
    : jobs.filter(job => job.department === activeDepartment)

  return (
    <div>
      {/* Department Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDepartment(dept)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeDepartment === dept
                ? 'bg-foreground text-background'
                : 'bg-background-secondary text-foreground-muted hover:text-foreground'
            )}
          >
            {dept}
            {dept !== 'All' && (
              <span className="ml-2 text-xs">
                ({jobs.filter(j => j.department === dept).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Job Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDepartment}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-foreground-muted">
                No open positions in {activeDepartment} at the moment.
              </p>
              <p className="text-sm text-foreground-subtle mt-2">
                Check back soon or apply for other positions.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

### Job Card Component

```tsx
// src/components/ui/job-card.tsx
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface JobCardProps {
  job: {
    title: string
    department: string
    location: string
    experience: string
    techStack?: string[]
    slug: string
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card variant="interactive" className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge size="sm" className="mb-2">{job.department}</Badge>
          <h3 className="text-xl font-semibold">{job.title}</h3>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm text-foreground-muted">
        <p>📍 {job.location}</p>
        <p>💼 {job.experience} level</p>
      </div>

      {job.techStack && job.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {job.techStack.map((tech) => (
            <Badge key={tech} size="sm" variant="info">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      <Button asChild className="w-full">
        <Link href={`/careers/${job.slug}`}>Apply Now</Link>
      </Button>
    </Card>
  )
}
```

### Testing Checklist

- [ ] All departments show in filter
- [ ] Filter shows job count
- [ ] Clicking filter updates jobs
- [ ] Empty state shows when no jobs
- [ ] Job cards display all info
- [ ] Apply button links to detail page

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
