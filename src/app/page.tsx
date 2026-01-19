import { Button, Input, Textarea, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { siteConfig, contactInfo } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-16 bg-background">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-h1 font-bold text-foreground">{siteConfig.name}</h1>
          <p className="text-body-lg text-foreground-muted">
            Stories 1-3, 1-4, 1-5: UI Components Showcase
          </p>
        </header>

        {/* Story 1-4: Card Component */}
        <section className="space-y-8" data-testid="card-section">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Card Component (Story 1-4)
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Default Card */}
            <Card data-testid="card-default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Basic card variant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-muted">Standard card with no effects.</p>
              </CardContent>
            </Card>

            {/* Elevated Card */}
            <Card variant="elevated" data-testid="card-elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>With shadow effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-muted">Card with elevated shadow.</p>
              </CardContent>
            </Card>

            {/* Interactive Card */}
            <Card variant="interactive" data-testid="card-interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover for spotlight</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-muted">Mouse-tracking spotlight effect.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Learn More</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Story 1-4: Badge Component */}
        <section className="space-y-8" data-testid="badge-section">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Badge Component (Story 1-4)
          </h2>

          {/* Variants */}
          <div className="space-y-4">
            <h3 className="text-h5 text-foreground-muted">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Badge data-testid="badge-default">Default</Badge>
              <Badge variant="success" data-testid="badge-success">Success</Badge>
              <Badge variant="warning" data-testid="badge-warning">Warning</Badge>
              <Badge variant="error" data-testid="badge-error">Error</Badge>
              <Badge variant="info" data-testid="badge-info">Info</Badge>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-h5 text-foreground-muted">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Badge size="sm" data-testid="badge-sm">Small Badge</Badge>
              <Badge size="md" data-testid="badge-md">Medium Badge</Badge>
            </div>
          </div>
        </section>

        {/* Story 1-5: Utility Functions */}
        <section className="space-y-8" data-testid="utils-section">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Utility Functions (Story 1-5)
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>formatDate() Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-foreground-muted">
                <strong>Short:</strong>{" "}
                <span data-testid="date-short">{formatDate(new Date(), "short")}</span>
              </p>
              <p className="text-foreground-muted">
                <strong>Long:</strong>{" "}
                <span data-testid="date-long">{formatDate(new Date(), "long")}</span>
              </p>
              <p className="text-foreground-muted">
                <strong>Relative:</strong>{" "}
                <span data-testid="date-relative">{formatDate(new Date(), "relative")}</span>
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Story 1-5: Site Constants */}
        <section className="space-y-8" data-testid="constants-section">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Site Constants (Story 1-5)
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Site Config</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-foreground-muted" data-testid="site-name">
                  <strong>Name:</strong> {siteConfig.name}
                </p>
                <p className="text-foreground-muted" data-testid="site-url">
                  <strong>URL:</strong> {siteConfig.url}
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-foreground-muted" data-testid="contact-email">
                  <strong>Email:</strong> {contactInfo.email}
                </p>
                <p className="text-foreground-muted" data-testid="contact-city">
                  <strong>City:</strong> {contactInfo.address.city}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Button Component */}
        <section className="space-y-8">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Button Component
          </h2>

          {/* Variants */}
          <div className="space-y-4">
            <h3 className="text-h5 text-foreground-muted">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-h5 text-foreground-muted">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-4">
            <h3 className="text-h5 text-foreground-muted">States</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>
        </section>

        {/* Input Component */}
        <section className="space-y-8">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Input Component
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters"
            />
          </div>
        </section>

        {/* Textarea Component */}
        <section className="space-y-8">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Textarea Component
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Textarea
              label="Project Description"
              placeholder="Tell us about your project..."
            />
            <Textarea
              label="Requirements"
              placeholder="List your requirements..."
              error="Please provide more details (min 50 characters)"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-border">
          <p className="text-body-sm text-foreground-subtle">
            Stories 1-2 to 1-5 Components Showcase | {siteConfig.name}
          </p>
        </footer>
      </div>
    </main>
  );
}
