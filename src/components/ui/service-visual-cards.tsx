/* ─── Card 1: Browser chrome with code editor ────────── */
export function WebDevCard() {
  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-4 flex-1 h-5 rounded-md bg-white/[0.04] flex items-center px-2">
          <span className="text-[8px] text-foreground-muted/30 font-mono">localhost:3000</span>
        </div>
      </div>
      <div className="p-4 font-mono text-[10px] leading-[1.8]">
        <div className="flex">
          <div className="text-foreground-muted/20 select-none pr-3 text-right" style={{ width: "24px" }}>
            1<br />2<br />3<br />4<br />5<br />6<br />7<br />8
          </div>
          <div className="flex-1 space-y-0">
            <div className="text-foreground-muted/30">{"// app/page.tsx"}</div>
            <div>
              <span className="text-purple-400/80">import</span>
              <span className="text-foreground-muted/50">{" { "}</span>
              <span className="text-coral-400">Hero</span>
              <span className="text-foreground-muted/50">{" } "}</span>
              <span className="text-purple-400/80">from</span>
              <span className="text-emerald-400/70">{" '@/components'"}</span>
            </div>
            <div className="h-[1em]" />
            <div>
              <span className="text-purple-400/80">export</span>{" "}
              <span className="text-blue-400/80">default</span>{" "}
              <span className="text-yellow-300/80">function</span>{" "}
              <span className="text-coral-400">Home</span>
              <span className="text-foreground-muted/50">{"() {"}</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400/80">return</span>{" "}
              <span className="text-foreground-muted/40">{"("}</span>
            </div>
            <div className="pl-8">
              <span className="text-foreground-muted/40">{"<"}</span>
              <span className="text-coral-400">Hero</span>
              <span className="text-emerald-400/60">{" title"}</span>
              <span className="text-foreground-muted/40">{"="}</span>
              <span className="text-amber-300/70">{'"Build"'}</span>
              <span className="text-foreground-muted/40">{" />"}</span>
            </div>
            <div className="pl-4">
              <span className="text-foreground-muted/40">{")"}</span>
            </div>
            <div className="text-foreground-muted/50">{"}"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Card 2: Phone frame with app screen ────────────── */
export function MobileAppCard() {
  return (
    <div
      className="rounded-[20px] border border-white/[0.1] overflow-hidden p-1.5"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex justify-center pt-2 pb-3">
        <div className="w-20 h-5 rounded-full bg-black border border-white/[0.06]" />
      </div>
      <div className="px-3 pb-3 space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[8px] text-foreground-muted/40 font-mono">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 rounded-sm bg-foreground-muted/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground-muted/20" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-3 rounded bg-white/[0.08]" style={{ width: "60%" }} />
          <div className="w-5 h-5 rounded-full bg-coral-500/15 border border-coral-500/20" />
        </div>
        <div className="space-y-1.5">
          <div className="rounded-lg p-2 bg-coral-500/8 border border-coral-500/15">
            <div className="h-2 w-3/4 rounded bg-coral-500/20 mb-1" />
            <div className="h-1.5 w-1/2 rounded bg-white/[0.04]" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded-lg p-2 bg-white/[0.03] border border-white/[0.06]">
              <div className="h-2 w-full rounded bg-white/[0.06] mb-1" />
              <div className="h-1.5 w-2/3 rounded bg-white/[0.03]" />
            </div>
            <div className="rounded-lg p-2 bg-white/[0.03] border border-white/[0.06]">
              <div className="h-2 w-full rounded bg-white/[0.06] mb-1" />
              <div className="h-1.5 w-2/3 rounded bg-white/[0.03]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 pb-2 pt-1">
        <div className="w-5 h-5 rounded-full bg-coral-500/20 border border-coral-500/25" />
        <div className="w-5 h-5 rounded-full bg-white/[0.06]" />
        <div className="w-5 h-5 rounded-full bg-white/[0.06]" />
        <div className="w-5 h-5 rounded-full bg-white/[0.06]" />
      </div>
      <div className="flex justify-center pb-1">
        <div className="w-24 h-1 rounded-full bg-white/[0.15]" />
      </div>
    </div>
  );
}

/* ─── Card 3: Platform dashboard mockup (static) ──────
   Decoration only. No numbers: every figure that used to sit here
   ("99.9% Uptime", "12ms latency", "0 errors") was invented for the mockup,
   and an invented number beside a real one makes the real one look invented
   too. Real feature words carry the same visual weight and claim nothing. */
export function PlatformCard() {
  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden p-5"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-foreground-muted/50 font-mono">
          CaterFlow
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>
      <div className="flex items-end gap-2 mb-4" style={{ height: "55px" }}>
        {[50, 70, 55, 85, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: "linear-gradient(to top, var(--color-coral-600), var(--color-coral-400))",
              opacity: 0.65 + i * 0.08,
            }}
          />
        ))}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-foreground">
          Order dashboard
        </span>
      </div>
      <div className="flex gap-2 mt-3">
        {["Orders", "Inventory", "Reports"].map((label) => (
          <span
            key={label}
            className="text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-foreground-muted/50 font-mono"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Card 4: E-commerce storefront mockup ───────────── */
export function ECommerceCard() {
  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-4 flex-1 h-5 rounded-md bg-white/[0.04] flex items-center px-2">
          <span className="text-[8px] text-foreground-muted/30 font-mono">store.yourbrand.com</span>
        </div>
      </div>
      {/* Product grid — placeholder tiles, no invented prices. A mockup
          price reads as a real price, and there is no real one to show. */}
      <div className="p-3 grid grid-cols-2 gap-2">
        {[
          { color: "rgba(255,107,53,0.08)" },
          { color: "rgba(139,92,246,0.08)" },
          { color: "rgba(59,130,246,0.08)" },
          { color: "rgba(16,185,129,0.08)" },
        ].map((item, i) => (
          <div key={i} className="rounded-lg border border-white/[0.06] p-2" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div
              className="rounded mb-1.5"
              style={{ aspectRatio: "1", background: item.color }}
            />
            <div className="h-1.5 w-3/4 rounded bg-white/[0.08] mb-1" />
            <span className="text-[9px] font-mono text-foreground-muted/40">In stock</span>
          </div>
        ))}
      </div>
      {/* Checkout bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded flex items-center justify-center"
            style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.25)" }}
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-coral-400" />
          </div>
          <span className="text-[9px] text-foreground-muted/60 font-mono">Cart</span>
        </div>
        <span className="text-[10px] font-mono font-semibold text-coral-400">Checkout</span>
      </div>
    </div>
  );
}

/* ─── Card 5: Social media engagement dashboard ──────── */
export function SocialMediaCard() {
  // `width` is layout only — a mockup bar, never labelled with a figure.
  // The follower count and engagement percentages that used to sit here were
  // invented, so they are gone rather than dressed up.
  const platforms = [
    { name: "Instagram", width: 85, color: "#E4405F" },
    { name: "LinkedIn", width: 62, color: "#0077B5" },
    { name: "Twitter", width: 48, color: "#1DA1F2" },
  ];

  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden p-5"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-foreground-muted/50 font-mono">
          Channels
        </span>
        <span className="text-[9px] text-foreground-muted/40 font-mono">Monthly</span>
      </div>
      {/* Channel bars — unlabelled by design */}
      <div className="space-y-3 mb-4">
        {platforms.map(({ name, width, color }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-foreground-muted/60 font-mono">{name}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${width}%`, background: color, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* What actually ships each month */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-lg font-semibold text-foreground">Content calendar</span>
      </div>
      {/* Content-type chips */}
      <div className="flex gap-2">
        {["Reels", "Posts", "Stories"].map((tag) => (
          <span
            key={tag}
            className="text-[9px] px-2 py-0.5 rounded text-foreground-muted/50 font-mono"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Card 6: Analytics trend chart (static) ─────────── */
export function StrategyCard() {
  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden p-5"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-foreground-muted/50 font-mono">
          Roadmap
        </span>
      </div>
      <svg
        viewBox="0 0 140 50"
        className="w-full mb-4"
        style={{ height: "50px" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="svcTrendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-coral-500)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-coral-500)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="12" x2="140" y2="12" stroke="rgba(255,255,255,0.03)" />
        <line x1="0" y1="25" x2="140" y2="25" stroke="rgba(255,255,255,0.03)" />
        <line x1="0" y1="38" x2="140" y2="38" stroke="rgba(255,255,255,0.03)" />
        <path
          d="M0 42 C15 40, 25 38, 35 35 S55 28, 65 22 S85 15, 100 10 S125 5, 140 2"
          fill="none"
          stroke="var(--color-coral-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0 42 C15 40, 25 38, 35 35 S55 28, 65 22 S85 15, 100 10 S125 5, 140 2 V50 H0 Z"
          fill="url(#svcTrendFill)"
        />
        <circle cx="140" cy="2" r="3" fill="var(--color-coral-500)" />
        <circle cx="140" cy="2" r="5" fill="var(--color-coral-500)" opacity="0.3" />
      </svg>
      {/* The trend line above is deliberately unlabelled: it shows direction,
          not a measured result. "+127%" belongs on Ziera's case study, where
          it has a client's name attached to it. */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-lg font-semibold text-foreground">Quarterly plan</span>
      </div>
      <div className="flex gap-2">
        {["Research", "Positioning", "Roadmap"].map((label) => (
          <span
            key={label}
            className="text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-foreground-muted/50 font-mono"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Visual cards indexed by service ────────────────── */
export const VISUAL_CARDS = [WebDevCard, MobileAppCard, PlatformCard, ECommerceCard, SocialMediaCard, StrategyCard];
