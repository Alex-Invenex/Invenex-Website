'use client'

import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { BentoPortfolioGrid } from '@/components/sections/bento-portfolio-grid'
import type { SimpleProject } from '@/lib/projects'

interface PortfolioClientProps {
  projects: SimpleProject[]
}

export function PortfolioClient({ projects }: PortfolioClientProps) {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        id="portfolio-hero-title"
        testId="portfolio-hero"
        compact
        tag="// Selected Work"
        headline={
          <>
            <HeadlineWord thin className="pf-title-word-thin">OUR</HeadlineWord>
            <HeadlineWord coral className="pf-title-word-bold">WORK.</HeadlineWord>
          </>
        }
        subtitle="Explore our portfolio of web, mobile, and platform development projects."
      />

      {/* Atmospheric wrapper around grid */}
      <div className="relative">
        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[10%] right-[5%] rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,106,55,0.03) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[20%] left-[10%] rounded-full" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.02) 0%, transparent 70%)' }} />
          {/* Grain */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              opacity: 0.03,
            }}
          />
        </div>

        <BentoPortfolioGrid projects={projects} />
      </div>
    </>
  )
}
