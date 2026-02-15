"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";

// Real Invenex clients
const clients = [
  { name: "CoolTech International" },
  { name: "Ginger Designs" },
  { name: "La Mirage" },
  { name: "OnMyWay AI" },
  { name: "EaseMyFly" },
  { name: "GrabToGo" },
  { name: "Q by Rayeesa" },
  { name: "AA Rent A Car" },
];

function ClientName({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center group">
      <span className="text-lg md:text-xl font-medium text-foreground-muted/50 group-hover:text-foreground-muted transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
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
          <ClientName key={index} {...client} />
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
          <ClientName key={index} {...client} />
        ))}
      </motion.div>
    </div>
  );
}

export function ClientLogos() {
  return (
    <section
      className="py-20 bg-background relative overflow-hidden"
      aria-labelledby="client-logos-title"
      data-testid="client-logos-section"
    >
      {/* Coral background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-coral-500/[0.03] to-transparent" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-12 relative z-10">
        <AnimatedSection className="text-center">
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            // TRUSTED PARTNERS
          </span>
          <h3
            id="client-logos-title"
            className="text-2xl md:text-3xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>Trusted by </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
              Innovative Companies
            </span>
          </h3>
          <p className="mt-2 text-foreground-muted">
            Join the growing list of businesses we&apos;ve helped succeed
          </p>
        </AnimatedSection>
      </div>

      {/* Logo Carousel — text-only names */}
      <div className="relative">
        <LogoCarousel items={clients} direction="left" duration={25} />
      </div>
    </section>
  );
}
