'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { CurrencyToggle } from '@/components/pricing/currency-toggle'
import { TierLadder } from '@/components/pricing/tier-ladder'
import { CarePlanRow } from '@/components/pricing/care-plan-row'
import { CostOfDelayCalculator } from '@/components/pricing/cost-of-delay-calculator'
import { NotForYou } from '@/components/pricing/not-for-you'
import { RateCard } from '@/components/pricing/rate-card'
import {
  PricingSectionNav,
  type PricingSection,
} from '@/components/pricing/section-nav'
import { SlotCounter } from '@/components/pricing/slot-counter'
import { PricingFaq } from '@/components/pricing/pricing-faq'
import { Price } from '@/components/pricing/price'
import { useCurrency } from '@/components/providers/currency-provider'
import { formatPrice } from '@/lib/format-price'
import { cn } from '@/lib/utils'
import {
  AD_SPEND_DISCLOSURE,
  APP_CARE,
  APP_TIERS,
  BLUEPRINT,
  CARE_PLANS_ANNUAL_PREPAY_NOTE,
  ECOM_TIERS,
  MIN_AD_SPEND,
  minAdSpendNote,
  MOMENTUM_INCLUDED_IN_GROWTH,
  MOMENTUM_INCLUDED_IN_PLATFORM,
  OUT_OF_SCOPE_RATE,
  RETAINERS,
  STRATEGY,
} from '@/lib/pricing'

/* ─── Layout primitives ────────────────────────────────── */

/**
 * Section shell — alternating backgrounds and the page's vertical rhythm.
 * `tone="raised"` is the `background-secondary` band, `tone="warm"` the
 * single coral band the page is allowed (the Blueprint).
 *
 * The padding is deliberately tighter than the site default: this page is
 * six price sheets long, and 32-unit gutters between dense tables is what
 * made it a 10,000px scroll with no landmarks in it.
 */
function Section({
  id,
  tone = 'base',
  orb = 'right',
  children,
  labelledBy,
  label,
  className,
}: {
  id?: string
  tone?: 'base' | 'raised' | 'warm'
  orb?: 'left' | 'right' | 'none'
  children: ReactNode
  /** Id of the heading that names this landmark. Prefer this over `label`. */
  labelledBy?: string
  /**
   * Literal accessible name, for bands whose heading is rendered by a shared
   * component that exposes no id to point `aria-labelledby` at.
   */
  label?: string
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={cn(
        'pr-anchor relative py-12 md:py-24',
        tone === 'raised' && 'bg-background-secondary',
        tone === 'base' && 'bg-background',
        tone === 'warm' && 'pr-band',
        className
      )}
      style={{ overflow: 'clip' }}
    >
      {orb !== 'none' && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className={cn(
              'absolute top-[8%] rounded-full',
              orb === 'right' ? 'right-[-8%]' : 'left-[-8%]'
            )}
            style={{
              width: 560,
              height: 560,
              background:
                'radial-gradient(circle, rgba(255,106,55,0.05) 0%, transparent 70%)',
            }}
          />
        </div>
      )}
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  )
}

/** Mono uppercase eyebrow + the thin/gradient two-line h2 the site uses. */
function SectionHeading({
  id,
  eyebrow,
  lead,
  accent,
  intro,
  className,
}: {
  id?: string
  eyebrow: string
  lead: string
  accent: string
  intro?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 leading-[0.95] tracking-[-0.03em]">
        <span className="block text-lg font-extralight text-foreground/50 md:text-2xl">
          {lead}
        </span>
        <span
          className="pr-display mt-1 block text-3xl font-black md:text-5xl"
          style={{
            background:
              'linear-gradient(135deg, var(--color-coral-500) 0%, var(--color-coral-400) 40%, var(--color-coral-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {accent}
        </span>
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-foreground-muted">
          {intro}
        </p>
      )}
    </div>
  )
}

