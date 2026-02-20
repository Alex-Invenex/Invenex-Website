# Story 2.6: Scroll Animation Infrastructure

Status: complete

## Story

As a **visitor**,
I want **sections to animate as they come into view**,
So that **the browsing experience feels dynamic and engaging**.

## Acceptance Criteria

### AC1: Scroll-Triggered Animations
**Given** I am scrolling through a page
**When** a section enters the viewport
**Then** it animates with:
- Fade-up effect (opacity 0→1, y 40→0)
- Duration of 600ms
- Staggered children (100ms delay between items)
- `viewport={{ once: true }}` - only animates once

### AC2: Reduced Motion Support
**Given** I have `prefers-reduced-motion` enabled
**When** sections would animate
**Then** they appear instantly without motion

### AC3: Reusable Component
**Given** the animation infrastructure is built
**When** I use the `AnimatedSection` component
**Then** I can easily wrap any content for scroll-triggered reveals

## Tasks / Subtasks

- [ ] Task 1: Create AnimatedSection Component (AC: 1, 2, 3)
  - [ ] Create `src/components/ui/animated-section.tsx`
  - [ ] Use Framer Motion whileInView
  - [ ] Add viewport={{ once: true }}
  - [ ] Support reduced motion

- [ ] Task 2: Create Stagger Container (AC: 1)
  - [ ] Create `src/components/ui/stagger-container.tsx`
  - [ ] Support staggered children animations
  - [ ] Configurable delay between items

- [ ] Task 3: Create Animation Variants
  - [ ] Define fadeUp variant
  - [ ] Define fadeIn variant
  - [ ] Define slideIn variants (left/right)

- [ ] Task 4: Export from UI index
  - [ ] Add to barrel export

## Dev Notes

### AnimatedSection Component

```tsx
// src/components/ui/animated-section.tsx
'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight'
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  variant = 'fadeUp',
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants[variant]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
```

### StaggerContainer Component

```tsx
// src/components/ui/stagger-container.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
```

### Usage Example

```tsx
// Example usage in a page
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui'

export default function Page() {
  return (
    <div>
      <AnimatedSection>
        <h1>Welcome</h1>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-3 gap-6">
        <StaggerItem><Card>Item 1</Card></StaggerItem>
        <StaggerItem><Card>Item 2</Card></StaggerItem>
        <StaggerItem><Card>Item 3</Card></StaggerItem>
      </StaggerContainer>
    </div>
  )
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Animation Library | Framer Motion |
| Trigger | whileInView with once: true |
| Easing | cubic-bezier(0.16, 1, 0.3, 1) |
| Accessibility | useReducedMotion check |

### Dependencies

- framer-motion (from Story 2.5)

### Testing Checklist

- [ ] AnimatedSection fades up into view
- [ ] Animation only triggers once (not on re-scroll)
- [ ] StaggerContainer staggers children
- [ ] All variants work (fadeUp, fadeIn, slideLeft, slideRight)
- [ ] Reduced motion shows content instantly
- [ ] No layout shift during animations

### References

- [Source: ux-design-specification.md#Scroll-Animations]
- [Source: prd.md#FR40-Scroll-Animations]
- [Source: architecture.md#Animation-Strategy]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
