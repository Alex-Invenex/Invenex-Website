'use client'

import { useEffect, useId, useRef, useState } from 'react'

interface CalEmbedProps {
  /** Cal.com event link, e.g. "invenex/15min" — no leading slash, no domain. */
  link: string
}

type Status = 'loading' | 'ready' | 'error'

const EMBED_SCRIPT_SRC = 'https://app.cal.com/embed/embed.js'

/** How long we wait for the loader script before giving up and showing the
 *  fallback link. Generous — a slow connection should still get the real
 *  embed rather than being bounced to the fallback needlessly. */
const READY_TIMEOUT_MS = 8000

type CalQueueable = {
  (...args: unknown[]): void
  q?: unknown[][]
}

type CalGlobal = {
  (...args: unknown[]): void
  loaded?: boolean
  ns: Record<string, CalQueueable>
  q?: unknown[][]
}

declare global {
  interface Window {
    Cal?: CalGlobal
  }
}

/**
 * Bootstraps `window.Cal` — the vanilla loader Cal.com publishes for sites
 * that don't want the `@calcom/embed-react` package (see
 * https://cal.com/docs, "Embed snippet"). Every call to the resulting `Cal`
 * function is queued (`.q`) until the real `embed.js` finishes loading and
 * drains it, so it is always safe to call `Cal(...)` immediately — before,
 * during, or after the script tag resolves.
 *
 * Idempotent: a second `<CalEmbed>` on the same page reuses the existing
 * loader instead of injecting a second `<script>` tag. `onLoad`/`onError`
 * only fire for the caller that actually creates the script; a caller that
 * finds the loader already present is told "loaded" immediately, since a
 * prior instance already got (or is getting) the real signal.
 */
function ensureCalLoader(onLoad: () => void, onError: () => void): CalGlobal {
  const existing = window.Cal
  if (existing?.loaded) {
    onLoad()
    return existing
  }

  const push = (target: { q?: unknown[][] }, args: unknown[]) => {
    target.q = target.q || []
    target.q.push(args)
  }

  const cal = ((...args: unknown[]) => {
    if (args[0] === 'init') {
      const namespace = args[1]
      if (typeof namespace === 'string') {
        const api: CalQueueable = (...a: unknown[]) => push(api, a)
        cal.ns[namespace] = cal.ns[namespace] || api
        push(cal.ns[namespace], args)
        push(cal, ['initNamespace', namespace])
      } else {
        push(cal, args)
      }
      return
    }
    push(cal, args)
  }) as CalGlobal
  cal.ns = {}
  cal.q = []

  window.Cal = cal

  const script = document.createElement('script')
  script.src = EMBED_SCRIPT_SRC
  script.async = true
  script.onload = () => {
    cal.loaded = true
    onLoad()
  }
  script.onerror = onError
  document.head.appendChild(script)

  return cal
}

/**
 * Inline Cal.com booking embed for the 15-minute fit call.
 *
 * Ships dormant today — `calLink` in `site-config.ts` is `null` until
 * `NEXT_PUBLIC_CAL_LINK` is set, so `<ContactClient>` never mounts this. It
 * still has to be sound the day that env var appears: no npm dependency, no
 * flash of a broken iframe, and a real fallback (a plain link to the same
 * booking page) if the script can't load — an ad-blocker, a network blip, a
 * CSP that hasn't allowlisted `app.cal.com` yet.
 */
export function CalEmbed({ link }: CalEmbedProps) {
  const rawId = useId().replace(/:/g, '')
  const containerId = `cal-embed-${rawId}`
  const namespaceRef = useRef(`contact-${rawId}`)
  const [status, setStatus] = useState<Status>('loading')
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    let cancelled = false
    const namespace = namespaceRef.current

    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === 'loading' ? 'error' : s))
    }, READY_TIMEOUT_MS)

    const handleLoad = () => {
      if (cancelled) return
      window.clearTimeout(timeout)
      setStatus('ready')

      const cal = window.Cal
      if (!cal) return
      cal('init', namespace, { origin: 'https://app.cal.com' })
      cal.ns[namespace]('inline', {
        elementOrSelector: `#${containerId}`,
        calLink: link,
        config: { theme: 'dark', layout: 'month_view' },
      })
      cal.ns[namespace]('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    }

    const handleError = () => {
      if (!cancelled) {
        window.clearTimeout(timeout)
        setStatus('error')
      }
    }

    try {
      // `Cal(...)` always queues regardless of load state, so calling it
      // immediately (inside handleLoad, once we know the loader exists) is
      // the documented pattern — no need to wait for the queue to drain.
      ensureCalLoader(handleLoad, handleError)
    } catch {
      handleError()
    }

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
    // `link` and `containerId` are stable for the lifetime of this instance
    // (containerId derives from useId, link is a static env-sourced prop) —
    // re-running this effect would double-init the same Cal namespace.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'error') {
    return (
      <a
        href={`https://cal.com/${link}`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="cal-embed-fallback"
        className="inline-flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-8 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] transition-all duration-normal hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
      >
        Book my 15 minutes
      </a>
    )
  }

  return (
    <div className="relative" data-testid="cal-embed">
      {status === 'loading' && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl border border-surface-border"
          style={{ background: 'var(--color-surface-overlay)' }}
          aria-hidden="true"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-coral-500 border-t-transparent" />
        </div>
      )}
      <div
        id={containerId}
        className="min-h-[480px] w-full overflow-hidden rounded-2xl"
      />
    </div>
  )
}
