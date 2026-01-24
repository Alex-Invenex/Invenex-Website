"use client";

import { motion } from "framer-motion";
import {
  Download,
  Star,
  Users,
  Zap,
  Shield,
  ArrowUpRight,
  Sparkles,
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
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
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
    gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/20",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30",
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
    gradient: "from-purple-500/20 via-violet-500/10 to-pink-500/20",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30",
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
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30",
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
      <div className="relative h-full rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:border-white/10 transition-all duration-500">
        {/* Hover gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${plugin.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className={`w-14 h-14 rounded-xl ${plugin.iconBg} border ${plugin.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 5 }}
            >
              <Icon className={`w-7 h-7 ${plugin.iconColor}`} />
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
            <div className="flex items-center gap-1.5 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>{plugin.rating}</span>
            </div>
          </div>

          {/* Download Button */}
          <Button asChild variant="secondary" className="w-full group/btn">
            <a href={plugin.downloadUrl} download>
              <Download className="w-4 h-4 mr-2" />
              Download Free
              <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
            </a>
          </Button>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

export function WordPressPlugins() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" aria-labelledby="wordpress-plugins-title" data-testid="wordpress-plugins-section">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-foreground-muted">
              Free WordPress Resources
            </span>
          </motion.div>
          <h2 id="wordpress-plugins-title" className="text-4xl md:text-5xl font-bold">
            Premium <span className="text-gradient">WordPress Plugins</span>
          </h2>
          <p className="mt-4 text-xl text-foreground-muted max-w-2xl mx-auto">
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
          {/* TODO: /plugins page not yet implemented */}
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
