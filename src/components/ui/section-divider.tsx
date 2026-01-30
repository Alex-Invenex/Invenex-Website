import { cn } from '@/lib/utils'

type DividerVariant = 'wave' | 'diagonal' | 'curve' | 'arrow'

interface SectionDividerProps {
  variant?: DividerVariant
  topColor?: string
  bottomColor?: string
  flip?: boolean
  className?: string
  height?: 'sm' | 'md' | 'lg'
}

const heightClasses = {
  sm: 'h-16 md:h-20',
  md: 'h-20 md:h-28',
  lg: 'h-24 md:h-36',
}

/**
 * SectionDivider - SVG-based dividers for seamless section transitions
 *
 * Variants:
 * - wave: Smooth wave pattern
 * - diagonal: Angled line divider
 * - curve: Single curved arc
 * - arrow: Chevron/arrow pointing down
 *
 * @param topColor - CSS color for the top section (default: background)
 * @param bottomColor - CSS color for the bottom section (default: background-secondary)
 * @param flip - Rotate 180deg for inverted transitions
 */
export function SectionDivider({
  variant = 'wave',
  topColor = 'var(--color-background)',
  bottomColor = 'var(--color-background-secondary)',
  flip = false,
  className,
  height = 'md',
}: SectionDividerProps) {
  const renderDivider = () => {
    switch (variant) {
      case 'wave':
        return (
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Top color fills the top half */}
            <rect x="0" y="0" width="1440" height="60" fill={topColor} />
            {/* Wave path with bottom color */}
            <path
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
              fill={bottomColor}
            />
          </svg>
        )

      case 'diagonal':
        return (
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Top color background */}
            <rect x="0" y="0" width="1440" height="120" fill={topColor} />
            {/* Diagonal slice with bottom color */}
            <path
              d="M0,40 L1440,0 L1440,120 L0,120 Z"
              fill={bottomColor}
            />
          </svg>
        )

      case 'curve':
        return (
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Top color background */}
            <rect x="0" y="0" width="1440" height="60" fill={topColor} />
            {/* Curved arc with bottom color */}
            <path
              d="M0,60 Q720,120 1440,60 L1440,120 L0,120 Z"
              fill={bottomColor}
            />
          </svg>
        )

      case 'arrow':
        return (
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Top color background */}
            <rect x="0" y="0" width="1440" height="40" fill={topColor} />
            {/* Arrow/chevron pointing down */}
            <path
              d="M0,40 L720,120 L1440,40 L1440,120 L0,120 Z"
              fill={bottomColor}
            />
          </svg>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        'relative w-full',
        heightClasses[height],
        flip && 'rotate-180',
        className
      )}
      aria-hidden="true"
      data-testid="section-divider"
      data-divider-variant={variant}
    >
      {renderDivider()}
    </div>
  )
}

/**
 * Pre-configured divider combinations for common transitions
 */
export function WaveDivider({
  topColor = 'var(--color-background)',
  bottomColor = 'var(--color-background-secondary)',
  flip = false,
  className,
}: Omit<SectionDividerProps, 'variant'>) {
  return (
    <SectionDivider
      variant="wave"
      topColor={topColor}
      bottomColor={bottomColor}
      flip={flip}
      className={className}
    />
  )
}

export function DiagonalDivider({
  topColor = 'var(--color-background)',
  bottomColor = 'var(--color-background-secondary)',
  flip = false,
  className,
}: Omit<SectionDividerProps, 'variant'>) {
  return (
    <SectionDivider
      variant="diagonal"
      topColor={topColor}
      bottomColor={bottomColor}
      flip={flip}
      className={className}
    />
  )
}

export function CurvedDivider({
  topColor = 'var(--color-background)',
  bottomColor = 'var(--color-background-secondary)',
  flip = false,
  className,
}: Omit<SectionDividerProps, 'variant'>) {
  return (
    <SectionDivider
      variant="curve"
      topColor={topColor}
      bottomColor={bottomColor}
      flip={flip}
      className={className}
    />
  )
}

export function ArrowDivider({
  topColor = 'var(--color-background)',
  bottomColor = 'var(--color-background-secondary)',
  flip = false,
  className,
}: Omit<SectionDividerProps, 'variant'>) {
  return (
    <SectionDivider
      variant="arrow"
      topColor={topColor}
      bottomColor={bottomColor}
      flip={flip}
      className={className}
    />
  )
}
