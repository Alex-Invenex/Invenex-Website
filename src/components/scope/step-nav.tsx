'use client';

import { cn } from '@/lib/utils';

export interface StepNavItem {
  /** 1-based, and genuinely sequential — step 03 cannot be done before 01. */
  step: number;
  label: string;
  /** A step the customer has not unlocked yet is shown but not reachable. */
  enabled: boolean;
}

interface StepNavProps {
  items: StepNavItem[];
  active: number;
  onJump: (step: number) => void;
}

/**
 * Sticky progress rule for the three steps.
 *
 * It floats clear of the site header rather than butting against it: the header
 * hides itself on scroll down, so a bar flush beneath it would leave a strip of
 * page showing above and read as a mistake.
 */
export function StepNav({ items, active, onJump }: StepNavProps) {
  // The rule runs dot to dot, so it stops at the centre of the outer columns.
  const inset = 100 / (items.length * 2);
  const filled =
    items.length < 2
      ? 0
      : (Math.min(Math.max(active, 1), items.length) - 1) / (items.length - 1);

  return (
    <nav
      aria-label="Scope builder progress"
      className="sticky top-[88px] z-30 -mx-1 mt-8 px-1"
      data-testid="step-nav"
    >
      <div
        className="rounded-xl border border-surface-border px-3 pb-2.5 pt-3 sm:px-5"
        style={{
          background: 'var(--color-background-tertiary)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
        }}
      >
        <div className="relative">
          {/* Rule behind the ticks */}
          <span
            aria-hidden="true"
            className="absolute top-[6px] h-px bg-surface-border"
            style={{ left: `${inset}%`, right: `${inset}%` }}
          />
          <span
            aria-hidden="true"
            className="absolute top-[6px] h-px bg-coral-500"
            style={{
              left: `${inset}%`,
              width: `${filled * (100 - inset * 2)}%`,
              transition: 'width 420ms cubic-bezier(0.2, 0.8, 0.3, 1)',
            }}
          />

          <ol
            className="relative grid"
            style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
          >
            {items.map((item) => {
              const isActive = item.step === active;
              const isDone = item.step < active;

              return (
                <li key={item.step} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => onJump(item.step)}
                    disabled={!item.enabled}
                    aria-current={isActive ? 'step' : undefined}
                    className={cn(
                      'group flex flex-col items-center gap-1.5 rounded-lg px-2 pt-px',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500',
                      item.enabled ? 'cursor-pointer' : 'cursor-default'
                    )}
                  >
                    {/* Tick */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'block h-[13px] w-[13px] rounded-full border-2 transition-all duration-300',
                        isActive && 'border-coral-500',
                        isDone && 'border-coral-500 bg-coral-500',
                        !isActive && !isDone && 'border-surface-border-hover'
                      )}
                      style={{
                        background: isActive
                          ? 'var(--color-background-tertiary)'
                          : undefined,
                        boxShadow: isActive
                          ? '0 0 0 4px rgba(255,106,55,0.16)'
                          : undefined,
                      }}
                    />
                    <span
                      className={cn(
                        'whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors duration-300 sm:text-[10.5px] sm:tracking-[0.16em]',
                        isActive
                          ? 'text-coral-500'
                          : item.enabled
                            ? 'text-foreground-muted group-hover:text-foreground'
                            : 'text-foreground-subtle'
                      )}
                    >
                      {String(item.step).padStart(2, '0')} {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
