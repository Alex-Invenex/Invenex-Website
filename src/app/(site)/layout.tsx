import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SkipLink } from "@/components/accessibility";
import {
  PageTransitionProvider,
  TransitionOverlay,
} from "@/components/transitions";
import { EpicPreloader } from "@/components/transitions/epic-preloader";
import { ToastProvider } from "@/components/ui/toast";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { RouteScrollCleanup } from "@/components/providers/route-scroll-cleanup";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <EpicPreloader />

      <PageTransitionProvider exitDuration={300} enterDuration={400}>
        <TransitionOverlay blur />

        {/* Custom Cursor - Premium UI enhancement (Story 9.2) */}
        <CustomCursor />

        {/* Skip Link for Accessibility - WCAG 2.1 AA SC 2.4.1 */}
        <SkipLink />

        <Navbar />

        <LenisProvider>
          <main id="main-content" tabIndex={-1} className="outline-none">
            <RouteScrollCleanup>{children}</RouteScrollCleanup>
          </main>
        </LenisProvider>

        <Footer />

        {/* Floating WhatsApp Button - visible on all pages */}
        <WhatsAppButton />
      </PageTransitionProvider>
    </ToastProvider>
  );
}
