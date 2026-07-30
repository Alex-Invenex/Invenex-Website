'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { featureIdsForTrack, type ScopeTrack } from '@/lib/scope-catalog';

interface TrackPickerProps {
  tracks: ScopeTrack[];
  selected: string[];
  onToggle: (trackId: string) => void;
}

/**
 * Step 01 — the only thing on the page until at least one service is chosen.
 */
export function TrackPicker({ tracks, selected, onToggle }: TrackPickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {tracks.map((track, index) => {
        const isOn = selected.includes(track.id);
        const featureCount = featureIdsForTrack(track.id).length;

        return (
          <button
            key={track.id}
            type="button"
            onClick={() => onToggle(track.id)}
            aria-pressed={isOn}
            data-testid={`track-${track.id}`}
            className={cn(
              'scope-rise scope-tap group relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left sm:gap-3 sm:p-6',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              isOn
                ? 'border-coral-500/60 shadow-[0_0_30px_rgba(255,106,55,0.12)]'
                : 'border-surface-border hover:border-surface-border-hover'
            )}
            style={{
              background: isOn
                ? 'linear-gradient(150deg, rgba(255,106,55,0.10), var(--color-surface-overlay) 60%)'
                : 'var(--color-surface-overlay)',
              animationDelay: `${index * 55}ms`,
            }}
          >
            {/* Title + tick share a row on mobile so the card stays short */}
            <div className="flex w-full items-start justify-between gap-3">
              <span className="min-w-0">
                <span className="hidden font-mono text-xs tracking-[0.18em] text-foreground-subtle sm:block">
                  {String(index + 1).padStart(2, '0')} / {track.code}
                </span>
                <h3 className="text-lg font-semibold leading-tight text-foreground sm:mt-3 sm:text-xl">
                  {track.title}
                </h3>
                <p
                  className={cn(
                    'mt-0.5 text-[13px] transition-colors duration-300 sm:mt-1 sm:text-sm',
                    isOn ? 'text-coral-500' : 'text-foreground-subtle'
                  )}
                >
                  {track.tagline}
                </p>
              </span>
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-200',
                  isOn
                    ? 'border-coral-500 bg-coral-500'
                    : 'border-surface-border-hover bg-transparent'
                )}
                aria-hidden="true"
              >
                <Check
                  className={cn(
                    'scope-tick h-4 w-4 text-background',
                    isOn ? 'scope-tick-on scale-100 opacity-100' : 'scale-50 opacity-0'
                  )}
                  strokeWidth={3}
                />
              </span>
            </div>

            <p className="line-clamp-2 text-[13px] leading-relaxed text-foreground-muted sm:line-clamp-none sm:text-sm">
              {track.blurb}
            </p>

            <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle sm:pt-2">
              {featureCount} features
            </span>
          </button>
        );
      })}
    </div>
  );
}
