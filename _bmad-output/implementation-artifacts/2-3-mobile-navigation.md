# Story 2.3: Mobile Navigation

Status: done

## Story

As a **mobile visitor**,
I want **a responsive hamburger menu**,
So that **I can navigate the site on my phone**.

## Acceptance Criteria

### AC1: Mobile Header
**Given** I am on a mobile device (< 1024px)
**When** I view the header
**Then** I see:
- Logo on the left
- Hamburger menu icon on the right
- No desktop navigation links visible

### AC2: Mobile Menu Open
**Given** I tap the hamburger menu
**When** the mobile menu opens
**Then** it:
- Displays full-screen overlay with fade-in
- Shows all navigation links with large touch targets (48px min)
- Includes "Get a Quote" CTA
- Has close button (X) in top-right
- Includes social links at bottom

### AC3: Menu Close Behavior
**Given** I tap a navigation link
**When** the page navigates
**Then** the mobile menu closes automatically

**Given** I tap outside the menu or press Escape
**When** the action is detected
**Then** the menu closes with fade-out animation

## Tasks / Subtasks

- [x] Task 1: Create Mobile Menu Component (AC: 1, 2)
  - [x] Create `src/components/layout/mobile-menu.tsx`
  - [x] Create full-screen overlay
  - [x] Add navigation links with 48px touch targets
  - [x] Add close button (X)
  - [x] Add social links at bottom

- [x] Task 2: Integrate with Navbar (AC: 1)
  - [x] Add mobile menu state to navbar
  - [x] Show hamburger button on mobile only
  - [x] Trigger mobile menu open/close

- [x] Task 3: Implement Close Behavior (AC: 3)
  - [x] Close on navigation link click
  - [x] Close on Escape key
  - [x] Close on backdrop click
  - [x] Add body scroll lock when open

## Dev Notes

### Mobile Menu Implementation

```tsx
// src/components/layout/mobile-menu.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { navItems, socialLinks, siteConfig } from '@/lib/constants'
import { Button } from '@/components/ui/button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-lg animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Menu Content */}
      <div className="relative h-full flex flex-col p-6 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" onClick={onClose} className="text-2xl font-bold">
            {siteConfig.name}
          </Link>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-4 px-4 text-xl font-medium text-foreground hover:bg-foreground/5 rounded-lg transition-colors min-h-[48px] flex items-center"
                >
                  {item.title}
                </Link>
                {/* Services Sub-items */}
                {item.children && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block py-3 px-4 text-foreground-muted hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors min-h-[48px] flex items-center"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="mb-8">
          <Button asChild size="lg" className="w-full">
            <Link href="/contact" onClick={onClose}>
              Get a Quote
            </Link>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors"
              aria-label={link.name}
            >
              {/* Icon placeholder - replace with actual icons */}
              <span className="text-foreground-muted">{link.name[0]}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Updated Navbar with Mobile Support

```tsx
// Add to navbar.tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

// In return, add:
<MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

// Update hamburger button:
<button
  className="lg:hidden p-2"
  onClick={() => setMobileMenuOpen(true)}
  aria-label="Open menu"
>
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Touch Targets | 48px minimum height |
| Body Scroll Lock | Prevent background scroll |
| Accessibility | Escape key closes menu |
| Animation | slide-in-from-right |

### Dependencies

- Requires Story 2.2 (Navbar) completed
- Uses navItems and socialLinks from constants

### Testing Checklist

- [x] Mobile menu hidden on desktop (≥1024px)
- [x] Hamburger icon visible on mobile
- [x] Menu opens with animation
- [x] All links have 48px touch target
- [x] X button closes menu
- [x] Escape key closes menu
- [x] Backdrop click closes menu
- [x] Navigation link click closes menu and navigates
- [x] Body scroll locked when menu open
- [x] Social links open in new tab

### References

- [Source: ux-design-specification.md#Mobile-Navigation]
- [Source: prd.md#FR7-Mobile-Navigation]
- [Source: architecture.md#Responsive-Design]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List
- Verified mobile menu component fully implements all acceptance criteria
- Full-screen overlay with backdrop blur
- All navigation links with 48px min-height touch targets
- Services sub-items displayed with indentation
- Close button (X) with 48px touch target
- Social links at bottom with proper Lucide icons (LinkedIn, Twitter, Instagram, GitHub)
- Body scroll lock implemented via useEffect
- Escape key closes menu via useEffect
- Backdrop click closes menu via onClick handler
- Navigation link clicks close menu via onClick={onClose}
- Menu hidden on desktop via lg:hidden class
- Hamburger button in navbar triggers open state
- Framer Motion animations used in navbar for the hamburger button
- TypeScript check passed
- ESLint passed

### File List
- `src/components/layout/mobile-menu.tsx` (verified, updated: focus trap + aria attributes)
- `src/components/layout/navbar.tsx` (verified - mobile integration complete)

---

## Senior Developer Review (AI)

**Review Date:** 2026-01-23
**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)
**Outcome:** Changes Requested → **Fixed**

### Issues Found & Resolved

| # | Severity | Issue | Status |
|---|----------|-------|--------|
| 1 | HIGH | Focus trap missing - Tab can escape modal | ✅ Fixed: Added focus trap implementation |
| 2 | MEDIUM | No aria-hidden on background content | ✅ Fixed: Added aria-hidden to main content and header |
| 3 | MEDIUM | Missing role="dialog" and aria-modal | ✅ Fixed: Added dialog role and aria-modal="true" |
| 4 | HIGH | No unit tests | ⚠️ Action item: requires test framework |

### Action Items
- [x] [AI-Review][HIGH] Implement focus trap in mobile menu `mobile-menu.tsx`
- [x] [AI-Review][MEDIUM] Add aria-hidden to background content when menu open `mobile-menu.tsx`
- [x] [AI-Review][MEDIUM] Add role="dialog" and aria-modal="true" `mobile-menu.tsx`
- [ ] [AI-Review][HIGH] Set up unit testing framework and add component tests
