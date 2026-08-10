import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

// Mock the manually-maintained config so both the "visible" and "hidden"
// branches are exercised without touching the real (currently null) value.
vi.mock("@/lib/site-config", () => ({
  availability: {
    quarter: "Q4 2026",
    slotsTotal: 4,
    slotsRemaining: 2 as number | null,
  },
  razorpayBlueprintUrl: null,
  calLink: null,
}));

import { availability } from "@/lib/site-config";
import { SlotCounter } from "./slot-counter";

describe("SlotCounter", () => {
  afterEach(() => {
    availability.slotsRemaining = 2;
    vi.useRealTimers();
    cleanup();
  });

  it("reads the slot count from config and renders the copy line", () => {
    render(<SlotCounter />);
    expect(
      screen.getByText(new RegExp(`${availability.slotsRemaining} of 4`))
    ).toBeInTheDocument();
    expect(screen.getByTestId("slots")).toHaveTextContent(
      "Q4 2026 — 2 of 4 build slots remaining."
    );
  });

  it("renders nothing when slotsRemaining is null", () => {
    availability.slotsRemaining = null;
    const { container } = render(<SlotCounter />);
    expect(screen.queryByTestId("slots")).not.toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  // Scarcity must be true. No timers, no auto-decrement.
  it("does not change over time", () => {
    vi.useFakeTimers();
    render(<SlotCounter />);
    const before = screen.getByTestId("slots").textContent;
    vi.advanceTimersByTime(60 * 60 * 1000);
    expect(screen.getByTestId("slots").textContent).toBe(before);
  });
});
