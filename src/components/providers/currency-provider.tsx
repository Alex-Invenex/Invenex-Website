"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CURRENCY_COOKIE, isCurrency, type Currency } from "@/lib/currency";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

/**
 * Reads the raw `invenex.currency` cookie value from `document.cookie`.
 * Returns `null` when the cookie is absent (as opposed to present-but-empty).
 */
function readCurrencyCookie(): string | null {
  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${CURRENCY_COOKIE}=`));
  if (!match) return null;
  return match.slice(CURRENCY_COOKIE.length + 1);
}

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
    // Cookie-cleared edge case: if the cookie that produced `initialCurrency`
    // is now gone but localStorage still holds a valid, different choice,
    // restore it. This only fires once, after hydration is complete.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CURRENCY_COOKIE);
    } catch {
      stored = null;
    }

    if (!isCurrency(stored)) return;
    if (stored === initialCurrency) return;
    if (readCurrencyCookie() !== null) return;

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
