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

  // Load-bearing: the collapsed includes are part of what the tier costs, so
  // they have to survive with no JavaScript. A native <details> is reachable
  // pre-hydration; a button + `hidden` list is not.
  it("collapses the rest of the includes behind a native details element", () => {
    const { container } = renderTier(launchpad, "INR");

    const details = container.querySelector("details");
    expect(details).not.toBeNull();
    expect(details!.querySelector("summary")).not.toBeNull();

    // Every include is in the document, collapsed or not.
    for (const item of launchpad.includes) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  // The exclusions are the reason a buyer moves up a tier by themselves. They
  // must never end up inside the disclosure that the includes hide behind.
  it("keeps the exclusions outside and after the includes disclosure", () => {
    const { container } = renderTier(launchpad, "INR");

    const details = container.querySelector("details")!;
    const heading = screen.getByText(/not included — on purpose:/i);

    expect(details.contains(heading)).toBe(false);
    expect(
      details.compareDocumentPosition(heading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  // The card the page is built around opens with its full list showing; the
  // entry tiers stay collapsed so the five columns can be read across.
  // Rendered separately on purpose — `rerender` would carry the first card's
  // disclosure state into the second.
  it("opens the default tier's disclosure and leaves the others closed", () => {
    const growthRender = renderTier(growth, "INR");
    const growthDetails = growthRender.container.querySelector("details");
    if (growthDetails) expect(growthDetails.open).toBe(true);
    growthRender.unmount();

    const { container } = renderTier(launchpad, "INR");
    expect(container.querySelector("details")!.open).toBe(false);
  });
});
