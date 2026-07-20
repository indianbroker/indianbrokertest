import rss from '@astrojs/rss';
import { brokers, DATA_COMPILED } from '../data/brokers.js';
import { calculatorPath } from '../data/brokerage-rules.js';
import { getAllPairs, FEATURED_BROKER_SLUGS, pairPath } from '../utils/comparisons.js';

const pubDate = new Date(DATA_COMPILED + 'T00:00:00+05:30');

const guides = [
  {
    title: 'Best Stock Brokers in India (2026): Full Comparison',
    link: '/best-stock-brokers-in-india/',
    description: 'Independent comparison of Indian stock brokers on pricing, platforms, APIs and reported execution speed.',
  },
  {
    title: 'Fastest Order Execution Brokers in India (2026)',
    link: '/fastest-order-execution-brokers-in-india/',
    description: 'Published execution-speed figures ranked; brokers without published data shown as Not Disclosed.',
  },
  {
    title: 'Lowest Brokerage Brokers in India (2026)',
    link: '/lowest-brokerage-brokers-in-india/',
    description: 'Delivery, intraday and F&O charges ranked from official pricing pages.',
  },
  {
    title: 'Best Trading APIs in India (2026)',
    link: '/best-trading-apis-in-india/',
    description: 'Every documented Indian broker trading API compared with official documentation links.',
  },
  {
    title: 'Best Brokers for Algo Trading in India (2026)',
    link: '/best-brokers-for-algo-trading/',
    description: 'APIs, published pricing and reported execution speed for systematic traders.',
  },
  {
    title: 'Best Brokers for Active Traders in India (2026)',
    link: '/best-brokers-for-active-traders/',
    description: 'Per-order costs, reported speed and tooling for high-frequency discretionary trading.',
  },
  {
    title: 'Brokerage Calculators for Indian Stock Brokers',
    link: '/brokerage-calculators/',
    description: 'Per-broker calculators to estimate delivery, intraday and F&O brokerage from published pricing.',
  },
  {
    title: 'Indian Broker Comparisons — Head-to-Head (2026)',
    link: '/vs/',
    description: 'Every major Indian stock broker compared pairwise: brokerage, AMC, APIs and reported execution speed from official published data.',
  },
];

const calculatorItems = [...brokers]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((b) => ({
    title: `${b.name} Brokerage Calculator (2026)`,
    link: calculatorPath(b.slug),
    description: `Estimate ${b.name} delivery, intraday and F&O brokerage per order from published official pricing. Statutory charges excluded.`,
  }));

const featuredSet = new Set(FEATURED_BROKER_SLUGS.slice(0, 6));
const comparisonItems = getAllPairs(brokers)
  .filter((p) => featuredSet.has(p.a.slug) && featuredSet.has(p.b.slug))
  .map((p) => ({
    title: `${p.a.name} vs ${p.b.name} (2026) — Indian Broker Comparison`,
    link: pairPath(p.a, p.b),
    description: `${p.a.name} vs ${p.b.name}: delivery, intraday and F&O brokerage, AMC, trading API and reported execution speed compared from official published data.`,
  }));

const items = [...guides, ...comparisonItems, ...calculatorItems];

export function GET(context) {
  return rss({
    title: 'Indian Broker Test',
    description:
      'Independent, data-driven comparison of Indian stock brokers based only on verifiable published information.',
    site: context.site,
    items: items.map((i) => ({ ...i, pubDate })),
    customData: '<language>en-in</language>',
  });
}
