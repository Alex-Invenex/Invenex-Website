"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { mainNav, socialLinks, siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-lg animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Menu Content */}
      <div className="relative h-full flex flex-col p-6 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" onClick={onClose} className="text-2xl font-bold">
            {siteConfig.name}
          </Link>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-4 px-4 text-xl font-medium text-foreground hover:bg-foreground/5 rounded-lg transition-colors min-h-[48px] flex items-center"
                >
                  {item.title}
                </Link>
                {/* Services Sub-items */}
                {item.children && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block py-3 px-4 text-foreground-muted hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors min-h-[48px] flex items-center"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="mb-8">
          <Button asChild size="lg" className="w-full">
            <Link href="/contact" onClick={onClose}>
              Get a Quote
            </Link>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors"
                aria-label={link.name}
              >
                {Icon ? (
                  <Icon className="w-5 h-5 text-foreground-muted" />
                ) : (
                  <span className="text-foreground-muted">{link.name[0]}</span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
