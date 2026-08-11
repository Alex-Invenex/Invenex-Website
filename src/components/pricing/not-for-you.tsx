import { Price } from "@/components/pricing/price";
import { TIERS } from "@/lib/pricing";

const launchpad = TIERS.find((tier) => tier.id === "launchpad")!;

/**
 * "We're probably not for you if…" -- copy deck §4, verbatim, three items
 * only. Do not soften the wording. The ₹48,000 figure is pulled from
 * `TIERS` (the Launchpad price) rather than hardcoded, so it can never drift
 * from the published price.
 */
export function NotForYou({ className }: { className?: string } = {}) {
  return (
    // Deliberately plain: no glass, no glow, no card. This section works
    // because it reads as someone talking straight, and decoration would
    // undo that.
    <section className={className}>
      <h2 className="pr-display text-h4 font-semibold text-foreground">
        We&rsquo;re probably not for you if&hellip;
      </h2>

      <ul className="mt-8 space-y-6">
        <li className="border-l-2 border-white/10 pl-5 text-body leading-relaxed text-foreground-muted">
          <strong className="text-foreground">
            You need it in under three weeks.
          </strong>{" "}
          Good work takes the time it takes, and we&rsquo;d rather say no
          than ship you something half-finished.
        </li>
        <li className="border-l-2 border-white/10 pl-5 text-body leading-relaxed text-foreground-muted">
          <strong className="text-foreground">
            Your budget is under <Price amount={launchpad.price} />.
          </strong>{" "}
          Below that we can&rsquo;t build something we&rsquo;d put our name
          on. Wix or Squarespace will serve you better, genuinely.
        </li>
        <li className="border-l-2 border-white/10 pl-5 text-body leading-relaxed text-foreground-muted">
          <strong className="text-foreground">
            You want us to make the business decisions too.
          </strong>{" "}
          We&rsquo;ll advise hard, but you know your customers better than we
          ever will.
        </li>
      </ul>
    </section>
  );
}
