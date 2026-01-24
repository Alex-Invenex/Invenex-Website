"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

// TODO: Portfolio pages pending Epic 4 implementation
const featuredProjects = [
  {
    title: "CaterFlow",
    description:
      "Complete catering management platform with real-time order tracking and inventory management.",
    image: "/images/projects/caterflow.jpg",
    categories: ["Platform", "SaaS"],
    href: "/portfolio/caterflow",
    gradient: "from-purple-500/20 via-violet-500/10 to-blue-500/20",
    accentColor: "purple",
  },
  {
    title: "E-Commerce Marketplace",
    description:
      "Multi-vendor marketplace with advanced filtering, payments, and seller dashboards.",
    image: "/images/projects/ecommerce.jpg",
    categories: ["E-Commerce", "Web"],
    href: "/portfolio/ecommerce-marketplace",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    accentColor: "orange",
  },
  {
    title: "Healthcare Portal",
    description:
      "Patient management system with appointment scheduling and telemedicine integration.",
    image: "/images/projects/healthcare.jpg",
    categories: ["Healthcare", "Web"],
    href: "/portfolio/healthcare-portal",
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    accentColor: "emerald",
  },
  {
    title: "Fintech Mobile App",
    description:
      "Digital banking application with biometric authentication and real-time transactions.",
    image: "/images/projects/fintech.jpg",
    categories: ["Mobile", "Fintech"],
    href: "/portfolio/fintech-app",
    gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/20",
    accentColor: "blue",
  },
];

const accentColors: Record<string, string> = {
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export function PortfolioPreview() {
  return (
    <section className="py-24 bg-background-secondary relative overflow-hidden" aria-labelledby="portfolio-preview-title" data-testid="portfolio-preview-section">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-4">
            Our Work
          </span>
          <h2 id="portfolio-preview-title" className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-xl text-foreground-muted max-w-2xl mx-auto">
            Transforming ideas into exceptional digital experiences
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={project.href} className="block group">
                <div className="relative h-full rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`}
                    />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-grid opacity-30" />

                    {/* Centered Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ExternalLink className="w-8 h-8 text-white/70" />
                      </motion.div>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.categories.map((category) => (
                        <span
                          key={category}
                          className={`text-xs px-3 py-1 rounded-full border ${accentColors[project.accentColor]}`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-foreground-muted text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                          <ArrowUpRight className="w-5 h-5 text-foreground-muted group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
