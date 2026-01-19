import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ProductsPreview } from "@/components/sections/products-preview";
import { WordPressPlugins } from "@/components/sections/wordpress-plugins";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { InstagramReels } from "@/components/sections/instagram-reels";
import { Testimonials } from "@/components/sections/testimonials";
import { ClientLogos } from "@/components/sections/client-logos";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <PortfolioPreview />
      <ProductsPreview />
      <WordPressPlugins />
      <WhyChooseUs />
      <InstagramReels />
      <Testimonials />
      <ClientLogos />
      <CTASection />
    </>
  );
}
