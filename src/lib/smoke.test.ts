import { describe, expect, it } from 'vitest';

describe('test harness smoke test', () => {
  it('runs a trivial assertion under vitest + jsdom', () => {
    expect(1 + 1).toBe(2);
  });
});
