# Story 2.3: Mobile Navigation

Status: complete

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

- [ ] Task 1: Create Mobile Menu Component (AC: 1, 2)
  - [ ] Create `src/components/layout/mobile-menu.tsx`
  - [ ] Create full-screen overlay
  - [ ] Add navigation links with 48px touch targets
  - [ ] Add close button (X)
  - [ ] Add social links at bottom

- [ ] Task 2: Integrate with Navbar (AC: 1)
  - [ ] Add mobile menu state to navbar
  - [ ] Show hamburger button on mobile only
  - [ ] Trigger mobile menu open/close

- [ ] Task 3: Implement Close Behavior (AC: 3)
  - [ ] Close on navigation link click
  - [ ] Close on Escape key
  - [ ] Close on backdrop click
  - [ ] Add body scroll lock when open

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

- [ ] Mobile menu hidden on desktop (≥1024px)
- [ ] Hamburger icon visible on mobile
- [ ] Menu opens with animation
- [ ] All links have 48px touch target
- [ ] X button closes menu
- [ ] Escape key closes menu
- [ ] Backdrop click closes menu
- [ ] Navigation link click closes menu and navigates
- [ ] Body scroll locked when menu open
- [ ] Social links open in new tab

### References

- [Source: ux-design-specification.md#Mobile-Navigation]
- [Source: prd.md#FR7-Mobile-Navigation]
- [Source: architecture.md#Responsive-Design]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
