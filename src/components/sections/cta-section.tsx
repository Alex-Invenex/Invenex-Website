"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { contactInfo } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[120px] animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(120,119,198,0.2),transparent)]" />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
        animate={{
          y: [0, -10, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-foreground-muted">
              Let&apos;s Build Together
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Build Something
            <br />
            <span className="text-gradient">Extraordinary?</span>
          </h2>

          <p className="text-xl text-foreground-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s discuss your project and create a digital solution that
            drives real results for your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg">
              <Link href="/contact" className="group">
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.a
              href={`mailto:${contactInfo.email}`}
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-foreground-muted group-hover:text-foreground transition-colors">
                {contactInfo.email}
              </span>
            </motion.a>
            <motion.a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-foreground-muted group-hover:text-foreground transition-colors">
                {contactInfo.phone}
              </span>
            </motion.a>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
