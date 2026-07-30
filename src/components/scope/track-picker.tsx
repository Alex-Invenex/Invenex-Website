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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              'group relative flex flex-col items-start gap-3 rounded-2xl border p-6 text-left',
              'transition-all duration-300 ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              isOn
                ? 'border-coral-500/60 shadow-[0_0_30px_rgba(255,106,55,0.12)]'
                : 'border-surface-border hover:border-surface-border-hover'
            )}
            style={{
              background: isOn
                ? 'linear-gradient(150deg, rgba(255,106,55,0.10), var(--color-surface-overlay) 60%)'
                : 'var(--color-surface-overlay)',
            }}
          >
            {/* Index + tick */}
            <div className="flex w-full items-start justify-between gap-3">
              <span className="font-mono text-xs tracking-[0.18em] text-foreground-subtle">
                {String(index + 1).padStart(2, '0')} / {track.code}
              </span>
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all duration-200',
                  isOn
                    ? 'border-coral-500 bg-coral-500'
                    : 'border-surface-border-hover bg-transparent'
                )}
                aria-hidden="true"
              >
                <Check
                  className={cn(
                    'h-4 w-4 text-background transition-all duration-200',
                    isOn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  )}
                  strokeWidth={3}
                />
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold leading-tight text-foreground">
                {track.title}
              </h3>
              <p
                className={cn(
                  'mt-1 text-sm transition-colors duration-300',
                  isOn ? 'text-coral-500' : 'text-foreground-subtle'
                )}
              >
                {track.tagline}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-foreground-muted">
              {track.blurb}
            </p>

            <span className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
              {featureCount} features
            </span>
          </button>
        );
      })}
    </div>
  );
}
