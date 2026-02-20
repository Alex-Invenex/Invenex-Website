# Story 4.2: Portfolio Filtering

Status: ready-for-dev

## Story

As a **potential client**,
I want **to filter projects by category**,
So that **I can find relevant examples for my project type**.

## Acceptance Criteria

### AC1: Filter Functionality
**Given** I am on the Portfolio page
**When** I click a filter tab (e.g., "Mobile")
**Then**:
- The tab becomes active (highlighted)
- Projects filter to show only that category
- Animation shows cards fading out/in
- URL updates with query param (?category=mobile)

### AC2: All Filter
**Given** I click "All" filter
**When** the filter applies
**Then** all projects are displayed

### AC3: URL State
**Given** I share a filtered URL
**When** someone opens the link
**Then** the correct filter is pre-applied

## Tasks / Subtasks

- [ ] Task 1: Create Filter Tabs Component (AC: 1, 2)
  - [ ] Create `src/components/ui/filter-tabs.tsx`
  - [ ] Handle active state
  - [ ] Update URL params

- [ ] Task 2: Integrate with Project Grid (AC: 1, 3)
  - [ ] Read filter from URL
  - [ ] Filter projects client-side
  - [ ] Animate transitions

## Dev Notes

### Filter Tabs Component

```tsx
// src/components/ui/filter-tabs.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const categories = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'platform', label: 'Platform' },
  { value: 'ecommerce', label: 'E-Commerce' },
]

export function FilterTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`/portfolio?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => handleFilter(category.value)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            activeCategory === category.value
              ? 'bg-foreground text-background'
              : 'bg-background-secondary text-foreground-muted hover:text-foreground'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
```

### Updated Project Grid

```tsx
// src/components/sections/project-grid.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from '@/components/ui/project-card'
import { FilterTabs } from '@/components/ui/filter-tabs'

export function ProjectGrid({ projects }) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'all'

  const filteredProjects = category === 'all'
    ? projects
    : projects.filter(p => p.category === category)

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <FilterTabs />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
```

### Testing Checklist

- [ ] Filter tabs highlight when active
- [ ] Projects filter correctly
- [ ] URL updates with category param
- [ ] Direct URL with param works
- [ ] Fade animation on filter change

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
