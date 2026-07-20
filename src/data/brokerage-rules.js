/**
 * Machine-readable brokerage rules for per-broker calculators.
 * Must mirror published pricing in brokers.js — never invent rates.
 *
 * Rule types:
 *   zero                  → ₹0
 *   flat                  → fixed ₹N per order
 *   min_of_flat_and_pct   → min(flat, turnover × pct)
 *   pct_only              → turnover × pct
 */

/** @typedef {'delivery' | 'intraday' | 'fno'} Segment */
/** @typedef {'options' | 'futures'} FnoType */

/**
 * @typedef {Object} FeeRule
 * @property {'zero' | 'flat' | 'min_of_flat_and_pct' | 'pct_only'} type
 * @property {number} [amount]
 * @property {number} [flat]
 * @property {number} [pct] decimal e.g. 0.0003 for 0.03%
 */

/**
 * @typedef {Object} BrokerageRules
 * @property {boolean} calculable
 * @property {string} [note]
 * @property {Record<string, { label: string, segments: Record<Segment, FeeRule>, fno?: Record<FnoType, FeeRule> }>} [plans]
 * @property {string} [defaultPlan]
 * @property {Record<Segment, FeeRule>} [segments]
 * @property {Record<FnoType, FeeRule>} [fno]
 */

/** @type {Record<string, BrokerageRules>} */
export const brokerageRules = {
  zerodha: {
    calculable: true,
    segments: {
      delivery: { type: 'zero' },
      intraday: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.0003 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  upstox: {
    calculable: true,
    segments: {
      delivery: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.025 },
      intraday: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.0005 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  groww: {
    calculable: true,
    note: 'Groww publishes a minimum charge on delivery — verify on the official pricing page.',
    segments: {
      delivery: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.001 },
      intraday: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.001 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  'angel-one': {
    calculable: true,
    segments: {
      delivery: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.001 },
      intraday: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.0003 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  dhan: {
    calculable: true,
    segments: {
      delivery: { type: 'zero' },
      intraday: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.0003 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  fyers: {
    calculable: true,
    segments: {
      delivery: { type: 'zero' },
      intraday: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.0003 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  '5paisa': {
    calculable: true,
    segments: {
      delivery: { type: 'flat', amount: 20 },
      intraday: { type: 'flat', amount: 20 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  'paytm-money': {
    calculable: true,
    segments: {
      delivery: { type: 'flat', amount: 20 },
      intraday: { type: 'flat', amount: 20 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  shoonya: {
    calculable: true,
    segments: {
      delivery: { type: 'zero' },
      intraday: { type: 'zero' },
      fno: { type: 'zero' },
    },
  },
  pocketful: {
    calculable: true,
    note: 'Pocketful publishes a ₹0.01 minimum per delivery order — verify on the official pricing page.',
    segments: {
      delivery: { type: 'zero' },
      intraday: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.0003 },
      fno: { type: 'flat', amount: 20 },
    },
  },
  sahi: {
    calculable: true,
    segments: {
      delivery: { type: 'min_of_flat_and_pct', flat: 10, pct: 0.0005 },
      intraday: { type: 'min_of_flat_and_pct', flat: 10, pct: 0.0005 },
      fno: { type: 'flat', amount: 10 },
    },
  },
  arrow: {
    calculable: true,
    segments: {
      delivery: { type: 'zero' },
      intraday: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.0003 },
    },
    fno: {
      options: { type: 'flat', amount: 20 },
      futures: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.0003 },
    },
  },
  'icici-direct': {
    calculable: true,
    defaultPlan: 'flat-20',
    plans: {
      'flat-20': {
        label: 'Flat ₹20 plan (per official brokerage page)',
        segments: {
          delivery: { type: 'flat', amount: 20 },
          intraday: { type: 'flat', amount: 20 },
          fno: { type: 'flat', amount: 20 },
        },
      },
    },
    note: 'Legacy and subscription plans are not modelled — verify your plan on ICICI Direct.',
  },
  'kotak-neo': {
    calculable: true,
    defaultPlan: 'trade-free',
    plans: {
      'trade-free': {
        label: 'Trade Free plan — ₹20 intraday (per official pricing)',
        segments: {
          intraday: { type: 'flat', amount: 20 },
        },
      },
    },
    note: 'Delivery and F&O on Kotak Neo are plan-based. Only the documented Trade Free intraday rate is modelled here.',
  },
  'alice-blue': {
    calculable: true,
    defaultPlan: 'standard',
    plans: {
      standard: {
        label: 'Standard plan — min(₹20, 2.5%) delivery',
        segments: {
          delivery: { type: 'min_of_flat_and_pct', flat: 20, pct: 0.025 },
          intraday: { type: 'flat', amount: 20 },
          fno: { type: 'flat', amount: 20 },
        },
      },
      'freedom-f20': {
        label: 'Freedom (F20) plan — ₹0 delivery, ₹15 intraday/F&O (lower published tier)',
        segments: {
          delivery: { type: 'zero' },
          intraday: { type: 'flat', amount: 15 },
          fno: { type: 'flat', amount: 15 },
        },
      },
    },
    note: 'Some plans publish a ₹15–₹20 range — we use the lower published tier. Verify on Alice Blue.',
  },
  iifl: {
    calculable: true,
    defaultPlan: 'standard',
    plans: {
      standard: {
        label: 'Standard plan (per official rate card)',
        segments: {
          delivery: { type: 'pct_only', pct: 0.0025 },
          intraday: { type: 'pct_only', pct: 0.0005 },
          fno: { type: 'flat', amount: 20 },
        },
      },
    },
    note: 'Lower-percentage and flat plans exist — verify your plan on IIFL Capital.',
  },
};

export function getBrokerageRules(slug) {
  return brokerageRules[slug] ?? null;
}

export function calculatorPath(slug) {
  return `/${slug}-brokerage-calculator/`;
}
