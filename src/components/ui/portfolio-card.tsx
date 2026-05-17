import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrowserFrame } from '@/components/ui/browser-frame'
import type { SimpleProject } from '@/lib/projects'

export type PortfolioCardSize = 'featured' | 'small'

interface PortfolioCardProps {
  project: SimpleProject
  size: PortfolioCardSize
  index: number
  /** First few cards above the fold load eagerly (LCP). */
  priority?: boolean
}

/**
 * Uniform browser-framed portfolio card. Every project gets the same
 * 16:10 framed screenshot; featured projects span 2 columns. Metadata
 * sits BELOW the frame (no dark overlay burying the work).
 */
export function PortfolioCard({ project, size, index, priority }: PortfolioCardProps) {
  const isFeatured = size === 'featured'

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative block"
      data-testid="bento-project-card"
      data-size={size}
    >
      {isFeatured && (
        <span
          data-testid="bento-card-featured-badge"
          className="absolute -top-2 right-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-coral-500/30 bg-coral-500/15 px-3 py-1 text-xs font-medium text-coral-400 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-coral-500" aria-hidden="true" />
          Featured
        </span>
      )}

      <BrowserFrame url={project.url} variant="card">
        <div data-testid="bento-card-image" className="absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.category} project by Invenex Solutions`}
            fill
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            sizes={
              isFeatured
                ? '(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
            }
          />
        </div>

        {/* Hover reveal */}
        <div
          data-testid="bento-card-overlay"
          className="absolute inset-0 flex items-center justify-center bg-background/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-coral-500/40 bg-coral-500/20 px-5 py-2.5 text-sm font-medium text-white">
            View Case Study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </BrowserFrame>

      {/* Metadata — below the frame */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            data-testid="bento-card-title"
            className={cn(
              'font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-coral-400',
              isFeatured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
            )}
          >
            {project.title}
          </h3>
          <p
            data-testid="bento-card-client"
            className="mt-1 truncate text-sm text-foreground-muted"
          >
            {project.client}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <span
            data-testid="bento-card-category"
            className="inline-block rounded-full border border-surface-border bg-surface-overlay px-3 py-1 text-xs font-medium text-foreground-muted"
          >
            {project.category}
          </span>
          <span
            className="font-mono text-xs tracking-wider text-coral-500/70"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </Link>
  )
}
