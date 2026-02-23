import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Link,
  Preview,
  Hr,
} from '@react-email/components';
import { contactInfo } from '@/lib/constants';

interface QuoteConfirmationProps {
  name: string;
  projectType: string;
  budget: string;
  description: string;
}

export default function QuoteConfirmation({
  name,
  projectType,
  budget,
  description,
}: QuoteConfirmationProps) {
  const whatsappNumber = contactInfo.whatsapp.replace(/[^0-9]/g, '');

  return (
    <Html>
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          `}
        </style>
      </Head>
      <Preview>Thank you for contacting Invenex Solutions!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logo}>INVENEX</Text>
          </Section>

          {/* Hero Section */}
          <Section style={styles.hero}>
            <Text style={styles.emoji}>✨</Text>
            <Heading style={styles.heroTitle}>Thank You, {name}!</Heading>
            <Text style={styles.heroSubtitle}>
              We&apos;ve received your quote request
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={styles.content}>
            <Text style={styles.paragraph}>
              Our team is reviewing your project details and will get back to
              you within <strong style={styles.strong}>24 hours</strong>.
            </Text>

            {/* Summary Card */}
            <Section style={styles.summaryCard}>
              <Heading as="h2" style={styles.sectionTitle}>
                Your Request Summary
              </Heading>

              <Section style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Project Type</Text>
                <Text style={styles.summaryValue}>{projectType}</Text>
              </Section>

              <Section style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Budget Range</Text>
                <Text style={styles.summaryValue}>{budget}</Text>
              </Section>

              <Section style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Project Description</Text>
                <Text style={styles.summaryDescription}>{description}</Text>
              </Section>
            </Section>

            <Hr style={styles.divider} />

            {/* Contact Options */}
            <Section style={styles.contactSection}>
              <Heading as="h2" style={styles.sectionTitle}>
                Need to Reach Us Sooner?
              </Heading>

              <Section style={styles.contactGrid}>
                <Section style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Link
                    href={`mailto:${contactInfo.email}`}
                    style={styles.contactLink}
                  >
                    {contactInfo.email}
                  </Link>
                </Section>

                <Section style={styles.contactItem}>
                  <Text style={styles.contactLabel}>WhatsApp</Text>
                  <Link
                    href={`https://wa.me/${whatsappNumber}`}
                    style={styles.contactLink}
                  >
                    {contactInfo.whatsapp}
                  </Link>
                </Section>

                <Section style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Link
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    style={styles.contactLink}
                  >
                    {contactInfo.phone}
                  </Link>
                </Section>
              </Section>
            </Section>

            <Hr style={styles.divider} />

            {/* CTA Section */}
            <Section style={styles.ctaSection}>
              <Text style={styles.ctaText}>
                While you wait, explore our recent work
              </Text>
              <Link href="https://invenex.in/portfolio" style={styles.ctaButton}>
                View Portfolio
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerMain}>
              We&apos;re excited to learn more about your project!
            </Text>
            <Hr style={styles.footerDivider} />
            <Text style={styles.footerText}>
              Invenex Solutions · Kerala, India
            </Text>
            <Text style={styles.footerLinks}>
              <Link href="https://invenex.in" style={styles.footerLinkSmall}>
                Website
              </Link>
              {' · '}
              <Link
                href="https://www.linkedin.com/company/invenexsolutions"
                style={styles.footerLinkSmall}
              >
                LinkedIn
              </Link>
              {' · '}
              <Link
                href="https://instagram.com/invenex"
                style={styles.footerLinkSmall}
              >
                Instagram
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#0A0A0A',
    padding: '40px 20px',
    margin: 0,
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #262626',
  },
  header: {
    backgroundColor: '#0A0A0A',
    padding: '24px 32px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #262626',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700' as const,
    color: '#FAFAFA',
    letterSpacing: '4px',
    margin: 0,
  },
  hero: {
    background:
      'linear-gradient(135deg, #1a1a1a 0%, #141414 50%, #1a1a1a 100%)',
    padding: '48px 32px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #262626',
  },
  emoji: {
    fontSize: '48px',
    margin: '0 0 16px 0',
  },
  heroTitle: {
    fontSize: '32px',
    fontWeight: '700' as const,
    color: '#FAFAFA',
    margin: '0 0 8px 0',
  },
  heroSubtitle: {
    fontSize: '16px',
    color: '#A3A3A3',
    margin: 0,
  },
  content: {
    backgroundColor: '#141414',
    padding: '32px',
  },
  paragraph: {
    fontSize: '15px',
    color: '#A3A3A3',
    lineHeight: '1.7',
    margin: '0 0 24px 0',
    textAlign: 'center' as const,
  },
  strong: {
    color: '#FAFAFA',
    fontWeight: '600' as const,
  },
  summaryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #262626',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: '#737373',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: '0 0 20px 0',
  },
  summaryItem: {
    marginBottom: '16px',
  },
  summaryLabel: {
    fontSize: '12px',
    fontWeight: '600' as const,
    color: '#737373',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: '0 0 6px 0',
  },
  summaryValue: {
    fontSize: '16px',
    color: '#FAFAFA',
    margin: 0,
    fontWeight: '500' as const,
  },
  summaryDescription: {
    fontSize: '14px',
    color: '#A3A3A3',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap' as const,
    margin: 0,
  },
  divider: {
    borderColor: '#262626',
    borderWidth: '1px',
    margin: '32px 0',
  },
  contactSection: {
    textAlign: 'center' as const,
  },
  contactGrid: {
    display: 'block',
  },
  contactItem: {
    marginBottom: '16px',
  },
  contactLabel: {
    fontSize: '12px',
    color: '#737373',
    margin: '0 0 4px 0',
  },
  contactLink: {
    fontSize: '15px',
    color: '#FAFAFA',
    textDecoration: 'none',
    borderBottom: '1px solid #404040',
  },
  ctaSection: {
    textAlign: 'center' as const,
    padding: '8px 0',
  },
  ctaText: {
    fontSize: '14px',
    color: '#737373',
    margin: '0 0 16px 0',
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#FAFAFA',
    color: '#0A0A0A',
    fontSize: '14px',
    fontWeight: '600' as const,
    padding: '12px 28px',
    borderRadius: '50px',
    textDecoration: 'none',
    letterSpacing: '0.5px',
  },
  footer: {
    backgroundColor: '#0A0A0A',
    padding: '24px 32px',
    textAlign: 'center' as const,
    borderTop: '1px solid #262626',
  },
  footerMain: {
    fontSize: '14px',
    color: '#A3A3A3',
    margin: '0 0 16px 0',
  },
  footerDivider: {
    borderColor: '#262626',
    borderWidth: '1px',
    margin: '16px 0',
  },
  footerText: {
    fontSize: '12px',
    color: '#525252',
    margin: '0 0 8px 0',
  },
  footerLinks: {
    fontSize: '12px',
    color: '#525252',
    margin: 0,
  },
  footerLinkSmall: {
    color: '#525252',
    textDecoration: 'none',
  },
};
