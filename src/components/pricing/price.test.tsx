import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { CurrencyToggle } from "./currency-toggle";
import { Price } from "./price";
import type { PriceSet } from "@/lib/pricing";

const growthPrice: PriceSet = { INR: 3_85_000, AED: 28_400, USD: 12_900 };

describe("Price", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "invenex.currency=; path=/; max-age=0";
  });

  it("renders the formatted amount for the initial currency", () => {
    render(
      <CurrencyProvider initialCurrency="INR">
        <Price amount={growthPrice} />
      </CurrencyProvider>
    );
    expect(screen.getByText("₹3,85,000")).toBeInTheDocument();
  });

  it("switches to the newly selected currency after a toggle click", async () => {
    const user = userEvent.setup();
    render(
      <CurrencyProvider initialCurrency="INR">
        <CurrencyToggle />
        <Price amount={growthPrice} />
      </CurrencyProvider>
    );

    expect(screen.getByText("₹3,85,000")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /AED/i }));

    expect(screen.getByText("AED 28,400")).toBeInTheDocument();
  });

  it("appends an optional suffix", () => {
    render(
      <CurrencyProvider initialCurrency="INR">
        <Price amount={growthPrice} suffix="/mo" />
      </CurrencyProvider>
    );
    expect(screen.getByText("₹3,85,000/mo")).toBeInTheDocument();
  });
});
