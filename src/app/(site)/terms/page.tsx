import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for Invenex Solutions. Read our terms and conditions for using our website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24" aria-labelledby="terms-title">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1
          id="terms-title"
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Terms of Service
        </h1>
        <div className="prose prose-invert prose-gray max-w-none space-y-6 text-foreground-muted">
          <p>
            <strong className="text-foreground">Last updated:</strong> February
            2026
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using the Invenex Solutions website, you accept and
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our website.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            2. Services
          </h2>
          <p>
            Invenex Solutions provides web development, mobile app development,
            platform development, and digital strategy services. Specific terms
            for individual projects are outlined in separate agreements.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            3. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, and
            software, is the property of Invenex Solutions and is protected by
            applicable intellectual property laws.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            4. Limitation of Liability
          </h2>
          <p>
            Invenex Solutions shall not be liable for any indirect, incidental,
            or consequential damages arising from the use of our website or
            services.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            5. Contact
          </h2>
          <p>
            For questions about these Terms of Service, contact us at{" "}
            <a
              href="mailto:hello@invenexsolutions.com"
              className="text-coral-500 hover:text-coral-400 transition-colors"
            >
              hello@invenexsolutions.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
