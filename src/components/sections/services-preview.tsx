"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Layers,
  ShoppingCart,
  Share2,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

// TODO: Some service hrefs don't have pages yet (ecommerce, social-media, digital-strategy)
// These will be added when service detail pages are expanded
const services = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with cutting-edge technologies for optimal performance.",
    icon: Globe,
    href: "/services/web-development",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    iconColor: "text-blue-400",
    size: "large",
  },
  {
    title: "Mobile Apps",
    description:
      "Native iOS and Android applications that deliver exceptional user experiences.",
    icon: Smartphone,
    href: "/services/mobile-development",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    iconColor: "text-green-400",
    size: "small",
  },
  {
    title: "Platform Development",
    description:
      "Enterprise platforms and SaaS solutions designed for scale and reliability.",
    icon: Layers,
    href: "/services/platform-development",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    iconColor: "text-purple-400",
    size: "small",
  },
  {
    title: "E-Commerce",
    description:
      "Online stores and marketplaces that convert visitors into customers.",
    icon: ShoppingCart,
    href: "/services/ecommerce",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    iconColor: "text-orange-400",
    size: "small",
  },
  {
    title: "Social Media Marketing",
    description:
      "Digital marketing strategies that amplify your brand and drive growth.",
    icon: Share2,
    href: "/services/social-media",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    iconColor: "text-pink-400",
    size: "small",
  },
  {
    title: "Digital Strategy",
    description:
      "Technology consulting and roadmaps to guide your digital transformation.",
    icon: Lightbulb,
    href: "/services/digital-strategy",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    iconColor: "text-yellow-400",
    size: "large",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" aria-labelledby="services-preview-title" data-testid="services-preview-section">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-4">
            What We Do
          </span>
          <h2 id="services-preview-title" className="text-4xl md:text-5xl font-bold">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="mt-4 text-xl text-foreground-muted max-w-2xl mx-auto">
            Everything you need to succeed in the digital world
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLarge = service.size === "large";

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={isLarge ? "md:col-span-1 lg:row-span-1" : ""}
              >
                <Link href={service.href} className="block h-full group">
                  <div
                    className={`
                      relative h-full p-6 md:p-8 rounded-2xl
                      bg-white/[0.02] border border-white/[0.05]
                      hover:bg-white/[0.04] hover:border-white/10
                      transition-all duration-300 ease-out
                      overflow-hidden
                    `}
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`
                          w-12 h-12 rounded-xl
                          bg-white/5 border border-white/10
                          flex items-center justify-center mb-6
                          group-hover:scale-110 group-hover:border-white/20
                          transition-all duration-300
                        `}
                      >
                        <Icon className={`w-6 h-6 ${service.iconColor}`} />
                      </div>

                      {/* Title with arrow */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                        <ArrowUpRight
                          className="w-5 h-5 text-foreground-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        />
                      </div>

                      {/* Description */}
                      <p className="text-foreground-muted leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            View all services
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
