"use client";

import { motion } from "framer-motion";
import {
  Download,
  Star,
  Users,
  Zap,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";

const plugins = [
  {
    name: "InvenexSEO Pro",
    description:
      "Advanced SEO optimization plugin with AI-powered suggestions, schema markup, and real-time content analysis.",
    icon: Zap,
    downloads: "12,500+",
    rating: 4.9,
    version: "2.4.1",
    downloadUrl: "#",
    features: ["AI Content Analysis", "Schema Markup", "Sitemap Generator"],
  },
  {
    name: "SpeedBooster Cache",
    description:
      "Ultimate caching solution that improves your WordPress site speed by up to 300% with smart optimization.",
    icon: Zap,
    downloads: "8,200+",
    rating: 4.8,
    version: "1.8.3",
    downloadUrl: "#",
    features: ["Page Caching", "CSS/JS Minification", "Image Lazy Load"],
  },
  {
    name: "SecureGuard Pro",
    description:
      "Comprehensive security plugin with firewall, malware scanner, and real-time threat protection.",
    icon: Shield,
    downloads: "15,800+",
    rating: 4.9,
    version: "3.2.0",
    downloadUrl: "#",
    features: ["Firewall Protection", "Malware Scanner", "2FA Login"],
  },
  {
    name: "FormCraft Builder",
    description:
      "Drag-and-drop form builder with conditional logic, payment integration, and beautiful templates.",
    icon: Users,
    downloads: "6,400+",
    rating: 4.7,
    version: "2.1.5",
    downloadUrl: "#",
    features: ["Drag & Drop", "Payment Forms", "Email Integration"],
  },
];

function PluginCard({
  plugin,
  index,
}: {
  plugin: (typeof plugins)[0];
  index: number;
}) {
  const Icon = plugin.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative h-full rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:border-[#FF6A37]/20 hover:shadow-[0_0_30px_rgba(255,106,55,0.1)] transition-all duration-500">
        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="w-14 h-14 rounded-xl bg-[#FF6A37]/10 border border-[#FF6A37]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              whileHover={{ rotate: 5 }}
            >
              <Icon className="w-7 h-7 text-[#FF6A37]" />
            </motion.div>

            {/* Version Badge */}
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-foreground-muted">
              v{plugin.version}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-semibold mb-2">{plugin.name}</h3>
          <p className="text-foreground-muted text-sm leading-relaxed mb-4">
            {plugin.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {plugin.features.map((feature) => (
              <span
                key={feature}
                className="text-xs px-2 py-1 rounded-full bg-white/5 text-foreground-muted"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1.5 text-foreground-muted">
              <Download className="w-4 h-4" />
              <span>{plugin.downloads}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#FF6A37]">
              <Star className="w-4 h-4 fill-[#FF6A37]" />
              <span>{plugin.rating}</span>
            </div>
          </div>

          {/* Download Button */}
          <Button asChild variant="coral" className="w-full group/btn">
            <a href={plugin.downloadUrl} download>
              <Download className="w-4 h-4 mr-2" />
              Download Free
              <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function WordPressPlugins() {
  return (
    <section
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      aria-labelledby="wordpress-plugins-title"
      data-testid="wordpress-plugins-section"
    >
      {/* Coral background orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FF6A37]/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF6A37]/[0.03] rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="mb-16">
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            // WORDPRESS PLUGINS
          </span>
          <h2
            id="wordpress-plugins-title"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>Premium </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
              WordPress Plugins
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground-muted max-w-2xl">
            Download our free, battle-tested plugins to supercharge your
            WordPress website
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plugins.map((plugin, index) => (
            <PluginCard key={plugin.name} plugin={plugin} index={index} />
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <p className="text-foreground-muted mb-4">
            All plugins are free, open-source, and regularly updated
          </p>
          <a
            href="/plugins"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            View all plugins
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
