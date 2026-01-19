import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting options
export type DateFormatStyle = "short" | "long" | "relative";

export function formatDate(
  date: Date | string | number,
  style: DateFormatStyle = "short"
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "Invalid date";
  }

  switch (style) {
    case "short":
      // Jan 19, 2026
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    case "long":
      // January 19, 2026
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    case "relative":
      // "2 days ago", "in 3 hours", etc.
      return getRelativeTime(d);

    default:
      return d.toLocaleDateString();
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(diffSec) < 60) {
    return rtf.format(diffSec, "second");
  } else if (Math.abs(diffMin) < 60) {
    return rtf.format(diffMin, "minute");
  } else if (Math.abs(diffHour) < 24) {
    return rtf.format(diffHour, "hour");
  } else if (Math.abs(diffDay) < 30) {
    return rtf.format(diffDay, "day");
  } else {
    return formatDate(date, "short");
  }
}

// Additional utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}
