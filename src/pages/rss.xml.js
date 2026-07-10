import rss from '@astrojs/rss';
import { DATA_COMPILED } from '../data/brokers.js';

const pubDate = new Date(DATA_COMPILED + 'T00:00:00+05:30');

const items = [
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
];

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
