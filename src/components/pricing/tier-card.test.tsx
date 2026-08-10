import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { TierCard } from "./tier-card";
import { TIERS } from "@/lib/pricing";

const launchpad = TIERS.find((t) => t.id === "launchpad")!;
const launch = TIERS.find((t) => t.id === "launch")!;
const growth = TIERS.find((t) => t.id === "growth")!;
const platform = TIERS.find((t) => t.id === "platform")!;

function renderTier(tier: typeof growth, currency: "INR" | "AED" | "USD" = "INR") {
  return render(
    <CurrencyProvider initialCurrency={currency}>
      <TierCard tier={tier} />
    </CurrencyProvider>
  );
}

describe("TierCard", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "invenex.currency=; path=/; max-age=0";
  });

  it("renders the formatted price for the active currency", () => {
    renderTier(growth, "AED");
    expect(screen.getByText(/28,400/)).toBeInTheDocument();
  });

  // Load-bearing: exclusions make serious buyers move up a tier by themselves.
  it("renders every exclusion for tiers that have them", () => {
    renderTier(launchpad, "INR");
    for (const item of launchpad.excludes) {
      expect(screen.getByText(new RegExp(item, "i"))).toBeInTheDocument();
    }
  });

  it("shows the badge only on the default tier", () => {
    const { rerender } = renderTier(growth, "INR");
    expect(screen.getByText(/most chosen/i)).toBeInTheDocument();
    rerender(
      <CurrencyProvider initialCurrency="INR">
        <TierCard tier={launch} />
      </CurrencyProvider>
    );
    expect(screen.queryByText(/most chosen/i)).not.toBeInTheDocument();
  });

  it("never renders open-ended pricing language", () => {
    const { container } = renderTier(platform, "INR");
    expect(container.textContent).not.toMatch(/from |starting at|onwards|\+\s*$/i);
  });

  it("marks the default tier for assistive tech", () => {
    renderTier(growth, "INR");
    expect(screen.getByRole("article")).toHaveAttribute("data-default", "true");
  });

  it("does not mark non-default tiers with data-default", () => {
    renderTier(launch, "INR");
    expect(screen.getByRole("article")).not.toHaveAttribute("data-default");
  });

  it("does not render an exclusions heading for tiers with no exclusions", () => {
    renderTier(growth, "INR");
    expect(screen.queryByText(/not included/i)).not.toBeInTheDocument();
  });

  it("renders the exclusions heading for tiers with exclusions", () => {
    renderTier(launchpad, "INR");
    expect(screen.getByText(/not included — on purpose:/i)).toBeInTheDocument();
  });
});
