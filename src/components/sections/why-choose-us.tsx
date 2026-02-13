"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Users, Rocket } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const differentiators = [
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description:
      "We use the latest frameworks and tools to build fast, scalable, and future-proof solutions.",
    highlight: "Next.js, React, Node.js",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "Every project undergoes rigorous testing and code reviews to ensure excellence.",
    highlight: "100% Test Coverage",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "Work directly with senior developers who understand your business needs.",
    highlight: "Direct Communication",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description:
      "Agile methodology ensures rapid development without compromising quality.",
    highlight: "2-Week Sprints",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      aria-labelledby="why-choose-us-title"
      data-testid="why-choose-us-section"
    >
      {/* Coral background orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6A37]/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF6A37]/[0.03] rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="mb-16">
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            // WHY US
          </span>
          <h2
            id="why-choose-us-title"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>Why Choose </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
              Invenex
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground-muted max-w-2xl">
            We&apos;re not just another agency. Here&apos;s what sets us apart.
          </p>
        </AnimatedSection>

        {/* Numbered list layout */}
        <div className="space-y-0">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group py-8 md:py-10 border-b border-white/10 ${
                  index === 0 ? "border-t" : ""
                }`}
              >
                <div className="flex items-start gap-6 md:gap-10">
                  {/* Massive coral gradient number */}
                  <span
                    className="font-mono tracking-tight select-none flex-shrink-0 text-gradient-orange"
                    style={{
                      fontSize: "clamp(3rem, 6vw, 5rem)",
                      fontWeight: 200,
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-4 pt-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FF6A37]/10 border border-[#FF6A37]/20 flex items-center justify-center group-hover:bg-[#FF6A37]/20 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-[#FF6A37]" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-foreground-muted text-sm md:text-base leading-relaxed max-w-lg">
                        {item.description}
                      </p>
                    </div>

                    {/* Highlight tag */}
                    <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-[#FF6A37]/10 text-[#FF6A37] border border-[#FF6A37]/20 flex-shrink-0 self-start mt-1">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
