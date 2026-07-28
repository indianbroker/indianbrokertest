/**
 * Per-calculator sidebar links for SEO long-tail internal linking (Tiqs-style).
 */

import { calculatorPath, getCalculator } from './calculators.js';

/** @typedef {{ label: string, href: string }} SidebarLink */

/** @type {Record<string, { slug: string, label?: string, href?: string }[]>} */
const sidebarGroups = {
  sip: [
    { slug: 'lumpsum-calculator' },
    { slug: 'step-up-sip-calculator', label: 'Step Up SIP Calculator' },
    { slug: '__brokerage__', label: 'Brokerage Calculator', href: '/brokerage-calculators/' },
    { slug: 'sbi-sip-calculator', label: 'SBI SIP Calculator' },
    { slug: 'mutual-fund-sip-calculator', label: 'Mutual Fund SIP Calculator' },
    { slug: 'hdfc-sip-calculator', label: 'HDFC SIP Calculator' },
    { slug: 'sip-calculator-40-years', label: 'SIP Calculator 40 years' },
    { slug: 'icici-sip-calculator', label: 'ICICI SIP Calculator' },
    { slug: 'index-fund-sip-calculator', label: 'Index Fund SIP Calculator' },
    { slug: 'axis-bank-sip-calculator', label: 'Axis Bank SIP Calculator' },
    { slug: 'kotak-bank-sip-calculator', label: 'Kotak Bank SIP Calculator' },
    { slug: 'nippon-india-sip-calculator', label: 'Nippon Bank SIP Calculator' },
    { slug: 'lic-sip-calculator', label: 'LIC SIP Calculator' },
    { slug: 'pnb-sip-calculator', label: 'PNB SIP Calculator' },
    { slug: 'idbi-sip-calculator', label: 'IDBI SIP Calculator' },
  ],
  lumpsum: [
    { slug: 'sip-calculator' },
    { slug: 'step-up-sip-calculator', label: 'Step Up SIP Calculator' },
    { slug: '__brokerage__', label: 'Brokerage Calculator', href: '/brokerage-calculators/' },
    { slug: 'mf-calculator', label: 'Mutual Fund Calculator' },
    { slug: 'cagr-calculator' },
    { slug: 'retirement-calculator' },
    { slug: 'fd-calculator' },
    { slug: 'ppf-calculator' },
    { slug: 'emi-calculator' },
    { slug: 'income-tax-calculator' },
  ],
  emi: [
    { slug: 'home-loan-emi-calculator', label: 'Home Loan EMI Calculator' },
    { slug: 'car-loan-emi-calculator', label: 'Car Loan EMI Calculator' },
    { slug: 'flat-vs-reducing-calculator', label: 'Flat vs Reducing Rate Calculator' },
    { slug: 'sip-calculator' },
    { slug: 'fd-calculator' },
    { slug: 'ppf-calculator' },
    { slug: '__brokerage__', label: 'Brokerage Calculator', href: '/brokerage-calculators/' },
    { slug: 'income-tax-calculator' },
    { slug: 'salary-calculator' },
    { slug: 'gratuity-calculator' },
  ],
  tax: [
    { slug: 'hra-calculator' },
    { slug: 'gst-calculator' },
    { slug: 'tds-calculator' },
    { slug: 'salary-calculator' },
    { slug: 'sip-calculator' },
    { slug: 'fd-calculator' },
    { slug: 'ppf-calculator' },
    { slug: 'emi-calculator' },
    { slug: '__brokerage__', label: 'Brokerage Calculator', href: '/brokerage-calculators/' },
  ],
  savings: [
    { slug: 'fd-calculator' },
    { slug: 'rd-calculator' },
    { slug: 'ppf-calculator' },
    { slug: 'ssy-calculator' },
    { slug: 'nsc-calculator' },
    { slug: 'scss-calculator' },
    { slug: 'post-office-mis-calculator', label: 'Post Office MIS Calculator' },
    { slug: 'epf-calculator' },
    { slug: 'sip-calculator' },
    { slug: 'emi-calculator' },
  ],
  trading: [
    { slug: '__brokerage__', label: 'Brokerage Calculator', href: '/brokerage-calculators/' },
    { slug: 'margin-calculator' },
    { slug: 'stock-average-calculator' },
    { slug: 'xirr-calculator' },
    { slug: 'sip-calculator' },
    { slug: 'cagr-calculator' },
    { slug: 'roi-calculator' },
  ],
  default: [
    { slug: 'sip-calculator' },
    { slug: 'lumpsum-calculator' },
    { slug: 'emi-calculator' },
    { slug: 'fd-calculator' },
    { slug: 'income-tax-calculator' },
    { slug: 'ppf-calculator' },
    { slug: '__brokerage__', label: 'Brokerage Calculator', href: '/brokerage-calculators/' },
    { slug: 'retirement-calculator' },
    { slug: 'home-loan-emi-calculator', label: 'Home Loan EMI Calculator' },
    { slug: 'cagr-calculator' },
  ],
};

