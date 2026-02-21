import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero-v2";
import { LocalBusinessSchema } from "@/components/seo";
import { AmbientOrbs } from "@/components/ui";
import { BelowFoldSections } from "@/components/sections/below-fold-sections";

// Lazy-load below-the-fold sections — keeps initial JS bundle small for fast mobile loading.
// HTML is still pre-rendered at build time (SSG) for SEO; only the client JS is code-split.
const ServicesPreview = dynamic(
  () =>
    import("@/components/sections/services-preview").then(
      (m) => m.ServicesPreview
    ),
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

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />

      {/* Global ambient orbs - spans all sections for visual continuity */}
      <AmbientOrbs />

      <Hero />
      <ServicesPreview />
      <PortfolioPreview />
      <ProductsPreview />

      {/* Below-fold: client-only (ssr: false) to defer GSAP hydration */}
      <BelowFoldSections />
    </>
  );
}
