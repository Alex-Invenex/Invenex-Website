"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevent hydration mismatch — render placeholder
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-full bg-surface-overlay",
          className
        )}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-9 h-9 rounded-full flex items-center justify-center",
        "border border-surface-border hover:border-surface-border-hover",
        "bg-surface-overlay hover:bg-surface-overlay-hover",
        "transition-colors duration-300 cursor-pointer",
        className
      )}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="moon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Crescent moon */}
            <motion.path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="currentColor"
              className="text-foreground-muted"
            />
            {/* Stars */}
            <motion.circle
              cx="19"
              cy="5"
              r="1"
              fill="currentColor"
              className="text-foreground-subtle"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.4 }}
            />
            <motion.circle
              cx="16"
              cy="2"
              r="0.5"
              fill="currentColor"
              className="text-foreground-subtle"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Sun core */}
            <motion.circle
              cx="12"
              cy="12"
              r="5"
              fill="var(--color-coral-500)"
            />
            {/* Sun rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 12 + 7.5 * Math.cos(rad);
              const y1 = 12 + 7.5 * Math.sin(rad);
              const x2 = 12 + 9.5 * Math.cos(rad);
              const y2 = 12 + 9.5 * Math.sin(rad);
              return (
                <motion.line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-coral-500)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.03, duration: 0.3 }}
                />
              );
            })}
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