/** @type {Record<string, keyof typeof sidebarGroups>} */
const slugGroupMap = {
  'sip-calculator': 'sip',
  'sbi-sip-calculator': 'sip',
  'hdfc-sip-calculator': 'sip',
  'icici-sip-calculator': 'sip',
  'axis-bank-sip-calculator': 'sip',
  'kotak-bank-sip-calculator': 'sip',
  'nippon-india-sip-calculator': 'sip',
  'lic-sip-calculator': 'sip',
  'pnb-sip-calculator': 'sip',
  'idbi-sip-calculator': 'sip',
  'index-fund-sip-calculator': 'sip',
  'sip-calculator-40-years': 'sip',
  'mutual-fund-sip-calculator': 'sip',
  'lumpsum-calculator': 'lumpsum',
  'step-up-sip-calculator': 'sip',
  'emi-calculator': 'emi',
  'home-loan-emi-calculator': 'emi',
  'car-loan-emi-calculator': 'emi',
  'flat-vs-reducing-rate-calculator': 'emi',
  'income-tax-calculator': 'tax',
  'hra-calculator': 'tax',
  'gst-calculator': 'tax',
  'tds-calculator': 'tax',
  'salary-calculator': 'tax',
  'fd-calculator': 'savings',
  'rd-calculator': 'savings',
  'ppf-calculator': 'savings',
  'ssy-calculator': 'savings',
  'nsc-calculator': 'savings',
  'scss-calculator': 'savings',
  'post-office-mis-calculator': 'savings',
  'epf-calculator': 'savings',
  'margin-calculator': 'trading',
  'stock-average-calculator': 'trading',
  'xirr-calculator': 'trading',
};

/**
 * @param {string} slug
 * @param {number} [limit=15]
 * @returns {SidebarLink[]}
 */
export function getCalculatorSidebarLinks(slug, limit = 15) {
  const calc = getCalculator(slug);
  const groupKey =
    calc?.sidebarGroup ??
    slugGroupMap[slug] ??
    (calc?.category === 'loan'
      ? 'emi'
      : calc?.category === 'tax'
        ? 'tax'
        : calc?.category === 'savings'
          ? 'savings'
          : calc?.category === 'trading'
            ? 'trading'
            : calc?.id === 'sip'
              ? 'sip'
              : 'default');

  const items = sidebarGroups[groupKey] ?? sidebarGroups.default;

  /** @type {SidebarLink[]} */
  const links = [];

  for (const item of items) {
    if (item.slug === slug) continue;
    if (item.href) {
      links.push({ label: item.label ?? item.slug, href: item.href });
    } else {
      const target = getCalculator(item.slug);
      if (!target) continue;
      links.push({
        label: item.label ?? target.name,
        href: calculatorPath(item.slug),
      });
    }
    if (links.length >= limit) break;
  }

  return links;
}
