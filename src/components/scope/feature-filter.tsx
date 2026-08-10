'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FeatureTier } from '@/lib/scope-catalog';

export type TierFilter = 'all' | FeatureTier;

const tierFilters: { value: TierFilter; label: string }[] = [
  { value: 'all', label: 'Everything' },
  { value: 'core', label: 'Core' },
  { value: 'recommended', label: 'Recommended' },
  { value: 'optional', label: 'Optional' },
];

interface FeatureFilterProps {
  query: string;
  onQueryChange: (value: string) => void;
  tier: TierFilter;
  onTierChange: (tier: TierFilter) => void;
  selectedOnly: boolean;
  onSelectedOnlyChange: (value: boolean) => void;
  /** Features currently passing the filter, across every chosen service. */
  shownCount: number;
  /** Features in the chosen services altogether. */
  totalCount: number;
  isFiltering: boolean;
  onClear: () => void;
}

/**
 * Search and narrow the feature lists. With six services chosen there are 225
 * rows below this — finding "invoice" by scrolling is not a reasonable ask.
 */
export function FeatureFilter({
  query,
  onQueryChange,
  tier,
  onTierChange,
  selectedOnly,
  onSelectedOnlyChange,
  shownCount,
  totalCount,
  isFiltering,
  onClear,
}: FeatureFilterProps) {
  return (
    <div
      className="mb-6 rounded-xl border border-surface-border p-3 sm:p-4"
      style={{ background: 'var(--color-surface-overlay)' }}
      data-testid="feature-filter"
    >
      {/* Search */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
          aria-hidden="true"
        />
        <input
          type="search"
          id="scope-feature-search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search features — “invoice”, “WhatsApp”, “booking”…"
          aria-label="Search features"
          className={cn(
            'w-full rounded-lg border border-surface-border py-2.5 pl-10 pr-10 text-[15px] text-foreground',
            'placeholder:text-foreground-subtle',
            'transition-colors duration-200 focus:border-coral-500 focus:outline-none',
            // Safari draws its own clear button on type=search; ours is better placed.
            '[&::-webkit-search-cancel-button]:hidden'
          )}
          style={{ background: 'var(--color-background-secondary)' }}
        />
        {query !== '' && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-foreground-subtle transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Filters + live count */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
        <div
          role="group"
          aria-label="Filter by feature type"
          className="flex flex-wrap items-center gap-1.5"
        >
          {tierFilters.map((option) => (
            <FilterChip
              key={option.value}
              active={tier === option.value}
              onClick={() => onTierChange(option.value)}
            >
              {option.label}
            </FilterChip>
          ))}
        </div>

        <span
          aria-hidden="true"
          className="hidden h-4 w-px bg-surface-border-hover sm:block"
        />

        <FilterChip
          active={selectedOnly}
          onClick={() => onSelectedOnlyChange(!selectedOnly)}
          pressed
        >
          Ticked only
        </FilterChip>

        {/* Count sits at the end of the row on desktop, under it on phones */}
        <p
          className="ml-auto font-mono text-[11px] tracking-[0.12em] text-foreground-subtle"
          aria-live="polite"
        >
          <span className={isFiltering ? 'text-coral-500' : 'text-foreground-muted'}>
            {shownCount}
          </span>{' '}
          / {totalCount} shown
        </p>

        {isFiltering && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-md border border-surface-border-hover px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle transition-colors duration-200 hover:border-coral-500 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function FilterChip({
  children,
  active,
  onClick,
  pressed,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  /** Toggles report aria-pressed; a radio-style set reports the current one. */
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed ? active : undefined}
      className={cn(
        'scope-tap rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500',
        active
          ? 'border-coral-500/60 text-coral-500'
          : 'border-surface-border text-foreground-subtle hover:border-surface-border-hover hover:text-foreground-muted'
      )}
      style={{
        background: active ? 'rgba(255,106,55,0.12)' : 'transparent',
      }}
    >
      {children}
    </button>
  );
}
