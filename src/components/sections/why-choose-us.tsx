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
    gradient: "from-yellow-500/20 via-amber-500/10 to-orange-500/20",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/20",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "Every project undergoes rigorous testing and code reviews to ensure excellence.",
    highlight: "100% Test Coverage",
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "Work directly with senior developers who understand your business needs.",
    highlight: "Direct Communication",
    gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description:
      "Agile methodology ensures rapid development without compromising quality.",
    highlight: "2-Week Sprints",
    gradient: "from-purple-500/20 via-violet-500/10 to-pink-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background-secondary relative overflow-hidden" aria-labelledby="why-choose-us-title" data-testid="why-choose-us-section">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-4">
            Why Us
          </span>
          <h2 id="why-choose-us-title" className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="text-gradient">Invenex</span>
          </h2>
          <p className="mt-4 text-xl text-foreground-muted max-w-2xl mx-auto">
            We&apos;re not just another agency. Here&apos;s what sets us apart.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 overflow-hidden">
                  {/* Hover gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon Container */}
                    <motion.div
                      className={`w-14 h-14 rounded-xl ${item.iconBg} border ${item.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon className={`w-7 h-7 ${item.iconColor}`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>

                    {/* Description */}
                    <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Highlight */}
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full ${item.iconBg} ${item.iconColor} border ${item.borderColor}`}
                    >
                      {item.highlight}
                    </span>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
