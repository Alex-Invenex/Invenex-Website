import type { Metadata } from "next";

export const metadata: Metadata = {
  /**
   * Must stay in object form. A plain-string `title` here silently drops the
   * root layout's "%s | Invenex Solutions" template for everything under
   * /services, so the service detail pages rendered without the brand suffix.
   */
  title: {
    default: "Web & Mobile App Development Services | Invenex Solutions",
    template: "%s | Invenex Solutions",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
