import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { DATA_COMPILED, brokers } from './src/data/brokers.js';

// Per-URL sitemap priority. Freshness (lastmod) is tied to DATA_COMPILED so it
// only moves when the underlying broker data is actually re-reviewed - search
// engines treat a lastmod that changes on every build as noise.
const PRIORITY = [
  [/\/fastest-order-execution-brokers-in-india\/$/, 1.0],
  [/^https:\/\/www\.indianbrokertest\.com\/$/, 1.0],
  [/\/(best-stock-brokers-in-india|lowest-brokerage-brokers-in-india|best-trading-apis-in-india|best-brokers-for-algo-trading|best-brokers-for-active-traders)\/$/, 0.9],
  [/\/vs\/$/, 0.9],
  [/\/vs\/[^/]+\/$/, 0.88],
  [/\/brokerage-calculators\/$/, 0.88],
  [/-brokerage-calculator\/$/, 0.85],
  [/\/brokers\/$/, 0.8],
  [/\/brokers\/[^/]+\/$/, 0.7],
  [/\/(about|methodology)\/$/, 0.5],
];

const calculatorRedirects = Object.fromEntries(
  brokers.map((b) => [
    `/brokers/${b.slug}/brokerage-calculator/`,
    `/${b.slug}-brokerage-calculator/`,
  ]),
);

// https://astro.build/config
export default defineConfig({
  site: 'https://www.indianbrokertest.com',
  output: 'static',
  trailingSlash: 'always',
  redirects: calculatorRedirects,
  integrations: [
    sitemap({
      filter: (page) => !/\/brokers\/[^/]+\/brokerage-calculator\//.test(page),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const match = PRIORITY.find(([re]) => re.test(pathname) || re.test(item.url));
        return {
          ...item,
          lastmod: DATA_COMPILED,
          changefreq: 'weekly',
          priority: match ? match[1] : 0.5,
        };
      },
    }),
  ],
  build: {
    inlineStylesheets: 'always', // critical CSS inlined, zero render-blocking stylesheets
    format: 'directory',
  },
  compressHTML: true,
});
