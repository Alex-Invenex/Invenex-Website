import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero-v2";
import { TrustBar } from "@/components/sections/trust-bar";
import { LocalBusinessSchema } from "@/components/seo";
import { AmbientOrbs } from "@/components/ui";
import { BelowFoldSections } from "@/components/sections/below-fold-sections";
import { getCurrency } from "@/lib/get-currency";
import { CurrencyProvider } from "@/components/providers/currency-provider";

// Lazy-load below-the-fold sections — keeps initial JS bundle small for fast mobile loading.
// HTML is still pre-rendered at build time (SSG) for SEO; only the client JS is code-split.
const ServicesPreview = dynamic(
  () =>
    import("@/components/sections/services-preview").then(
      (m) => m.ServicesPreview
    ),
  { ssr: true }
);
const PricingTeaser = dynamic(
  () =>
    import("@/components/sections/pricing-teaser").then((m) => m.PricingTeaser),
  { ssr: true }
);
const PortfolioPreview = dynamic(
  () =>
    import("@/components/sections/portfolio-preview").then(
      (m) => m.PortfolioPreview
    ),
  { ssr: true }
);
const ProductsPreview = dynamic(
  () =>
    import("@/components/sections/products-preview").then(
      (m) => m.ProductsPreview
    ),
  { ssr: true }
);

/**
 * The homepage is a DYNAMIC route, deliberately.
 *
 * `getCurrency()` reads the `invenex.currency` cookie and the
 * `x-vercel-ip-country` edge header, which opts this route out of static
 * generation — exactly as `/pricing` does. The teaser prices must be correct
 * in the first byte of server HTML, so a Gulf visitor never sees the India
 * sheet, not even for 200ms. Do NOT add `revalidate` or `force-static`, and
 * do not move currency resolution into a client effect.
 */
export default async function HomePage() {
  const currency = await getCurrency();

  return (
    <CurrencyProvider initialCurrency={currency}>
      <LocalBusinessSchema />

      {/* Global ambient orbs - spans all sections for visual continuity */}
      <AmbientOrbs />

      <Hero />
      <TrustBar />
      <ServicesPreview />
      <PricingTeaser />
      <PortfolioPreview />
      <ProductsPreview />

      {/* Below-fold: client-only (ssr: false) to defer GSAP hydration */}
      <BelowFoldSections />
    </CurrencyProvider>
  );
}
