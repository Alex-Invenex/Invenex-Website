import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { formatPrice } from "@/lib/format-price";
import {
  calculateGap,
  CostOfDelayCalculator,
} from "./cost-of-delay-calculator";

function renderCalculator(
  initial?: { visitors: number; rate: number; aov: number },
  currency: "INR" | "AED" | "USD" = "INR"
) {
  return render(
    <CurrencyProvider initialCurrency={currency}>
      <CostOfDelayCalculator initial={initial} />
    </CurrencyProvider>
  );
}

describe("calculateGap", () => {
  it("computes the monthly gap against a 3% benchmark", () => {
    expect(calculateGap({ visitors: 10_000, rate: 1, aov: 2_000 })).toBe(
      4_00_000
    );
  });

  // Honesty guard: never invent a loss that isn't there.
  it("returns zero when the site already beats the benchmark", () => {
    expect(calculateGap({ visitors: 10_000, rate: 5, aov: 2_000 })).toBe(0);
  });

  it("returns zero, not negative, when the site exactly meets the benchmark", () => {
    expect(calculateGap({ visitors: 10_000, rate: 3, aov: 2_000 })).toBe(0);
  });
});

describe("CostOfDelayCalculator", () => {
  afterEach(cleanup);

  it("renders the heading and input labels from the copy deck", () => {
    renderCalculator();
    expect(
      screen.getByText(/what is your current site costing you/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/monthly visitors to your site/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/your current conversion rate/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/your average order or enquiry value/i)
    ).toBeInTheDocument();
  });

  // A Gulf visitor asked for an order value "(₹)" either types the wrong
  // number or decides the whole page is an India price list.
  it("labels the order-value field with the active currency's unit", () => {
    renderCalculator();
    expect(
      screen.getByLabelText(/your average order or enquiry value \(₹\)/i)
    ).toBeInTheDocument();

    cleanup();

    renderCalculator(undefined, "AED");
    expect(
      screen.getByLabelText(/your average order or enquiry value \(AED\)/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/enquiry value \(₹\)/i)
    ).not.toBeInTheDocument();

    cleanup();

    renderCalculator(undefined, "USD");
    expect(
      screen.getByLabelText(/your average order or enquiry value \(\$\)/i)
    ).toBeInTheDocument();
  });

  it("keeps the field ids stable across currencies", () => {
    renderCalculator(undefined, "INR");
    expect(
      screen.getByLabelText(/enquiry value/i).getAttribute("id")
    ).toBe("cod-aov");

    cleanup();

    renderCalculator(undefined, "USD");
    expect(
      screen.getByLabelText(/enquiry value/i).getAttribute("id")
    ).toBe("cod-aov");
  });

  it("shows no output until all three inputs have values", () => {
    renderCalculator();
    expect(
      screen.queryByText(/leaving approximately|converting well/i)
    ).not.toBeInTheDocument();
  });

  it("shows an honest message when there is no gap", () => {
    renderCalculator({ visitors: 10_000, rate: 5, aov: 2_000 });
    expect(
      screen.getByText(/converting well|may not need/i)
    ).toBeInTheDocument();
  });

  it("hedges the estimate rather than promising it", () => {
    renderCalculator({ visitors: 10_000, rate: 1, aov: 2_000 });
    expect(screen.getByText(/may be|approximately/i)).toBeInTheDocument();
  });

  it("formats the positive-gap output in the active currency", () => {
    renderCalculator({ visitors: 10_000, rate: 1, aov: 2_000 }, "AED");
    const gap = calculateGap({ visitors: 10_000, rate: 1, aov: 2_000 });
    expect(
      screen.getByText(new RegExp(formatPrice(gap, "AED")))
    ).toBeInTheDocument();
  });

  it("always shows the 3% benchmark footnote, regardless of input state", () => {
    renderCalculator();
    expect(
      screen.getByText(/3% is a general benchmark for e-commerce/i)
    ).toBeInTheDocument();

    cleanup();

    renderCalculator({ visitors: 10_000, rate: 1, aov: 2_000 });
    expect(
      screen.getByText(/3% is a general benchmark for e-commerce/i)
    ).toBeInTheDocument();
  });

  it("updates the output as the visitor types", async () => {
    const user = userEvent.setup();
    renderCalculator();

    await user.type(
      screen.getByLabelText(/monthly visitors to your site/i),
      "10000"
    );
    await user.type(
      screen.getByLabelText(/your current conversion rate/i),
      "1"
    );
    await user.type(
      screen.getByLabelText(/your average order or enquiry value/i),
      "2000"
    );

    expect(
      screen.getByText(/leaving approximately/i)
    ).toBeInTheDocument();
  });
});
