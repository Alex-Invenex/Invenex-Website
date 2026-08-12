import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { CarePlanCard } from "./care-plan-card";
import { CARE_PLANS } from "@/lib/pricing";

const essential = CARE_PLANS.find((p) => p.id === "essential")!;
const momentum = CARE_PLANS.find((p) => p.id === "momentum")!;
const partner = CARE_PLANS.find((p) => p.id === "partner")!;

function renderPlan(plan: typeof momentum, currency: "INR" | "AED" | "USD" = "INR") {
  return render(
    <CurrencyProvider initialCurrency={currency}>
      <CarePlanCard plan={plan} />
    </CurrencyProvider>
  );
}

describe("CarePlanCard", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "invenex.currency=; path=/; max-age=0";
  });

  it("renders the formatted monthly price for the active currency", () => {
    renderPlan(momentum, "INR");
    expect(screen.getByText(/42,000/)).toBeInTheDocument();
    expect(screen.getByText(/\/mo/)).toBeInTheDocument();
  });

  it("shows the Auto-included badge only on the default (momentum) plan", () => {
    const { rerender } = renderPlan(momentum, "INR");
    expect(screen.getByText(/auto-included/i)).toBeInTheDocument();
    rerender(
      <CurrencyProvider initialCurrency="INR">
        <CarePlanCard plan={essential} />
      </CurrencyProvider>
    );
    expect(screen.queryByText(/auto-included/i)).not.toBeInTheDocument();
  });

  it("renders every feature for the plan", () => {
    renderPlan(partner, "INR");
    for (const item of partner.features) {
      expect(screen.getByText(new RegExp(item, "i"))).toBeInTheDocument();
    }
  });

  it("shows the first-month-included note only on the default plan", () => {
    renderPlan(momentum, "INR");
    expect(
      screen.getByText(/first month.*included in growth and platform builds/i)
    ).toBeInTheDocument();
  });

  it("does not show the first-month-included note on non-default plans", () => {
    renderPlan(essential, "INR");
    expect(
      screen.queryByText(/first month.*included in growth and platform builds/i)
    ).not.toBeInTheDocument();
  });

  it("marks the default plan for assistive tech", () => {
    renderPlan(momentum, "INR");
    expect(screen.getByRole("article")).toHaveAttribute("data-default", "true");
  });

  it("never renders open-ended pricing language", () => {
    const { container } = renderPlan(partner, "INR");
    expect(container.textContent).not.toMatch(/from |starting at|onwards|\+\s*$/i);
  });
});
