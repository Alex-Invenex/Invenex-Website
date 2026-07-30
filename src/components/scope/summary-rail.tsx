'use client';

import { ArrowRight } from 'lucide-react';

interface SummaryProps {
  selectedCount: number;
  onContinue: () => void;
  onReset: () => void;
}

/**
 * Sticky desktop rail — deliberately minimal: the running total and the way
 * forward. The per-service breakdown lives in the track headings on the left,
 * so repeating it here only added weight.
 */
export function SummaryRail({
  selectedCount,
  onContinue,
  onReset,
}: SummaryProps) {
  return (
    <div
      className="rounded-2xl border border-surface-border p-6"
      style={{ background: 'var(--color-surface-overlay)' }}
      data-testid="summary-rail"
    >
      <h3 className="text-[13px] uppercase tracking-[0.14em] text-foreground-subtle">
        Your selection
      </h3>

      <p className="mt-3 text-4xl font-bold leading-none tracking-tight text-foreground tabular-nums">
        {selectedCount}
        <span className="ml-2 text-base font-normal tracking-normal text-foreground-subtle">
          {selectedCount === 1 ? 'feature' : 'features'}
        </span>
      </p>

      <button
        type="button"
        onClick={onContinue}
        disabled={selectedCount === 0}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-coral-500 px-5 py-3 text-sm font-semibold text-background transition-all duration-200 hover:brightness-110 disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
      >
        Continue
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 w-full text-center text-[13px] text-foreground-subtle underline underline-offset-4 transition-colors duration-200 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
      >
        Start over
      </button>
    </div>
  );
}

/**
 * Mobile counterpart — a fixed bar so the count and Continue are always reachable.
 */
export function SummaryBar({
  selectedCount,
  onContinue,
}: Pick<SummaryProps, 'selectedCount' | 'onContinue'>) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-border px-4 py-3 lg:hidden"
      style={{
        background: 'var(--color-surface-glass)',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
      }}
      data-testid="summary-bar"
    >
      {/* Inline padding (not a utility class — Tailwind v4 drops some of these in
          this codebase) keeps Continue clear of the floating WhatsApp button. */}
      <div
        className="mx-auto flex max-w-2xl items-center justify-between gap-4"
        style={{ paddingRight: '68px' }}
      >
        <p className="text-sm text-foreground-muted">
          <span className="font-semibold tabular-nums text-foreground">
            {selectedCount}
          </span>{' '}
          {selectedCount === 1 ? 'feature' : 'features'}
        </p>
        <button
          type="button"
          onClick={onContinue}
          disabled={selectedCount === 0}
          className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-5 py-2.5 text-sm font-semibold text-background transition-opacity duration-200 disabled:opacity-40"
        >
          Continue
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
