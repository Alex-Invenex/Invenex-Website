import { Button, Input, Textarea } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-16 bg-background">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-h1 font-bold text-foreground">Invenex Solutions</h1>
          <p className="text-body-lg text-foreground-muted">
            Story 1-3: Base UI Components Showcase
          </p>
        </header>

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

          {/* Secondary Variants */}
          <div className="space-y-4">
            <h3 className="text-h5 text-foreground-muted">Secondary Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
            </div>
          </div>
        </section>

        {/* Input Component */}
        <section className="space-y-8">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Input Component
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Default */}
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
            />

            {/* With Error */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters"
            />

            {/* Disabled */}
            <Input
              label="Username"
              placeholder="Disabled input"
              disabled
            />

            {/* Phone */}
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
            />
          </div>
        </section>

        {/* Textarea Component */}
        <section className="space-y-8">
          <h2 className="text-h3 font-semibold text-foreground border-b border-border pb-4">
            Textarea Component
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Default */}
            <Textarea
              label="Project Description"
              placeholder="Tell us about your project..."
            />

            {/* With Error */}
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
            All components use design tokens from Story 1-2
          </p>
        </footer>
      </div>
    </main>
  );
}
