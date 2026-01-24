"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";

// Client logos - using placeholder text/icons for now
// Replace with actual SVG logos when available
const clients = [
  { name: "TechCorp", abbrev: "TC", gradient: "from-blue-500/20 to-cyan-500/20" },
  { name: "GlobalBank", abbrev: "GB", gradient: "from-emerald-500/20 to-green-500/20" },
  { name: "HealthPlus", abbrev: "H+", gradient: "from-red-500/20 to-pink-500/20" },
  { name: "RetailMax", abbrev: "RM", gradient: "from-orange-500/20 to-amber-500/20" },
  { name: "EduLearn", abbrev: "EL", gradient: "from-purple-500/20 to-violet-500/20" },
  { name: "CloudSync", abbrev: "CS", gradient: "from-sky-500/20 to-blue-500/20" },
  { name: "DataFlow", abbrev: "DF", gradient: "from-indigo-500/20 to-purple-500/20" },
  { name: "SmartHome", abbrev: "SH", gradient: "from-teal-500/20 to-emerald-500/20" },
];

function ClientLogo({
  name,
  abbrev,
  gradient,
}: {
  name: string;
  abbrev: string;
  gradient: string;
}) {
  return (
    <div className="flex-shrink-0 w-[180px] mx-6 flex items-center justify-center group">
      <motion.div
        className="w-full h-20 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.05] group-hover:border-white/10 transition-all duration-300">
          {/* Logo icon */}
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center border border-white/10`}
          >
            <span className="text-sm font-bold text-white">{abbrev}</span>
          </div>
          {/* Company name */}
          <span className="text-base font-medium text-foreground-muted group-hover:text-foreground transition-colors">
            {name}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function LogoCarousel({
  items,
  direction = "left",
  duration = 30,
}: {
  items: typeof clients;
  direction?: "left" | "right";
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items multiple times for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  if (shouldReduceMotion) {
    return (
      <div className="flex justify-center flex-wrap gap-6 py-4">
        {items.map((client, index) => (
          <ClientLogo key={index} {...client} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden py-4">
      <motion.div
        className="flex"
        animate={{
          x:
            direction === "left"
              ? [0, -33.333 + "%"]
              : [-33.333 + "%", 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((client, index) => (
          <ClientLogo key={index} {...client} />
        ))}
      </motion.div>
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden" aria-labelledby="client-logos-title" data-testid="client-logos-section">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-secondary to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-12 relative z-10">
        <AnimatedSection className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-foreground-muted">
              Trusted Partners
            </span>
          </motion.div>
          <h3 id="client-logos-title" className="text-2xl md:text-3xl font-bold">
            Trusted by <span className="text-gradient">Innovative Companies</span>
          </h3>
          <p className="mt-2 text-foreground-muted">
            Join the growing list of businesses we&apos;ve helped succeed
          </p>
        </AnimatedSection>
      </div>

      {/* Logo Carousel */}
      <div className="relative">
        <LogoCarousel items={clients} direction="left" duration={25} />
      </div>
    </section>
  );
}
