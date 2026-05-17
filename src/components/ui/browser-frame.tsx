'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { shouldSkipAnimations } from '@/lib/gsap'

interface BrowserFrameProps {
  /** Project live URL — displayed in the chrome URL bar (protocol + trailing slash stripped). */
  url?: string
  /** The media to frame — caller owns the <Image> so it controls priority/sizes/alt/object-fit. */
  children: React.ReactNode
  /** `card` = compact chrome for grid/related; `showcase` = taller chrome for hero/gallery. */
  variant?: 'card' | 'showcase'
  /** Apply the products-preview 3D tilt on hover. Auto-disabled on touch/reduced-motion. */
  tiltable?: boolean
  /** CSS aspect-ratio for the viewport. Inline (NOT aspect-[..]) — Tailwind v4 arbitrary-value pitfall. */
  aspectRatio?: string
  className?: string
}

/** Strip protocol + trailing slash for a clean address-bar label. */
function formatUrl(url?: string): string {
  if (!url) return ''
  return url.replace(/^https?:\/\//i, '').replace(/\/+$/, '')
}

/**
 * Reusable macOS-style browser chrome wrapping a website screenshot.
 * Signals "we built this real site" and gives every portfolio surface a
 * consistent, premium frame. Used by the listing grid, homepage preview,
 * case-study hero/gallery, and related cards.
 */
export function BrowserFrame({
  url,
  children,
  variant = 'card',
  tiltable = false,
  aspectRatio = '16 / 10',
  className,
}: BrowserFrameProps) {
  const [tiltHovered, setTiltHovered] = useState(false)
  const [canTilt, setCanTilt] = useState(false)

  // shouldSkipAnimations() touches window — resolve client-side after mount
  // to avoid hydration mismatch (same pattern as the `mounted` gates elsewhere).
  useEffect(() => {
    if (tiltable && !shouldSkipAnimations()) setCanTilt(true)
  }, [tiltable])

  const isShowcase = variant === 'showcase'
  const display = formatUrl(url)

  const dotSize = isShowcase ? 'w-3 h-3' : 'w-2.5 h-2.5'

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-surface-border bg-background-secondary',
        'rounded-xl transition-[transform,border-color,box-shadow] duration-500 ease-out',
        'hover:border-coral-500/40 hover:shadow-[0_0_45px_rgba(255,106,55,0.14)]',
        'will-change-transform',
        className
      )}
      style={
        canTilt
          ? {
              transform: tiltHovered
                ? 'perspective(1200px) rotateY(0deg) rotateX(0deg)'
                : 'perspective(1200px) rotateY(-4deg) rotateX(2deg)',
            }
          : undefined
      }
      onMouseEnter={canTilt ? () => setTiltHovered(true) : undefined}
      onMouseLeave={canTilt ? () => setTiltHovered(false) : undefined}
    >
      {/* Chrome bar (decorative — the real link/alt live on the card/Image) */}
      <div
        aria-hidden="true"
        className={cn(
          'flex items-center gap-2 border-b border-surface-border bg-surface-overlay',
          isShowcase ? 'h-10 px-4' : 'h-7 px-3 sm:h-8'
        )}
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <span className={cn('rounded-full', dotSize)} style={{ background: '#FF5F57' }} />
          <span className={cn('rounded-full', dotSize)} style={{ background: '#FEBC2E' }} />
          <span className={cn('rounded-full', dotSize)} style={{ background: '#28C840' }} />
        </div>

        {display && (
          <div className="flex min-w-0 flex-1 justify-center px-2">
            <span className="max-w-full truncate rounded-full bg-background-tertiary px-3 py-0.5 font-mono text-xs text-foreground-subtle">
              {display}
            </span>
          </div>
        )}

        {/* Balances the traffic lights so the URL pill stays optically centered */}
        {display && <div className="hidden w-12 shrink-0 sm:block" aria-hidden="true" />}
      </div>

      {/* Viewport — inline aspectRatio (Tailwind v4 arbitrary-value pitfall, see MEMORY.md) */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
        {children}
      </div>
    </div>
  )
}
