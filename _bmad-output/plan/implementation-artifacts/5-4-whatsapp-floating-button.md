# Story 5.4: WhatsApp Floating Button

Status: ready-for-dev

## Story

As a **visitor**,
I want **a quick way to contact via WhatsApp**,
So that **I can get immediate human connection**.

## Acceptance Criteria

### AC1: Button Visibility
**Given** I am on any page
**When** I view the bottom-right corner
**Then** I see a floating WhatsApp button with:
- WhatsApp icon
- Subtle pulse animation
- Proper z-index above other content
- Not overlapping with page content

### AC2: WhatsApp Action
**Given** I click the WhatsApp button
**When** the action triggers
**Then**:
- WhatsApp opens (app or web)
- Pre-filled message: "Hi! I'm interested in learning more about your services."
- Phone number is pre-configured

### AC3: Mobile Optimization
**Given** I am on mobile
**When** I view the button
**Then** it has:
- Larger touch target (48px minimum)
- Positioned in thumb-friendly zone
- Proper spacing from screen edge

## Tasks / Subtasks

- [ ] Task 1: Create WhatsApp Button Component (AC: 1, 2, 3)
  - [ ] Create `src/components/ui/whatsapp-button.tsx`
  - [ ] WhatsApp icon
  - [ ] Pulse animation
  - [ ] Click handler with pre-filled message

- [ ] Task 2: Add to Root Layout (AC: 1)
  - [ ] Import and render in layout.tsx
  - [ ] Proper z-index

## Dev Notes

### WhatsApp Button Component

```tsx
// src/components/ui/whatsapp-button.tsx
'use client'

import { siteConfig } from '@/lib/constants'

export function WhatsAppButton() {
  const message = encodeURIComponent("Hi! I'm interested in learning more about your services.")
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

      {/* WhatsApp Icon */}
      <svg
        className="w-7 h-7 text-white relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}
```

### Add to Layout

```tsx
// src/app/layout.tsx (add import and component)
import { WhatsAppButton } from '@/components/ui/whatsapp-button'

// In the body, before closing:
<WhatsAppButton />
```

### Pulse Animation (add to globals.css if needed)

```css
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Position | Fixed bottom-right |
| Z-index | 50 (above content, below modals) |
| Touch Target | 56px (48px min requirement) |
| Animation | Pulse with ping keyframes |

### Testing Checklist

- [ ] Button visible on all pages
- [ ] Pulse animation works
- [ ] Click opens WhatsApp with pre-filled message
- [ ] Phone number is correct
- [ ] Works on mobile (opens app)
- [ ] Touch target is large enough

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
