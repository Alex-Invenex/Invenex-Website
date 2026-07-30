'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { timelineOptions } from '@/lib/scope-catalog';
import { contactInfo } from '@/lib/constants';
import { submitScopeRequest } from '@/lib/actions/scope';

interface ScopeFormProps {
  selectedTracks: string[];
  selectedFeatures: string[];
  onSuccess: () => void;
}

/**
 * Step 03 — the details we need alongside the selection.
 * Selections ride along as hidden JSON of IDs; the server resolves the labels.
 */
export function ScopeForm({
  selectedTracks,
  selectedFeatures,
  onSuccess,
}: ScopeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = 'Name is required';
    if (!email) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = 'Invalid email address';
    if (selectedFeatures.length === 0)
      nextErrors.form = 'Select at least one feature before sending.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      return;
    }

    // IDs only — never labels.
    formData.set('tracks', JSON.stringify(selectedTracks));
    formData.set('features', JSON.stringify(selectedFeatures));

    setIsLoading(true);
    try {
      const result = await submitScopeRequest(formData);
      if (result.success) {
        onSuccess();
      } else {
        setErrors({
          form: result.error || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate data-testid="scope-form">
      {/* Honeypot — off-screen, never focusable */}
      <input
        type="text"
        name="company-website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
        style={{ position: 'absolute', left: '-9999px' }}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          ref={nameRef}
          name="name"
          id="scope-name"
          label="Your name *"
          placeholder="Jane Doe"
          error={errors.name}
          autoComplete="name"
        />
        <Input
          ref={emailRef}
          name="email"
          id="scope-email"
          type="email"
          label="Email *"
          placeholder="you@company.com"
          error={errors.email}
          autoComplete="email"
        />
        <Input
          name="phone"
          id="scope-phone"
          label="Phone / WhatsApp"
          placeholder="+91 88484 14848"
          autoComplete="tel"
        />
        <Input
          name="company"
          id="scope-company"
          label="Company"
          placeholder="Your company"
          autoComplete="organization"
        />
        <Select
          name="timeline"
          id="scope-timeline"
          label="Target go-live"
          placeholder="Select…"
          options={timelineOptions.map((t) => ({
            value: t.value,
            label: t.label,
          }))}
          defaultValue=""
        />
        <Input
          name="existingUrl"
          id="scope-existing-url"
          label="Existing website or app"
          placeholder="yourcompany.com — or leave blank"
        />
        <div className="sm:col-span-2">
          <Textarea
            name="notes"
            id="scope-notes"
            label="Anything else we should know"
            placeholder="Existing systems, integrations, anything you want built that isn't listed above…"
            rows={4}
          />
        </div>
      </div>

      {errors.form && (
        <p className="mt-5 text-body-sm text-error" role="alert">
          {errors.form}{' '}
          <a
            href={`mailto:${contactInfo.email}`}
            className="underline underline-offset-4"
          >
            Or email us directly.
          </a>
        </p>
      )}

      <Button
        type="submit"
        variant="coral"
        size="lg"
        className="mt-7 w-full sm:w-auto"
        isLoading={isLoading}
        data-testid="scope-submit"
      >
        {isLoading ? 'Sending…' : 'Send my requirements'}
      </Button>

      <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-foreground-subtle">
        We reply within two working days with pricing and a delivery timeline
        built against exactly this list. Nothing you have not ticked will appear
        in the quote.
      </p>
    </form>
  );
}
