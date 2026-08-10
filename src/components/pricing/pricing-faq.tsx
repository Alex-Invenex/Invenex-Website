import { Price } from "@/components/pricing/price";
import { OUT_OF_SCOPE_RATE, PAYMENT_TERMS } from "@/lib/pricing";

const [deposit, midpoint, launch] = PAYMENT_TERMS;

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do payments work?",
    answer: (
      <>
        {deposit.share}% to start, {midpoint.share}% at design sign-off,{" "}
        {launch.share}% on launch day — not thirty days after. The first
        payment is what reserves your build slot, which is why we
        can&rsquo;t start without it.
      </>
    ),
  },
  {
    question: "What if we need something outside the agreed scope?",
    answer: (
      <>
        Happy to do it — that&rsquo;s{" "}
        <Price amount={OUT_OF_SCOPE_RATE.hourly} suffix=" an hour" />,
        minimum four hours, and we&rsquo;ll send
        an estimate in writing before starting. The project price stays
        fixed; only the scope moves.
      </>
    ),
  },
  {
    question: "Who owns the code?",
    answer: (
      <>
        You do, in your own repository, from day one. Not at the end, not on
        final payment. Ask any other agency this question before you sign
        with them.
      </>
    ),
  },
  {
    question: "Can we pay after launch?",
    answer: (
      <>
        No — and it&rsquo;s better for you that way. Taking {deposit.share}%
        up front means we&rsquo;ve blocked our calendar for you and can&rsquo;t sell
        that slot. An agency paid only at the end is rewarded for stretching
        the timeline; we&rsquo;re rewarded for shipping. If cash flow is
        tight, we&rsquo;ll split it four ways instead of three.
      </>
    ),
  },
  {
    question: "Why are your prices different in different countries?",
    answer: (
      <>
        The scope is different. Engagements outside India include a named
        project manager, overlapping working hours and a contractual
        24-hour response time. If you&rsquo;d like the India scope at the
        India price, that&rsquo;s available too — just ask.
      </>
    ),
  },
  {
    question: "What happens after launch?",
    answer: (
      <>
        Growth and Platform builds include your first month of Momentum
        care. After that it&rsquo;s optional, and about six in ten clients
        keep it. We&rsquo;ll tell you plainly if we don&rsquo;t think you
        need it.
      </>
    ),
  },
];

/**
 * Pricing FAQ -- copy deck §6, verbatim except for the out-of-scope hourly
 * rate and the payment split, both pulled from `lib/pricing.ts` so this
 * component never hardcodes a price literal.
 */
export function PricingFaq({ className }: { className?: string } = {}) {
  return (
    <section className={className}>
      <h2 className="text-h4 font-semibold text-foreground">Pricing FAQ</h2>

      <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="group px-6 py-5">
            <summary
              className={[
                "flex cursor-pointer list-none items-center justify-between gap-4",
                "text-body font-medium text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              ].join(" ")}
            >
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-coral-500 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="mt-3 text-body-sm text-foreground-muted">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
