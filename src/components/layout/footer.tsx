"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Linkedin,
  Facebook,
  Instagram,
  Github,
  Mail,
  Phone,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import {
  siteConfig,
  footerNav,
  socialLinks,
  contactInfo,
} from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  github: Github,
};

const socialGradients: Record<string, string> = {
  linkedin: "hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-blue-400",
  facebook: "hover:bg-blue-600/20 hover:border-blue-600/30 hover:text-blue-500",
  instagram:
    "hover:bg-pink-500/20 hover:border-pink-500/30 hover:text-pink-400",
  github: "hover:bg-gray-500/20 hover:border-gray-500/30 hover:text-gray-300",
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6B35]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF6B35]/[0.03] rounded-full blur-[120px]" />

      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info - Takes 4 columns */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.img
                src="/invenex-logo.png"
                alt="Invenex"
                className="w-9 h-9"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-xl font-bold text-gradient">
                {siteConfig.name}
              </span>
            </Link>

            <p className="mt-4 text-foreground-muted leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                const gradientClass =
                  socialGradients[link.icon] || "hover:bg-white/10";
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.08] text-foreground-muted transition-all duration-300 ${gradientClass}`}
                    aria-label={link.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {Icon ? (
                      <Icon className="w-5 h-5" />
                    ) : (
                      <span className="text-sm">{link.name[0]}</span>
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Services Links - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              Services
            </h3>
            <ul className="space-y-3">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Resources Links */}
            <h3 className="text-sm font-semibold text-foreground mb-4 mt-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              Resources
            </h3>
            <ul className="space-y-3">
              {footerNav.resources.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.title}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.title}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <span className="text-foreground-muted group-hover:text-foreground transition-colors">
                    {contactInfo.email}
                  </span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <span className="text-foreground-muted group-hover:text-foreground transition-colors">
                    {contactInfo.phone}
                  </span>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.05]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground-muted flex items-center gap-1">
              &copy; {currentYear} {siteConfig.name}. Made with
              <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
              in India
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-white/[0.08] transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Back to top"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
