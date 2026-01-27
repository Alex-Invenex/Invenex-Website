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
      <Head />
      <Preview>Thank you for contacting Invenex Solutions!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Thank You, {name}!</Heading>

          <Text style={styles.text}>
            We&apos;ve received your quote request and our team will review it
            shortly. You can expect to hear back from us within{' '}
            <strong>24 hours</strong>.
          </Text>

          <Hr style={styles.hr} />

          <Section style={styles.summarySection}>
            <Heading as="h3" style={styles.subheading}>
              Your Submission Summary
            </Heading>

            <Text style={styles.label}>Project Type</Text>
            <Text style={styles.value}>{projectType}</Text>

            <Text style={styles.label}>Budget Range</Text>
            <Text style={styles.value}>{budget}</Text>

            <Text style={styles.label}>Project Description</Text>
            <Text style={styles.description}>{description}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Heading as="h3" style={styles.subheading}>
              Need to Reach Us Sooner?
            </Heading>

            <Text style={styles.text}>
              <strong>Email:</strong>{' '}
              <Link href={`mailto:${contactInfo.email}`} style={styles.link}>
                {contactInfo.email}
              </Link>
            </Text>

            <Text style={styles.text}>
              <strong>WhatsApp:</strong>{' '}
              <Link
                href={`https://wa.me/${whatsappNumber}`}
                style={styles.link}
              >
                {contactInfo.whatsapp}
              </Link>
            </Text>

            <Text style={styles.text}>
              <strong>Phone:</strong>{' '}
              <Link
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                style={styles.link}
              >
                {contactInfo.phone}
              </Link>
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.ctaSection}>
            <Text style={styles.text}>
              While you wait, feel free to explore our{' '}
              <Link href="https://invenex.in/portfolio" style={styles.link}>
                portfolio
              </Link>{' '}
              to see some of our recent work.
            </Text>
          </Section>

          <Text style={styles.signature}>
            Best regards,
            <br />
            The Invenex Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#f4f4f5',
    padding: '40px 20px',
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600' as const,
    color: '#18181b',
    marginBottom: '16px',
  },
  subheading: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: '#18181b',
    marginBottom: '16px',
  },
  text: {
    fontSize: '16px',
    color: '#3f3f46',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  section: {
    marginBottom: '16px',
  },
  summarySection: {
    backgroundColor: '#fafafa',
    padding: '20px',
    borderRadius: '6px',
    marginBottom: '16px',
  },
  ctaSection: {
    marginBottom: '24px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600' as const,
    color: '#71717a',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '4px',
  },
  value: {
    fontSize: '14px',
    color: '#18181b',
    marginTop: '0',
    marginBottom: '12px',
  },
  description: {
    fontSize: '14px',
    color: '#3f3f46',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap' as const,
    marginTop: '0',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  hr: {
    borderColor: '#e4e4e7',
    margin: '24px 0',
  },
  signature: {
    fontSize: '16px',
    color: '#52525b',
    lineHeight: '1.8',
  },
};
