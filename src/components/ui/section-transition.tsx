'use client'

import { cn } from '@/lib/utils'

interface SectionTransitionProps {
  children: React.ReactNode
  /** Add gradient fade from previous section at top */
  topGradient?: boolean
  /** Add gradient fade to next section at bottom */
  bottomGradient?: boolean
  /** Background color for this section (CSS variable or color value) */
  backgroundColor?: string
  /** Height of gradient overlay (px) */
  gradientHeight?: number
  className?: string
}

/**
 * SectionTransition - Wrapper that adds gradient overlaps between sections
 *
 * Creates smooth color transitions at section boundaries by overlaying
 * semi-transparent gradients that blend between adjacent backgrounds.
 *
 * Features:
 * - Configurable top and/or bottom gradients
 * - Adjustable gradient height (100-200px recommended)
 * - Pointer-events: none for click-through
 * - Works with any background color
 */
export function SectionTransition({
  children,
  topGradient = false,
  bottomGradient = false,
  backgroundColor = 'var(--color-background)',
  gradientHeight = 150,
  className,
}: SectionTransitionProps) {
  return (
    <div
      className={cn('relative', className)}
      data-testid="section-transition"
      data-has-top-gradient={topGradient}
      data-has-bottom-gradient={bottomGradient}
    >
      {/* Top gradient overlay - fades FROM transparent TO this section's color */}
      {topGradient && (
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none z-10"
          style={{
            height: gradientHeight,
            background: `linear-gradient(to bottom, transparent 0%, ${backgroundColor} 100%)`,
          }}
          aria-hidden="true"
          data-testid="section-transition-top"
        />
      )}

      {/* Main content */}
      {children}

      {/* Bottom gradient overlay - fades FROM this section's color TO transparent */}
      {bottomGradient && (
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{
            height: gradientHeight,
            background: `linear-gradient(to top, transparent 0%, ${backgroundColor} 100%)`,
          }}
          aria-hidden="true"
          data-testid="section-transition-bottom"
        />
      )}
    </div>
  )
}

/**
 * GradientOverlay - Standalone gradient for custom positioning
 *
 * Can be used independently for more complex layouts
 */
interface GradientOverlayProps {
  direction: 'top' | 'bottom' | 'left' | 'right'
  color?: string
  height?: number
  width?: number
  className?: string
}

export function GradientOverlay({
  direction,
  color = 'var(--color-background)',
  height = 150,
  width,
  className,
}: GradientOverlayProps) {
  const isVertical = direction === 'top' || direction === 'bottom'

  const gradientDirection = {
    top: 'to bottom',
    bottom: 'to top',
    left: 'to right',
    right: 'to left',
  }[direction]

  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        [direction]: 0,
        left: isVertical ? 0 : undefined,
        right: isVertical ? 0 : undefined,
        top: !isVertical ? 0 : undefined,
        bottom: !isVertical ? 0 : undefined,
        height: isVertical ? height : '100%',
        width: isVertical ? '100%' : (width ?? height),
        background: `linear-gradient(${gradientDirection}, transparent 0%, ${color} 100%)`,
      }}
      aria-hidden="true"
      data-testid={`gradient-overlay-${direction}`}
    />
  )
}
