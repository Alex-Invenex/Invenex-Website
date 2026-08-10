/**
 * Trust bar — the quiet row of client names that sits directly under the hero.
 *
 * Seven named businesses are the strongest proof on the site, so this is
 * deliberately understated: no logos, no claims, no numbers. It matches the
 * muted client-ticker aesthetic in `testimonials.tsx` (mono uppercase
 * micro-label above, low-contrast names below).
 *
 * Server component on purpose — the names must exist in the first byte of
 * server HTML, and no `[data-animate]` attribute is used, so nothing here can
 * ever be left invisible by a GSAP timeline that failed to run.
 */

const CLIENTS = [
  'Al Shahama',
  'Ziera',
  'AutoAssist',
  'OnMyWay',
  'Emergence',
  'CoolTech',
  'Ahazz Designs',
] as const;

export function TrustBar() {
  return (
    <section
      className="relative bg-background py-10 md:py-14"
      aria-labelledby="trust-bar-label"
      data-testid="trust-bar"
    >
      <div className="container mx-auto px-6">
        <p
          id="trust-bar-label"
          className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-subtle md:text-xs"
        >
          Trusted across the Gulf and India
        </p>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mt-6 md:gap-x-8">
          {CLIENTS.map((name, i) => (
            <li key={name} className="flex items-center gap-x-5 md:gap-x-8">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden text-foreground-subtle/40 sm:inline"
                >
                  ·
                </span>
              )}
              <span className="whitespace-nowrap text-sm font-medium text-foreground-muted/50 transition-colors duration-300 hover:text-foreground-muted/80 md:text-base">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
