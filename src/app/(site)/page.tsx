import { Hero } from "@/components/sections/hero-v2";
import { ServicesPreview } from "@/components/sections/services-preview";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ProductsPreview } from "@/components/sections/products-preview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramReels } from "@/components/sections/instagram-reels";
import { CTASection } from "@/components/sections/cta-section";
import { LocalBusinessSchema } from "@/components/seo";
import { AmbientOrbs } from "@/components/ui";

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
