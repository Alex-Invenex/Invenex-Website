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
  Img,
  Row,
  Column,
} from '@react-email/components';

interface HRApplicationNotificationProps {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  resumeUrl: string;
  portfolio?: string;
  coverLetter?: string;
  submittedAt: string;
}

export default function HRApplicationNotification({
  name,
  email,
  phone,
  jobTitle,
  resumeUrl,
  portfolio,
  coverLetter,
  submittedAt,
}: HRApplicationNotificationProps) {
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
        New Application for {jobTitle} from {name}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header with gradient */}
          <Section style={styles.header}>
            <Text style={styles.logo}>INVENEX</Text>
            <Text style={styles.tagline}>New Job Application</Text>
          </Section>

          {/* Main Content */}
          <Section style={styles.content}>
            {/* Position Badge */}
            <Section style={styles.positionBadge}>
              <Text style={styles.positionLabel}>POSITION</Text>
              <Heading style={styles.positionTitle}>{jobTitle}</Heading>
            </Section>

            <Hr style={styles.divider} />

            {/* Applicant Info Card */}
            <Section style={styles.infoCard}>
              <Heading as="h2" style={styles.sectionTitle}>
                Applicant Details
              </Heading>

              <Row style={styles.infoRow}>
                <Column style={styles.infoLabel}>
                  <Text style={styles.labelText}>Name</Text>
                </Column>
                <Column style={styles.infoValue}>
                  <Text style={styles.valueText}>{name}</Text>
                </Column>
              </Row>

              <Row style={styles.infoRow}>
                <Column style={styles.infoLabel}>
                  <Text style={styles.labelText}>Email</Text>
                </Column>
                <Column style={styles.infoValue}>
                  <Link href={`mailto:${email}`} style={styles.linkText}>
                    {email}
                  </Link>
                </Column>
              </Row>

              <Row style={styles.infoRow}>
                <Column style={styles.infoLabel}>
                  <Text style={styles.labelText}>Phone</Text>
                </Column>
                <Column style={styles.infoValue}>
                  <Link href={`tel:${phone}`} style={styles.linkText}>
                    {phone}
                  </Link>
                </Column>
              </Row>

              {portfolio && (
                <Row style={styles.infoRow}>
                  <Column style={styles.infoLabel}>
                    <Text style={styles.labelText}>Portfolio</Text>
                  </Column>
                  <Column style={styles.infoValue}>
                    <Link href={portfolio} style={styles.linkText}>
                      View Portfolio →
                    </Link>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Resume Download Button */}
            <Section style={styles.ctaSection}>
              <Link href={resumeUrl} style={styles.ctaButton}>
                Download Resume
              </Link>
            </Section>

            {/* Cover Letter */}
            {coverLetter && (
              <>
                <Hr style={styles.divider} />
                <Section style={styles.coverLetterSection}>
                  <Heading as="h2" style={styles.sectionTitle}>
                    Cover Letter
                  </Heading>
                  <Text style={styles.coverLetterText}>{coverLetter}</Text>
                </Section>
              </>
            )}

            <Hr style={styles.divider} />

            {/* Quick Actions */}
            <Section style={styles.actionsSection}>
              <Text style={styles.actionsTitle}>Quick Actions</Text>
              <Text style={styles.actionsText}>
                Reply directly to this email to contact {name}
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.timestamp}>
              Received on {submittedAt}
            </Text>
            <Text style={styles.footerText}>
              Invenex Solutions · Kerala, India
            </Text>
            <Text style={styles.footerLink}>
              <Link href="https://invenex.in" style={styles.footerLinkText}>
                invenex.in
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
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
    background: 'linear-gradient(135deg, #1a1a1a 0%, #0A0A0A 50%, #1a1a1a 100%)',
    padding: '40px 32px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #262626',
  },
  logo: {
    fontSize: '28px',
    fontWeight: '700' as const,
    color: '#FAFAFA',
    letterSpacing: '4px',
    margin: '0 0 8px 0',
  },
  tagline: {
    fontSize: '14px',
    color: '#737373',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    margin: 0,
  },
  content: {
    backgroundColor: '#141414',
    padding: '32px',
  },
  positionBadge: {
    textAlign: 'center' as const,
    padding: '24px',
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    border: '1px solid #262626',
    marginBottom: '24px',
  },
  positionLabel: {
    fontSize: '11px',
    fontWeight: '600' as const,
    color: '#737373',
    letterSpacing: '2px',
    margin: '0 0 8px 0',
  },
  positionTitle: {
    fontSize: '24px',
    fontWeight: '600' as const,
    color: '#FAFAFA',
    margin: 0,
  },
  divider: {
    borderColor: '#262626',
    borderWidth: '1px',
    margin: '24px 0',
  },
  infoCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #262626',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: '#A3A3A3',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: '0 0 20px 0',
  },
  infoRow: {
    marginBottom: '16px',
  },
  infoLabel: {
    width: '100px',
    verticalAlign: 'top' as const,
  },
  infoValue: {
    verticalAlign: 'top' as const,
  },
  labelText: {
    fontSize: '13px',
    color: '#737373',
    margin: 0,
  },
  valueText: {
    fontSize: '15px',
    color: '#FAFAFA',
    margin: 0,
    fontWeight: '500' as const,
  },
  linkText: {
    fontSize: '15px',
    color: '#FAFAFA',
    textDecoration: 'none',
    fontWeight: '500' as const,
    borderBottom: '1px solid #404040',
  },
  ctaSection: {
    textAlign: 'center' as const,
    padding: '24px 0',
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#FAFAFA',
    color: '#0A0A0A',
    fontSize: '14px',
    fontWeight: '600' as const,
    padding: '14px 32px',
    borderRadius: '50px',
    textDecoration: 'none',
    letterSpacing: '0.5px',
  },
  coverLetterSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #262626',
  },
  coverLetterText: {
    fontSize: '15px',
    color: '#A3A3A3',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap' as const,
    margin: 0,
  },
  actionsSection: {
    textAlign: 'center' as const,
    padding: '16px',
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    border: '1px solid #262626',
  },
  actionsTitle: {
    fontSize: '13px',
    fontWeight: '600' as const,
    color: '#FAFAFA',
    margin: '0 0 4px 0',
  },
  actionsText: {
    fontSize: '13px',
    color: '#737373',
    margin: 0,
  },
  footer: {
    backgroundColor: '#0A0A0A',
    padding: '24px 32px',
    textAlign: 'center' as const,
    borderTop: '1px solid #262626',
  },
  timestamp: {
    fontSize: '12px',
    color: '#737373',
    margin: '0 0 8px 0',
  },
  footerText: {
    fontSize: '12px',
    color: '#525252',
    margin: '0 0 4px 0',
  },
  footerLink: {
    margin: 0,
  },
  footerLinkText: {
    fontSize: '12px',
    color: '#525252',
    textDecoration: 'none',
  },
};
