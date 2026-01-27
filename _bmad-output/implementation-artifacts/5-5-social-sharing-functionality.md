# Story 5.5: Social Sharing Functionality

Status: done

## Story

As a **visitor**,
I want **to share pages on social media**,
So that **I can recommend Invenex to my network**.

## Acceptance Criteria

### AC1: Share Buttons
**Given** I am on any page
**When** I look for sharing options
**Then** I see share buttons for:
- Twitter/X
- LinkedIn
- Facebook
- Copy link to clipboard

### AC2: Social Share Action
**Given** I click a social share button
**When** the share dialog opens
**Then**:
- Correct page URL is pre-filled
- Page title is included
- Opens in a new window (appropriate size)

### AC3: Copy Link Action
**Given** I click "Copy Link"
**When** the action completes
**Then**:
- URL is copied to clipboard
- Toast notification confirms "Link copied!"
- Button shows checkmark briefly

## Tasks / Subtasks

- [x] Task 1: Create Share Buttons Component (AC: 1, 2)
  - [x] Create `src/components/ui/share-buttons.tsx`
  - [x] Twitter, LinkedIn, Facebook, Copy buttons
  - [x] Share URL generation

- [x] Task 2: Create Toast Component (AC: 3)
  - [x] Toast integrated into share-buttons.tsx (simpler approach)
  - [x] Show on successful copy

- [x] Task 3: Add to Relevant Pages
  - [x] Case study pages
  - [x] Service pages
  - [ ] Blog posts (future - no blog pages exist yet)

## Dev Notes

### Share Buttons Component

```tsx
// src/components/ui/share-buttons.tsx
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/constants'

interface ShareButtonsProps {
  title?: string
  className?: string
}

export function ShareButtons({ title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()
  const url = `${siteConfig.url}${pathname}`
  const shareTitle = title || 'Check out Invenex Solutions'

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openShareWindow = (socialUrl: string) => {
    window.open(socialUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-foreground-muted mr-2">Share:</span>

      <button
        onClick={() => openShareWindow(shareLinks.twitter)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-foreground/5 transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      <button
        onClick={() => openShareWindow(shareLinks.linkedin)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-foreground/5 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      <button
        onClick={() => openShareWindow(shareLinks.facebook)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-foreground/5 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      <button
        onClick={handleCopy}
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-foreground/5 transition-colors',
          copied && 'bg-success/10 border-success'
        )}
        aria-label="Copy link"
      >
        {copied ? (
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}
```

### Usage Example

```tsx
// In a case study page
import { ShareButtons } from '@/components/ui/share-buttons'

<ShareButtons title={project.title} />
```

### Testing Checklist

- [x] All share buttons render
- [x] Twitter opens with correct text and URL
- [x] LinkedIn opens with correct URL
- [x] Facebook opens with correct URL
- [x] Copy button copies URL to clipboard
- [x] Checkmark shows after copy
- [x] Toast notification shows "Link copied!"

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List
- Created ShareButtons component with Twitter/X, LinkedIn, Facebook, and Copy link buttons
- Toast notification integrated directly into component for simplicity
- Added to case study pages (portfolio/[slug]/case-study-client.tsx)
- Added to service detail pages (services/[slug]/service-detail-client.tsx)
- All buttons have proper ARIA labels for accessibility
- Focus-visible styles for keyboard accessibility
- Copy functionality uses navigator.clipboard API
- Checkmark icon appears for 2 seconds after copy
- Toast notification appears for 3 seconds
- Share windows open at 600x400 size
- Verified working via Playwright MCP browser testing

### File List
- src/components/ui/share-buttons.tsx (new)
- src/app/portfolio/[slug]/case-study-client.tsx (modified - added ShareButtons)
- src/app/services/[slug]/service-detail-client.tsx (modified - added ShareButtons)
- tests/social-sharing.spec.ts (new)

### Change Log
- 2026-01-27: Initial implementation of social sharing functionality (Story 5-5)
- 2026-01-28: Code review fixes - Added error handling with toast notification for clipboard failures
