'use client';

import { useId, useState } from 'react';
import { Check, ChevronDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ScopeFeature, ScopeGroup } from '@/lib/scope-catalog';

interface FeatureGroupProps {
  group: ScopeGroup;
  selected: ReadonlySet<string>;
  onToggleFeature: (featureId: string) => void;
  onSetGroup: (groupId: string, on: boolean) => void;
  /** Fired when someone tries to untick a locked core feature. */
  onCoreAttempt: (feature: ScopeFeature) => void;
  /** Groups holding a selection open on first render; the rest stay folded. */
  defaultOpen: boolean;
}

/**
 * One collapsible block of features — e.g. "E-Commerce / Online Store"
 * inside the Website track.
 */
export function FeatureGroup({
  group,
  selected,
  onToggleFeature,
  onSetGroup,
  onCoreAttempt,
  defaultOpen,
}: FeatureGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  const selectedCount = group.features.filter((f) => selected.has(f.id)).length;
  const allOn = selectedCount === group.features.length;
  // A group of nothing but locked features has nothing to toggle.
  const isAllCore = group.features.every((f) => f.tier === 'core');

  return (
    <div
      className="overflow-clip rounded-xl border border-surface-border"
      style={{ background: 'var(--color-surface-overlay)' }}
      data-testid={`group-${group.id}`}
    >
      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex flex-1 items-start gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 rounded-lg"
        >
          <ChevronDown
            className={cn(
              'mt-1 h-4 w-4 shrink-0 text-foreground-subtle transition-transform duration-300',
              open && 'rotate-180'
            )}
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-base font-semibold text-foreground">
                {group.title}
              </span>
              <span
                className={cn(
                  'font-mono text-[11px] tracking-[0.12em]',
                  selectedCount > 0 ? 'text-coral-500' : 'text-foreground-subtle'
                )}
              >
                {selectedCount}/{group.features.length}
              </span>
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-foreground-subtle">
              {group.desc}
            </span>
          </span>
        </button>

        {!isAllCore && (
          <button
            type="button"
            onClick={() => {
              onSetGroup(group.id, !allOn);
              if (!allOn) setOpen(true);
            }}
            className="shrink-0 rounded-md border border-surface-border-hover px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle transition-colors duration-200 hover:border-coral-500 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
          >
            {allOn ? 'Clear' : 'All'}
          </button>
        )}
      </div>

      {/* ── Feature rows (animated open/close) ───────────── */}
      <div
        id={panelId}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 320ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* minHeight:0 is required — a grid item's automatic minimum size
            otherwise refuses to shrink below its content and 0fr does nothing. */}
        <div style={{ overflow: 'clip', minHeight: 0 }}>
          <div className="flex flex-col gap-2 px-3 pb-4 sm:px-4 sm:pb-5">
            {group.features.map((feature) => (
              <FeatureRow
                key={feature.id}
                feature={feature}
                checked={selected.has(feature.id)}
                onToggle={onToggleFeature}
                onCoreAttempt={onCoreAttempt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

interface FeatureRowProps {
  feature: ScopeFeature;
  checked: boolean;
  onToggle: (featureId: string) => void;
  onCoreAttempt: (feature: ScopeFeature) => void;
}

function FeatureRow({
  feature,
  checked,
  onToggle,
  onCoreAttempt,
}: FeatureRowProps) {
  const isCore = feature.tier === 'core';

  // A locked row is not a form control — it is a statement of what is included.
  // Rendering it as a <label> around a disabled input makes it unclickable, so
  // core rows become a plain element that explains itself when clicked.
  const Wrapper = isCore ? 'div' : 'label';

  return (
    <Wrapper
      onClick={isCore ? () => onCoreAttempt(feature) : undefined}
      data-testid={`feature-${feature.id}`}
      data-checked={checked ? 'true' : 'false'}
      className={cn(
        'relative flex items-start gap-3 rounded-lg border p-3 transition-all duration-200',
        isCore
          ? 'cursor-default border-surface-border'
          : 'cursor-pointer border-surface-border hover:border-surface-border-hover',
        checked && !isCore && 'border-coral-500/50'
      )}
      style={{
        background:
          checked && !isCore
            ? 'linear-gradient(90deg, rgba(255,106,55,0.10), transparent 55%)'
            : 'transparent',
      }}
    >
      {isCore ? (
        <span className="sr-only">Included — core, cannot be removed.</span>
      ) : (
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={() => onToggle(feature.id)}
        />
      )}

      {/* Checkbox */}
      <span
        className={cn(
          'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-all duration-200',
          isCore && 'border-foreground-subtle bg-foreground-subtle',
          !isCore && checked && 'border-coral-500 bg-coral-500',
          !isCore && !checked && 'border-surface-border-hover'
        )}
        aria-hidden="true"
      >
        <Check
          className={cn(
            'h-3 w-3 text-background transition-all duration-200',
            checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          )}
          strokeWidth={3.5}
        />
      </span>

      {/* Text */}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[15px] font-medium leading-snug text-foreground">
            {feature.title}
          </span>
          {isCore && (
            <span className="inline-flex items-center gap-1 rounded-sm bg-surface-overlay-hover px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted">
              <Lock className="h-2.5 w-2.5" aria-hidden="true" />
              Core
            </span>
          )}
          {feature.tier === 'recommended' && (
            <span
              className="rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-coral-500"
              style={{ background: 'rgba(255,106,55,0.14)' }}
            >
              Recommended
            </span>
          )}
        </span>
        <span className="mt-1 block text-[13px] leading-relaxed text-foreground-subtle">
          {feature.desc}
        </span>
      </span>
    </Wrapper>
  );
}
