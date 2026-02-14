import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SkipLink } from "@/components/accessibility";
import {
  PageTransitionProvider,
  TransitionOverlay,
  PageLoader,
  InitialLoader,
} from "@/components/transitions";
import { ToastProvider } from "@/components/ui/toast";
import { LenisProvider } from "@/components/providers/lenis-provider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      {/* Initial Loader - First-visit branded experience (Story 9.9) */}
      {/* TEMPORARILY DISABLED FOR DEVELOPMENT - uncomment before production */}
      {/* <InitialLoader minDisplayTime={500} /> */}

      <PageTransitionProvider exitDuration={300} enterDuration={400}>
        {/* Transition Overlay - Cinematic page transitions (Story 9.3) */}
        <TransitionOverlay blur />
        <PageLoader />

        {/* Custom Cursor - Premium UI enhancement (Story 9.2) */}
        <CustomCursor />

        {/* Skip Link for Accessibility - WCAG 2.1 AA SC 2.4.1 */}
        <SkipLink />

        <Navbar />

        <LenisProvider>
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </LenisProvider>

        <Footer />

        {/* Floating WhatsApp Button - visible on all pages */}
        <WhatsAppButton />
      </PageTransitionProvider>
    </ToastProvider>
  );
}
