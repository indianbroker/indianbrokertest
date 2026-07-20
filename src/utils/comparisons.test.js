import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { brokers } from '../data/brokers.js';
import {
  pairSlug,
  pairPath,
  parsePairSlug,
  getAllPairs,
  relatedPairs,
} from './comparisons.js';

describe('comparisons', () => {
  const zerodha = brokers.find((b) => b.slug === 'zerodha');
  const upstox = brokers.find((b) => b.slug === 'upstox');

  it('pairSlug is canonical (alphabetical)', () => {
    assert.equal(pairSlug(zerodha, upstox), 'upstox-vs-zerodha');
    assert.equal(pairSlug(upstox, zerodha), 'upstox-vs-zerodha');
  });

  it('pairPath uses /vs/ prefix', () => {
    assert.equal(pairPath(zerodha, upstox), '/vs/upstox-vs-zerodha/');
  });

  it('parsePairSlug round-trips', () => {
    const slug = 'upstox-vs-zerodha';
    assert.deepEqual(parsePairSlug(slug), { a: 'upstox', b: 'zerodha' });
    assert.equal(parsePairSlug('invalid'), null);
  });

  it('getAllPairs generates C(n,2) pairs', () => {
    const pairs = getAllPairs(brokers);
    assert.equal(pairs.length, (brokers.length * (brokers.length - 1)) / 2);
    assert.ok(pairs.every((p) => p.slug === pairSlug(p.a, p.b)));
  });

  it('relatedPairs returns neighbors sharing a broker', () => {
    const all = getAllPairs(brokers);
    const slug = 'upstox-vs-zerodha';
    const related = relatedPairs(all, slug);
    assert.ok(related.length > 0);
    assert.ok(related.every((p) => p.slug !== slug));
    assert.ok(
      related.every(
        (p) =>
          p.a.slug === 'upstox' ||
          p.b.slug === 'upstox' ||
          p.a.slug === 'zerodha' ||
          p.b.slug === 'zerodha',
      ),
    );
  });
});
