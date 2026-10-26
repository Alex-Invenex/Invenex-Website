/**
 * Server-side spam signals for public forms.
 *
 * Two kinds of check live here:
 * - Silent heuristics (`isLikelyBot`) — the caller pretends to succeed so a
 *   bot gets no feedback to tune against.
 * - Cloudflare Turnstile (`verifyTurnstile`) — a hard gate with a visible
 *   error, because a real visitor can fail it and needs to retry.
 */

/** No human fills name, email, description and two selects this fast. */
export const MIN_FILL_MS = 3000;

/**
 * Keyboard-mash names like "QZMtdqinlfnVRyYsmf": one long word with several
 * capitals after the first letter. Real names with internal capitals
 * ("McDonald", "DeShawn", "MacArthur") have one or two, and multi-word names
 * are never flagged — false positives here silently drop real leads, so this
 * stays deliberately narrow.
 */
export function looksLikeGibberishName(name: string): boolean {
  const trimmed = name.trim();
  if (/\s/.test(trimmed) || trimmed.length < 10) return false;
  const internalCapitals = trimmed.slice(1).replace(/[^A-Z]/g, '').length;
  return internalCapitals >= 3;
}

/**
 * True when the submission trips any silent heuristic: the hidden honeypot
 * was filled, the form was completed implausibly fast (or the timing field is
 * missing, i.e. the action was called without the real form), or the name is
 * keyboard mash.
 */
export function isLikelyBot(formData: FormData, name: string): boolean {
  const honeypot = formData.get('company-website');
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return true;

  const elapsed = Number(formData.get('form-elapsed-ms'));
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return true;

  return looksLikeGibberishName(name);
}

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

/**
 * Validate a Turnstile token with Cloudflare's Siteverify API. Returns true
 * when Turnstile isn't configured, so the form keeps working before the keys
 * are added. Tokens are single-use and expire after 300 seconds.
 */
export async function verifyTurnstile(
  token: FormDataEntryValue | null,
  ip?: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || token === '') return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const outcome = (await res.json()) as { success?: boolean };
    return outcome.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}
