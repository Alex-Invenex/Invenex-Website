"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { TransitionLink } from "@/components/transitions";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Layers,
  ShoppingCart,
  Share2,
  Lightbulb,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

// Service icons mapped by href
const serviceIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "/services/web-development": Globe,
  "/services/mobile-development": Smartphone,
  "/services/platform-development": Layers,
  "/services/ecommerce": ShoppingCart,
  "/services/social-media": Share2,
  "/services/digital-strategy": Lightbulb,
};

const serviceColors: Record<string, string> = {
  "/services/web-development": "from-coral-500/20 to-coral-400/20 text-coral-400",
  "/services/mobile-development":
    "from-green-500/20 to-emerald-500/20 text-green-400",
  "/services/platform-development":
    "from-coral-500/20 to-coral-400/20 text-coral-400",
  "/services/ecommerce": "from-orange-500/20 to-amber-500/20 text-orange-400",
  "/services/social-media": "from-pink-500/20 to-rose-500/20 text-pink-400",
  "/services/digital-strategy":
    "from-yellow-500/20 to-amber-500/20 text-yellow-400",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mega-menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && servicesOpen) {
      setServicesOpen(false);
    }
  }, [servicesOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastY = lastScrollYRef.current;

        // Show/hide based on scroll direction
        setVisible(!(currentScrollY > lastY && currentScrollY > 100));
        setScrolled(currentScrollY > 100);

        lastScrollYRef.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle services menu with keyboard
  const handleServicesKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setServicesOpen(!servicesOpen);
    } else if (e.key === "ArrowDown" && !servicesOpen) {
      e.preventDefault();
      setServicesOpen(true);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent",
          !visible && "-translate-y-full"
        )}
      >
        <nav
          aria-label="Main navigation"
          className="container mx-auto px-6 h-20 flex items-center justify-between"
        >
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => item.children && setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {item.children ? (
                  // Services dropdown trigger - button for accessibility
                  <button
                    type="button"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onKeyDown={handleServicesKeyDown}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    className={cn(
                      "px-4 py-2 rounded-full text-foreground-muted hover:text-foreground transition-all duration-300 flex items-center gap-1",
                      "hover:bg-white/5"
                    )}
                  >
                    {item.title}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  // Regular nav link with transition
                  <TransitionLink
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-foreground-muted hover:text-foreground transition-all duration-300 flex items-center gap-1",
                      "hover:bg-white/5"
                    )}
                  >
                    {item.title}
                  </TransitionLink>
                )}

                {/* Premium Mega Menu for Services */}
                <AnimatePresence>
                  {item.children && servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="relative min-w-[650px] p-6 rounded-2xl bg-background-secondary/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF6B35]/10 via-transparent to-[#FF6B35]/5 pointer-events-none" />

                        {/* Grid pattern */}
                        <div className="absolute inset-0 rounded-2xl bg-grid opacity-30 pointer-events-none" />

                        <div className="relative grid grid-cols-2 gap-2">
                          {item.children.map((child, index) => {
                            const Icon = serviceIcons[child.href];
                            const colorClass =
                              serviceColors[child.href] ||
                              "from-gray-500/20 to-gray-500/20 text-gray-400";
                            return (
                              <motion.div
                                key={child.href}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <TransitionLink
                                  href={child.href}
                                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.05] transition-all duration-300 group/item"
                                >
                                  <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass.split(" ")[0]} ${colorClass.split(" ")[1]} flex items-center justify-center shrink-0 border border-white/10 group-hover/item:scale-110 transition-transform duration-300`}
                                  >
                                    {Icon ? (
                                      <Icon
                                        className={`w-6 h-6 ${colorClass.split(" ")[2]}`}
                                      />
                                    ) : (
                                      <span className="text-foreground">●</span>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-foreground flex items-center gap-2">
                                      {child.title}
                                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <div className="text-sm text-foreground-muted mt-1">
                                      {child.description}
                                    </div>
                                  </div>
                                </TransitionLink>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* CTA Banner */}
                        <div className="relative mt-4 pt-4 border-t border-white/[0.05]">
                          <TransitionLink
                            href="/services"
                            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#FF6B35]/10 to-[#FF6B35]/5 hover:from-[#FF6B35]/20 hover:to-[#FF6B35]/10 transition-all duration-300 group/cta"
                          >
                            <div>
                              <p className="font-medium text-foreground">
                                Explore All Services
                              </p>
                              <p className="text-sm text-foreground-muted">
                                Discover how we can help your business grow
                              </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/cta:bg-white/20 transition-colors">
                              <ArrowRight className="w-5 h-5 text-foreground" />
                            </div>
                          </TransitionLink>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild size="sm" variant="ghost">
              <TransitionLink href="/portfolio">Our Work</TransitionLink>
            </Button>
            <Button asChild>
              <TransitionLink href="/contact" className="group">
                Get a Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </TransitionLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            data-testid="mobile-menu-button"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
