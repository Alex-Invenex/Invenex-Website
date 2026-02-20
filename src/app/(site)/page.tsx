import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero-v2";
import { LocalBusinessSchema } from "@/components/seo";
import { AmbientOrbs } from "@/components/ui";

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
const WhyChooseUs = dynamic(
  () =>
    import("@/components/sections/why-choose-us").then((m) => m.WhyChooseUs),
  { ssr: true }
);
const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then((m) => m.Testimonials),
  { ssr: true }
);
const InstagramReels = dynamic(
  () =>
    import("@/components/sections/instagram-reels").then(
      (m) => m.InstagramReels
    ),
  { ssr: true }
);
const CTASection = dynamic(
  () => import("@/components/sections/cta-section").then((m) => m.CTASection),
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
      <WhyChooseUs />
      <Testimonials />
      <InstagramReels />
      <CTASection />
    </>
  );
}
