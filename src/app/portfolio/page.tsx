import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ProjectGrid } from "@/components/sections/project-grid";
import type { Project } from "@/components/ui/project-card";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse our portfolio of web, mobile, and platform development projects. See how we transform ideas into exceptional digital experiences.",
};

// Real portfolio projects - will be managed via CMS in Epic 7
const projects: Project[] = [
  // Portfolio Websites (Web)
  {
    id: "1",
    title: "CoolTech International",
    client: "CoolTech International",
    category: "Web",
    excerpt:
      "Corporate website for an international technology solutions company with modern design and seamless user experience.",
    image: "/images/projects/cooltech.jpg",
    slug: "cooltech-international",
    url: "https://cooltechintl.com",
  },
  {
    id: "2",
    title: "Ginger Designs",
    client: "Ginger Designs UAE",
    category: "Web",
    excerpt:
      "Creative agency website showcasing interior design and branding services in the UAE market.",
    image: "/images/projects/ginger.jpg",
    slug: "ginger-designs",
    url: "https://gingerdesigns.ae",
  },
  {
    id: "3",
    title: "Ahazz Designs",
    client: "Ahazz Designs UAE",
    category: "Web",
    excerpt:
      "Portfolio website for a UAE-based design studio featuring elegant layouts and project showcases.",
    image: "/images/projects/ahazz.jpg",
    slug: "ahazz-designs",
    url: "https://ahazzdesigns.ae",
  },
  {
    id: "4",
    title: "EaseMyFly",
    client: "EaseMyFly",
    category: "Web",
    excerpt:
      "Travel booking platform with flight search, comparison tools, and seamless reservation management.",
    image: "/images/projects/easemyfly.jpg",
    slug: "easemyfly",
    url: "https://easemyfly.com",
  },
  {
    id: "5",
    title: "La Mirage",
    client: "La Mirage Restaurant",
    category: "Web",
    excerpt:
      "Elegant restaurant website with online reservations, menu showcase, and event booking capabilities.",
    image: "/images/projects/lamirage.jpg",
    slug: "la-mirage",
    url: "https://la-mirage.in",
  },
  {
    id: "6",
    title: "GrabToGo",
    client: "GrabToGo",
    category: "Platform",
    excerpt:
      "Deals and offers aggregation platform helping users discover the best local promotions and discounts.",
    image: "/images/projects/grabtogo.jpg",
    slug: "grabtogo",
    url: "https://www.grabtogo.in",
  },
  {
    id: "7",
    title: "Babbage Solutions",
    client: "Babbage Solutions",
    category: "Web",
    excerpt:
      "Technology consulting firm website with service showcases, case studies, and client testimonials.",
    image: "/images/projects/babbage.jpg",
    slug: "babbage-solutions",
    url: "https://babbagesolutions.in",
  },
  {
    id: "8",
    title: "Molvexa",
    client: "Molvexa",
    category: "Web",
    excerpt:
      "Modern corporate website with clean aesthetics and comprehensive business information architecture.",
    image: "/images/projects/molvexa.jpg",
    slug: "molvexa",
    url: "https://molvexa.com",
  },
  {
    id: "9",
    title: "Emergence",
    client: "Emergence UAE",
    category: "Web",
    excerpt:
      "Professional services website for a UAE-based company with multilingual support and regional focus.",
    image: "/images/projects/emergence.jpg",
    slug: "emergence",
    url: "https://emergence.ae",
  },
  {
    id: "10",
    title: "OnMyWay AI",
    client: "OnMyWay AI",
    category: "Platform",
    excerpt:
      "AI-powered travel and logistics platform with intelligent route optimization and real-time tracking.",
    image: "/images/projects/onmyway.jpg",
    slug: "onmyway-ai",
    url: "https://onmyway.ai",
  },
  // E-Commerce Websites
  {
    id: "11",
    title: "Al Shahama Marine",
    client: "Al Shahama Marine",
    category: "E-Commerce",
    excerpt:
      "Marine equipment and supplies e-commerce store with product catalog, inventory management, and secure checkout.",
    image: "/images/projects/alshahama.jpg",
    slug: "alshahama-marine",
    url: "https://alshahamamarine.com",
  },
  {
    id: "12",
    title: "Q by Rayeesa",
    client: "Q by Rayeesa",
    category: "E-Commerce",
    excerpt:
      "Fashion and lifestyle e-commerce boutique with elegant product displays and seamless shopping experience.",
    image: "/images/projects/qbyrayeesa.jpg",
    slug: "q-by-rayeesa",
    url: "https://qbyrayeesa.com",
  },
  {
    id: "13",
    title: "Ziera Inc",
    client: "Ziera Inc",
    category: "E-Commerce",
    excerpt:
      "Online retail platform with advanced product filtering, customer reviews, and integrated payment solutions.",
    image: "/images/projects/ziera.jpg",
    slug: "ziera-inc",
    url: "https://zierainc.com",
  },
  {
    id: "14",
    title: "AA Rent A Car",
    client: "AA Rent A Car",
    category: "E-Commerce",
    excerpt:
      "Car rental booking platform with vehicle catalog, availability calendar, and online reservation system.",
    image: "/images/projects/aarentacar.jpg",
    slug: "aa-rentacar",
    url: "https://aa-rentacar.com",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        aria-labelledby="portfolio-hero-title"
        data-testid="portfolio-hero-section"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-6">
              Portfolio
            </span>
            <h1
              id="portfolio-hero-title"
              className="text-5xl md:text-6xl font-bold"
            >
              Our <span className="text-gradient">Work</span>
            </h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              {projects.length} projects delivered with excellence
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Grid */}
      <ProjectGrid projects={projects} />
    </>
  );
}
