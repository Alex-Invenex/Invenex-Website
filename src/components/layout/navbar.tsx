"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Layers,
  ShoppingCart,
  Share2,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

// Service icons mapped by href
const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/services/web-development": Globe,
  "/services/mobile-development": Smartphone,
  "/services/platform-development": Layers,
  "/services/ecommerce": ShoppingCart,
  "/services/social-media": Share2,
  "/services/digital-strategy": Lightbulb,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      // Add backdrop after 100px
      setScrolled(currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "bg-background/80 backdrop-blur-lg border-b border-border",
          !visible && "-translate-y-full"
        )}
      >
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-foreground">
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {mainNav.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => item.children && setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>

                {/* Mega Menu for Services */}
                {item.children && servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    <div className="bg-background-secondary border border-border rounded-lg p-6 shadow-xl min-w-[600px] grid grid-cols-2 gap-4 animate-in fade-in duration-200">
                      {item.children.map((child) => {
                        const Icon = serviceIcons[child.href];
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-background-tertiary transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0">
                              {Icon ? (
                                <Icon className="w-5 h-5 text-foreground" />
                              ) : (
                                <span className="text-foreground">●</span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">
                                {child.title}
                              </div>
                              <div className="text-sm text-foreground-muted">
                                {child.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild>
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
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
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
