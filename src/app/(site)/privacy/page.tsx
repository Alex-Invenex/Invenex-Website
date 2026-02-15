import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Invenex Solutions. Learn how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24" aria-labelledby="privacy-title">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1
          id="privacy-title"
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Privacy Policy
        </h1>
        <div className="prose prose-invert prose-gray max-w-none space-y-6 text-foreground-muted">
          <p>
            <strong className="text-foreground">Last updated:</strong> February
            2026
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly when you use our contact
            forms, subscribe to newsletters, or communicate with us. This may
            include your name, email address, phone number, and project details.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to respond to your inquiries,
            provide our services, improve our website, and communicate updates
            about our services.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            3. Data Protection
          </h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access, alteration,
            disclosure, or destruction.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            4. Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at{" "}
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
