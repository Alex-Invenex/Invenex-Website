'use client';

import { useId, useRef, useState } from 'react';
import { Check, ChevronDown, Link2, Lock, Pencil, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ScopeSummary } from '@/lib/scope-catalog';

interface ReviewPanelProps {
  summary: ScopeSummary;
  /** Untick one feature straight from the review list. */
  onRemove: (featureId: string) => void;
  /** Someone tried to drop a locked core feature. */
  onCoreAttempt: (title: string) => void;
  /** Back up to the feature lists. */
  onEdit: () => void;
  shareUrl: string;
  onCopyLink: () => void;
  copied: boolean;
}

/**
 * Step 03, above the form — exactly what is about to be sent, grouped the way
 * the quote will be, with everything still removable. The last chance to catch
 * a feature that was ticked by accident, or one that is missing.
 */
export function ReviewPanel({
  summary,
  onRemove,
  onCoreAttempt,
  onEdit,
  shareUrl,
  onCopyLink,
  copied,
}: ReviewPanelProps) {
  const urlRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  /* On a phone the full list is hundreds of rows tall and would bury the form,
     so it starts folded there. On desktop it is always open — the toggle and
     the fold both disappear at lg. */
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="mb-6 overflow-clip rounded-2xl border border-surface-border"
      style={{ background: 'var(--color-surface-overlay)' }}
      data-testid="review-panel"
    >
      {/* Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border p-5"
        style={{
          background:
            'linear-gradient(160deg, rgba(255,106,55,0.08), transparent 70%)',
        }}
      >
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            What you are sending
          </h3>
          <p className="mt-1.5 text-[15px] text-foreground">
            <span className="font-semibold tabular-nums text-coral-500">
              {summary.selectedCount}
            </span>{' '}
            feature{summary.selectedCount === 1 ? '' : 's'} across{' '}
            <span className="font-semibold tabular-nums text-coral-500">
              {summary.tracks.length}
            </span>{' '}
            service{summary.tracks.length === 1 ? '' : 's'}
          </p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-surface-border-hover px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle transition-colors duration-200 hover:border-coral-500 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
        >
          <Pencil className="h-3 w-3" aria-hidden="true" />
          Change features
        </button>
      </div>

      {/* Phone-only toggle for the list below */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={listId}
        className="flex w-full items-center justify-between gap-3 border-b border-surface-border px-5 py-3.5 text-left lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
        data-testid="review-toggle"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
          {expanded
            ? 'Hide the list'
            : `Check all ${summary.selectedCount} feature${
                summary.selectedCount === 1 ? '' : 's'
              }`}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-foreground-subtle transition-transform duration-300',
            expanded && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>

      {/* Selection, grouped as the quote will be.
          Capped and scrollable on desktop so the form stays within reach. No
          scroll region on phones — mid-page it swallows swipes meant for the
          page, so there the list folds away instead. */}
      <div
        id={listId}
        className={cn(
          'p-5 lg:block lg:max-h-[520px] lg:overflow-y-auto',
          !expanded && 'hidden'
        )}
      >
        <div className="flex flex-col gap-6">
          {summary.tracks.map((track) => (
            <section key={track.code}>
              <div className="flex items-baseline justify-between gap-3 border-b border-surface-border pb-2">
                <h4 className="text-base font-semibold tracking-tight text-foreground">
                  {track.title}
                </h4>
                <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-coral-500">
                  {track.selectedCount}/{track.totalCount}
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-3">
                {track.groups.map((group) => (
                  <div key={group.title}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-subtle">
                      {group.title}
                    </p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {group.features.map((feature) => {
                        const isCore = feature.tier === 'core';

                        return (
                          <li key={feature.id}>
                            <button
                              type="button"
                              onClick={() =>
                                isCore
                                  ? onCoreAttempt(feature.title)
                                  : onRemove(feature.id)
                              }
                              aria-label={
                                isCore
                                  ? `${feature.title} — core, stays in`
                                  : `Remove ${feature.title}`
                              }
                              data-testid={`review-chip-${feature.id}`}
                              className={cn(
                                'scope-tap group inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-left text-[12.5px] leading-snug',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500',
                                isCore
                                  ? 'cursor-default border-surface-border text-foreground-muted'
                                  : 'border-surface-border text-foreground hover:border-error/60 hover:text-error'
                              )}
                            >
                              {isCore ? (
                                <Lock
                                  className="h-2.5 w-2.5 shrink-0 text-foreground-subtle"
                                  aria-hidden="true"
                                />
                              ) : (
                                <X
                                  className="h-3 w-3 shrink-0 text-foreground-subtle transition-colors duration-200 group-hover:text-error"
                                  aria-hidden="true"
                                />
                              )}
                              {feature.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Share */}
      <div className="border-t border-surface-border p-5">
        <label
          htmlFor="scope-share-url"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-subtle"
        >
          Link to this selection
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            ref={urlRef}
            id="scope-share-url"
            type="text"
            readOnly
            value={shareUrl}
            onFocus={(e) => e.currentTarget.select()}
            className="min-w-0 flex-1 rounded-lg border border-surface-border px-3 py-2.5 font-mono text-[12px] text-foreground-muted focus:border-coral-500 focus:outline-none"
            style={{ background: 'var(--color-background-secondary)' }}
          />
          <button
            type="button"
            onClick={() => {
              urlRef.current?.select();
              onCopyLink();
            }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-surface-border-hover px-4 py-2.5 text-[13px] font-semibold text-foreground-muted transition-colors duration-200 hover:border-coral-500 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
            data-testid="copy-scope-link"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-coral-500" aria-hidden="true" />
                Copied
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                Copy link
              </>
            )}
          </button>
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-foreground-subtle">
          Send it to a colleague, or keep it to pick this up later. Opening it
          restores every tick on this page.
        </p>
      </div>
    </div>
  );
}
