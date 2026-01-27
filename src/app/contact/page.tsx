import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/animated-section';
import { QuoteForm } from '@/components/forms/quote-form';
import { contactInfo } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Invenex Solutions for your next project. Request a quote for web development, mobile apps, or digital solutions.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-32 pb-16"
        aria-labelledby="contact-hero-heading"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h1
              id="contact-hero-heading"
              className="text-heading-1 font-bold"
            >
              Let&apos;s Build Something Great
            </h1>
            <p className="mt-6 text-body-lg text-foreground-muted max-w-2xl mx-auto">
              Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
          </AnimatedSection>
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
