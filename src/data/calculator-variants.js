/**
 * Long-tail SIP calculator landing pages for SEO (same engine, unique metadata).
 * @type {import('./calculators.js').Calculator[]}
 */
export const calculatorVariants = [
  {
    slug: 'mutual-fund-sip-calculator',
    id: 'sip',
    name: 'Mutual Fund SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'Mutual Fund SIP Calculator India (2026) — Monthly MF Returns',
    metaDescription:
      'Free mutual fund SIP calculator for India. Estimate returns on monthly SIP investments in equity or debt mutual funds.',
    h1: 'Mutual Fund SIP Calculator',
    standfirst:
      'Project how a monthly mutual fund SIP could grow over time. Enter amount, expected return and tenure.',
    intro:
      'A mutual fund SIP invests a fixed sum each month into a chosen scheme. This calculator estimates corpus growth using compounded monthly returns — useful for equity, hybrid and debt fund planning.',
    howItWorks:
      'Enter monthly SIP amount, expected annual return and investment period. Returns are compounded monthly, matching standard MF SIP calculators.',
    formula: 'M = P × ((1 + r)^n − 1) / r × (1 + r)',
    faqs: [
      { q: 'Which mutual fund return should I assume?', a: 'Use category averages as a rough guide: large-cap ~10–12%, flexi-cap ~11–13%, debt ~6–8%. Past performance is not indicative of future returns.' },
    ],
    related: ['sip-calculator', 'lumpsum-calculator', 'mf-calculator', 'step-up-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 10000, min: 100, step: 100 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
  },
  {
    slug: 'sbi-sip-calculator',
    id: 'sip',
    name: 'SBI SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'SBI SIP Calculator India (2026) — SBI Mutual Fund SIP Returns',
    metaDescription:
      'Calculate SBI mutual fund SIP returns in India. Free SBI SIP calculator for monthly investment planning.',
    h1: 'SBI SIP Calculator',
    standfirst: 'Estimate returns on a monthly SIP in SBI mutual fund schemes.',
    intro:
      'SBI Mutual Fund offers equity, debt and hybrid schemes with SIP from as low as ₹500/month. This calculator estimates corpus growth for any assumed return rate — verify current scheme performance on SBI MF\'s official factsheets.',
    howItWorks: 'Enter monthly SIP, expected return and duration. The calculator uses standard SIP compounding formula.',
    related: ['sip-calculator', 'hdfc-sip-calculator', 'icici-sip-calculator', 'mf-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'What is the minimum SBI SIP amount?', a: 'SBI Mutual Fund typically allows SIP from ₹500/month for many schemes, though minimums vary by fund. Check the scheme information document before investing.' }],
  },
  {
    slug: 'hdfc-sip-calculator',
    id: 'sip',
    name: 'HDFC SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'HDFC SIP Calculator India (2026) — HDFC Mutual Fund SIP Returns',
    metaDescription:
      'Free HDFC mutual fund SIP calculator. Estimate monthly SIP returns for HDFC equity, debt and hybrid funds in India.',
    h1: 'HDFC SIP Calculator',
    standfirst: 'Project HDFC mutual fund SIP returns over your chosen investment horizon.',
    intro:
      'HDFC Mutual Fund is one of India\'s largest AMCs with popular equity and hybrid schemes. Use this calculator to plan a monthly SIP — actual returns depend on the specific scheme and market conditions.',
    howItWorks: 'Enter monthly investment, expected annual return and years. Results show total invested, wealth gained and maturity value.',
    related: ['sip-calculator', 'sbi-sip-calculator', 'icici-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [],
  },
  {
    slug: 'icici-sip-calculator',
    id: 'sip',
    name: 'ICICI SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'ICICI SIP Calculator India (2026) — ICICI Prudential MF SIP Returns',
    metaDescription:
      'Calculate ICICI Prudential mutual fund SIP returns. Free ICICI SIP calculator for monthly investment planning in India.',
    h1: 'ICICI SIP Calculator',
    standfirst: 'Estimate returns on a monthly SIP in ICICI Prudential mutual fund schemes.',
    intro:
      'ICICI Prudential Mutual Fund offers a wide range of equity, debt and balanced schemes with SIP facilities. This tool helps you plan monthly contributions and projected corpus growth.',
    howItWorks: 'Enter SIP amount, expected return and tenure to see invested amount, gains and total wealth.',
    related: ['sip-calculator', 'hdfc-sip-calculator', 'axis-bank-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [],
  },
  {
    slug: 'axis-bank-sip-calculator',
    id: 'sip',
    name: 'Axis Bank SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'Axis Bank SIP Calculator India (2026) — Axis MF SIP Returns',
    metaDescription:
      'Free Axis mutual fund SIP calculator. Estimate monthly SIP returns for Axis equity and hybrid funds.',
    h1: 'Axis Bank SIP Calculator',
    standfirst: 'Plan a monthly SIP in Axis mutual fund schemes and estimate long-term returns.',
    intro:
      'Axis Mutual Fund offers SIP across equity, ELSS, debt and hybrid categories. Use this calculator to model corpus growth before choosing a scheme.',
    howItWorks: 'Standard SIP calculator — monthly investment compounded at your assumed annual return.',
    related: ['sip-calculator', 'icici-sip-calculator', 'kotak-bank-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [],
  },
  {
    slug: 'kotak-bank-sip-calculator',
    id: 'sip',
    name: 'Kotak Bank SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'Kotak Bank SIP Calculator India (2026) — Kotak MF SIP Returns',
    metaDescription:
      'Calculate Kotak mutual fund SIP returns in India. Free Kotak SIP calculator for monthly investment planning.',
    h1: 'Kotak Bank SIP Calculator',
    standfirst: 'Estimate Kotak mutual fund SIP returns over your investment period.',
    intro:
      'Kotak Mahindra Mutual Fund offers SIP across equity, debt and thematic funds. This calculator helps estimate wealth creation from regular monthly investments.',
    howItWorks: 'Enter monthly SIP, expected return and duration for projected maturity value.',
    related: ['sip-calculator', 'axis-bank-sip-calculator', 'hdfc-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [],
  },
  {
    slug: 'nippon-india-sip-calculator',
    id: 'sip',
    name: 'Nippon India SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'Nippon India SIP Calculator (2026) — Nippon MF SIP Returns',
    metaDescription:
      'Free Nippon India mutual fund SIP calculator. Estimate monthly SIP returns for Nippon equity and debt funds.',
    h1: 'Nippon India SIP Calculator',
    standfirst: 'Project returns on a monthly SIP in Nippon India mutual fund schemes.',
    intro:
      'Nippon India Mutual Fund (formerly Reliance Nippon) offers SIP across equity, debt and index funds. Plan your monthly investment with this free calculator.',
    howItWorks: 'Standard compounded monthly SIP projection based on your inputs.',
    related: ['sip-calculator', 'index-fund-sip-calculator', 'sbi-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [],
  },
  {
    slug: 'lic-sip-calculator',
    id: 'sip',
    name: 'LIC SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'LIC SIP Calculator India (2026) — LIC Mutual Fund SIP Returns',
    metaDescription:
      'Calculate LIC mutual fund SIP returns in India. Free LIC SIP calculator for monthly investment planning.',
    h1: 'LIC SIP Calculator',
    standfirst: 'Estimate returns on a monthly SIP in LIC mutual fund schemes.',
    intro:
      'LIC Mutual Fund offers equity, debt and hybrid schemes with SIP options. Use this calculator to estimate long-term wealth from regular monthly investments.',
    howItWorks: 'Enter monthly amount, expected return and years to see total investment, gains and corpus.',
    related: ['sip-calculator', 'sbi-sip-calculator', 'ppf-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 11, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [],
  },
  {
    slug: 'pnb-sip-calculator',
    id: 'sip',
    name: 'PNB SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'PNB SIP Calculator India (2026) — PNB Mutual Fund SIP Returns',
    metaDescription:
      'Free PNB mutual fund SIP calculator. Estimate monthly SIP returns for PNB equity and debt funds in India.',
    h1: 'PNB SIP Calculator',
    standfirst: 'Plan a monthly SIP in PNB mutual fund schemes and project returns.',
    intro:
      'PNB Mutual Fund offers SIP across equity and debt categories. This calculator estimates corpus growth from your monthly contributions.',
    howItWorks: 'Standard SIP compounding calculator for monthly investments.',
    related: ['sip-calculator', 'sbi-sip-calculator', 'lic-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 11, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [],
  },
  {
    slug: 'idbi-sip-calculator',
    id: 'sip',
    name: 'IDBI SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'IDBI SIP Calculator India (2026) — IDBI Mutual Fund SIP Returns',
    metaDescription:
      'Calculate IDBI mutual fund SIP returns. Free IDBI SIP calculator for monthly investment planning in India.',
    h1: 'IDBI SIP Calculator',
    standfirst: 'Estimate IDBI mutual fund SIP returns over your chosen tenure.',
    intro:
      'IDBI Mutual Fund offers equity and debt schemes with SIP facilities. Use this tool to plan monthly investments and projected corpus.',
    howItWorks: 'Enter SIP amount, return assumption and duration for maturity estimate.',
    related: ['sip-calculator', 'sbi-sip-calculator', 'pnb-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 500, step: 500 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 11, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [],
  },
  {
    slug: 'index-fund-sip-calculator',
    id: 'sip',
    name: 'Index Fund SIP Calculator',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'Index Fund SIP Calculator India (2026) — Passive Investing Returns',
    metaDescription:
      'Free index fund SIP calculator for India. Estimate returns on monthly SIP in Nifty 50, Sensex or other index funds.',
    h1: 'Index Fund SIP Calculator',
    standfirst: 'Project returns on a monthly SIP in index mutual funds or ETFs.',
    intro:
      'Index funds track a market index like Nifty 50 or Sensex with lower expense ratios than active funds. This calculator estimates long-term SIP corpus using your return assumption — typically 10–12% for broad equity indices over long periods, though past performance varies.',
    howItWorks: 'Enter monthly SIP, expected return and duration. Uses standard monthly compounding.',
    related: ['sip-calculator', 'lumpsum-calculator', 'cagr-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 10000, min: 100, step: 100 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 11, min: 1, max: 20, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 15, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [
      { q: 'What return to assume for index fund SIP?', a: 'Broad Nifty 50 index funds have historically returned ~10–12% CAGR over 15+ year periods, but this is not guaranteed. Use conservative assumptions for planning.' },
    ],
  },
  {
    slug: 'sip-calculator-40-years',
    id: 'sip',
    name: 'SIP Calculator 40 Years',
    category: 'investment',
    sidebarGroup: 'sip',
    metaTitle: 'SIP Calculator 40 Years India (2026) — Long-Term SIP Returns',
    metaDescription:
      'Calculate SIP returns over 40 years in India. Free long-term SIP calculator for retirement and wealth planning.',
    h1: 'SIP Calculator — 40 Year Investment Horizon',
    standfirst: 'See how a monthly SIP compounds over a 40-year horizon — ideal for early retirement planning.',
    intro:
      'A 40-year SIP horizon captures the full power of compounding — often used by investors who start in their 20s and hold until retirement. Small monthly amounts can grow into substantial corpuses over four decades.',
    howItWorks:
      'Default duration is set to 40 years. Adjust monthly investment and return rate to see long-term wealth projection and year-by-year breakdown.',
    related: ['sip-calculator', 'retirement-calculator', 'step-up-sip-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 10000, min: 100, step: 100 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 20, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 40, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total Investment', format: 'currency' },
      { id: 'returns', label: 'Wealth Gained', format: 'currency' },
      { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
    ],
    faqs: [
      { q: 'Is 40 years too long for SIP planning?', a: 'Not if you start early. A 25-year-old investing until 65 has a 40-year horizon. Longer periods amplify compounding — even modest monthly amounts can become significant.' },
    ],
  },
];
