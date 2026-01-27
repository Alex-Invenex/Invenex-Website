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
} from '@react-email/components';

interface TeamNotificationProps {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  description: string;
  source?: string;
  submittedAt: string;
}

export default function TeamNotification({
  name,
  email,
  projectType,
  budget,
  description,
  source,
  submittedAt,
}: TeamNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New Quote Request from {name}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>New Quote Request</Heading>

          <Section style={styles.section}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>

            <Text style={styles.label}>Project Type</Text>
            <Text style={styles.value}>{projectType}</Text>

            <Text style={styles.label}>Budget Range</Text>
            <Text style={styles.value}>{budget}</Text>

            <Text style={styles.label}>How They Found Us</Text>
            <Text style={styles.value}>{source || 'Not specified'}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Heading as="h3" style={styles.subheading}>
              Project Description
            </Heading>
            <Text style={styles.description}>{description}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Text style={styles.timestamp}>Submitted at {submittedAt}</Text>
          <Text style={styles.footer}>
            Reply directly to this email to respond to {name} at {email}
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
    fontSize: '24px',
    fontWeight: '600' as const,
    color: '#18181b',
    marginBottom: '24px',
  },
  subheading: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: '#18181b',
    marginBottom: '12px',
  },
  section: {
    marginBottom: '16px',
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
    fontSize: '16px',
    color: '#18181b',
    marginTop: '0',
    marginBottom: '16px',
  },
  description: {
    fontSize: '16px',
    color: '#3f3f46',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap' as const,
  },
  hr: {
    borderColor: '#e4e4e7',
    margin: '24px 0',
  },
  timestamp: {
    fontSize: '12px',
    color: '#71717a',
    marginBottom: '8px',
  },
  footer: {
    fontSize: '14px',
    color: '#52525b',
    fontStyle: 'italic' as const,
  },
};
