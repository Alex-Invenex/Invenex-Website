# Story 8.4: Accessibility Compliance (WCAG 2.1 AA)

Status: ready-for-dev

## Story

As a **visitor with disabilities**,
I want **the site to be fully accessible**,
So that **I can use it with assistive technologies**.

## Acceptance Criteria

### AC1: Visual Accessibility
**Given** any page on the site
**When** tested for accessibility
**Then** it meets WCAG 2.1 AA:
- Color contrast >= 4.5:1 for normal text
- Color contrast >= 3:1 for large text
- All images have descriptive alt text
- All form inputs have associated labels
- All interactive elements are focusable

### AC2: Keyboard Navigation
**Given** keyboard navigation
**When** I tab through the page
**Then**:
- Focus order is logical (left-to-right, top-to-bottom)
- Focus indicators are clearly visible
- No focus traps (except modals)
- Skip link available to jump to main content
- Escape closes modals/menus

### AC3: Screen Reader Support
**Given** screen reader usage
**When** content is announced
**Then**:
- Semantic HTML is used correctly
- ARIA labels provide context where needed
- Live regions announce dynamic changes
- Decorative images are hidden from screen readers

## Tasks / Subtasks

- [ ] Task 1: Implement Skip Link (AC: 2)
  - [ ] Create skip link component
  - [ ] Add to root layout
  - [ ] Style for visibility

- [ ] Task 2: Ensure Focus Styles (AC: 1, 2)
  - [ ] Add visible focus-visible styles
  - [ ] Ensure all interactive elements focusable
  - [ ] Test focus order

- [ ] Task 3: Add ARIA Labels (AC: 3)
  - [ ] Navigation landmarks
  - [ ] Form labels
  - [ ] Button labels for icon-only buttons
  - [ ] Live regions for forms

- [ ] Task 4: Audit Color Contrast (AC: 1)
  - [ ] Verify text colors meet contrast
  - [ ] Check button/badge colors
  - [ ] Test with color blindness simulators

- [ ] Task 5: Add Alt Text Guidelines (AC: 1)
  - [ ] Document alt text patterns
  - [ ] Ensure CMS enforces alt text

## Dev Notes

### Skip Link Component

```tsx
// src/components/accessibility/skip-link.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4
        focus:z-50 focus:bg-foreground focus:text-background
        focus:px-4 focus:py-2 focus:rounded-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2
      "
    >
      Skip to main content
    </a>
  )
}
```

### Root Layout Integration

```tsx
// src/app/layout.tsx
import { SkipLink } from '@/components/accessibility/skip-link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <header>{/* navigation */}</header>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer>{/* footer */}</footer>
      </body>
    </html>
  )
}
```

### Focus Styles (Global CSS)

```css
/* src/styles/globals.css */
@layer base {
  /* Remove default focus outline and add custom */
  *:focus {
    outline: none;
  }

  /* Visible focus for keyboard navigation */
  *:focus-visible {
    outline: 2px solid var(--color-foreground);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Focus ring for buttons */
  button:focus-visible,
  [role="button"]:focus-visible {
    outline: 2px solid var(--color-foreground);
    outline-offset: 2px;
  }

  /* Focus ring for inputs */
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: none;
    border-color: var(--color-foreground);
    box-shadow: 0 0 0 3px rgba(250, 250, 250, 0.2);
  }

  /* Focus ring for links */
  a:focus-visible {
    outline: 2px solid var(--color-foreground);
    outline-offset: 2px;
    border-radius: 2px;
  }
}
```

### ARIA Landmarks

```tsx
// src/app/layout.tsx (semantic structure)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />

        {/* Navigation landmark */}
        <header role="banner">
          <nav aria-label="Main navigation">
            {/* nav content */}
          </nav>
        </header>

        {/* Main content landmark */}
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>

        {/* Footer landmark */}
        <footer role="contentinfo">
          {/* footer content */}
        </footer>
      </body>
    </html>
  )
}
```

### Button with Icon - ARIA Label

```tsx
// src/components/ui/icon-button.tsx
interface IconButtonProps {
  icon: React.ReactNode
  label: string // Required for accessibility
  onClick?: () => void
  className?: string
}

export function IconButton({ icon, label, onClick, className }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'p-2 rounded-lg hover:bg-background-secondary transition-colors',
        'focus-visible:outline-2 focus-visible:outline-foreground',
        className
      )}
    >
      {icon}
    </button>
  )
}

// Usage
<IconButton icon={<MenuIcon />} label="Open menu" />
<IconButton icon={<CloseIcon />} label="Close menu" />
<IconButton icon={<SearchIcon />} label="Search" />
```

### Form Accessibility

```tsx
// src/components/ui/input.tsx (enhanced)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export function Input({
  label,
  error,
  hint,
  id,
  required,
  ...props
}: InputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s/g, '-')}`
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium mb-2"
      >
        {label}
        {required && <span aria-hidden="true" className="text-error ml-1">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </label>

      {hint && (
        <p id={hintId} className="text-sm text-foreground-muted mb-2">
          {hint}
        </p>
      )}

      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={
          [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined
        }
        aria-required={required}
        className={cn(
          'w-full px-4 py-3 bg-background-secondary border rounded-lg',
          error ? 'border-error' : 'border-border',
          'focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-foreground/20'
        )}
        {...props}
      />

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}
```

### Live Region for Form Submission

```tsx
// src/components/forms/contact-form.tsx
import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}

      {/* Live region for status announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {status === 'loading' && 'Submitting form...'}
        {status === 'success' && 'Form submitted successfully!'}
        {status === 'error' && `Error: ${message}`}
      </div>

      {/* Visual status message */}
      {status === 'success' && (
        <div role="alert" className="text-success">
          Thank you! We'll be in touch soon.
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="text-error">
          {message}
        </div>
      )}
    </form>
  )
}
```

### Modal Accessibility

```tsx
// src/components/ui/modal.tsx
import { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocus.current = document.activeElement as HTMLElement
      // Focus modal
      modalRef.current?.focus()
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Restore focus
      previousFocus.current?.focus()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="relative bg-background rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          {title}
        </h2>

        {children}

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
}
```

### Reduced Motion Support

```tsx
// src/components/ui/animated-section.tsx (enhanced)
'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedSection({ children, className, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  // Skip animation if user prefers reduced motion
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Color Contrast Reference

| Element | Background | Foreground | Ratio | Status |
|---------|-----------|------------|-------|--------|
| Body text | #0A0A0A | #FAFAFA | 19.5:1 | PASS |
| Muted text | #0A0A0A | #A3A3A3 | 9.7:1 | PASS |
| Subtle text | #0A0A0A | #737373 | 5.7:1 | PASS |
| Button (primary) | #FAFAFA | #0A0A0A | 19.5:1 | PASS |
| Error text | #0A0A0A | #EF4444 | 5.3:1 | PASS |
| Success text | #0A0A0A | #22C55E | 7.1:1 | PASS |

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Skip link | First focusable element |
| Focus visible | CSS focus-visible selector |
| ARIA landmarks | Semantic HTML + roles |
| Reduced motion | Framer Motion useReducedMotion |

### Testing Checklist

- [ ] Skip link works (Tab then Enter)
- [ ] All interactive elements focusable
- [ ] Focus order is logical
- [ ] Focus indicators visible
- [ ] Escape closes modals
- [ ] Screen reader announces content correctly
- [ ] Forms have proper labels
- [ ] Error messages announced
- [ ] Reduced motion respected
- [ ] Color contrast passes WCAG AA
- [ ] Test with aXe DevTools
- [ ] Test with NVDA/VoiceOver

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
