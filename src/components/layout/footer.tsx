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
  MessageCircle,
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
  const whatsappNumber = contactInfo.whatsapp.replace(/[^0-9]/g, "");

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-coral-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-coral-500/[0.03] rounded-full blur-[120px]" />

      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 py-8 sm:py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-6 sm:gap-8 lg:gap-8">
          {/* Company Info - Full width on mobile, 4 cols on desktop */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.img
                src="/invenex-logo.png"
                alt="Invenex"
                className="w-9 h-9 logo-themed"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-xl font-bold">
                <span className="text-gradient">Invenex</span>{" "}
                <span className="text-foreground">Solutions</span>
              </span>
            </Link>

            <p className="mt-3 text-sm text-foreground-muted leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-4">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                const gradientClass =
                  socialGradients[link.icon] || "hover:bg-surface-overlay-hover";
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 flex items-center justify-center rounded-lg bg-surface-overlay border border-surface-border text-foreground-muted transition-all duration-300 ${gradientClass}`}
                    aria-label={link.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {Icon ? (
                      <Icon className="w-4 h-4" />
                    ) : (
                      <span className="text-sm">{link.name[0]}</span>
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Services Links */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
              Services
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] sm:text-sm text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all hidden sm:block" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Resources Links */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
              Company
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] sm:text-sm text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all hidden sm:block" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Resources Links */}
            <h3 className="text-sm font-semibold text-foreground mb-3 mt-4 sm:mt-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
              Resources
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerNav.resources.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] sm:text-sm text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.title}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all hidden sm:block" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[13px] sm:text-sm text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.title}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all hidden sm:block" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Full width on mobile, 4 cols on desktop */}
          <div className="col-span-2 lg:col-span-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
              Get in Touch
            </h3>
            {/* Compact row on mobile, stacked cards on desktop */}
            <div className="flex gap-2 sm:hidden">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex-1 flex items-center gap-2 p-2.5 rounded-xl bg-surface-overlay border border-surface-border active:bg-surface-overlay transition-colors"
              >
                <div className="w-8 h-8 shrink-0 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-coral-500" />
                </div>
                <span className="text-xs text-foreground-muted truncate">
                  {contactInfo.email}
                </span>
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-overlay border border-surface-border active:bg-surface-overlay transition-colors"
              >
                <div className="w-8 h-8 shrink-0 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-coral-500" />
                </div>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-overlay border border-surface-border active:bg-surface-overlay transition-colors"
              >
                <div className="w-8 h-8 shrink-0 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                </div>
              </a>
            </div>
            {/* Full cards on sm+ */}
            <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
              <motion.a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-overlay border border-surface-border hover:bg-surface-overlay-hover hover:border-surface-border-hover transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-coral-500" />
                </div>
                <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors truncate">
                  {contactInfo.email}
                </span>
              </motion.a>

              <motion.a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-overlay border border-surface-border hover:bg-surface-overlay-hover hover:border-surface-border-hover transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-coral-500" />
                </div>
                <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                  {contactInfo.phone}
                </span>
              </motion.a>

              <motion.a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-overlay border border-surface-border hover:bg-surface-overlay-hover hover:border-green-500/20 transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                  WhatsApp
                </span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-12 pt-5 sm:pt-8 border-t border-surface-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-foreground-muted flex items-center gap-1">
              &copy; {currentYear} {siteConfig.name}. Made with
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 animate-pulse" />
              in India
            </p>

            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-xs sm:text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs sm:text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <motion.button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-xl bg-surface-overlay border border-surface-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-surface-overlay-hover transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Back to top"
              >
                <svg
                  className="w-4 h-4"
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
