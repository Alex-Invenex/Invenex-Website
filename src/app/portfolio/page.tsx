import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ProjectGrid } from "@/components/sections/project-grid";
import type { Project } from "@/components/ui/project-card";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse our portfolio of web, mobile, and platform development projects. See how we transform ideas into exceptional digital experiences.",
};

// Sample projects data - will be replaced with CMS data in Epic 7
const projects: Project[] = [
  {
    id: "1",
    title: "CaterFlow",
    client: "Internal Product",
    category: "Platform",
    excerpt:
      "Complete catering management platform with real-time order tracking, inventory management, and staff scheduling.",
    image: "/images/projects/caterflow.jpg",
    slug: "caterflow",
  },
  {
    id: "2",
    title: "E-Commerce Marketplace",
    client: "RetailTech Inc.",
    category: "E-Commerce",
    excerpt:
      "Multi-vendor marketplace with advanced filtering, secure payments, and comprehensive seller dashboards.",
    image: "/images/projects/ecommerce.jpg",
    slug: "ecommerce-marketplace",
  },
  {
    id: "3",
    title: "Healthcare Portal",
    client: "MedCare Solutions",
    category: "Web",
    excerpt:
      "Patient management system with appointment scheduling, telemedicine integration, and electronic health records.",
    image: "/images/projects/healthcare.jpg",
    slug: "healthcare-portal",
  },
  {
    id: "4",
    title: "Fintech Mobile App",
    client: "PaySecure Bank",
    category: "Mobile",
    excerpt:
      "Digital banking application with biometric authentication, real-time transactions, and investment tracking.",
    image: "/images/projects/fintech.jpg",
    slug: "fintech-app",
  },
  {
    id: "5",
    title: "Logistics Dashboard",
    client: "SwiftShip Logistics",
    category: "Platform",
    excerpt:
      "Real-time fleet management dashboard with route optimization, delivery tracking, and analytics.",
    image: "/images/projects/logistics.jpg",
    slug: "logistics-dashboard",
  },
  {
    id: "6",
    title: "Restaurant Ordering App",
    client: "FoodieChain",
    category: "Mobile",
    excerpt:
      "White-label mobile ordering solution for restaurants with loyalty programs and push notifications.",
    image: "/images/projects/restaurant.jpg",
    slug: "restaurant-app",
  },
  {
    id: "7",
    title: "Fashion E-Store",
    client: "StyleHub Fashion",
    category: "E-Commerce",
    excerpt:
      "Modern fashion e-commerce platform with virtual try-on, size recommendations, and social shopping features.",
    image: "/images/projects/fashion.jpg",
    slug: "fashion-estore",
  },
  {
    id: "8",
    title: "Corporate Website",
    client: "TechCorp Industries",
    category: "Web",
    excerpt:
      "Enterprise corporate website with multilingual support, investor relations portal, and career section.",
    image: "/images/projects/corporate.jpg",
    slug: "corporate-website",
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
