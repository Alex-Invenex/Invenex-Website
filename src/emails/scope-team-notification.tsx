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
import type { ScopeSummary } from '@/lib/scope-catalog';

export interface ScopeEmailProps {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  timeline?: string;
  existingUrl?: string;
  notes?: string;
  trackTitles: string[];
  summary: ScopeSummary;
  submittedAt: string;
}

export default function ScopeTeamNotification({
  name,
  email,
  phone,
  company,
  timeline,
  existingUrl,
  notes,
  trackTitles,
  summary,
  submittedAt,
}: ScopeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {`${name} scoped ${summary.selectedCount} features across ${summary.tracks.length} service${
          summary.tracks.length === 1 ? '' : 's'
        }`}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logo}>INVENEX</Text>
            <Text style={styles.tagline}>New Project Scope</Text>
          </Section>

          <Section style={styles.content}>
            {/* Headline numbers */}
            <Section style={styles.badge}>
              <Text style={styles.badgeLabel}>FEATURES SELECTED</Text>
              <Text style={styles.badgeNumber}>{summary.selectedCount}</Text>
              <Text style={styles.badgeSub}>
                across {trackTitles.join(' · ')}
              </Text>
            </Section>

            <Hr style={styles.divider} />

            {/* Contact */}
            <Section style={styles.card}>
              <Heading as="h2" style={styles.sectionTitle}>
                Client Details
              </Heading>

              <InfoRow label="Name" value={name} />
              <InfoRow label="Email" value={email} href={`mailto:${email}`} />
              {phone && (
                <InfoRow
                  label="Phone"
                  value={phone}
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                />
              )}
              {company && <InfoRow label="Company" value={company} />}
              {timeline && <InfoRow label="Go-live" value={timeline} />}
              {existingUrl && <InfoRow label="Existing" value={existingUrl} />}
            </Section>

            <Hr style={styles.divider} />

            {/* The scope itself */}
            <Heading as="h2" style={styles.scopeHeading}>
              Requested Scope
            </Heading>

            {summary.tracks.map((track) => (
              <Section key={track.code} style={styles.trackCard}>
                <Row>
                  <Column>
                    <Text style={styles.trackTitle}>{track.title}</Text>
                  </Column>
                  <Column style={styles.trackCountCol}>
                    <Text style={styles.trackCount}>
                      {track.selectedCount}/{track.totalCount}
                    </Text>
                  </Column>
                </Row>

                {track.groups.map((group) => (
                  <Section key={group.title} style={styles.groupBlock}>
                    <Text style={styles.groupTitle}>{group.title}</Text>
                    {group.features.map((feature) => (
                      <Text key={feature.id} style={styles.featureLine}>
                        <span style={styles.featureId}>{feature.id}</span>
                        {'  '}
                        {feature.title}
                        {feature.tier === 'core' ? (
                          <span style={styles.coreMark}> · core</span>
                        ) : null}
                      </Text>
                    ))}
                  </Section>
                ))}
              </Section>
            ))}

            {notes && (
              <>
                <Hr style={styles.divider} />
                <Section style={styles.card}>
                  <Heading as="h2" style={styles.sectionTitle}>
                    Their Notes
                  </Heading>
                  <Text style={styles.notesText}>{notes}</Text>
                </Section>
              </>
            )}

            <Hr style={styles.divider} />

            <Section style={styles.actions}>
              <Text style={styles.actionsTitle}>Quick Actions</Text>
              <Text style={styles.actionsText}>
                Reply directly to this email to reach {name}.
              </Text>
            </Section>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.timestamp}>Received on {submittedAt}</Text>
            <Text style={styles.footerText}>
              Invenex Solutions · Kerala, India
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <Row style={styles.infoRow}>
      <Column style={styles.infoLabel}>
        <Text style={styles.labelText}>{label}</Text>
      </Column>
      <Column style={styles.infoValue}>
        {href ? (
          <Link href={href} style={styles.linkText}>
            {value}
          </Link>
        ) : (
          <Text style={styles.valueText}>{value}</Text>
        )}
      </Column>
    </Row>
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
  badge: {
    textAlign: 'center' as const,
    padding: '24px',
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    border: '1px solid #262626',
  },
  badgeLabel: {
    fontSize: '11px',
    fontWeight: '600' as const,
    color: '#737373',
    letterSpacing: '2px',
    margin: '0 0 4px 0',
  },
  badgeNumber: {
    fontSize: '44px',
    fontWeight: '700' as const,
    color: '#FF6A37',
    lineHeight: '1.1',
    margin: '0 0 8px 0',
  },
  badgeSub: {
    fontSize: '14px',
    color: '#A3A3A3',
    margin: 0,
  },
  divider: {
    borderColor: '#262626',
    borderWidth: '1px',
    margin: '24px 0',
  },
  card: {
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
  scopeHeading: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: '#A3A3A3',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: '0 0 16px 0',
  },
  infoRow: {
    marginBottom: '14px',
  },
  infoLabel: {
    width: '84px',
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
    color: '#FF6A37',
    textDecoration: 'none',
    fontWeight: '500' as const,
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
    width: '70px',
  },
  trackCount: {
    fontSize: '14px',
    color: '#FF6A37',
    fontWeight: '600' as const,
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
  featureId: {
    color: '#525252',
    fontSize: '11px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  coreMark: {
    color: '#737373',
    fontSize: '12px',
  },
  notesText: {
    fontSize: '15px',
    color: '#A3A3A3',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap' as const,
    margin: 0,
  },
  actions: {
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
    margin: 0,
  },
};
