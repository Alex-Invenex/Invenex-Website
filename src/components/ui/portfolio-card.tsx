import Link from 'next/link'
import Image from 'next/image'
import type { SimpleProject } from '@/lib/projects'

interface PortfolioCardProps {
  project: SimpleProject
  index: number
  /** First cards above the fold load eagerly (LCP). */
  priority?: boolean
}

/**
 * Editorial portfolio card — clean full-bleed screenshot, no chrome, no overlay.
 * Title + mono meta sit quietly below the media; coral rule sweeps on hover.
 * Hover/desaturation handled by .pf-card-* classes in globals.css (pointer:fine only).
 */
export function PortfolioCard({ project, index, priority }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block"
      data-testid="bento-project-card"
      data-size="uniform"
    >
      <div className="pf-card-media" data-testid="bento-card-image">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category} project by Invenex Solutions`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
          className="pf-card-img"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-5">
        <h3
          data-testid="bento-card-title"
          className="pf-card-rule text-xl md:text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-coral-400"
        >
          {project.title}
        </h3>
        <div className="flex shrink-0 items-baseline gap-4">
          <span aria-hidden="true" className="hidden sm:inline text-sm text-coral-400/0 transition-colors duration-300 group-hover:text-coral-400 whitespace-nowrap">
            View case study →
          </span>
          <span
            data-testid="bento-card-category"
            className="font-mono text-xs tracking-[0.18em] uppercase text-foreground-subtle"
          >
            {project.category}
          </span>
          <span className="font-mono text-xs text-coral-500/60" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </Link>
  )
}
