'use client';

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Check, RotateCcw, SearchX } from 'lucide-react';
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero';
import { TrackPicker } from '@/components/scope/track-picker';
import { FeatureGroup } from '@/components/scope/feature-group';
import { FeatureFilter, type TierFilter } from '@/components/scope/feature-filter';
import { ReviewPanel } from '@/components/scope/review-panel';
import { StepNav } from '@/components/scope/step-nav';
import { SummaryRail, SummaryBar, type TrackTally } from '@/components/scope/summary-rail';
import { ScopeForm } from '@/components/scope/scope-form';
import { contactInfo } from '@/lib/constants';
import {
  scopeTracks,
  featureIdsForTrack,
  defaultFeatureIdsForTrack,
  buildScopeSummary,
  type ScopeFeature,
} from '@/lib/scope-catalog';
import {
  buildShareUrl,
  clearStoredScope,
  loadStoredScope,
  readScopeFromLocation,
  storeScope,
  stripScopeFromLocation,
} from '@/lib/scope-share';

/** Scrolls an element into view in a way that survives Lenis smooth scroll. */
function scrollToRef(ref: React.RefObject<HTMLElement | null>) {
  const el = ref.current;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

/** Where a returning selection came from, so the notice can say so. */
type RestoreSource = 'link' | 'saved';

export function ScopeClient() {
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<ReadonlySet<string>>(
    () => new Set<string>()
  );
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [restoredFrom, setRestoredFrom] = useState<RestoreSource | null>(null);

  /* Filter state for step 02 */
  const [query, setQuery] = useState('');
  const [tier, setTier] = useState<TierFilter>('all');
  const [selectedOnly, setSelectedOnly] = useState(false);

  const tracksRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  /* ── Restore & save ──────────────────────────────────────
     A scope in the address bar wins over a locally saved one — someone who
     opened a shared link means to see that selection, not their own. Once it
     is in state the parameter goes, so a reload cannot undo their edits. */

  const hydrated = useRef(false);
  /** Nothing is saved until the customer actually changes something. */
  const touched = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const fromLink = readScopeFromLocation();
    const restored = fromLink ?? loadStoredScope();
    if (!restored) return;

    /* eslint-disable react-hooks/set-state-in-effect --
       The link and the saved copy are browser-only, so they cannot be read
       while rendering: the server has neither, and reading them in a state
       initialiser would make the first client render disagree with the HTML it
       is hydrating. Pulling state in from an external store on mount is what
       an effect is for, and this one runs exactly once. */
    setSelectedTracks(restored.tracks);
    setSelectedFeatures(new Set(restored.features));
    setRestoredFrom(fromLink ? 'link' : 'saved');
    /* eslint-enable react-hooks/set-state-in-effect */

    if (fromLink) {
      storeScope(restored);
      stripScopeFromLocation();
    }
  }, []);

  useEffect(() => {
    if (!touched.current) return;
    if (selectedTracks.length === 0) clearStoredScope();
    else storeScope({ tracks: selectedTracks, features: [...selectedFeatures] });
  }, [selectedTracks, selectedFeatures]);

  /* ── Selection logic ─────────────────────────────────────── */

  const toggleTrack = useCallback((trackId: string) => {
    touched.current = true;
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
    touched.current = true;
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(featureId)) next.delete(featureId);
      else next.add(featureId);
      return next;
    });
  }, []);

  /**
   * Tick or clear a run of features at once. The caller passes the rows that
   * are actually on screen, so a filtered "All" cannot tick something hidden.
   * Core features never leave.
   */
  const setFeatures = useCallback((features: ScopeFeature[], on: boolean) => {
    touched.current = true;
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      for (const feature of features) {
        if (on) next.add(feature.id);
        else if (feature.tier !== 'core') next.delete(feature.id);
      }
      return next;
    });
  }, []);

  const handleCoreAttempt = useCallback(
    (title: string) => {
      showToast(`“${title}” is part of the core build — it stays in.`);
    },
    [showToast]
  );

  const resetToRecommended = useCallback(() => {
    touched.current = true;
    setSelectedFeatures(
      new Set(selectedTracks.flatMap((id) => defaultFeatureIdsForTrack(id)))
    );
    showToast('Reset to our recommended selection.');
  }, [selectedTracks, showToast]);

  /** Wipes the selection, the saved copy and the notice, back to a blank page. */
  const startOver = useCallback(() => {
    touched.current = true;
    setSelectedTracks([]);
    setSelectedFeatures(new Set());
    setRestoredFrom(null);
    setQuery('');
    setTier('all');
    setSelectedOnly(false);
    clearStoredScope();
    stripScopeFromLocation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery('');
    setTier('all');
    setSelectedOnly(false);
  }, []);

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

  const summary = useMemo(
    () => buildScopeSummary([...selectedFeatures]),
    [selectedFeatures]
  );

  /* ── Filtering ───────────────────────────────────────────
     Deferred so typing stays responsive while 225 rows re-filter. */

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const isFiltering =
    normalizedQuery !== '' || tier !== 'all' || selectedOnly;

  /** Chosen services with their groups and rows narrowed to the filter. */
  const visibleTracks = useMemo(() => {
    if (!isFiltering) {
      return activeTracks.map((track) => ({
        track,
        groups: track.groups.map((group) => ({
          group,
          features: group.features,
        })),
      }));
    }

    return activeTracks
      .map((track) => ({
        track,
        groups: track.groups
          .map((group) => ({
            group,
            features: group.features.filter(
              (feature) =>
                (tier === 'all' || feature.tier === tier) &&
                (!selectedOnly || selectedFeatures.has(feature.id)) &&
                (normalizedQuery === '' ||
                  feature.title.toLowerCase().includes(normalizedQuery) ||
                  feature.desc.toLowerCase().includes(normalizedQuery))
            ),
          }))
          .filter((entry) => entry.features.length > 0),
      }))
      .filter((entry) => entry.groups.length > 0);
  }, [activeTracks, isFiltering, normalizedQuery, tier, selectedOnly, selectedFeatures]);

  const shownCount = useMemo(
    () =>
      visibleTracks.reduce(
        (n, entry) => n + entry.groups.reduce((m, g) => m + g.features.length, 0),
        0
      ),
    [visibleTracks]
  );

  /* ── Sharing ─────────────────────────────────────────────
     The link needs the address bar, which the server does not have. Guarded
     rather than deferred to an effect: nothing that shows the link is rendered
     until a service is chosen, and that cannot happen before hydration, so the
     server never renders a link to disagree with. */

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined' || selectedTracks.length === 0) return '';
    return buildShareUrl({
      tracks: selectedTracks,
      features: [...selectedFeatures],
    });
  }, [selectedTracks, selectedFeatures]);

  const copyLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2400);
      showToast('Link copied. Opening it brings back this exact selection.');
    } catch {
      showToast(
        'Could not copy for you — the full link is in the box in step 03, ready to select.'
      );
    }
  }, [shareUrl, showToast]);

  /* ── Scroll tracking ─────────────────────────────────────
     Drives the step nav, and the mobile bar's target. Without the latter the
     bar's button always jumped to the details form, so a customer who had just
     picked their services was thrown past every feature they were meant to
     choose. */

  const [activeStep, setActiveStep] = useState(1);
  const [reachedFeatures, setReachedFeatures] = useState(false);

  useEffect(() => {
    // Nothing to track until steps 02 and 03 exist. Whatever the last reading
    // was can stay: the nav and the bar that use it are unmounted, and the
    // effect re-measures the moment a service is chosen again.
    if (!hasTracks) return;

    const measure = () => {
      const line = window.innerHeight * 0.4;
      const sections = [tracksRef, featuresRef, formRef];

      let step = 1;
      sections.forEach((section, index) => {
        const top = section.current?.getBoundingClientRect().top;
        if (top !== undefined && top < line) step = index + 1;
      });
      setActiveStep(step);

      const featuresTop = featuresRef.current?.getBoundingClientRect().top;
      setReachedFeatures(
        featuresTop !== undefined && featuresTop < window.innerHeight * 0.5
      );
    };

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [hasTracks]);

  const jumpToStep = useCallback((step: number) => {
    scrollToRef(step === 1 ? tracksRef : step === 2 ? featuresRef : formRef);
  }, []);

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
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-6 sm:grid-cols-3">
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
          ].map((item, i) => (
            <div
              key={item.step}
              className="scope-rise border-t border-surface-border-hover pt-2.5 sm:pt-4"
              style={{ animationDelay: `${240 + i * 70}ms` }}
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-coral-500">
                {item.step}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-foreground-muted sm:mt-2 sm:text-sm sm:leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </SubpageHero>

      <div className="container mx-auto px-6 pb-24 md:px-12">
        {/* Progress rule — only once there are steps to move between.
            A direct child of the container so it stays stuck for all three
            sections; nested in a wrapper it could only stick within that
            wrapper's own height, which is to say not at all. */}
        {hasTracks && (
          <StepNav
            items={[
              { step: 1, label: 'Choose', enabled: true },
              { step: 2, label: 'Refine', enabled: true },
              { step: 3, label: 'Send', enabled: true },
            ]}
            active={activeStep}
            onJump={jumpToStep}
          />
        )}

        {restoredFrom && hasTracks && (
          <RestoreNotice
            source={restoredFrom}
            featureCount={selectedCount}
            trackCount={activeTracks.length}
            onDismiss={() => setRestoredFrom(null)}
            onStartOver={startOver}
          />
        )}

        {/* ── Step 01 — services ─────────────────────────── */}
        <section
          ref={tracksRef}
          className="scroll-mt-24 pt-16"
          aria-labelledby="step-services"
        >
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
              desc="We have pre-ticked what we would recommend. Untick anything you do not want, or search for something specific."
            />

            <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
              {/* Feature groups */}
              <div>
                <FeatureFilter
                  query={query}
                  onQueryChange={setQuery}
                  tier={tier}
                  onTierChange={setTier}
                  selectedOnly={selectedOnly}
                  onSelectedOnlyChange={setSelectedOnly}
                  shownCount={shownCount}
                  totalCount={totalCount}
                  isFiltering={isFiltering}
                  onClear={clearFilters}
                />

                {visibleTracks.length === 0 ? (
                  <NoMatches query={query} onClear={clearFilters} />
                ) : (
                  <div className="flex flex-col gap-8 sm:gap-12">
                    {visibleTracks.map(({ track, groups }, index) => (
                      <div
                        key={track.id}
                        data-testid={`track-panel-${track.id}`}
                        className="scope-rise"
                      >
                        <div className="mb-4 flex items-end justify-between gap-4 border-b border-surface-border-hover pb-3 sm:mb-5">
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
                          {groups.map(({ group, features }) => (
                            <FeatureGroup
                              key={group.id}
                              group={group}
                              selected={selectedFeatures}
                              visibleFeatures={features}
                              forceOpen={isFiltering}
                              query={normalizedQuery}
                              onToggleFeature={toggleFeature}
                              onSetGroup={setFeatures}
                              onCoreAttempt={(f) => handleCoreAttempt(f.title)}
                              defaultOpen={group.features.some(
                                (f) => f.tier === 'core' || f.tier === 'recommended'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sticky rail — parked below the step nav so the two never collide */}
              <aside className="sticky top-[154px] hidden lg:block">
                <SummaryRail
                  tallies={tallies}
                  selectedCount={selectedCount}
                  totalCount={totalCount}
                  onContinue={() => scrollToRef(formRef)}
                  onReset={resetToRecommended}
                  onCopyLink={copyLink}
                  copied={copied}
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

            <ReviewPanel
              summary={summary}
              onRemove={toggleFeature}
              onCoreAttempt={handleCoreAttempt}
              onEdit={() => scrollToRef(featuresRef)}
              shareUrl={shareUrl}
              onCopyLink={copyLink}
              copied={copied}
            />

            <div
              className="rounded-2xl border border-surface-border p-6 md:p-8"
              style={{ background: 'var(--color-surface-overlay)' }}
            >
              <ScopeForm
                selectedTracks={selectedTracks}
                selectedFeatures={[...selectedFeatures]}
                onSuccess={() => {
                  // The scope has been sent; resuming it on the next visit
                  // would only invite a duplicate enquiry.
                  clearStoredScope();
                  stripScopeFromLocation();
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

/**
 * Says plainly why the page did not open empty. Sitting above step 01 rather
 * than in a toast, because it is a state of the page, not an event that passed.
 */
function RestoreNotice({
  source,
  featureCount,
  trackCount,
  onDismiss,
  onStartOver,
}: {
  source: RestoreSource;
  featureCount: number;
  trackCount: number;
  onDismiss: () => void;
  onStartOver: () => void;
}) {
  return (
    <div
      // Stacked on phones: side by side, the buttons leave the sentence a
      // column so narrow it wraps to one or two words a line.
      className="mt-6 flex flex-col gap-3 rounded-xl border border-surface-border p-4 sm:flex-row sm:items-center sm:gap-4"
      style={{
        background: 'var(--color-surface-overlay)',
        borderLeft: '3px solid var(--color-coral-500)',
      }}
      data-testid="restore-notice"
    >
      <p className="min-w-0 flex-1 text-[13.5px] leading-relaxed text-foreground-muted sm:pr-2">
        <span className="font-semibold text-foreground">
          {source === 'link'
            ? 'Opened from a shared link.'
            : 'Picked up where you left off.'}
        </span>{' '}
        {featureCount} feature{featureCount === 1 ? '' : 's'} across {trackCount}{' '}
        service{trackCount === 1 ? '' : 's'} are already ticked. Change anything
        you like — nothing is sent until you fill in step 03.
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex items-center gap-2 rounded-md border border-surface-border-hover px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle transition-colors duration-200 hover:border-coral-500 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Start over
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

function NoMatches({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div
      className="rounded-xl border border-surface-border px-6 py-14 text-center"
      style={{ background: 'var(--color-surface-overlay)' }}
      data-testid="no-matches"
    >
      <SearchX
        className="mx-auto h-6 w-6 text-foreground-subtle"
        aria-hidden="true"
      />
      <p className="mt-4 text-[15px] text-foreground">
        {query.trim() === ''
          ? 'Nothing matches those filters.'
          : `Nothing matches “${query.trim()}”.`}
      </p>
      <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-foreground-subtle">
        Try a plainer word, or clear the filters to see every feature again. If
        we do not list what you need, describe it in step 03 — we build it
        either way.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-lg border border-surface-border-hover px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted transition-colors duration-200 hover:border-coral-500 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
      >
        Reset filters
      </button>
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
