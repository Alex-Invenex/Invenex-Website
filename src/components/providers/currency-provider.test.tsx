import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CurrencyProvider } from "./currency-provider";
import { Price } from "@/components/pricing/price";
import type { PriceSet } from "@/lib/pricing";

const growthPrice: PriceSet = { INR: 3_85_000, AED: 28_400, USD: 12_900 };

function readCookie(name: string): string | null {
  const match = document.cookie.split("; ").find((entry) => entry.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

describe("CurrencyProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "invenex.currency=; path=/; max-age=0";
  });

  // Regression: the reconciliation effect must not be gated on the cookie
  // being merely *absent*. A cookie write can fail (privacy tool, storage
  // quota, etc.) while the localStorage write succeeds, leaving the cookie
  // either missing or stale relative to localStorage. Either way, a page
  // that renders only a `<Price>` leaf -- with no `<CurrencyToggle>` mounted
  // anywhere to perform its own reconciliation -- must still pick up the
  // stored choice.
  it("reconciles to a stored currency when the cookie is absent, even with no toggle mounted", () => {
    localStorage.setItem("invenex.currency", "AED");
    // Cookie intentionally left unset.
    render(
      <CurrencyProvider initialCurrency="INR">
        <Price amount={growthPrice} />
      </CurrencyProvider>
    );

    expect(screen.getByText("AED 28,400")).toBeInTheDocument();
    expect(screen.queryByText("₹3,85,000")).not.toBeInTheDocument();
    expect(readCookie("invenex.currency")).toBe("AED");
  });

  it("reconciles to a stored currency when the cookie is present but stale/divergent, even with no toggle mounted", () => {
    document.cookie = "invenex.currency=INR; path=/; max-age=31536000; SameSite=Lax";
    localStorage.setItem("invenex.currency", "AED");
    render(
      <CurrencyProvider initialCurrency="INR">
        <Price amount={growthPrice} />
      </CurrencyProvider>
    );

    expect(screen.getByText("AED 28,400")).toBeInTheDocument();
    expect(readCookie("invenex.currency")).toBe("AED");
  });

  it("ignores a corrupt stored value and leaves the initial currency in place", () => {
    localStorage.setItem("invenex.currency", "BITCOIN");
    render(
      <CurrencyProvider initialCurrency="AED">
        <Price amount={growthPrice} />
      </CurrencyProvider>
    );

    expect(screen.getByText("AED 28,400")).toBeInTheDocument();
    expect(readCookie("invenex.currency")).toBeNull();
  });

  it("does nothing when the stored value already matches the initial currency", () => {
    localStorage.setItem("invenex.currency", "USD");
    render(
      <CurrencyProvider initialCurrency="USD">
        <Price amount={growthPrice} />
      </CurrencyProvider>
    );

    expect(screen.getByText("$12,900")).toBeInTheDocument();
    // No reconciliation write should have happened -- the cookie stays unset.
    expect(readCookie("invenex.currency")).toBeNull();
  });
});
