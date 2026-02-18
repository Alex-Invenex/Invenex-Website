import { AnimatedSection } from '@/components/ui/animated-section';
import { HeroHeading } from '@/components/ui/hero-heading';
import { QuoteForm } from '@/components/forms/quote-form';
import { contactInfo } from '@/lib/constants';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Invenex Solutions. Request a quote, discuss your project, or visit our office in Thrissur, Kerala. We respond within 24 hours.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        aria-labelledby="contact-hero-heading"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-coral-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-coral-500/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <HeroHeading id="contact-hero-heading" className="text-heading-1 font-bold">
              {"Let's Build Something Great"}
            </HeroHeading>
            <AnimatedSection delay={0.1}>
              <p className="mt-6 text-body-lg text-foreground-muted max-w-2xl mx-auto">
                Tell us about your project and we&apos;ll get back to you within 24 hours.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Form and Contact Info Section */}
      <section
        className="py-16"
        aria-labelledby="contact-form-heading"
      >
        <h2 id="contact-form-heading" className="sr-only">
          Contact Form and Information
        </h2>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Quote Form */}
            <AnimatedSection>
              <QuoteForm />
            </AnimatedSection>

            {/* Alternative Contact Info */}
            <AnimatedSection delay={0.1}>
              <div className="space-y-8" data-testid="contact-info">
                <div>
                  <h3 className="font-semibold mb-2 text-body-lg">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-body-lg">Phone</h3>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-body-lg">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {contactInfo.whatsapp}
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-body-lg">Address</h3>
                  <p className="text-foreground-muted">
                    {contactInfo.address.street}
                    <br />
                    {contactInfo.address.city}, {contactInfo.address.state}
                    <br />
                    {contactInfo.address.country} - {contactInfo.address.zip}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-body-lg">Business Hours</h3>
                  <p className="text-foreground-muted">{contactInfo.businessHours}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
