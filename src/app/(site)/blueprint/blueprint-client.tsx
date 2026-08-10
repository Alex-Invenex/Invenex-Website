'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { Price } from '@/components/pricing/price'
import { cn } from '@/lib/utils'
import { BLUEPRINT } from '@/lib/pricing'
import { razorpayBlueprintUrl } from '@/lib/site-config'

/* ─── Layout primitives — mirrors /pricing's rhythm, kept minimal since this
   is a single-purpose page. ────────────────────────────────────────────── */

function Section({
  tone = 'base',
  children,
  labelledBy,
}: {
  tone?: 'base' | 'raised'
  children: ReactNode
  labelledBy?: string
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(
        'relative py-16 md:py-24',
        tone === 'raised' ? 'bg-background-secondary' : 'bg-background'
      )}
      style={{ overflow: 'clip' }}
    >
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-2xl">{children}</div>
      </div>
    </section>
  )
}

/**
 * Verbatim from `02-COPY-DECK.md` §2 "What you get — list". Deliberately NOT
 * `BLUEPRINT.deliverables` (that's a paraphrase for internal/other-page use)
 * -- this page's copy must match the deck byte-for-byte.
 */
const WHAT_YOU_GET = [
  '90-minute working session with two founders. A working session, not a sales call.',
  'Written technical architecture — stack, integrations, data model, hosting',
  'Competitor teardown: three named competitors, what they do better, where the gap is',
  'Your scope broken into phases, with a fixed price against each',
  'A 12-month roadmap you can execute with anyone',
  'Delivered as a PDF with your logo on it',
]

/**
 * The three guarantees, keyed to their verbatim copy-deck lead-ins so the
 * lead-in itself can carry the interpolated price without re-typing the
 * surrounding sentence.
 */
const GUARANTEES: { lead: string; body: ReactNode }[] = [
  {
    lead: 'Credited in full.',
    body: (
      <>
        Build with us within 30 days and the <Price amount={BLUEPRINT.price} />{' '}
        comes straight off the price.
      </>
    ),
  },
  {
    lead: 'Refundable.',
    body: "If you don't think it was worth it, tell us and we'll refund it — and you keep the document.",
  },
  {
    lead: 'Yours to keep.',
    body: 'No lock-in, no strings, no obligation to work with us.',
  },
]

export function BlueprintClient() {
  const ctaHref = razorpayBlueprintUrl ?? '/contact?intent=blueprint'
  const isExternal = Boolean(razorpayBlueprintUrl)

  const cta = (
    <span className="inline-flex items-center gap-2">
      Start my Blueprint — <Price amount={BLUEPRINT.price} />
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </span>
  )

  return (
    <>
      <SubpageHero
        id="blueprint-hero-title"
        tag="// The Blueprint"
        headline={
          <>
            <HeadlineWord thin>Before we build you anything,</HeadlineWord>
            <HeadlineWord coral>
              we&rsquo;ll tell you exactly what to build.
            </HeadlineWord>
          </>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
          The InveneX Blueprint — <Price amount={BLUEPRINT.price} />, delivered
          in a week, and yours to keep whether you hire us or not.
        </p>
      </SubpageHero>

      {/* Body — verbatim, copy deck §2 */}
      <Section labelledBy="blueprint-body">
        <h2 id="blueprint-body" className="sr-only">
          Why the Blueprint exists
        </h2>
        <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground-muted md:text-lg">
          <p>
            A free quote is a guess. We don&rsquo;t know your systems, your
            margins, or what your competitors are doing — so any number we
            give you on a first call is theatre. Confident theatre, but
            theatre.
          </p>
          <p>
            So we replaced it. You get a 90-minute working session with two
            of our founders, then a written document: the technical
            architecture, a teardown of three named competitors, your scope
            broken into phases, and a fixed price against each phase.
          </p>
          <p>
            It&rsquo;s yours. You can build it with us, with someone else, or
            on your own — and we&rsquo;d have no complaint.
          </p>
        </div>

        <h3 className="mt-14 text-xl font-light text-foreground md:text-2xl">
          What you get
        </h3>
        <ul className="mt-6 flex flex-col gap-4">
          {WHAT_YOU_GET.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-coral-500"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-foreground-muted md:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Guarantees — displayed prominently, nothing else competes here */}
      <Section tone="raised" labelledBy="blueprint-guarantees">
        <h2
          id="blueprint-guarantees"
          className="text-xl font-light text-foreground md:text-2xl"
        >
          The three guarantees
        </h2>
        <div className="mt-8 flex flex-col gap-5">
          {GUARANTEES.map((g) => (
            <div
              key={g.lead}
              className="glass rounded-2xl border border-white/10 p-6 md:p-7"
            >
              <p className="text-base leading-relaxed text-foreground md:text-lg">
                <span className="font-semibold text-foreground">
                  {g.lead}
                </span>{' '}
                <span className="text-foreground-muted">{g.body}</span>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Threshold notice + the one primary CTA */}
      <Section labelledBy="blueprint-cta">
        <h2 id="blueprint-cta" className="sr-only">
          Start your Blueprint
        </h2>
        <p className="text-sm leading-relaxed text-foreground-muted md:text-base">
          The Blueprint is for projects above{' '}
          <Price amount={BLUEPRINT.threshold} className="text-foreground" />.
          If you&rsquo;re looking for something smaller, you don&rsquo;t need
          it — the prices are published and you can just book.
        </p>

        <div className="mt-8">
          {isExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-7 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] transition-all duration-normal hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
            >
              {cta}
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-7 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] transition-all duration-normal hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
            >
              {cta}
            </Link>
          )}
        </div>

        <p className="mt-10 text-sm text-foreground-muted">
          Already know the scope?{' '}
          <Link
            href="/pricing"
            className="text-foreground underline decoration-white/20 underline-offset-4 transition-colors duration-normal hover:decoration-coral-500"
          >
            See the published prices
          </Link>
          .
        </p>
      </Section>
    </>
  )
}
