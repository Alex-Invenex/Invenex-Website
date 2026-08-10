"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CURRENCY_COOKIE, isCurrency, type Currency } from "@/lib/currency";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  initialCurrency,
  children,
}: {
  initialCurrency: Currency;
  children: React.ReactNode;
}) {
  // Seed strictly from the server-provided value -- never read storage during
  // render, so the first client render matches the server's HTML exactly
  // (no-flash guarantee). Any stored preference is reconciled post-mount.
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency);

  function setCurrency(next: Currency) {
    setCurrencyState(next);
    try {
      document.cookie = `${CURRENCY_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Cookie writes can fail under strict privacy settings -- ignore.
    }
    try {
      localStorage.setItem(CURRENCY_COOKIE, next);
    } catch {
      // localStorage may be disabled or blocked.
    }
  }

  useEffect(() => {
    // Reconcile on ANY divergence between localStorage and the server-derived
    // `initialCurrency`, not just when the cookie is missing. The cookie can
    // be stale or absent for reasons other than "the user never chose": a
    // privacy tool can block the cookie write in `setCurrency` while the
    // localStorage write still succeeds, or the cookie can simply expire out
    // of sync with localStorage. In every such case localStorage is the more
    // durable signal of an explicit user choice, so it wins -- and going
    // through `setCurrency` rewrites the cookie to match, self-healing the
    // divergence. This runs once, after hydration is complete, and never
    // during render (no-flash guarantee unchanged).
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CURRENCY_COOKIE);
    } catch {
      stored = null;
    }

    if (!isCurrency(stored)) return;
    if (stored === initialCurrency) return;

    setCurrency(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
