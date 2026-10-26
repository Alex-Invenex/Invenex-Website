import { afterEach, describe, expect, it, vi } from 'vitest';
import { isLikelyBot, looksLikeGibberishName, verifyTurnstile, MIN_FILL_MS } from './spam';

function form(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

describe('looksLikeGibberishName', () => {
  it('flags keyboard-mash names', () => {
    expect(looksLikeGibberishName('QZMtdqinlfnVRyYsmf')).toBe(true);
    expect(looksLikeGibberishName('aBcDeFgHiJkL')).toBe(true);
  });

  it('keeps real names', () => {
    for (const name of [
      'John Doe',
      'McDonald',
      'DeShawn',
      'MacArthur',
      'Krzysztof',
      'Venkataraman',
      'Mary-Jane O’Neil',
      'JJ',
      'Priya Sharma',
    ]) {
      expect(looksLikeGibberishName(name), name).toBe(false);
    }
  });
});

describe('isLikelyBot', () => {
  const human = { 'form-elapsed-ms': String(MIN_FILL_MS + 20000) };

  it('passes a normal human submission', () => {
    expect(isLikelyBot(form(human), 'Priya Sharma')).toBe(false);
  });

  it('flags a filled honeypot', () => {
    expect(isLikelyBot(form({ ...human, 'company-website': 'x.com' }), 'Priya')).toBe(true);
  });

  it('flags submissions that are too fast or missing timing', () => {
    expect(isLikelyBot(form({ 'form-elapsed-ms': '800' }), 'Priya')).toBe(true);
    expect(isLikelyBot(form({}), 'Priya')).toBe(true);
    expect(isLikelyBot(form({ 'form-elapsed-ms': 'abc' }), 'Priya')).toBe(true);
  });

  it('flags gibberish names', () => {
    expect(isLikelyBot(form(human), 'QZMtdqinlfnVRyYsmf')).toBe(true);
  });
});

describe('verifyTurnstile', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('passes when Turnstile is not configured', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    expect(await verifyTurnstile(null)).toBe(true);
  });

  it('rejects a missing token when configured', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret');
    expect(await verifyTurnstile(null)).toBe(false);
    expect(await verifyTurnstile('')).toBe(false);
  });

  it('returns the Siteverify outcome', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret');
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) });
    vi.stubGlobal('fetch', fetchMock);
    expect(await verifyTurnstile('tok', '1.2.3.4')).toBe(true);
    const body = fetchMock.mock.calls[0][1].body as URLSearchParams;
    expect(body.get('response')).toBe('tok');
    expect(body.get('remoteip')).toBe('1.2.3.4');

    fetchMock.mockResolvedValue({ json: async () => ({ success: false }) });
    expect(await verifyTurnstile('tok')).toBe(false);
  });

  it('fails closed on network errors', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    expect(await verifyTurnstile('tok')).toBe(false);
  });
});
