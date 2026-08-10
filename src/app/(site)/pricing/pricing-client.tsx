'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { CurrencyToggle } from '@/components/pricing/currency-toggle'
import { TierCard } from '@/components/pricing/tier-card'
import { CarePlanCard } from '@/components/pricing/care-plan-card'
import { CostOfDelayCalculator } from '@/components/pricing/cost-of-delay-calculator'
import { NotForYou } from '@/components/pricing/not-for-you'
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
  CARE_PLANS,
  CARE_PLANS_ANNUAL_PREPAY_NOTE,
  ECOM_TIERS,
  MIN_AD_SPEND,
  minAdSpendNote,
  MOMENTUM_INCLUDED_IN_GROWTH,
  MOMENTUM_INCLUDED_IN_PLATFORM,
  OUT_OF_SCOPE_RATE,
  RETAINERS,
  STRATEGY,
  TIERS,
  type PriceSet,
} from '@/lib/pricing'

/* ─── Layout primitives ────────────────────────────────── */

/**
 * Section shell — alternating backgrounds and the site's standard vertical
 * rhythm. `tone="raised"` is the `background-secondary` band.
 */
function Section({
  id,
  tone = 'base',
  orb = 'right',
  children,
  labelledBy,
  label,
}: {
  id?: string
  tone?: 'base' | 'raised'
  orb?: 'left' | 'right' | 'none'
  children: ReactNode
  /** Id of the heading that names this landmark. Prefer this over `label`. */
  labelledBy?: string
  /**
   * Literal accessible name, for bands whose heading is rendered by a shared
   * component that exposes no id to point `aria-labelledby` at.
   */
  label?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={cn(
        'relative py-20 md:py-32',
        tone === 'raised' ? 'bg-background-secondary' : 'bg-background'
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
}: {
  id?: string
  eyebrow: string
  lead: string
  accent: string
  intro?: ReactNode
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted md:text-sm">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-6 leading-[0.95] tracking-[-0.03em]">
        <span className="block text-xl font-extralight text-foreground/50 md:text-2xl">
          {lead}
        </span>
        <span
          className="mt-1 block text-3xl font-black md:text-5xl"
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
        <p className="mt-6 text-base leading-relaxed text-foreground-muted md:text-lg">
          {intro}
        </p>
      )}
    </div>
  )
}

interface PriceRow {
  name: string
  detail: string
  price: PriceSet
  suffix?: string
}

/**
 * Compact pricing table. The wrapper — not the page — is the scroll
 * container: on a 375px screen the table scrolls inside itself and the body
 * never scrolls horizontally.
 */
function PriceTable({
  caption,
  rows,
  columns = ['Offer', 'What it covers', 'Price'],
}: {
  caption: string
  rows: PriceRow[]
  columns?: [string, string, string]
}) {
  return (
    <div className="glass overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  'px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground-muted',
                  i === 2 && 'text-right'
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-white/5 last:border-0">
              <th
                scope="row"
                className="px-5 py-5 align-top text-base font-medium text-foreground"
              >
                {row.name}
              </th>
              <td className="px-5 py-5 align-top text-sm text-foreground-muted">
                {row.detail}
              </td>
              <td className="px-5 py-5 align-top text-right">
                <Price
                  amount={row.price}
                  suffix={row.suffix}
                  className="whitespace-nowrap text-lg font-light text-gradient-orange"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

/* ─── Data shaped for the tables ───────────────────────── */

const appBuilds = APP_TIERS.filter((tier) => tier.id !== APP_CARE.id)

const carePlanNotes = [
  MOMENTUM_INCLUDED_IN_GROWTH,
  MOMENTUM_INCLUDED_IN_PLATFORM,
  CARE_PLANS_ANNUAL_PREPAY_NOTE,
]

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
    <Section id="build-tiers" labelledBy="build-tiers-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="build-tiers-title"
          eyebrow="// Websites & platforms"
          lead="Five fixed tiers,"
          accent="cheapest to largest."
          intro="Every tier is a fixed price for a fixed scope. What moves between them is what gets built — not the number."
        />
        <CurrencyToggle className="shrink-0 flex-wrap" />
      </div>

      {/* Ladder order, on every viewport. Growth spans the row and is the
          only card that carries a badge — the contrast effect depends on it
          (see 04-STRATEGY-RULES §1). */}
      <div className="mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:mx-auto">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            data-tier={tier.id}
            className={cn(
              'flex',
              // Growth takes the whole middle row and sits centred: the widest
              // card, the tallest card, the only badged card.
              tier.isDefault && 'md:col-span-2 md:justify-center md:py-4'
            )}
          >
            <TierCard
              tier={tier}
              ctaHref="/contact"
              ctaLabel={
                tier.isDefault ? `Start with ${tier.name}` : `Choose ${tier.name}`
              }
              className={cn('w-full', tier.isDefault && 'md:max-w-2xl')}
            />
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <p className="text-base leading-relaxed text-foreground-muted md:text-lg">
          Every price above is fixed. What moves is scope, not the number. If a
          tier is more than you need, take the one below it — we&rsquo;d rather
          build you the right smaller thing than the wrong bigger one.
        </p>

        <p className="mt-6 text-sm text-foreground-muted">
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
    <Section tone="raised" orb="left" labelledBy="cost-of-delay-title">
      <SectionHeading
        id="cost-of-delay-title"
        eyebrow="// Cost of delay"
        lead="Before you compare prices,"
        accent="price the waiting."
        intro="A site that converts below the benchmark costs money every month it stays up. Put your own numbers in."
      />
      <div className="mt-12 max-w-4xl">
        <CostOfDelayCalculator />
      </div>
    </Section>
  )
}

