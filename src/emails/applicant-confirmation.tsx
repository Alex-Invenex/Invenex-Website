import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Preview,
  Link,
} from '@react-email/components';

interface ApplicantConfirmationProps {
  name: string;
  jobTitle: string;
}

export default function ApplicantConfirmation({
  name,
  jobTitle,
}: ApplicantConfirmationProps) {
  return (
    <Html>
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          `}
        </style>
      </Head>
      <Preview>
        Thank you for applying to {jobTitle} at Invenex Solutions
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logo}>INVENEX</Text>
          </Section>

          {/* Hero Section */}
          <Section style={styles.hero}>
            <Text style={styles.emoji}>🎉</Text>
            <Heading style={styles.heroTitle}>Application Received!</Heading>
            <Text style={styles.heroSubtitle}>
              Thank you for your interest in joining our team
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={styles.content}>
            <Text style={styles.greeting}>Hi {name},</Text>

            <Text style={styles.paragraph}>
              We&apos;ve received your application for the{' '}
              <strong style={styles.strong}>{jobTitle}</strong> position at
              Invenex Solutions. Our team is excited to review your profile.
            </Text>

            {/* Position Card */}
            <Section style={styles.positionCard}>
              <Text style={styles.positionLabel}>YOU APPLIED FOR</Text>
              <Text style={styles.positionTitle}>{jobTitle}</Text>
            </Section>

            <Hr style={styles.divider} />

            {/* What's Next Section */}
            <Section style={styles.stepsSection}>
              <Heading as="h2" style={styles.sectionTitle}>
                What Happens Next?
              </Heading>

              <Section style={styles.step}>
                <Text style={styles.stepNumber}>01</Text>
                <Section style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Application Review</Text>
                  <Text style={styles.stepDescription}>
                    Our team will carefully review your resume and cover letter
                  </Text>
                </Section>
              </Section>

              <Section style={styles.step}>
                <Text style={styles.stepNumber}>02</Text>
                <Section style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Initial Contact</Text>
                  <Text style={styles.stepDescription}>
                    If there&apos;s a match, we&apos;ll reach out within 5-7
                    business days
                  </Text>
                </Section>
              </Section>

              <Section style={styles.step}>
                <Text style={styles.stepNumber}>03</Text>
                <Section style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Interview Process</Text>
                  <Text style={styles.stepDescription}>
                    Technical assessment and team interviews to find the perfect
                    fit
                  </Text>
                </Section>
              </Section>
            </Section>

            <Hr style={styles.divider} />

            {/* CTA Section */}
            <Section style={styles.ctaSection}>
              <Text style={styles.ctaText}>
                Want to learn more about life at Invenex?
              </Text>
              <Link href="https://invenex.in/careers" style={styles.ctaButton}>
                Explore Our Culture
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerMain}>
              Questions? Reach out to us at{' '}
              <Link href="mailto:hello@invenex.in" style={styles.footerLink}>
                hello@invenex.in
              </Link>
            </Text>
            <Hr style={styles.footerDivider} />
            <Text style={styles.footerText}>
              Invenex Solutions · Kochi, Kerala, India
            </Text>
            <Text style={styles.footerLinks}>
              <Link href="https://invenex.in" style={styles.footerLinkSmall}>
                Website
              </Link>
              {' · '}
              <Link
                href="https://linkedin.com/company/invenex"
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
  greeting: {
    fontSize: '18px',
    color: '#FAFAFA',
    margin: '0 0 16px 0',
  },
  paragraph: {
    fontSize: '15px',
    color: '#A3A3A3',
    lineHeight: '1.7',
    margin: '0 0 24px 0',
  },
  strong: {
    color: '#FAFAFA',
    fontWeight: '600' as const,
  },
  positionCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    padding: '20px 24px',
    border: '1px solid #262626',
    textAlign: 'center' as const,
  },
  positionLabel: {
    fontSize: '11px',
    fontWeight: '600' as const,
    color: '#737373',
    letterSpacing: '2px',
    margin: '0 0 8px 0',
  },
  positionTitle: {
    fontSize: '20px',
    fontWeight: '600' as const,
    color: '#FAFAFA',
    margin: 0,
  },
  divider: {
    borderColor: '#262626',
    borderWidth: '1px',
    margin: '32px 0',
  },
  stepsSection: {
    padding: '0',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: '#737373',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: '0 0 24px 0',
  },
  step: {
    marginBottom: '20px',
  },
  stepNumber: {
    fontSize: '12px',
    fontWeight: '700' as const,
    color: '#404040',
    letterSpacing: '1px',
    margin: '0 0 8px 0',
  },
  stepContent: {
    paddingLeft: '0',
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: '#FAFAFA',
    margin: '0 0 4px 0',
  },
  stepDescription: {
    fontSize: '14px',
    color: '#737373',
    margin: 0,
    lineHeight: '1.5',
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
  footerLink: {
    color: '#FAFAFA',
    textDecoration: 'none',
    borderBottom: '1px solid #404040',
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
