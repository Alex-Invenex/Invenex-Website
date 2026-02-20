# Story 2.2: Navbar with Mega-Menu

Status: complete

## Story

As a **visitor**,
I want **a professional navigation bar with a mega-menu for services**,
So that **I can easily navigate to any section of the site**.

## Acceptance Criteria

### AC1: Desktop Navbar Layout
**Given** I am on any page
**When** I view the header
**Then** I see:
- Logo on the left (links to homepage)
- Navigation links: Services, Portfolio, Products, Careers, Contact
- "Get a Quote" CTA button on the right
- Transparent background on hero sections
- Blur backdrop when scrolled (after 100px)

### AC2: Services Mega-Menu
**Given** I hover over "Services" in the navigation
**When** the mega-menu appears
**Then** it displays:
- All 6 service categories with icons
- Brief description for each service
- Links to individual service pages
- Smooth fade-in animation

### AC3: Scroll Behavior
**Given** I scroll down the page
**When** the header becomes sticky
**Then** it:
- Has blur backdrop effect
- Shows/hides based on scroll direction (show on scroll up)
- Maintains all functionality

## Tasks / Subtasks

- [ ] Task 1: Create Navbar Component (AC: 1)
  - [ ] Create `src/components/layout/navbar.tsx`
  - [ ] Add logo with Link to homepage
  - [ ] Add navigation links from constants
  - [ ] Add "Get a Quote" CTA button
  - [ ] Style for desktop (hidden on mobile)

- [ ] Task 2: Implement Mega-Menu (AC: 2)
  - [ ] Create mega-menu dropdown for Services
  - [ ] Display 6 service items with icons
  - [ ] Add fade-in animation
  - [ ] Handle hover state

- [ ] Task 3: Add Scroll Behavior (AC: 3)
  - [ ] Track scroll position with useState
  - [ ] Add blur backdrop after 100px scroll
  - [ ] Implement show/hide on scroll direction
  - [ ] Use CSS transitions for smooth effect

- [ ] Task 4: Add to Root Layout
  - [ ] Import and render Navbar in layout.tsx

## Dev Notes

### Navbar Implementation

```tsx
// src/components/layout/navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { navItems, siteConfig } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      // Add backdrop after 100px
      setScrolled(currentScrollY > 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled && 'bg-background/80 backdrop-blur-lg border-b border-border',
        !visible && '-translate-y-full'
      )}
    >
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-foreground">
          {siteConfig.name}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => item.children && setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href={item.href}
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>

              {/* Mega Menu for Services */}
              {item.children && servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="bg-background-secondary border border-border rounded-lg p-6 shadow-xl min-w-[600px] grid grid-cols-2 gap-4 animate-in fade-in duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-background-tertiary transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                          {/* Icon placeholder */}
                          <span className="text-foreground">●</span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{child.title}</div>
                          <div className="text-sm text-foreground-muted">{child.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu Button - handled in Story 2.3 */}
        <button className="lg:hidden p-2" aria-label="Open menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Client Component | Required for scroll tracking |
| Scroll Behavior | Show on scroll up, hide on scroll down |
| Mega Menu | Grid layout with icons |
| Animation | fade-in with Tailwind animate-in |

### Dependencies

- Requires Epic 1 completed
- Uses navItems from constants
- Uses Button component

### Testing Checklist

- [ ] Logo links to homepage
- [ ] All nav links work correctly
- [ ] Services mega-menu appears on hover
- [ ] Mega-menu shows all 6 services
- [ ] Backdrop blur activates after 100px scroll
- [ ] Navbar hides on scroll down
- [ ] Navbar shows on scroll up
- [ ] CTA button links to /contact

### References

- [Source: ux-design-specification.md#Navigation-System]
- [Source: prd.md#FR6-Navigation]
- [Source: architecture.md#Client-Components]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