/** A group inside the "everything else" sheet: heading, one line, cards. */
function RateGroup({
  id,
  title,
  intro,
  children,
  className,
}: {
  id?: string
  title: string
  intro: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mt-10 md:mt-12', className)}>
      <div className="flex flex-col gap-2 border-t border-white/10 pt-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:pt-8">
        <h3 id={id} className="pr-display text-xl font-medium text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-foreground-muted">
          {intro}
        </p>
      </div>
      <div className="mt-5 md:mt-6">{children}</div>
    </div>
  )
}

/**
 * The ad-spend disclosure, said before anyone signs: the fixed sentence from
 * `lib/pricing.ts` plus the minimum useful spend rendered in the visitor's own
 * currency. A rupee figure here would undo the point of the whole page for the
 * 60% of clients who are not paying in rupees.
 */
function AdSpendDisclosure({ className }: { className?: string }) {
  const { currency } = useCurrency()

  return (
    <p className={className}>
      {AD_SPEND_DISCLOSURE}{' '}
      {minAdSpendNote(formatPrice(MIN_AD_SPEND[currency], currency))}
    </p>
  )
}

/* ─── Data shaped for the cards ────────────────────────── */

const appBuilds = APP_TIERS.filter((tier) => tier.id !== APP_CARE.id)

const carePlanNotes = [
  MOMENTUM_INCLUDED_IN_GROWTH,
  MOMENTUM_INCLUDED_IN_PLATFORM,
  CARE_PLANS_ANNUAL_PREPAY_NOTE,
]

const SECTIONS: PricingSection[] = [
  { id: 'builds', label: 'Builds' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'care-plans', label: 'Care plans' },
  { id: 'apps-commerce', label: 'Apps & commerce' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'faq', label: 'FAQ' },
]

const CARD_GRID = 'grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'

/* ─── Page ─────────────────────────────────────────────── */

export function PricingClient() {
  return (
    <>
      <SubpageHero
        id="pricing-hero-title"
        tag="// Pricing"
        headline={
          <>
            <HeadlineWord thin>Our prices.</HeadlineWord>
            <HeadlineWord coral>All of them.</HeadlineWord>
          </>
        }
        subtitle="Most agencies hide their pricing so you have to call and find out. We’d rather you decided in eleven seconds than in a forty-minute meeting. These are the same prices every client sees."
      />

      {/* Sits outside every Section: a sticky element inside a box with
          `overflow: clip` would be cropped the moment it stuck. */}
      <PricingSectionNav sections={SECTIONS} />

      <BuildTiers />
      <CostOfDelay />
      <CarePlans />
      <OtherServices />
      <BlueprintBlock />
      <NotForYouSection />
      <FaqSection />
    </>
  )
}

/* ─── 1. Build tiers ───────────────────────────────────── */

function BuildTiers() {
  return (
    <Section id="builds" labelledBy="build-tiers-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="build-tiers-title"
          eyebrow="// Websites & platforms"
          lead="Five fixed tiers,"
          accent="cheapest to largest."
          intro="Every tier is a fixed price for a fixed scope. What moves between them is what gets built — not the number."
        />
        <CurrencyToggle className="shrink-0 flex-wrap" />
      </div>

      {/* Ladder order — launchpad → platformScale — on every viewport, with
          Growth the only badged card (04-STRATEGY-RULES §1). */}
      <TierLadder />

      <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2 md:gap-12">
        <p className="text-base leading-relaxed text-foreground-muted">
          Every price above is fixed. What moves is scope, not the number. If a
          tier is more than you need, take the one below it — we&rsquo;d rather
          build you the right smaller thing than the wrong bigger one.
        </p>

        <p className="text-sm leading-relaxed text-foreground-muted">
          <span className="font-mono uppercase tracking-[0.14em] text-foreground">
            Work outside the agreed scope:
          </span>{' '}
          <Price
            amount={OUT_OF_SCOPE_RATE.hourly}
            suffix=" an hour"
            className="text-foreground"
          />
          , minimum {OUT_OF_SCOPE_RATE.minimumHours} hours.{' '}
          {OUT_OF_SCOPE_RATE.note}
        </p>
      </div>
    </Section>
  )
}

/* ─── 2. Cost of delay ─────────────────────────────────── */

