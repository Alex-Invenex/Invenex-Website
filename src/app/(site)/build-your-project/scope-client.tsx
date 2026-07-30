'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero';
import { TrackPicker } from '@/components/scope/track-picker';
import { FeatureGroup } from '@/components/scope/feature-group';
import { SummaryRail, SummaryBar, type TrackTally } from '@/components/scope/summary-rail';
import { ScopeForm } from '@/components/scope/scope-form';
import { contactInfo } from '@/lib/constants';
import {
  scopeTracks,
  featureIdsForTrack,
  defaultFeatureIdsForTrack,
  type ScopeFeature,
  type ScopeGroup,
} from '@/lib/scope-catalog';

/** Scrolls an element into view in a way that survives Lenis smooth scroll. */
function scrollToRef(ref: React.RefObject<HTMLElement | null>) {
  const el = ref.current;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function ScopeClient() {
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<ReadonlySet<string>>(
    () => new Set<string>()
  );
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const featuresRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  /* ── Selection logic ─────────────────────────────────────── */

  const toggleTrack = useCallback((trackId: string) => {
    setSelectedTracks((prevTracks) => {
      const isOn = prevTracks.includes(trackId);
      const nextTracks = isOn
        ? prevTracks.filter((id) => id !== trackId)
        : [...prevTracks, trackId];

      setSelectedFeatures((prevFeatures) => {
        const next = new Set(prevFeatures);
        if (isOn) {
          // Dropping a service drops everything under it.
          for (const id of featureIdsForTrack(trackId)) next.delete(id);
        } else {
          for (const id of defaultFeatureIdsForTrack(trackId)) next.add(id);
        }
        return next;
      });

      return nextTracks;
    });
  }, []);

  const toggleFeature = useCallback((featureId: string) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(featureId)) next.delete(featureId);
      else next.add(featureId);
      return next;
    });
  }, []);

  /** Select-all / clear for one group. Core features never leave. */
  const setGroup = useCallback((group: ScopeGroup, on: boolean) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      for (const feature of group.features) {
        if (on) next.add(feature.id);
        else if (feature.tier !== 'core') next.delete(feature.id);
      }
      return next;
    });
  }, []);

  const handleCoreAttempt = useCallback(
    (feature: ScopeFeature) => {
      showToast(`“${feature.title}” is part of the core build — it stays in.`);
    },
    [showToast]
  );

  const resetToRecommended = useCallback(() => {
    setSelectedFeatures(
      new Set(selectedTracks.flatMap((id) => defaultFeatureIdsForTrack(id)))
    );
    showToast('Reset to our recommended selection.');
  }, [selectedTracks, showToast]);

  /* ── Derived values ──────────────────────────────────────── */

  // Catalog order, not click order.
  const activeTracks = useMemo(
    () => scopeTracks.filter((t) => selectedTracks.includes(t.id)),
    [selectedTracks]
  );

  const tallies: TrackTally[] = useMemo(
    () =>
      activeTracks.map((track) => ({
        id: track.id,
        title: track.title,
        selected: featureIdsForTrack(track.id).filter((id) =>
          selectedFeatures.has(id)
        ).length,
        total: featureIdsForTrack(track.id).length,
      })),
    [activeTracks, selectedFeatures]
  );

  const selectedCount = selectedFeatures.size;
  const totalCount = useMemo(
    () => activeTracks.reduce((n, t) => n + featureIdsForTrack(t.id).length, 0),
    [activeTracks]
  );

  const hasTracks = activeTracks.length > 0;

  /* ── Mobile bar target ───────────────────────────────────
     Without this the bar's button always jumped to the details form,
     so a customer who had just picked their services was thrown past
     every feature they were meant to choose. */
  const [reachedFeatures, setReachedFeatures] = useState(false);

  useEffect(() => {
    if (!hasTracks) return;
    const onScroll = () => {
      const el = featuresRef.current;
      if (!el) return;
      setReachedFeatures(el.getBoundingClientRect().top < window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasTracks]);

  /* ── Success screen ──────────────────────────────────────── */

  if (submitted) {
    return <ScopeSuccess />;
  }

  return (
    <>
      <SubpageHero
        id="scope-hero-heading"
        tag="// Build Your Project"
        variant="left-aligned"
        headline={
          <>
            <HeadlineWord thin>TELL US WHAT</HeadlineWord>
            <HeadlineWord coral>YOU NEED.</HeadlineWord>
          </>
        }
        subtitle="Pick your services, tick the features you want, and send it over. We price exactly what you selected — and nothing you didn't ask for."
      >
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: '01 / CHOOSE',
              text: 'Start with the services you need. Everything else stays hidden until you do.',
            },
            {
              step: '02 / REFINE',
              text: 'Tick features on and off. Items marked Core stay in — the build will not work without them.',
            },
            {
              step: '03 / SEND',
              text: 'Add your details. Your list reaches us instantly and we reply with pricing and a timeline.',
            },
          ].map((item) => (
            <div key={item.step} className="border-t border-surface-border-hover pt-4">
              <p className="font-mono text-[11px] tracking-[0.16em] text-coral-500">
                {item.step}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </SubpageHero>

      <div className="container mx-auto px-6 pb-24 md:px-12">
        {/* ── Step 01 — services ─────────────────────────── */}
        <section className="pt-16" aria-labelledby="step-services">
          <StepHeading
            eyebrow="Step 01"
            id="step-services"
            title="What are you looking for?"
            desc="Choose as many as apply. Each one opens its own list of features below."
          />
          <TrackPicker
            tracks={scopeTracks}
            selected={selectedTracks}
            onToggle={toggleTrack}
          />
        </section>

        {/* ── Step 02 — features ─────────────────────────── */}
        {hasTracks && (
          <section
            ref={featuresRef}
            className="scroll-mt-24 pt-20"
            aria-labelledby="step-features"
          >
            <StepHeading
              eyebrow="Step 02"
              id="step-features"
              title="Which features do you need?"
              desc="We have pre-ticked what we would recommend. Untick anything you do not want."
            />

            <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
              {/* Feature groups */}
              <div className="flex flex-col gap-12">
                {activeTracks.map((track, index) => (
                  <div key={track.id} data-testid={`track-panel-${track.id}`}>
                    <div className="mb-5 flex items-end justify-between gap-4 border-b border-surface-border-hover pb-3">
                      <div>
                        <p className="font-mono text-[11px] tracking-[0.14em] text-coral-500">
                          {String(index + 1).padStart(2, '0')} / {track.code}
                        </p>
                        <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">
                          {track.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleTrack(track.id)}
                        className="shrink-0 rounded-md border border-surface-border-hover px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle transition-colors duration-200 hover:border-error hover:text-error"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {track.groups.map((group) => (
                        <FeatureGroup
                          key={group.id}
                          group={group}
                          selected={selectedFeatures}
                          onToggleFeature={toggleFeature}
                          onSetGroup={(_, on) => setGroup(group, on)}
                          onCoreAttempt={handleCoreAttempt}
                          defaultOpen={group.features.some(
                            (f) => f.tier === 'core' || f.tier === 'recommended'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky rail */}
              <aside className="sticky top-24 hidden lg:block">
                <SummaryRail
                  tallies={tallies}
                  selectedCount={selectedCount}
                  totalCount={totalCount}
                  onContinue={() => scrollToRef(formRef)}
                  onReset={resetToRecommended}
                />
              </aside>
            </div>
          </section>
        )}

        {/* ── Step 03 — details ──────────────────────────── */}
        {hasTracks && (
          <section
            ref={formRef}
            className="scroll-mt-24 pt-20"
            aria-labelledby="step-details"
          >
            <StepHeading
              eyebrow="Step 03"
              id="step-details"
              title="A few things we need."
              desc={`Sending ${selectedCount} selected feature${
                selectedCount === 1 ? '' : 's'
              } across ${activeTracks.length} service${
                activeTracks.length === 1 ? '' : 's'
              }.`}
            />
            <div
              className="rounded-2xl border border-surface-border p-6 md:p-8"
              style={{ background: 'var(--color-surface-overlay)' }}
            >
              <ScopeForm
                selectedTracks={selectedTracks}
                selectedFeatures={[...selectedFeatures]}
                onSuccess={() => {
                  setSubmitted(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </section>
        )}
      </div>

      {/* Mobile action bar — only while there is something to send */}
      {hasTracks && (
        <SummaryBar
          selectedCount={selectedCount}
          totalCount={totalCount}
          label={reachedFeatures ? 'Continue' : 'Pick features'}
          onContinue={() =>
            scrollToRef(reachedFeatures ? formRef : featuresRef)
          }
        />
      )}

      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 lg:bottom-8"
      >
        <div
          className="max-w-[90vw] rounded-lg border border-surface-border-hover px-5 py-3 text-sm text-foreground shadow-2xl"
          style={{
            background: 'var(--color-background-tertiary)',
            borderLeft: '3px solid var(--color-coral-500)',
            transform: toast ? 'translateY(0)' : 'translateY(180%)',
            opacity: toast ? 1 : 0,
            transition: 'transform 400ms cubic-bezier(0.2,0.8,0.3,1), opacity 300ms',
          }}
        >
          {toast ?? ''}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */

function StepHeading({
  eyebrow,
  title,
  desc,
  id,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  id: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-coral-500">
        {eyebrow}
        <span
          aria-hidden="true"
          className="h-px w-16"
          style={{
            background:
              'linear-gradient(90deg, var(--color-coral-500), transparent)',
          }}
        />
      </p>
      <h2
        id={id}
        className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
      >
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-foreground-muted">
        {desc}
      </p>
    </div>
  );
}

function ScopeSuccess() {
  return (
    <section className="flex min-h-[70dvh] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <div
          className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-coral-500"
          style={{ background: 'rgba(255,106,55,0.14)' }}
        >
          <Check className="h-6 w-6 text-coral-500" strokeWidth={2.4} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Received. Thank you.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-foreground-muted">
          Your requirements are with the Invenex team, and a copy is on its way
          to your inbox. We will come back within two working days with pricing
          and a timeline built against exactly what you chose.
        </p>
        <p className="mt-6 text-sm text-foreground-subtle">
          Need us sooner?{' '}
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-coral-500 underline underline-offset-4"
          >
            {contactInfo.email}
          </a>
        </p>
      </div>
    </section>
  );
}
