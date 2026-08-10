/**
 * Scope persistence — brings a selection back on a return visit, and turns one
 * into a link the customer can pass to a colleague.
 *
 * Link form:  /build-your-project?scope=web.1-9.12_mkt.1-6
 *   · one segment per chosen service, joined by "_"
 *   · a segment is the lowercased service code plus its feature numbers
 *   · runs collapse into ranges, so even a full 225-feature scope stays short
 *   · a service with nothing ticked keeps a bare segment ("web"), so the panel
 *     it opened in step 02 comes back with it
 *
 * Every ID is re-checked against the catalog on the way in, and the core
 * features of each service are re-added afterwards. An old or hand-edited link
 * can therefore only ever produce a valid selection — never a feature that
 * does not exist, and never a build missing something it cannot ship without.
 */

import {
  scopeTracks,
  featureIndex,
  featureIdsForTrack,
  coreFeatureIdsForTrack,
} from './scope-catalog';

export interface ScopeSelection {
  tracks: string[];
  features: string[];
}

/** Query parameter carrying a shared scope. */
export const SCOPE_QUERY_KEY = 'scope';

const STORAGE_KEY = 'invenex.scope.v1';

/** A saved scope goes stale — pricing and the catalog both move on. */
const STORAGE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/** Enough for every feature in the catalog several times over. */
const MAX_PAYLOAD_LENGTH = 2048;

const codeByTrack = new Map(
  scopeTracks.map((track) => [track.id, track.code.toLowerCase()] as const)
);

const trackByCode = new Map(
  scopeTracks.map((track) => [track.code.toLowerCase(), track.id] as const)
);

/* ── Encoding ────────────────────────────────────────────── */

/** "WEB-12" → 12. Null for anything that is not a catalog ID. */
function featureNumber(id: string): number | null {
  const match = /-(\d+)$/.exec(id);
  return match ? Number(match[1]) : null;
}

/** [1,2,3,7,9,10] → ["1-3","7","9-10"] */
function collapseRuns(numbers: number[]): string[] {
  const out: string[] = [];
  let start = 0;

  for (let i = 0; i < numbers.length; i++) {
    const isLast = i === numbers.length - 1;
    if (isLast || numbers[i + 1] !== numbers[i] + 1) {
      out.push(
        i === start ? String(numbers[start]) : `${numbers[start]}-${numbers[i]}`
      );
      start = i + 1;
    }
  }

  return out;
}

export function encodeScope(selection: ScopeSelection): string {
  const chosen = new Set(selection.features);
  const wanted = new Set(selection.tracks);

  return scopeTracks
    .filter((track) => wanted.has(track.id))
    .map((track) => {
      const code = codeByTrack.get(track.id)!;
      const numbers = featureIdsForTrack(track.id)
        .filter((id) => chosen.has(id))
        .map(featureNumber)
        .filter((n): n is number => n !== null)
        .sort((a, b) => a - b);

      return numbers.length === 0
        ? code
        : `${code}.${collapseRuns(numbers).join('.')}`;
    })
    .join('_');
}

/* ── Decoding ────────────────────────────────────────────── */

/** "1-3" → [1,2,3]. Rejects anything malformed or absurdly wide. */
function expandRun(token: string): number[] {
  const match = /^(\d{1,3})(?:-(\d{1,3}))?$/.exec(token);
  if (!match) return [];

  const from = Number(match[1]);
  const to = match[2] === undefined ? from : Number(match[2]);
  if (to < from || to - from > 250) return [];

  const out: number[] = [];
  for (let n = from; n <= to; n++) out.push(n);
  return out;
}

/**
 * Rebuilds a catalog ID from a service code and a number, so a decoded feature
 * can only ever belong to the service whose segment it appeared in.
 * IDs are two-digit today; the unpadded form is tried too so a future
 * three-digit band keeps working.
 */
function catalogId(code: string, n: number): string | null {
  const upper = code.toUpperCase();
  const padded = `${upper}-${String(n).padStart(2, '0')}`;
  if (featureIndex.has(padded)) return padded;
  const plain = `${upper}-${n}`;
  return featureIndex.has(plain) ? plain : null;
}

export function decodeScope(raw: string | null | undefined): ScopeSelection | null {
  if (!raw || raw.length > MAX_PAYLOAD_LENGTH) return null;

  const tracks: string[] = [];
  const features = new Set<string>();

  for (const segment of raw.split('_')) {
    const [code, ...runs] = segment.split('.');
    const trackId = trackByCode.get(code.toLowerCase());
    if (!trackId || tracks.includes(trackId)) continue;

    tracks.push(trackId);

    for (const run of runs) {
      for (const n of expandRun(run)) {
        const id = catalogId(code, n);
        if (id) features.add(id);
      }
    }

    // Core features are not the customer's to drop, whatever the link says.
    for (const id of coreFeatureIdsForTrack(trackId)) features.add(id);
  }

  return tracks.length === 0 ? null : { tracks, features: [...features] };
}

/* ── Sharing ─────────────────────────────────────────────── */

/** Absolute link to the current page carrying this selection. */
export function buildShareUrl(selection: ScopeSelection): string {
  const payload = encodeScope(selection);
  const url = new URL(window.location.href);
  url.hash = '';
  url.search = payload ? `${SCOPE_QUERY_KEY}=${payload}` : '';
  return url.toString();
}

/** The scope in the address bar, if someone arrived on a shared link. */
export function readScopeFromLocation(): ScopeSelection | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return decodeScope(params.get(SCOPE_QUERY_KEY));
}

/**
 * Drops the scope parameter without a navigation. Once the selection is in
 * state and saved locally, leaving the link in the URL only means a reload
 * would throw away whatever the customer changed since arriving.
 */
export function stripScopeFromLocation(): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has(SCOPE_QUERY_KEY)) return;
  url.searchParams.delete(SCOPE_QUERY_KEY);
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

/* ── Local persistence ───────────────────────────────────── */

interface StoredScope {
  v: 1;
  scope: string;
  savedAt: number;
}

/** Best-effort save. Private browsing and full quotas are not errors here. */
export function storeScope(selection: ScopeSelection): void {
  if (typeof window === 'undefined') return;
  try {
    const payload: StoredScope = {
      v: 1,
      scope: encodeScope(selection),
      savedAt: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* storage unavailable — the builder still works, it just will not resume */
  }
}

export function loadStoredScope(): ScopeSelection | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      (parsed as StoredScope).v !== 1 ||
      typeof (parsed as StoredScope).scope !== 'string'
    ) {
      return null;
    }

    const { scope, savedAt } = parsed as StoredScope;
    if (typeof savedAt === 'number' && Date.now() - savedAt > STORAGE_MAX_AGE_MS) {
      clearStoredScope();
      return null;
    }

    return decodeScope(scope);
  } catch {
    return null;
  }
}

export function clearStoredScope(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to do */
  }
}
