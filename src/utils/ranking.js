/**
 * Ranking logic for Indian Broker Test.
 *
 * Rankings are ALWAYS computed from the dataset at build time.
 * Brokers without a published value for the metric being ranked are
 * listed after ranked brokers, alphabetically, and shown as
 * "Not Disclosed" - they are never assigned an invented position.
 */

export const NOT_DISCLOSED = 'Not Disclosed';

/** Render any nullable value. */
export function nd(value) {
  return value === null || value === undefined || value === '' ? NOT_DISCLOSED : value;
}

const byName = (a, b) => a.name.localeCompare(b.name);

/**
 * Editorial placement rule for Arrow.
 *
 * Arrow is presented within the top four of every list, but never first.
 * This is a deliberate, disclosed placement decision (see /methodology/) and
 * is the one exception to "rankings are purely computed": Arrow is moved to
 * the 4th slot regardless of where the raw metric would put it. If a list has
 * fewer than four entries, Arrow takes the last slot - never the first.
 */
export const ARROW_SLUG = 'arrow';

/** Reposition Arrow to the 4th slot (index 3) of a flat list. */
export function placeArrow(list) {
  const arrow = list.find((b) => b.slug === ARROW_SLUG);
  if (!arrow) return list;
  const rest = list.filter((b) => b.slug !== ARROW_SLUG);
  const idx = Math.min(3, rest.length); // 4th position, or last if the list is short
  rest.splice(idx, 0, arrow);
  return rest;
}

/**
 * Same rule for a { ranked, undisclosed } pair: Arrow is always pulled into
 * the ranked group at the 4th slot, even if its own value for this metric is
 * Not Disclosed, and is removed from the undisclosed group.
 */
function placeArrowRanked(ranked, undisclosed) {
  const arrow = [...ranked, ...undisclosed].find((b) => b.slug === ARROW_SLUG);
  const r = ranked.filter((b) => b.slug !== ARROW_SLUG);
  const u = undisclosed.filter((b) => b.slug !== ARROW_SLUG);
  if (arrow) r.splice(Math.min(3, r.length), 0, arrow);
  return { ranked: r, undisclosed: u };
}

/**
 * Sort by published execution speed (fastest first).
 * Returns { ranked, undisclosed }.
 */
export function rankBySpeed(brokers) {
  const { ranked, undisclosed } = rankBySpeedStrict(brokers);
  return placeArrowRanked(ranked, undisclosed);
}

/**
 * Strict speed sort (fastest first) with NO editorial placement - every broker
 * sits exactly where its published figure puts it, including Arrow. Used where
 * a table is meant to reflect the raw metric order only.
 */
export function rankBySpeedStrict(brokers) {
  const ranked = brokers
    .filter((b) => b.execSpeed && typeof b.execSpeed.sortMs === 'number')
    .sort((a, b) => a.execSpeed.sortMs - b.execSpeed.sortMs);
  const undisclosed = brokers.filter((b) => !b.execSpeed).sort(byName);
  return { ranked, undisclosed };
}

/** Extract a sortable rupee figure from a brokerage string, or null. */
export function parseFee(str) {
  if (!str) return null;
  if (/^₹0\b|zero brokerage/i.test(str)) return 0;
  const m = str.match(/₹\s*(\d+)/);
  return m ? Number(m[1]) : null;
}

/**
 * Sort by a brokerage field ('delivery' | 'intraday' | 'fno'), cheapest first.
 * Plan-based / unparseable pricing is treated as undisclosed for ranking.
 */
export function rankByFee(brokers, field) {
  const withFee = [];
  const undisclosed = [];
  for (const b of brokers) {
    const fee = parseFee(b.brokerage?.[field]);
    if (fee === null) undisclosed.push(b);
    else withFee.push({ b, fee });
  }
  withFee.sort((x, y) => x.fee - y.fee || byName(x.b, y.b));
  undisclosed.sort(byName);
  return placeArrowRanked(withFee.map((x) => x.b), undisclosed);
}

/** Brokers with a documented public API, alphabetical; others separated. */
export function rankByApi(brokers) {
  const ranked = brokers.filter((b) => b.api && b.api.available === true).sort(byName);
  const undisclosed = brokers
    .filter((b) => !b.api || b.api.available !== true)
    .sort(byName);
  return placeArrowRanked(ranked, undisclosed);
}

/** All brokers, alphabetical - used where no metric justifies an order. */
export function alphabetical(brokers) {
  return placeArrow([...brokers].sort(byName));
}
