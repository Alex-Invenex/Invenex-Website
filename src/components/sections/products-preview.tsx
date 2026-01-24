"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Utensils,
  Building2,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

const products = [
  {
    name: "CaterFlow",
    tagline: "Catering Management, Simplified",
    description:
      "A complete catering management platform built for caterers who want to streamline operations, manage orders, and grow their business.",
    features: [
      "Order Management",
      "Inventory Tracking",
      "Customer Portal",
      "Analytics Dashboard",
    ],
    status: "Live",
    href: "https://caterflow.in",
    isExternal: true,
    icon: Utensils,
    gradient: "from-purple-600 via-violet-500 to-blue-500",
    bgGradient: "from-purple-500/10 via-violet-500/5 to-blue-500/10",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    name: "Invenex ERP",
    tagline: "Enterprise Resource Planning",
    description:
      "Next-generation ERP solution designed for modern businesses. Unified platform for finance, HR, inventory, and operations management.",
    features: [
      "Financial Management",
      "HR & Payroll",
      "Supply Chain",
      "Business Intelligence",
    ],
    status: "Coming Soon",
    href: "/products#erp",
    isExternal: false,
    icon: Building2,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    bgGradient: "from-orange-500/10 via-amber-500/5 to-yellow-500/10",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
];

export function ProductsPreview() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" aria-labelledby="products-preview-title" data-testid="products-preview-section">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-foreground-muted">
              We Build Our Own Products
            </span>
          </motion.div>
          <h2 id="products-preview-title" className="text-4xl md:text-5xl font-bold">
            Our <span className="text-gradient">Products</span>
          </h2>
          <p className="mt-4 text-xl text-foreground-muted max-w-2xl mx-auto">
            We don&apos;t just build for others. We create products that solve
            real problems.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative h-full rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:border-white/10 transition-all duration-500">
                  {/* Animated gradient border on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Gradient Header */}
                  <div className="relative h-40 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20`}
                    />
                    <div className="absolute inset-0 bg-grid opacity-20" />

                    {/* Floating shapes */}
                    <motion.div
                      className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/5"
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-white/5"
                      animate={{
                        y: [0, 10, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl ${product.iconBg} backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className={`w-10 h-10 ${product.iconColor}`} />
                      </motion.div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`
                          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                          ${
                            product.status === "Live"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }
                        `}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.status === "Live"
                              ? "bg-emerald-400 animate-pulse"
                              : "bg-amber-400"
                          }`}
                        />
                        {product.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8">
                    <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                    <p className="text-foreground-muted mb-4">
                      {product.tagline}
                    </p>
                    <p className="text-foreground-muted text-sm mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {product.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-foreground-muted"
                        >
                          <div
                            className={`w-5 h-5 rounded-full ${product.iconBg} flex items-center justify-center flex-shrink-0`}
                          >
                            <Check
                              className={`w-3 h-3 ${product.iconColor}`}
                            />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {product.isExternal ? (
                      <Button asChild variant="primary" size="lg">
                        <a
                          href={product.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 w-full justify-center"
                        >
                          Visit {product.name}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button asChild variant="secondary" size="lg">
                        <Link
                          href={product.href}
                          className="inline-flex items-center gap-2 w-full justify-center"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            Explore all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