function CostOfDelay() {
  return (
    <Section
      id="calculator"
      tone="raised"
      orb="left"
      labelledBy="cost-of-delay-title"
    >
      <SectionHeading
        id="cost-of-delay-title"
        eyebrow="// Cost of delay"
        lead="Before you compare prices,"
        accent="price the waiting."
        intro="A site that converts below the benchmark costs money every month it stays up. Put your own numbers in."
      />
      <div className="mt-10">
        <CostOfDelayCalculator />
      </div>
    </Section>
  )
}

/* ─── 3. Care plans ────────────────────────────────────── */

function CarePlans() {
  return (
    <Section id="care-plans" labelledBy="care-plans-title">
      <SectionHeading
        id="care-plans-title"
        eyebrow="// After launch"
        lead="Monthly"
        accent="Care Plans."
        intro="A site is not finished on launch day. These are the three ways we keep one working, published at the same fixed prices."
      />

      {/* Carousel on a phone, three-up above md — the same behaviour as the
          build ladder, so the page only teaches one gesture. */}
      <CarePlanRow />

      <ul className="mt-12 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-10">
        {carePlanNotes.map((note) => (
          <li
            key={note}
            className="flex items-start gap-3 text-sm text-foreground-muted"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-coral-500"
              aria-hidden="true"
            />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ─── 4. Other services ────────────────────────────────── */

function OtherServices() {
  return (
    <Section
      id="apps-commerce"
      tone="raised"
      orb="left"
      labelledBy="other-services-title"
    >
      <SectionHeading
        id="other-services-title"
        eyebrow="// Everything else"
        lead="Apps, stores, strategy, retainers —"
        accent="all priced too."
        intro="The three service lines that used to be quoted case by case now have published prices, on the same terms as the build tiers."
      />

      {/* Mobile apps */}
      <RateGroup
        title="Mobile apps"
        intro="Priced by how the app is built, not by screen count. Cross-platform and native both include store submission."
      >
        <div className={CARD_GRID}>
          {appBuilds.map((tier) => (
            <RateCard
              key={tier.id}
              name={tier.name}
              eyebrow={tier.timeline}
              detail={
                tier.includesStoreSubmission
                  ? 'App Store + Play Store submission included'
                  : 'Installable on any device, no store submission'
              }
              price={tier.price}
            />
          ))}
        </div>

        {/* App Care — mandatory, and said plainly (copy deck §5). */}
        <div className="mt-6 rounded-2xl border border-coral-500/30 bg-coral-500/[0.05] p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="pr-badge rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-3 py-1 font-semibold uppercase text-white">
              Mandatory
            </span>
            <Price
              amount={APP_CARE.price}
              suffix="/mo"
              animate
              className="pr-display text-2xl font-light text-gradient-orange"
            />
          </div>

          <h4 className="pr-display mt-5 text-xl font-medium text-foreground">
            Why App Care isn&rsquo;t optional
          </h4>
          <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-8">
            <p className="text-sm leading-relaxed text-foreground-muted">
              An app isn&rsquo;t a purchase — it&rsquo;s a subscription with a
              large first payment. Apple and Google force SDK and OS-version
              changes roughly twice a year, whether you want them or not, and
              an app that stops being updated eventually stops being
              downloadable.
            </p>
            <p className="text-sm leading-relaxed text-foreground-muted">
              App Care isn&rsquo;t an upsell. It&rsquo;s the cost of your app
              continuing to exist. We&rsquo;d rather tell you that now than
              three months after launch.
            </p>
          </div>
        </div>
      </RateGroup>

      {/* E-commerce */}
      <RateGroup
        title="E-Commerce"
        intro="Priced by catalogue size, not page count. A 3,000-SKU store and a 15-page brochure site are not the same work."
      >
        <div className={CARD_GRID}>
          {ECOM_TIERS.map((tier) => (
            <RateCard
              key={tier.id}
              name={tier.name}
              eyebrow={tier.timeline}
              chips={tier.scope}
              price={tier.price}
            />
          ))}
        </div>
      </RateGroup>

      {/* Digital strategy */}
      <RateGroup
        title="Digital strategy"
        intro="Advice on its own, for when the build question is not the first question."
      >
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <RateCard
            name={STRATEGY.sprint.name}
            eyebrow={STRATEGY.sprint.timeline}
            detail="Research, competitor teardown, a costed roadmap you can execute with anyone."
            price={STRATEGY.sprint.price}
          />
          <RateCard
            name={STRATEGY.advisory.name}
            eyebrow={`Minimum ${STRATEGY.advisory.minimumMonths} months`}
            detail="A founder in your corner, monthly."
            price={STRATEGY.advisory.price}
            suffix="/mo"
          />
        </div>
      </RateGroup>

      {/* Social retainers */}
      <RateGroup
        title="Social retainers"
        intro="Monthly, cancellable, and separate from any build."
      >
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {RETAINERS.map((retainer) => (
            <RateCard
              key={retainer.id}
              name={retainer.name}
              eyebrow="Per month"
              chips={retainer.scope}
              price={retainer.price}
              suffix="/mo"
            />
          ))}
        </div>
        <AdSpendDisclosure className="mt-5 text-sm text-foreground-muted" />
      </RateGroup>
    </Section>
  )
}

/* ─── 5. Blueprint ─────────────────────────────────────── */

function BlueprintBlock() {
  return (
    // The one warm band on the page: everything else is dark, so this is
    // where the eye rests before the closing sections.
    <Section id="blueprint" tone="warm" orb="none" labelledBy="blueprint-title">
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-500">
            {'// The Blueprint'}
          </p>
          <h2
            id="blueprint-title"
            className="pr-display mt-4 text-3xl font-medium leading-tight text-foreground md:text-4xl"
          >
            Before we build you anything, we&rsquo;ll tell you exactly what to
            build.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted">
            A free quote is a guess. So we replaced it with a paid diagnostic:
            a 90-minute working session with two founders, then a written
            architecture, a teardown of three named competitors, and your scope
            broken into phases with a fixed price against each.
          </p>
        </div>

        <div className="glass rounded-3xl border border-coral-500/25 p-6 md:p-8">
          <Price
            amount={BLUEPRINT.price}
            animate
            className="pr-display block text-5xl font-light text-gradient-orange"
          />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {BLUEPRINT.timeline} · credited in full against any build started
            within 30 days · refundable, and the document is yours either way
          </p>

          <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-foreground-muted">
            The Blueprint is for projects above{' '}
            <Price amount={BLUEPRINT.threshold} className="text-foreground" />.
            If you&rsquo;re looking for something smaller, you don&rsquo;t need
            it — the prices are published and you can just book.
          </p>

          <Link
            href="/blueprint"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-7 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] transition-all duration-normal hover:shadow-[0_0_30px_rgba(255,106,55,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Read about the Blueprint
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  )
}

/* ─── 6. Not for you ───────────────────────────────────── */

function NotForYouSection() {
  return (
    // `NotForYou` owns its own heading and exposes no id to reference, so the
    // landmark is named literally rather than left anonymous.
    <Section tone="base" orb="none" label="We’re probably not for you if…">
      <div className="max-w-3xl">
        <NotForYou />
      </div>
    </Section>
  )
}

/* ─── 7. Slots + FAQ ───────────────────────────────────── */

function FaqSection() {
  return (
    <Section id="faq" tone="raised" orb="right">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Sticks while the answers are being opened, so the two ways out of
            the page are never scrolled away from. */}
        <div className="lg:sticky lg:top-40 lg:self-start">
          {/* Renders nothing while the slot count is unknown — see site-config. */}
          <SlotCounter className="mb-6" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
            {'// Questions & next steps'}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-7 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] transition-all duration-normal hover:shadow-[0_0_30px_rgba(255,106,55,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book a 15-min fit call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/blueprint"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-surface-overlay px-7 text-sm font-semibold text-foreground transition-colors duration-normal hover:border-white/25"
            >
              Start with a Blueprint
            </Link>
          </div>
        </div>

        <PricingFaq />
      </div>
    </Section>
  )
}
