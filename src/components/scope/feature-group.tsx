'use client';

import { useId, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ScopeFeature, ScopeGroup } from '@/lib/scope-catalog';

interface FeatureGroupProps {
  group: ScopeGroup;
  selected: ReadonlySet<string>;
  onToggleFeature: (featureId: string) => void;
  onSetGroup: (groupId: string, on: boolean) => void;
  /** Fired when someone tries to untick a locked core feature. */
  onCoreAttempt: (feature: ScopeFeature) => void;
}

/**
 * One collapsible block of features — e.g. "Online Store" inside Website.
 *
 * Groups start folded so the page reads as a short list of headings rather
 * than a wall of checkboxes. The count in the header tells the customer what
 * is already ticked inside without needing to open it.
 */
export function FeatureGroup({
  group,
  selected,
  onToggleFeature,
  onSetGroup,
  onCoreAttempt,
}: FeatureGroupProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const selectedCount = group.features.filter((f) => selected.has(f.id)).length;
  const allOn = selectedCount === group.features.length;
  // A group of nothing but locked features has nothing to toggle.
  const isAllCore = group.features.every((f) => f.tier === 'core');

  return (
    <div
      className="border-b border-surface-border last:border-b-0"
      data-testid={`group-${group.id}`}
    >
      {/* ── Header ───────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 py-4 text-left transition-colors duration-200 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
      >
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-foreground-subtle transition-transform duration-300',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
        <span className="flex-1 text-[15px] font-medium">{group.title}</span>
        <span
          className={cn(
            'shrink-0 text-[13px]',
            selectedCount > 0 ? 'text-coral-500' : 'text-foreground-subtle'
          )}
        >
          {selectedCount > 0 ? `${selectedCount} selected` : 'none yet'}
        </span>
      </button>

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
          <div className="pb-5 pl-7">
            <p className="mb-1 text-[13px] leading-relaxed text-foreground-subtle">
              {group.desc}
            </p>

            {group.features.map((feature) => (
              <FeatureRow
                key={feature.id}
                feature={feature}
                checked={selected.has(feature.id)}
                onToggle={onToggleFeature}
                onCoreAttempt={onCoreAttempt}
              />
            ))}

            {!isAllCore && (
              <button
                type="button"
                onClick={() => onSetGroup(group.id, !allOn)}
                className="mt-3 text-[13px] text-foreground-subtle underline underline-offset-4 transition-colors duration-200 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
              >
                {allOn ? 'Clear this section' : 'Select everything here'}
              </button>
            )}
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
        'group flex items-start gap-3 py-2.5',
        isCore ? 'cursor-default' : 'cursor-pointer'
      )}
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
          !isCore &&
            !checked &&
            'border-surface-border-hover group-hover:border-coral-500'
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
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span
            className={cn(
              'text-[15px] leading-snug transition-colors duration-200',
              checked ? 'text-foreground' : 'text-foreground-muted'
            )}
          >
            {feature.title}
          </span>
          {isCore && (
            <span className="text-[12px] text-foreground-subtle">included</span>
          )}
        </span>
        <span className="mt-0.5 block text-[13px] leading-relaxed text-foreground-subtle">
          {feature.desc}
        </span>
      </span>
    </Wrapper>
  );
}
