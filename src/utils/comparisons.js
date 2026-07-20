/**
 * Broker-vs-broker comparison utilities.
 * Pair slugs are canonical: alphabetically sorted broker slugs (a-vs-b).
 */

/** Top brokers by typical search volume — used to sort the hub page. */
export const FEATURED_BROKER_SLUGS = [
  'zerodha',
  'upstox',
  'groww',
  'angel-one',
  'dhan',
  'fyers',
  'icici-direct',
  'kotak-neo',
  '5paisa',
  'shoonya',
];

/** @param {{ slug: string }} a @param {{ slug: string }} b */
export function pairSlug(a, b) {
  const [first, second] = [a.slug, b.slug].sort((x, y) => x.localeCompare(y));
  return `${first}-vs-${second}`;
}

/** @param {{ slug: string, name: string }} a @param {{ slug: string, name: string }} b */
export function pairPath(a, b) {
  return `/vs/${pairSlug(a, b)}/`;
}

/** @param {string} slug e.g. zerodha-vs-upstox */
export function parsePairSlug(slug) {
  const idx = slug.indexOf('-vs-');
  if (idx === -1) return null;
  return { a: slug.slice(0, idx), b: slug.slice(idx + 4) };
}

/** @param {Array<{ slug: string }>} brokers */
export function getAllPairs(brokers) {
  const pairs = [];
  for (let i = 0; i < brokers.length; i++) {
    for (let j = i + 1; j < brokers.length; j++) {
      const a = brokers[i];
      const b = brokers[j];
      pairs.push({ a, b, slug: pairSlug(a, b) });
    }
  }
  return pairs;
}

/**
 * Sort pairs for hub: featured brokers first, then alphabetical.
 * @param {Array<{ a: { slug: string }, b: { slug: string }, slug: string }>} pairs
 */
export function sortPairsForHub(pairs) {
  const rank = (slug) => {
    const i = FEATURED_BROKER_SLUGS.indexOf(slug);
    return i === -1 ? 999 : i;
  };
  return [...pairs].sort((p, q) => {
    const pr = Math.min(rank(p.a.slug), rank(p.b.slug));
    const qr = Math.min(rank(q.a.slug), rank(q.b.slug));
    if (pr !== qr) return pr - qr;
    return p.slug.localeCompare(q.slug);
  });
}

/** One-line hook for hub cards — delivery + intraday headline. */
export function pairBlurb(a, b) {
  const dA = a.brokerage?.delivery ?? 'Not Disclosed';
  const dB = b.brokerage?.delivery ?? 'Not Disclosed';
  const iA = a.brokerage?.intraday ?? 'Not Disclosed';
  const iB = b.brokerage?.intraday ?? 'Not Disclosed';
  return `Delivery: ${a.name} ${dA} vs ${b.name} ${dB} · Intraday: ${iA} vs ${iB}`;
}

/**
 * Neutral editorial note — never declares a winner on unverifiable metrics.
 * @param {object} a broker
 * @param {object} b broker
 */
export function editorialNote(a, b) {
  const parts = [];
  if (a.brokerage?.delivery?.includes('₹0') || a.brokerage?.delivery?.includes('zero')) {
    if (!(b.brokerage?.delivery?.includes('₹0') || b.brokerage?.delivery?.includes('zero'))) {
      parts.push(`${a.name} publishes free equity delivery; ${b.name} does not (per official pricing at review).`);
    }
  } else if (b.brokerage?.delivery?.includes('₹0') || b.brokerage?.delivery?.includes('zero')) {
    parts.push(`${b.name} publishes free equity delivery; ${a.name} does not (per official pricing at review).`);
  }
  if (a.api?.available && !b.api?.available) {
    parts.push(`${a.name} has a documented public API; ${b.name} does not (at review time).`);
  } else if (b.api?.available && !a.api?.available) {
    parts.push(`${b.name} has a documented public API; ${a.name} does not (at review time).`);
  }
  if (a.execSpeed && b.execSpeed) {
    parts.push(
      `Both publish execution-speed figures (${a.name}: ${a.execSpeed.display}; ${b.name}: ${b.execSpeed.display}) — methodologies differ; see each profile before comparing on speed alone.`,
    );
  } else if (a.execSpeed && !b.execSpeed) {
    parts.push(`${a.name} publishes an execution-speed figure; ${b.name} does not on verifiable sources.`);
  } else if (b.execSpeed && !a.execSpeed) {
    parts.push(`${b.name} publishes an execution-speed figure; ${a.name} does not on verifiable sources.`);
  }
  if (parts.length === 0) {
    return `Both brokers publish comparable headline pricing fields at our last review. Use the table below and each broker's official pricing page — we do not pick a single "winner" from published data alone.`;
  }
  return parts.join(' ');
}

/** Related pairs sharing either broker (max 6). */
export function relatedPairs(allPairs, currentSlug, limit = 6) {
  const parsed = parsePairSlug(currentSlug);
  if (!parsed) return [];
  const { a: slugA, b: slugB } = parsed;
  return allPairs
    .filter((p) => p.slug !== currentSlug && (p.a.slug === slugA || p.b.slug === slugA || p.a.slug === slugB || p.b.slug === slugB))
    .slice(0, limit);
}
