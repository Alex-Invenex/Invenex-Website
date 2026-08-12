import { generatePageMetadata } from "@/lib/metadata";
import { getCurrency } from "@/lib/get-currency";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { ServicesClient } from "./services-client";

export const metadata = generatePageMetadata({
  title: "Web & Mobile App Development Services",
  description:
    "Web development, mobile apps, custom SaaS platforms, ecommerce and digital marketing services from Invenex Solutions in Kerala, India — delivered to clients across India, the US, UK and Gulf.",
  path: "/services",
  keywords: [
    "web development services India",
    "mobile app development services",
    "custom software development services",
    "SaaS platform development",
    "ecommerce development services",
    "digital marketing services India",
  ],
});

/**
 * `/services` is a DYNAMIC route, deliberately — every service block now
 * shows a real price via `<Price>`, which reads the visitor's currency from
 * `getCurrency()`. Do NOT move currency resolution into a client effect;
 * the correct currency must be in the first byte of server HTML.
 */
export default async function ServicesPage() {
  const currency = await getCurrency();

  return (
    <CurrencyProvider initialCurrency={currency}>
      <ServicesClient />
    </CurrencyProvider>
  );
}
