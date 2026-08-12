import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { CurrencyToggle } from "./currency-toggle";
import type { Currency } from "@/lib/currency";

function renderToggle(initial: Currency) {
  return render(
    <CurrencyProvider initialCurrency={initial}>
      <CurrencyToggle />
    </CurrencyProvider>
  );
}

describe("CurrencyToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "invenex.currency=; path=/; max-age=0";
  });

  it("renders all three currency options", () => {
    renderToggle("INR");
    for (const c of ["INR", "AED", "USD"]) {
      expect(screen.getByRole("button", { name: new RegExp(c, "i") })).toBeInTheDocument();
    }
  });

  it("marks the initial currency as selected", () => {
    renderToggle("AED");
    expect(screen.getByRole("button", { name: /AED/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("persists an explicit choice to localStorage", async () => {
    const user = userEvent.setup();
    renderToggle("INR");
    await user.click(screen.getByRole("button", { name: /AED/i }));
    expect(localStorage.getItem("invenex.currency")).toBe("AED");
  });

  // An explicit user choice must always beat geo detection.
  it("prefers a stored choice over the geo-detected initial value", () => {
    localStorage.setItem("invenex.currency", "USD");
    renderToggle("INR");
    expect(screen.getByRole("button", { name: /USD/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("ignores a corrupt stored value and falls back to the initial", () => {
    localStorage.setItem("invenex.currency", "BITCOIN");
    renderToggle("AED");
    expect(screen.getByRole("button", { name: /AED/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
