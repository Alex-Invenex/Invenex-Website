# Story 2.5: Page Transitions with Framer Motion

Status: complete

## Story

As a **visitor**,
I want **smooth transitions between pages**,
So that **navigation feels premium and polished**.

## Acceptance Criteria

### AC1: Page Transition Animation
**Given** I click a navigation link
**When** the page transition occurs
**Then** the transition:
- Fades out current page (150ms)
- Routes to new page
- Fades in new page (300ms)
- Uses ease-out easing curve

### AC2: Reduced Motion Support
**Given** I have `prefers-reduced-motion` enabled
**When** page transitions occur
**Then** animations are:
- Reduced to simple instant transitions
- No fade effects applied
- Navigation still functions correctly

## Tasks / Subtasks

- [ ] Task 1: Install Framer Motion (AC: 1)
  - [ ] Install framer-motion package

- [ ] Task 2: Create Page Transition Provider (AC: 1)
  - [ ] Create `src/components/providers/page-transition.tsx`
  - [ ] Wrap children with AnimatePresence
  - [ ] Configure exit/enter animations

- [ ] Task 3: Create Template for Animations (AC: 1)
  - [ ] Create `src/app/template.tsx`
  - [ ] Apply motion.div wrapper
  - [ ] Configure fade animation variants

- [ ] Task 4: Add Reduced Motion Support (AC: 2)
  - [ ] Check prefers-reduced-motion
  - [ ] Disable animations when enabled

## Dev Notes

### Install Framer Motion

```bash
npm install framer-motion
```

### Page Transition Template

```tsx
// src/app/template.tsx
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1], // Premium ease-out
      }}
    >
      {children}
    </motion.div>
  )
}
```

### Alternative: AnimatePresence Provider

```tsx
// src/components/providers/page-transition.tsx
'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProviderProps {
  children: React.ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.15,
          ease: 'easeOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### Variants for Complex Animations

```tsx
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Animation Library | Framer Motion |
| Easing | cubic-bezier(0.16, 1, 0.3, 1) |
| Duration | 150ms exit, 300ms enter |
| Accessibility | useReducedMotion hook |

### Dependencies

- framer-motion: ^11.0.0

### Testing Checklist

- [ ] Page fades out when navigating away
- [ ] Page fades in when arriving
- [ ] Animation timing feels smooth
- [ ] No flash of unstyled content
- [ ] Reduced motion users see instant transitions
- [ ] Navigation still works with animations disabled

### References

- [Source: ux-design-specification.md#Page-Transitions]
- [Source: architecture.md#Animation-Strategy]
- [Source: prd.md#FR39-Page-Transitions]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
