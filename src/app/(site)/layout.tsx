import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">{children}</main>

      <Footer />

      {/* Floating WhatsApp Button - visible on all pages */}
      <WhatsAppButton />
    </>
  );
}
