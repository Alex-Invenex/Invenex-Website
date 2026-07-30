'use client';

import { ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TrackTally {
  id: string;
  title: string;
  selected: number;
  total: number;
}

interface SummaryProps {
  tallies: TrackTally[];
  selectedCount: number;
  totalCount: number;
  onContinue: () => void;
  onReset: () => void;
}

/**
 * Sticky desktop rail: live count, per-service breakdown, continue + reset.
 */
export function SummaryRail({
  tallies,
  selectedCount,
  totalCount,
  onContinue,
  onReset,
}: SummaryProps) {
  const pct = totalCount === 0 ? 0 : (selectedCount / totalCount) * 100;

  return (
    <div
      className="overflow-clip rounded-2xl border border-surface-border"
      style={{ background: 'var(--color-surface-overlay)' }}
      data-testid="summary-rail"
    >
      {/* Count */}
      <div
        className="border-b border-surface-border p-5"
        style={{
          background:
            'linear-gradient(160deg, rgba(255,106,55,0.10), transparent 70%)',
        }}
      >
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          Your Selection
        </h3>
        <p className="mt-3 text-5xl font-bold leading-none tracking-tight text-coral-500 tabular-nums">
          {selectedCount}
          <span className="text-base font-medium tracking-normal text-foreground-subtle">
            {' '}
            / {totalCount}
          </span>
        </p>
        <div className="mt-4 h-[3px] overflow-clip rounded-full bg-surface-border">
          <div
            className="h-full rounded-full bg-coral-500"
            style={{
              width: `${pct}%`,
              transition: 'width 400ms cubic-bezier(0.2, 0.8, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="max-h-[280px] overflow-y-auto py-1">
        {tallies.length === 0 ? (
          <p className="px-5 py-7 text-center text-[13px] leading-relaxed text-foreground-subtle">
            Nothing selected yet.
            <br />
            Tick the features you want.
          </p>
        ) : (
          tallies.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 border-b border-surface-border px-5 py-2.5 text-[13px] last:border-b-0"
            >
              <span className="min-w-0 truncate text-foreground-muted">
                {t.title}
              </span>
              <span className="shrink-0 font-mono text-[11px] text-coral-500">
                {t.selected}/{t.total}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-surface-border p-4">
        <RailButton onClick={onContinue} disabled={selectedCount === 0} primary>
          Continue
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </RailButton>
        <RailButton onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset to recommended
        </RailButton>
      </div>
    </div>
  );
}

/**
 * Mobile counterpart — a fixed bar so the count and Continue are always reachable.
 */
export function SummaryBar({
  selectedCount,
  totalCount,
  onContinue,
}: Pick<SummaryProps, 'selectedCount' | 'totalCount' | 'onContinue'>) {
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
          <span className="text-lg font-bold tabular-nums text-coral-500">
            {selectedCount}
          </span>{' '}
          / {totalCount} selected
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

/* ─────────────────────────────────────────────────────────── */

function RailButton({
  children,
  onClick,
  disabled,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500',
        primary
          ? 'bg-coral-500 text-background hover:brightness-110 disabled:opacity-35 disabled:hover:brightness-100'
          : 'mt-2 border border-surface-border-hover text-foreground-muted hover:border-coral-500 hover:text-coral-500'
      )}
    >
      {children}
    </button>
  );
}