/* ─── 3. Care plans ────────────────────────────────────── */

function CarePlans() {
  return (
    <Section labelledBy="care-plans-title">
      <SectionHeading
        id="care-plans-title"
        eyebrow="// After launch"
        lead="Monthly"
        accent="Care Plans."
        intro="A site is not finished on launch day. These are the three ways we keep one working, published at the same fixed prices."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {CARE_PLANS.map((plan) => (
          <CarePlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <ul className="mt-12 flex max-w-3xl flex-col gap-3">
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
    <Section tone="raised" orb="left" labelledBy="other-services-title">
      <SectionHeading
        id="other-services-title"
        eyebrow="// Everything else"
        lead="Apps, stores, strategy, retainers —"
        accent="all priced too."
        intro="The three service lines that used to be quoted case by case now have published prices, on the same terms as the build tiers."
      />

      {/* Mobile apps */}
      <div className="mt-16">
        <h3 className="text-2xl font-light text-foreground">Mobile apps</h3>
        <p className="mt-3 max-w-2xl text-sm text-foreground-muted">
          Priced by how the app is built, not by screen count. Cross-platform
          and native both include store submission.
        </p>
        <div className="mt-6">
          <PriceTable
            caption="Mobile app builds and their fixed prices"
            rows={appBuilds.map((tier) => ({
              name: tier.name,
              detail: `${tier.timeline}${
                tier.includesStoreSubmission
                  ? ' · App Store + Play Store submission included'
                  : ' · installable on any device, no store submission'
              }`,
              price: tier.price,
            }))}
          />
        </div>

        {/* App Care — mandatory, and said plainly (copy deck §5). */}
        <div className="mt-8 rounded-2xl border border-coral-500/30 bg-coral-500/[0.04] p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Mandatory
            </span>
            <Price
              amount={APP_CARE.price}
              suffix="/mo"
              className="text-2xl font-light text-gradient-orange"
            />
          </div>

          <h4 className="mt-5 text-xl font-light text-foreground">
            Why App Care isn&rsquo;t optional
          </h4>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground-muted">
            An app isn&rsquo;t a purchase — it&rsquo;s a subscription with a
            large first payment. Apple and Google force SDK and OS-version
            changes roughly twice a year, whether you want them or not, and an
            app that stops being updated eventually stops being downloadable.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground-muted">
            App Care isn&rsquo;t an upsell. It&rsquo;s the cost of your app
            continuing to exist. We&rsquo;d rather tell you that now than three
            months after launch.
          </p>
        </div>
      </div>

      {/* E-commerce */}
      <div className="mt-16">
        <h3 className="text-2xl font-light text-foreground">E-Commerce</h3>
        <p className="mt-3 max-w-2xl text-sm text-foreground-muted">
          Priced by catalogue size, not page count. A 3,000-SKU store and a
          15-page brochure site are not the same work.
        </p>
        <div className="mt-6">
          <PriceTable
            caption="E-commerce builds by catalogue size"
            columns={['Store', 'Catalogue & scope', 'Price']}
            rows={ECOM_TIERS.map((tier) => ({
              name: tier.name,
              detail: `${tier.scope.join(' · ')} · ${tier.timeline}`,
              price: tier.price,
            }))}
          />
        </div>
      </div>

      {/* Digital strategy */}
      <div className="mt-16">
        <h3 className="text-2xl font-light text-foreground">Digital strategy</h3>
        <p className="mt-3 max-w-2xl text-sm text-foreground-muted">
          Advice on its own, for when the build question is not the first
          question.
        </p>
        <div className="mt-6">
          <PriceTable
            caption="Digital strategy offers"
            columns={['Offer', 'What it covers', 'Price']}
            rows={[
              {
                name: STRATEGY.sprint.name,
                detail: `${STRATEGY.sprint.timeline} · research, competitor teardown, a costed roadmap you can execute with anyone`,
                price: STRATEGY.sprint.price,
              },
              {
                name: STRATEGY.advisory.name,
                detail: `Minimum ${STRATEGY.advisory.minimumMonths} months · a founder in your corner, monthly`,
                price: STRATEGY.advisory.price,
                suffix: '/mo',
              },
            ]}
          />
        </div>
      </div>

      {/* Social retainers */}
      <div className="mt-16">
        <h3 className="text-2xl font-light text-foreground">Social retainers</h3>
        <p className="mt-3 max-w-2xl text-sm text-foreground-muted">
          Monthly, cancellable, and separate from any build.
        </p>
        <div className="mt-6">
          <PriceTable
            caption="Social media retainers"
            columns={['Retainer', 'What it covers', 'Per month']}
            rows={RETAINERS.map((retainer) => ({
              name: retainer.name,
              detail: retainer.scope.join(' · '),
              price: retainer.price,
              suffix: '/mo',
            }))}
          />
        </div>
        <AdSpendDisclosure className="mt-5 max-w-3xl text-sm text-foreground-muted" />
      </div>
    </Section>
  )
}

/* ─── 5. Blueprint ─────────────────────────────────────── */

function BlueprintBlock() {
  return (
    <Section labelledBy="blueprint-title">
      <div className="glass mx-auto max-w-4xl rounded-3xl border border-white/10 p-8 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
          // The Blueprint
        </p>
        <h2
          id="blueprint-title"
          className="mt-5 text-3xl font-light leading-tight text-foreground md:text-4xl"
        >
          Before we build you anything, we&rsquo;ll tell you exactly what to
          build.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted">
          A free quote is a guess. So we replaced it with a paid diagnostic: a
          90-minute working session with two founders, then a written
          architecture, a teardown of three named competitors, and your scope
          broken into phases with a fixed price against each.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Price
            amount={BLUEPRINT.price}
            className="text-4xl font-light text-gradient-orange"
          />
          <span className="text-sm text-foreground-muted">
            {BLUEPRINT.timeline} · credited in full against any build started
            within 30 days · refundable, and the document is yours either way
          </span>
        </div>

        <p className="mt-6 text-sm text-foreground-muted">
          The Blueprint is for projects above{' '}
          <Price
            amount={BLUEPRINT.threshold}
            className="text-foreground"
          />
          . If you&rsquo;re looking for something smaller, you don&rsquo;t need
          it — the prices are published and you can just book.
        </p>

        <Link
          href="/blueprint"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-7 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] transition-all duration-normal hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
        >
          Read about the Blueprint
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  )
}

/* ─── 6. Not for you ───────────────────────────────────── */

function NotForYouSection() {
  return (
    // `NotForYou` owns its own heading and exposes no id to reference, so the
    // landmark is named literally rather than left anonymous.
    <Section
      tone="raised"
      orb="none"
      label="We’re probably not for you if…"
    >
      <div className="mx-auto max-w-3xl">
        <NotForYou />
      </div>
    </Section>
  )
}

/* ─── 7. Slots + FAQ ───────────────────────────────────── */

function FaqSection() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        {/* Renders nothing while the slot count is unknown — see site-config. */}
        <SlotCounter className="mb-10" />
        <PricingFaq />

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-7 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] transition-all duration-normal hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
          >
            Book a 15-min fit call
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/blueprint"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-surface-overlay px-7 text-sm font-semibold text-foreground transition-colors duration-normal hover:border-white/20"
          >
            Start with a Blueprint
          </Link>
        </div>
      </div>
    </Section>
  )
}
