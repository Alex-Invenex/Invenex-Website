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
  Row,
  Column,
} from '@react-email/components';
import { contactInfo } from '@/lib/constants';
import type { ScopeEmailProps } from './scope-team-notification';

/**
 * Customer-facing copy of what they selected, so they have a record of the
 * scope they asked us to price.
 */
export default function ScopeConfirmation({
  name,
  timeline,
  summary,
}: ScopeEmailProps) {
  const firstName = name.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>
        {`We have your scope — ${summary.selectedCount} features. We will come back with pricing within two working days.`}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.logo}>INVENEX</Text>
            <Text style={styles.tagline}>Solutions</Text>
          </Section>

          <Section style={styles.content}>
            <Heading as="h1" style={styles.h1}>
              Thank you, {firstName}.
            </Heading>
            <Text style={styles.lede}>
              We have your project scope. Our team is reviewing it now and will
              come back within two working days with pricing and a delivery
              timeline built against exactly this list — nothing you have not
              asked for will appear in the quote.
            </Text>

            {timeline && (
              <Text style={styles.metaLine}>
                Target go-live: <strong style={styles.strong}>{timeline}</strong>
              </Text>
            )}

            <Hr style={styles.divider} />

            <Heading as="h2" style={styles.sectionTitle}>
              What you selected · {summary.selectedCount} features
            </Heading>

            {summary.tracks.map((track) => (
              <Section key={track.code} style={styles.trackCard}>
                <Row>
                  <Column>
                    <Text style={styles.trackTitle}>{track.title}</Text>
                  </Column>
                  <Column style={styles.trackCountCol}>
                    <Text style={styles.trackCount}>{track.selectedCount}</Text>
                  </Column>
                </Row>

                {track.groups.map((group) => (
                  <Section key={group.title} style={styles.groupBlock}>
                    <Text style={styles.groupTitle}>{group.title}</Text>
                    {group.features.map((feature) => (
                      <Text key={feature.id} style={styles.featureLine}>
                        {feature.title}
                      </Text>
                    ))}
                  </Section>
                ))}
              </Section>
            ))}

            <Hr style={styles.divider} />

            <Section style={styles.card}>
              <Text style={styles.cardTitle}>Changed your mind?</Text>
              <Text style={styles.cardText}>
                Reply to this email and tell us what to add or remove. Nothing is
                fixed until you approve a quote.
              </Text>
            </Section>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              <Link href={`mailto:${contactInfo.email}`} style={styles.footerLink}>
                {contactInfo.email}
              </Link>
              {'  ·  '}
              <Link
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                style={styles.footerLink}
              >
                {contactInfo.phone}
              </Link>
            </Text>
            <Text style={styles.footerMuted}>
              Invenex Solutions · Koratty, Thrissur, Kerala
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
    maxWidth: '640px',
    margin: '0 auto',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #262626',
  },
  header: {
    background:
      'linear-gradient(135deg, #1a1a1a 0%, #0A0A0A 50%, #1a1a1a 100%)',
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
    fontSize: '12px',
    color: '#737373',
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    margin: 0,
  },
  content: {
    backgroundColor: '#141414',
    padding: '32px',
  },
  h1: {
    fontSize: '26px',
    fontWeight: '700' as const,
    color: '#FAFAFA',
    margin: '0 0 16px 0',
    letterSpacing: '-0.5px',
  },
  lede: {
    fontSize: '15px',
    color: '#A3A3A3',
    lineHeight: '1.7',
    margin: '0 0 12px 0',
  },
  metaLine: {
    fontSize: '14px',
    color: '#A3A3A3',
    margin: '12px 0 0 0',
  },
  strong: {
    color: '#FAFAFA',
    fontWeight: '600' as const,
  },
  divider: {
    borderColor: '#262626',
    borderWidth: '1px',
    margin: '28px 0',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: '600' as const,
    color: '#A3A3A3',
    textTransform: 'uppercase' as const,
    letterSpacing: '1.2px',
    margin: '0 0 16px 0',
  },
  trackCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    padding: '20px 24px',
    border: '1px solid #262626',
    borderLeft: '3px solid #FF6A37',
    marginBottom: '12px',
  },
  trackTitle: {
    fontSize: '17px',
    fontWeight: '600' as const,
    color: '#FAFAFA',
    margin: 0,
  },
  trackCountCol: {
    textAlign: 'right' as const,
    verticalAlign: 'middle' as const,
    width: '48px',
  },
  trackCount: {
    fontSize: '16px',
    color: '#FF6A37',
    fontWeight: '700' as const,
    margin: 0,
  },
  groupBlock: {
    marginTop: '16px',
  },
  groupTitle: {
    fontSize: '11px',
    fontWeight: '600' as const,
    color: '#737373',
    textTransform: 'uppercase' as const,
    letterSpacing: '1.4px',
    margin: '0 0 8px 0',
  },
  featureLine: {
    fontSize: '14px',
    color: '#D4D4D4',
    lineHeight: '1.5',
    margin: '0 0 6px 0',
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    padding: '20px 24px',
    border: '1px solid #262626',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: '600' as const,
    color: '#FAFAFA',
    margin: '0 0 6px 0',
  },
  cardText: {
    fontSize: '14px',
    color: '#A3A3A3',
    lineHeight: '1.6',
    margin: 0,
  },
  footer: {
    backgroundColor: '#0A0A0A',
    padding: '24px 32px',
    textAlign: 'center' as const,
    borderTop: '1px solid #262626',
  },
  footerText: {
    fontSize: '13px',
    color: '#737373',
    margin: '0 0 8px 0',
  },
  footerLink: {
    color: '#FF6A37',
    textDecoration: 'none',
  },
  footerMuted: {
    fontSize: '12px',
    color: '#525252',
    margin: 0,
  },
};
