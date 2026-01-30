import { Hero } from "@/components/sections/hero-v2";
import { ServicesPreview } from "@/components/sections/services-preview";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ProductsPreview } from "@/components/sections/products-preview";
import { WordPressPlugins } from "@/components/sections/wordpress-plugins";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { InstagramReels } from "@/components/sections/instagram-reels";
import { Testimonials } from "@/components/sections/testimonials";
import { ClientLogos } from "@/components/sections/client-logos";
import { CTASection } from "@/components/sections/cta-section";
import { LocalBusinessSchema } from "@/components/seo";
import {
  AmbientOrbs,
  WaveDivider,
  CurvedDivider,
  DiagonalDivider,
  SectionTransition,
} from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />

      {/* Global ambient orbs - spans all sections for visual continuity (Story 9.8) */}
      <AmbientOrbs />

      {/* Hero - bg-background */}
      <Hero />

      {/* Divider: bg-background → bg-background-secondary */}
      <WaveDivider
        topColor="var(--color-background)"
        bottomColor="var(--color-background-secondary)"
      />

      {/* Services - bg-background-secondary with gradient transition */}
      <SectionTransition
        topGradient
        backgroundColor="var(--color-background-secondary)"
        gradientHeight={150}
      >
        <ServicesPreview />
      </SectionTransition>

      {/* Divider: bg-background-secondary → bg-background */}
      <DiagonalDivider
        topColor="var(--color-background-secondary)"
        bottomColor="var(--color-background)"
      />

      {/* Portfolio - bg-background with gradient transition */}
      <SectionTransition
        topGradient
        backgroundColor="var(--color-background)"
        gradientHeight={150}
      >
        <PortfolioPreview />
      </SectionTransition>

      {/* Divider: bg-background → bg-background-secondary */}
      <CurvedDivider
        topColor="var(--color-background)"
        bottomColor="var(--color-background-secondary)"
      />

      {/* Products - bg-background-secondary */}
      <ProductsPreview />

      {/* Divider: bg-background-secondary → bg-background */}
      <WaveDivider
        topColor="var(--color-background-secondary)"
        bottomColor="var(--color-background)"
        flip
      />

      {/* WordPress Plugins - bg-background */}
      <WordPressPlugins />

      {/* Divider: bg-background → bg-background-secondary */}
      <DiagonalDivider
        topColor="var(--color-background)"
        bottomColor="var(--color-background-secondary)"
        flip
      />

      {/* Why Choose Us - bg-background-secondary */}
      <WhyChooseUs />

      {/* Divider: bg-background-secondary → bg-background */}
      <CurvedDivider
        topColor="var(--color-background-secondary)"
        bottomColor="var(--color-background)"
        flip
      />

      {/* Instagram Reels - bg-background */}
      <InstagramReels />

      {/* Divider: bg-background → bg-background-secondary */}
      <WaveDivider
        topColor="var(--color-background)"
        bottomColor="var(--color-background-secondary)"
      />

      {/* Testimonials - bg-background-secondary with gradient transition */}
      <SectionTransition
        topGradient
        backgroundColor="var(--color-background-secondary)"
        gradientHeight={150}
      >
        <Testimonials />
      </SectionTransition>

      {/* Divider: bg-background-secondary → bg-background */}
      <DiagonalDivider
        topColor="var(--color-background-secondary)"
        bottomColor="var(--color-background)"
      />

      {/* Client Logos - bg-background */}
      <ClientLogos />

      {/* Visual separator before CTA - subtle curve adds rhythm without color change */}
      <CurvedDivider
        topColor="var(--color-background)"
        bottomColor="var(--color-background-tertiary)"
      />

      {/* CTA Section - bg-background with gradient transition */}
      <SectionTransition
        topGradient
        backgroundColor="var(--color-background)"
        gradientHeight={150}
      >
        <CTASection />
      </SectionTransition>
    </>
  );
}
