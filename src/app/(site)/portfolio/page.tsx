import { BentoPortfolioGrid } from "@/components/sections/bento-portfolio-grid";
import { getSimpleProjects } from "@/lib/projects";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Our Work",
  description:
    "Browse our portfolio of web, mobile, and platform development projects. See how Invenex transforms ideas into exceptional digital experiences.",
  path: "/portfolio",
});

// Get projects from shared data source
const projects = getSimpleProjects();

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        aria-labelledby="portfolio-hero-title"
        data-testid="portfolio-hero"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-coral-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-coral-400/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-6">
            Portfolio
          </span>
          <h1
            id="portfolio-hero-title"
            className="text-5xl md:text-6xl font-bold"
          >
            Our <span className="text-gradient">Work</span>
          </h1>
          <p
            className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto"
            data-testid="project-count"
          >
            {projects.length} Projects delivered with excellence
          </p>
        </div>
      </section>

      {/* Bento Portfolio Grid */}
      <BentoPortfolioGrid projects={projects} />
    </>
  );
}
