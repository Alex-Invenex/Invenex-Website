import { AnimatedSection } from "@/components/ui/animated-section";
import { TeamGrid } from "@/components/sections/team-grid";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about Invenex Solutions - our story, mission, values, and the passionate team behind our innovative digital solutions. Based in Kochi, Kerala.",
  path: "/about",
});

const values = [
  {
    icon: "🎯",
    title: "Excellence",
    description: "We deliver nothing but the best",
  },
  {
    icon: "🤝",
    title: "Partnership",
    description: "Your success is our success",
  },
  {
    icon: "💡",
    title: "Innovation",
    description: "Always pushing boundaries",
  },
  { icon: "⚡", title: "Speed", description: "Fast delivery without compromise" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" aria-labelledby="about-hero-title" data-testid="about-hero-section">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px] animate-pulse-glow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h1 id="about-hero-title" className="text-5xl md:text-6xl font-bold">
              Building the Future,
              <br />
              <span className="text-foreground-muted">One Project at a Time</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              Your trusted partner in digital transformation
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-24" aria-labelledby="about-story-title" data-testid="about-story-section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 id="about-story-title" className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-foreground-muted">
                <p>
                  Founded in Kochi, Kerala, Invenex Solutions started with a
                  simple mission: deliver world-class digital solutions that help
                  businesses thrive in the digital age.
                </p>
                <p>
                  Today, we&apos;re a team of passionate developers, designers, and
                  strategists who believe in the power of technology to transform
                  businesses.
                </p>
                <p>
                  From startups to established enterprises, we&apos;ve partnered with
                  businesses across industries to create exceptional digital
                  experiences that drive growth and engagement.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1} variant="slideRight">
              {/* Placeholder for image/illustration */}
              <div className="aspect-video bg-background-secondary rounded-2xl flex items-center justify-center">
                <div className="text-center text-foreground-muted">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-sm">Innovation at work</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-background-secondary" aria-labelledby="about-values-title" data-testid="about-values-section">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 id="about-values-title" className="text-3xl font-bold">Our Values</h2>
            <p className="mt-4 text-foreground-muted max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-4xl mb-4 block">{value.icon}</span>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-foreground-muted">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" aria-labelledby="about-team-title" data-testid="about-team-section">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 id="about-team-title" className="text-3xl font-bold">Meet the Team</h2>
            <p className="mt-4 text-foreground-muted">
              The people behind the magic
            </p>
          </AnimatedSection>
          <TeamGrid />
        </div>
      </section>
    </>
  );
}
