"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Facebook,
  Instagram,
  Github,
  ChevronDown,
  ArrowRight,
  X,
} from "lucide-react";
import { mainNav, socialLinks, siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/transitions";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  github: Github,
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  // Lock body scroll, hide WhatsApp, add aria-hidden
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const header = document.querySelector("header");

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
      mainContent?.setAttribute("aria-hidden", "true");
      header?.setAttribute("aria-hidden", "true");
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
      mainContent?.removeAttribute("aria-hidden");
      header?.removeAttribute("aria-hidden");
      setServicesExpanded(false);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
      mainContent?.removeAttribute("aria-hidden");
      header?.removeAttribute("aria-hidden");
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="fixed inset-0 lg:hidden"
          style={{ zIndex: 60 }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0A0A0A]/98 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Menu Content */}
          <motion.div
            className="relative h-full flex flex-col overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <TransitionLink
                href="/"
                onClick={handleLinkClick}
                className="flex items-center gap-2.5"
              >
                <img
                  src="/invenex-logo.png"
                  alt="Invenex"
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-gradient">
                  {siteConfig.name}
                </span>
              </TransitionLink>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Decorative coral line */}
            <div className="mx-6 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/40 to-transparent" />

            {/* Navigation Links */}
            <nav className="flex-1 px-6 pt-6">
              <ul className="space-y-1">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {item.children ? (
                      // Services with collapsible sub-menu
                      <div>
                        <button
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className="flex items-center justify-between w-full py-4 px-4 text-lg font-medium text-foreground hover:bg-white/5 rounded-xl transition-colors"
                          aria-expanded={servicesExpanded}
                        >
                          <span>{item.title}</span>
                          <motion.span
                            animate={{ rotate: servicesExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-foreground-muted" />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {servicesExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <ul className="ml-2 pl-4 border-l border-white/10 space-y-0.5 pb-2">
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <TransitionLink
                                      href={child.href}
                                      onClick={handleLinkClick}
                                      className="block py-3 px-3 text-foreground-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-colors text-[15px]"
                                    >
                                      {child.title}
                                    </TransitionLink>
                                  </li>
                                ))}
                                {/* View All Services link */}
                                <li>
                                  <TransitionLink
                                    href="/services"
                                    onClick={handleLinkClick}
                                    className="flex items-center gap-2 py-3 px-3 text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-lg transition-colors text-[15px] font-medium"
                                  >
                                    View All Services
                                    <ArrowRight className="w-4 h-4" />
                                  </TransitionLink>
                                </li>
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Regular nav link
                      <TransitionLink
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block py-4 px-4 text-lg font-medium text-foreground hover:bg-white/5 rounded-xl transition-colors relative group"
                      >
                        <span className="relative">
                          {item.title}
                          {/* Coral accent underline on hover */}
                          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF6B35] group-hover:w-full transition-all duration-300" />
                        </span>
                      </TransitionLink>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom section: CTA + Social */}
            <div className="px-6 pb-8 pt-4">
              {/* Separator */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mb-6"
              >
                <Button asChild size="lg" className="w-full">
                  <TransitionLink
                    href="/contact"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-2"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </TransitionLink>
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex items-center justify-center gap-4"
              >
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF6B35]/30 transition-all"
                      aria-label={link.name}
                    >
                      {Icon ? (
                        <Icon className="w-4.5 h-4.5 text-foreground-muted" />
                      ) : (
                        <span className="text-foreground-muted text-sm">
                          {link.name[0]}
                        </span>
                      )}
                    </a>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
