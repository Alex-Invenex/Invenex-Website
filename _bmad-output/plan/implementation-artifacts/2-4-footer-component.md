# Story 2.4: Footer Component

Status: complete

## Story

As a **visitor**,
I want **a comprehensive footer with navigation and contact info**,
So that **I can find additional information and links**.

## Acceptance Criteria

### AC1: Footer Content
**Given** I scroll to the bottom of any page
**When** I view the footer
**Then** I see:
- Company logo and brief description
- Navigation links grouped by category (Services, Company, Resources)
- Contact information (email, phone, address)
- Social media links (LinkedIn, Twitter, Instagram, GitHub)
- Copyright notice with current year
- "Back to top" functionality

### AC2: Footer Links
**Given** the footer renders
**When** I interact with links
**Then** all links are:
- Properly styled with hover effects
- Accessible via keyboard
- External links open in new tab with proper rel attributes

## Tasks / Subtasks

- [ ] Task 1: Create Footer Component (AC: 1)
  - [ ] Create `src/components/layout/footer.tsx`
  - [ ] Add logo and company description
  - [ ] Create link columns for Services, Company, Resources
  - [ ] Add contact information section

- [ ] Task 2: Add Social Links (AC: 1, 2)
  - [ ] Add social media icons
  - [ ] Ensure external links have target="_blank" and rel="noopener noreferrer"

- [ ] Task 3: Add Back to Top (AC: 1)
  - [ ] Create scroll-to-top button
  - [ ] Show only after scrolling down

- [ ] Task 4: Add Copyright (AC: 1)
  - [ ] Display current year dynamically

- [ ] Task 5: Add to Root Layout
  - [ ] Import and render Footer in layout.tsx

## Dev Notes

### Footer Implementation

```tsx
// src/components/layout/footer.tsx
import Link from 'next/link'
import { siteConfig, footerLinks, socialLinks } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-foreground">
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-foreground-muted max-w-sm">
              {siteConfig.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-foreground hover:bg-foreground/5 transition-colors"
                  aria-label={link.name}
                >
                  {/* Icon placeholder */}
                  <span className="text-sm text-foreground-muted">{link.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-foreground-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="hover:text-foreground transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                {siteConfig.address.city}, {siteConfig.address.state}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  )
}

// Back to Top Button
function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className="text-sm text-foreground-muted hover:text-foreground transition-colors flex items-center gap-2"
    >
      Back to top
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Layout | 5-column grid on desktop |
| External Links | target="_blank" rel="noopener noreferrer" |
| Accessibility | Semantic HTML, keyboard navigable |
| Dynamic Content | Current year calculated at render |

### Dependencies

- Uses siteConfig, footerLinks, socialLinks from constants

### Testing Checklist

- [ ] Logo links to homepage
- [ ] All internal links navigate correctly
- [ ] External social links open in new tab
- [ ] Email link opens mail client
- [ ] Phone link initiates call on mobile
- [ ] Back to top scrolls smoothly
- [ ] Copyright shows current year
- [ ] Responsive on all screen sizes

### References

- [Source: ux-design-specification.md#Footer-Design]
- [Source: prd.md#Navigation-Requirements]
- [Source: architecture.md#Layout-Components]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
