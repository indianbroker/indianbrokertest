/**
 * Financial calculator registry — metadata, SEO, inputs, and content.
 * URL pattern: /calculators/{slug}/
 */

import { calculatorVariants } from './calculator-variants.js';

/** @typedef {'investment' | 'savings' | 'loan' | 'tax' | 'salary' | 'trading'} CalcCategory */

/**
 * @typedef {Object} CalcInput
 * @property {string} id
 * @property {string} label
 * @property {'currency' | 'percent' | 'years' | 'number' | 'select'} type
 * @property {number} [default]
 * @property {number} [min]
 * @property {number} [max]
 * @property {number} [step]
 * @property {{ value: number | string, label: string }[]} [options]
 */

/**
 * @typedef {Object} CalcOutput
 * @property {string} id
 * @property {string} label
 * @property {boolean} [highlight]
 * @property {'currency' | 'percent' | 'number'} [format]
 */

/**
 * @typedef {Object} Calculator
 * @property {string} slug
 * @property {string} id
 * @property {string} name
 * @property {CalcCategory} category
 * @property {string} metaTitle
 * @property {string} metaDescription
 * @property {string} h1
 * @property {string} standfirst
 * @property {string} intro
 * @property {string} howItWorks
 * @property {string} [formula]
 * @property {{ q: string, a: string }[]} faqs
 * @property {string[]} related
 * @property {CalcInput[]} inputs
 * @property {CalcOutput[]} outputs
 * @property {boolean} [external]
 * @property {string} [externalPath]
 */

export const calculatorCategories = {
  investment: { label: 'Investment & wealth', order: 1 },
  savings: { label: 'Savings & deposits', order: 2 },
  loan: { label: 'Loans & EMI', order: 3 },
  tax: { label: 'Tax & statutory', order: 4 },
  salary: { label: 'Salary & benefits', order: 5 },
  trading: { label: 'Trading & stocks', order: 6 },
};

const sharedInvestmentRelated = ['sip-calculator', 'lumpsum-calculator', 'step-up-sip-calculator', 'cagr-calculator'];

/** @type {Calculator[]} */
export const calculators = [
  {
    slug: 'sip-calculator',
    id: 'sip',
    name: 'SIP Calculator',
    category: 'investment',
    metaTitle: 'SIP Calculator India (2026) — Free Systematic Investment Plan Calculator',
    metaDescription:
      'Free SIP calculator for India. Estimate mutual fund returns on monthly SIP investments with invested amount, estimated returns and maturity value.',
    h1: 'SIP Calculator — Systematic Investment Plan',
    standfirst:
      'Estimate how much your monthly SIP could grow into over time. Enter investment amount, expected return and tenure.',
    intro:
      'A Systematic Investment Plan (SIP) invests a fixed sum in mutual funds at regular intervals — usually monthly. This calculator estimates the maturity value using compounded monthly returns, the same approach used by leading Indian fintech platforms.',
    howItWorks:
      'Enter your monthly investment, expected annual return and investment period. The calculator converts the annual return to an effective monthly rate (compounded, not simply divided by 12) and projects your corpus at maturity.',
    formula: 'M = P × ((1 + r)^n − 1) / r × (1 + r), where r is the monthly rate and n is the number of months.',
    faqs: [
      { q: 'What is a SIP calculator?', a: 'A SIP calculator estimates the future value of regular monthly investments in mutual funds based on an assumed rate of return and investment period.' },
      { q: 'Is the return rate guaranteed?', a: 'No. Mutual fund returns depend on market performance. The rate you enter is an assumption for planning purposes only.' },
      { q: 'How is monthly return calculated from annual return?', a: 'We use effective monthly compounding: monthly rate = (1 + annual return)^(1/12) − 1. Dividing the annual rate by 12 alone would overstate returns.' },
    ],
    related: ['lumpsum-calculator', 'step-up-sip-calculator', 'swp-calculator', 'mf-calculator', 'retirement-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly investment', type: 'currency', default: 5000, min: 100, step: 100 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30, step: 0.5 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Invested amount', format: 'currency' },
      { id: 'returns', label: 'Est. returns', format: 'currency' },
      { id: 'total', label: 'Total value', format: 'currency', highlight: true },
    ],
  },
  {
    slug: 'lumpsum-calculator',
    id: 'lumpsum',
    name: 'Lumpsum Calculator',
    category: 'investment',
    metaTitle: 'Lumpsum Calculator India (2026) — Mutual Fund Lumpsum Returns',
    metaDescription:
      'Calculate lumpsum mutual fund returns in India. Enter investment amount, expected return and tenure to see estimated wealth gain.',
    h1: 'Lumpsum Investment Calculator',
    standfirst: 'Project returns on a one-time mutual fund or investment lumpsum.',
    intro:
      'A lumpsum investment puts the entire amount into a fund at once. Unlike SIP, there are no periodic additions — growth comes purely from compounding on the initial corpus.',
    howItWorks:
      'Enter the investment amount, expected annual return and holding period. The calculator compounds the return annually to estimate your final value.',
    formula: 'FV = P × (1 + r)^t',
    faqs: [
      { q: 'SIP vs lumpsum — which is better?', a: 'SIP reduces timing risk through rupee-cost averaging. Lumpsum can outperform in consistently rising markets but carries higher entry-timing risk. Neither is universally better.' },
      { q: 'Does this include expense ratio?', a: 'No. Actual mutual fund returns are net of expense ratio, exit load and taxes. Use a conservative return assumption.' },
    ],
    related: sharedInvestmentRelated,
    inputs: [
      { id: 'amount', label: 'Investment amount', type: 'currency', default: 100000, min: 1000 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Invested amount', format: 'currency' },
      { id: 'returns', label: 'Est. returns', format: 'currency' },
      { id: 'total', label: 'Total value', format: 'currency', highlight: true },
    ],
  },
  {
    slug: 'step-up-sip-calculator',
    id: 'step-up-sip',
    name: 'Step Up SIP Calculator',
    category: 'investment',
    metaTitle: 'Step Up SIP Calculator India (2026) — Yearly SIP Increase',
    metaDescription:
      'Calculate returns when you increase your SIP every year. Free step-up SIP calculator with invested amount, returns and maturity value.',
    h1: 'Step Up SIP Calculator',
    standfirst: 'See how increasing your SIP annually accelerates long-term wealth creation.',
    intro:
      'A step-up SIP raises your monthly contribution by a fixed percentage each year — for example, 10% more every year. This mirrors salary growth and can significantly boost your final corpus.',
    howItWorks:
      'Enter starting monthly SIP, annual step-up percentage, expected return and tenure. Each year the monthly payment increases before compounding is applied.',
    faqs: [
      { q: 'What is a good step-up percentage?', a: 'Many investors align step-up with expected salary growth — typically 5–15% per year. Even 10% annual step-up can dramatically increase long-term corpus versus a flat SIP.' },
    ],
    related: ['sip-calculator', 'lumpsum-calculator', 'retirement-calculator'],
    inputs: [
      { id: 'monthly', label: 'Starting monthly SIP', type: 'currency', default: 5000, min: 100 },
      { id: 'stepUp', label: 'Yearly step-up', type: 'percent', default: 10, min: 0, max: 50 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30 },
      { id: 'years', label: 'Time period', type: 'years', default: 15, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'invested', label: 'Total invested', format: 'currency' },
      { id: 'returns', label: 'Est. returns', format: 'currency' },
      { id: 'total', label: 'Maturity value', format: 'currency', highlight: true },
    ],
  },
  {
    slug: 'swp-calculator',
    id: 'swp',
    name: 'SWP Calculator',
    category: 'investment',
    metaTitle: 'SWP Calculator India (2026) — Systematic Withdrawal Plan',
    metaDescription:
      'Calculate SWP returns in India. Estimate how long your corpus lasts with regular monthly withdrawals and assumed growth rate.',
    h1: 'SWP Calculator — Systematic Withdrawal Plan',
    standfirst: 'Model regular withdrawals from a mutual fund corpus while it continues to earn returns.',
    intro:
      'A Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount periodically from your investment while the remaining balance stays invested. It is popular for retirement income.',
    howItWorks:
      'Enter your starting corpus, monthly withdrawal, expected return and period. The calculator applies monthly growth then deducts each withdrawal.',
    related: ['sip-calculator', 'retirement-calculator', 'nps-calculator'],
    inputs: [
      { id: 'corpus', label: 'Initial corpus', type: 'currency', default: 5000000, min: 10000 },
      { id: 'withdrawal', label: 'Monthly withdrawal', type: 'currency', default: 25000, min: 1000 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 10, min: 1, max: 20 },
      { id: 'years', label: 'Withdrawal period', type: 'years', default: 20, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'corpus', label: 'Starting corpus', format: 'currency' },
      { id: 'withdrawn', label: 'Total withdrawn', format: 'currency' },
      { id: 'remaining', label: 'Remaining balance', format: 'currency', highlight: true },
    ],
    faqs: [
      { q: 'Can my corpus run out before the period ends?', a: 'Yes, if withdrawals exceed returns. This calculator shows remaining balance — if it hits zero early, reduce withdrawal amount or increase expected return assumption.' },
    ],
  },
  {
    slug: 'mf-calculator',
    id: 'mf',
    name: 'Mutual Fund Calculator',
    category: 'investment',
    metaTitle: 'Mutual Fund Calculator India (2026) — Returns Estimator',
    metaDescription:
      'Free mutual fund return calculator for India. Estimate invested amount, returns and maturity value on a lumpsum mutual fund investment.',
    h1: 'Mutual Fund Return Calculator',
    standfirst: 'Estimate returns on a mutual fund investment over your chosen holding period.',
    intro:
      'Use this calculator to project how a mutual fund investment might grow based on an assumed annual return. Actual fund performance varies with market conditions and fund category.',
    howItWorks: 'Works like a lumpsum calculator — enter amount, expected CAGR and holding period.',
    related: ['sip-calculator', 'lumpsum-calculator', 'cagr-calculator'],
    inputs: [
      { id: 'amount', label: 'Investment amount', type: 'currency', default: 100000, min: 1000 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 12, min: 1, max: 30 },
      { id: 'years', label: 'Holding period', type: 'years', default: 5, min: 1, max: 30 },
    ],
    outputs: [
      { id: 'invested', label: 'Invested amount', format: 'currency' },
      { id: 'returns', label: 'Est. returns', format: 'currency' },
      { id: 'total', label: 'Maturity value', format: 'currency', highlight: true },
    ],
    faqs: [
      { q: 'Which return should I assume?', a: 'Use category averages as a rough guide: large-cap equity ~10–12%, mid-cap ~12–15%, debt ~6–8%. Past performance does not guarantee future returns.' },
    ],
  },
  {
    slug: 'cagr-calculator',
    id: 'cagr',
    name: 'CAGR Calculator',
    category: 'investment',
    metaTitle: 'CAGR Calculator India (2026) — Compound Annual Growth Rate',
    metaDescription:
      'Calculate CAGR (compound annual growth rate) for investments, mutual funds or portfolios. Free online CAGR calculator for India.',
    h1: 'CAGR Calculator — Compound Annual Growth Rate',
    standfirst: 'Find the annualised growth rate between an initial and final investment value.',
    intro:
      'CAGR smooths volatile returns into a single annual growth figure. It is the standard way to compare investments over different time periods.',
    howItWorks: 'Enter starting value, ending value and number of years. CAGR is the constant annual rate that would grow the initial value to the final value.',
    formula: 'CAGR = (Final / Initial)^(1/years) − 1',
    related: ['roi-calculator', 'sip-calculator', 'mf-calculator'],
    inputs: [
      { id: 'initial', label: 'Initial value', type: 'currency', default: 100000, min: 1 },
      { id: 'final', label: 'Final value', type: 'currency', default: 250000, min: 1 },
      { id: 'years', label: 'Number of years', type: 'years', default: 5, min: 1, max: 50 },
    ],
    outputs: [{ id: 'cagr', label: 'CAGR', format: 'percent', highlight: true }],
    faqs: [
      { q: 'CAGR vs absolute return?', a: 'Absolute return is total gain. CAGR annualises it, making multi-year comparisons meaningful. A 100% gain over 10 years is ~7.2% CAGR, not 10%.' },
    ],
  },
  {
    slug: 'roi-calculator',
    id: 'roi',
    name: 'ROI Calculator',
    category: 'investment',
    metaTitle: 'ROI Calculator India (2026) — Return on Investment',
    metaDescription:
      'Calculate return on investment (ROI) as a percentage. Free ROI calculator for stocks, mutual funds and other investments in India.',
    h1: 'ROI Calculator — Return on Investment',
    standfirst: 'Calculate the percentage return on any investment from amount invested and amount returned.',
    intro: 'ROI measures investment efficiency as a percentage of the original amount invested.',
    howItWorks: 'Enter amount invested and current or final value. ROI = (Returned − Invested) / Invested × 100.',
    related: ['cagr-calculator', 'stock-average-calculator', 'xirr-calculator'],
    inputs: [
      { id: 'invested', label: 'Amount invested', type: 'currency', default: 100000, min: 1 },
      { id: 'returned', label: 'Current / final value', type: 'currency', default: 150000, min: 1 },
    ],
    outputs: [
      { id: 'gain', label: 'Absolute gain', format: 'currency' },
      { id: 'roi', label: 'ROI', format: 'percent', highlight: true },
    ],
    faqs: [{ q: 'Does ROI account for time?', a: 'No. ROI ignores holding period. Use CAGR or XIRR for time-adjusted returns.' }],
  },
  {
    slug: 'retirement-calculator',
    id: 'retirement',
    name: 'Retirement Calculator',
    category: 'investment',
    metaTitle: 'Retirement Calculator India (2026) — Corpus & SIP Needed',
    metaDescription:
      'Plan retirement in India. Calculate corpus needed, future expenses and monthly SIP required based on inflation and expected returns.',
    h1: 'Retirement Planning Calculator',
    standfirst: 'Estimate the corpus you need at retirement and the monthly SIP to get there.',
    intro:
      'Retirement planning accounts for inflation eroding purchasing power and the need to fund living expenses for decades after you stop earning.',
    howItWorks:
      'Enter current monthly expenses, years to retirement, expected inflation, return rate and retirement duration. The calculator inflates expenses to retirement and computes the corpus needed.',
    related: ['sip-calculator', 'nps-calculator', 'swp-calculator', 'ppf-calculator'],
    inputs: [
      { id: 'monthlyExpense', label: 'Current monthly expense', type: 'currency', default: 50000, min: 5000 },
      { id: 'yearsToRetire', label: 'Years to retirement', type: 'years', default: 20, min: 1, max: 40 },
      { id: 'yearsInRetirement', label: 'Retirement years', type: 'years', default: 25, min: 10, max: 40 },
      { id: 'inflation', label: 'Inflation (p.a.)', type: 'percent', default: 6, min: 1, max: 15 },
      { id: 'returnRate', label: 'Expected return (p.a.)', type: 'percent', default: 10, min: 1, max: 20 },
    ],
    outputs: [
      { id: 'futureExpense', label: 'Monthly expense at retirement', format: 'currency' },
      { id: 'corpusNeeded', label: 'Corpus needed', format: 'currency', highlight: true },
      { id: 'monthlySip', label: 'Monthly SIP needed', format: 'currency' },
    ],
    faqs: [
      { q: 'How much corpus do I need to retire in India?', a: 'A common rule is 25–30× your annual expenses at retirement, adjusted for inflation. This calculator uses annuity math for a more precise estimate.' },
    ],
  },
  {
    slug: 'nps-calculator',
    id: 'nps',
    name: 'NPS Calculator',
    category: 'investment',
    metaTitle: 'NPS Calculator India (2026) — National Pension System',
    metaDescription:
      'Calculate NPS corpus at retirement and estimated monthly pension. Free National Pension System calculator for India.',
    h1: 'NPS Calculator — National Pension System',
    standfirst: 'Project your NPS corpus at age 60 and estimated annuity pension.',
    intro:
      'The National Pension System (NPS) is a voluntary retirement savings scheme regulated by PFRDA. Contributions grow until retirement, after which a portion must be used to buy an annuity.',
    howItWorks:
      'Enter monthly contribution, current age, expected return until retirement. At 60, 40% typically goes to annuity — we estimate monthly pension from the remaining corpus.',
    related: ['retirement-calculator', 'apy-calculator', 'epf-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly contribution', type: 'currency', default: 5000, min: 500 },
      { id: 'currentAge', label: 'Current age', type: 'number', default: 30, min: 18, max: 59 },
      { id: 'rate', label: 'Expected return (p.a.)', type: 'percent', default: 10, min: 1, max: 15 },
    ],
    outputs: [
      { id: 'invested', label: 'Total invested', format: 'currency' },
      { id: 'corpusAtRetirement', label: 'Corpus at 60', format: 'currency', highlight: true },
      { id: 'monthlyPension', label: 'Est. monthly pension', format: 'currency' },
    ],
    faqs: [
      { q: 'Is NPS return guaranteed?', a: 'No. NPS returns depend on asset allocation and market performance. Equity-heavy portfolios have higher volatility and potential return.' },
    ],
  },
  {
    slug: 'apy-calculator',
    id: 'apy',
    name: 'APY Calculator',
    category: 'investment',
    metaTitle: 'APY Calculator India (2026) — Atal Pension Yojana',
    metaDescription:
      'Calculate Atal Pension Yojana contributions and pension amount. Free APY calculator for India.',
    h1: 'APY Calculator — Atal Pension Yojana',
    standfirst: 'Estimate contributions and guaranteed pension under the Atal Pension Yojana scheme.',
    intro:
      'Atal Pension Yojana (APY) is a government-backed pension scheme for unorganised sector workers, offering fixed pensions of ₹1,000–₹5,000 per month from age 60.',
    howItWorks: 'Select target pension and entry age. The calculator shows total contributions over the period and corpus needed.',
    related: ['nps-calculator', 'epf-calculator', 'retirement-calculator'],
    inputs: [
      { id: 'age', label: 'Entry age', type: 'number', default: 25, min: 18, max: 40 },
      { id: 'monthly', label: 'Monthly contribution', type: 'currency', default: 500, min: 50 },
      { id: 'pension', label: 'Target monthly pension', type: 'currency', default: 3000, min: 1000, max: 5000 },
    ],
    outputs: [
      { id: 'monthlyPension', label: 'Target pension', format: 'currency', highlight: true },
      { id: 'invested', label: 'Total contributions', format: 'currency' },
      { id: 'years', label: 'Contribution years', format: 'number' },
    ],
    faqs: [{ q: 'Who can join APY?', a: 'Indian citizens aged 18–40 with a savings bank account can enrol. Contributions continue until age 60.' }],
  },
  {
    slug: 'inflation-calculator',
    id: 'inflation',
    name: 'Inflation Calculator',
    category: 'investment',
    metaTitle: 'Inflation Calculator India (2026) — Future Cost & Purchasing Power',
    metaDescription:
      'Calculate how inflation affects purchasing power and future costs in India. Free inflation calculator online.',
    h1: 'Inflation Calculator',
    standfirst: 'See how inflation erodes purchasing power and what today\'s money will cost in the future.',
    intro: 'Inflation reduces the real value of money over time. Planning investments and retirement requires accounting for rising prices.',
    howItWorks: 'Enter an amount, assumed inflation rate and time period to see future cost and remaining purchasing power of today\'s money.',
    related: ['retirement-calculator', 'fd-calculator', 'ppf-calculator'],
    inputs: [
      { id: 'amount', label: 'Amount today', type: 'currency', default: 100000, min: 1000 },
      { id: 'inflation', label: 'Inflation rate (p.a.)', type: 'percent', default: 6, min: 1, max: 15 },
      { id: 'years', label: 'Time period', type: 'years', default: 10, min: 1, max: 40 },
    ],
    outputs: [
      { id: 'futureCost', label: 'Future cost equivalent', format: 'currency', highlight: true },
      { id: 'purchasingPower', label: 'Purchasing power of today\'s amount', format: 'currency' },
    ],
    faqs: [{ q: 'What is India\'s average inflation?', a: 'Long-term CPI inflation in India has averaged roughly 5–6%. Use conservative assumptions for financial planning.' }],
  },
  {
    slug: 'fd-calculator',
    id: 'fd',
    name: 'FD Calculator',
    category: 'savings',
    metaTitle: 'FD Calculator India (2026) — Fixed Deposit Interest',
    metaDescription:
      'Calculate fixed deposit maturity amount and interest earned. Free FD calculator for Indian banks with quarterly compounding.',
    h1: 'FD Calculator — Fixed Deposit',
    standfirst: 'Estimate maturity value and interest on a bank fixed deposit.',
    intro: 'Fixed deposits (FDs) are among the safest savings instruments in India, offered by banks and NBFCs with guaranteed returns for a fixed tenure.',
    howItWorks: 'Enter deposit amount, annual interest rate and tenure. Most bank FDs compound quarterly — this calculator uses quarterly compounding.',
    related: ['rd-calculator', 'ppf-calculator', 'nsc-calculator'],
    inputs: [
      { id: 'amount', label: 'Deposit amount', type: 'currency', default: 100000, min: 1000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 7, min: 1, max: 12 },
      { id: 'years', label: 'Tenure', type: 'years', default: 5, min: 1, max: 10 },
    ],
    outputs: [
      { id: 'invested', label: 'Deposit amount', format: 'currency' },
      { id: 'interest', label: 'Interest earned', format: 'currency' },
      { id: 'total', label: 'Maturity amount', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'Is FD interest taxable?', a: 'Yes. FD interest is added to your income and taxed per your slab. TDS applies if interest exceeds ₹40,000/year (₹50,000 for senior citizens).' }],
  },
  {
    slug: 'rd-calculator',
    id: 'rd',
    name: 'RD Calculator',
    category: 'savings',
    metaTitle: 'RD Calculator India (2026) — Recurring Deposit Maturity',
    metaDescription:
      'Calculate recurring deposit maturity amount and interest. Free RD calculator for Indian banks.',
    h1: 'RD Calculator — Recurring Deposit',
    standfirst: 'Estimate maturity value on monthly recurring deposits.',
    intro: 'Recurring deposits let you save a fixed sum monthly with bank-guaranteed interest — ideal for disciplined short-to-medium term savings.',
    howItWorks: 'Enter monthly deposit, interest rate and tenure. Each instalment earns interest for the remaining period.',
    related: ['fd-calculator', 'sip-calculator', 'ppf-calculator'],
    inputs: [
      { id: 'monthly', label: 'Monthly deposit', type: 'currency', default: 5000, min: 100 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 6.5, min: 1, max: 12 },
      { id: 'years', label: 'Tenure', type: 'years', default: 3, min: 1, max: 10 },
    ],
    outputs: [
      { id: 'invested', label: 'Total deposited', format: 'currency' },
      { id: 'interest', label: 'Interest earned', format: 'currency' },
      { id: 'total', label: 'Maturity amount', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'RD vs SIP?', a: 'RD offers guaranteed returns from banks. SIP in mutual funds has market risk but historically higher long-term returns in equity funds.' }],
  },
  {
    slug: 'ppf-calculator',
    id: 'ppf',
    name: 'PPF Calculator',
    category: 'savings',
    metaTitle: 'PPF Calculator India (2026) — Public Provident Fund Maturity',
    metaDescription:
      'Calculate PPF maturity amount with annual contributions. Free Public Provident Fund calculator — current rate 7.1% p.a.',
    h1: 'PPF Calculator — Public Provident Fund',
    standfirst: 'Project your PPF balance at maturity with yearly contributions.',
    intro: 'PPF is a government-backed, tax-free savings scheme with a 15-year lock-in (extendable). Interest is set quarterly by the government — currently around 7.1% p.a.',
    howItWorks: 'Enter annual contribution (max ₹1.5 lakh), interest rate and tenure. Interest compounds annually.',
    related: ['ssy-calculator', 'nsc-calculator', 'fd-calculator', 'epf-calculator'],
    inputs: [
      { id: 'yearly', label: 'Yearly contribution', type: 'currency', default: 150000, min: 500, max: 150000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 7.1, min: 1, max: 10 },
      { id: 'years', label: 'Tenure', type: 'years', default: 15, min: 15, max: 25 },
    ],
    outputs: [
      { id: 'invested', label: 'Total contributed', format: 'currency' },
      { id: 'interest', label: 'Interest earned', format: 'currency' },
      { id: 'total', label: 'Maturity amount', format: 'currency', highlight: true },
    ],
    faqs: [
      { q: 'Is PPF interest tax-free?', a: 'Yes. PPF falls under EEE — contributions (up to ₹1.5L under 80C), interest and maturity are all tax-free.' },
    ],
  },
  {
    slug: 'ssy-calculator',
    id: 'ssy',
    name: 'SSY Calculator',
    category: 'savings',
    metaTitle: 'SSY Calculator India (2026) — Sukanya Samriddhi Yojana',
    metaDescription:
      'Calculate Sukanya Samriddhi Yojana maturity amount. Free SSY calculator for girl child savings scheme in India.',
    h1: 'SSY Calculator — Sukanya Samriddhi Yojana',
    standfirst: 'Estimate SSY maturity value for the girl child savings scheme.',
    intro: 'Sukanya Samriddhi Yojana (SSY) is a government scheme for girl children under 10, offering tax-free returns — currently among the highest small-savings rates in India.',
    howItWorks: 'Contributions are made for 15 years; the account matures at 21 years from opening. Enter yearly deposit and rate to see maturity value.',
    related: ['ppf-calculator', 'fd-calculator', 'nsc-calculator'],
    inputs: [
      { id: 'yearly', label: 'Yearly deposit', type: 'currency', default: 50000, min: 250, max: 150000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 8.2, min: 1, max: 10 },
    ],
    outputs: [
      { id: 'invested', label: 'Total deposited', format: 'currency' },
      { id: 'interest', label: 'Interest earned', format: 'currency' },
      { id: 'total', label: 'Maturity at 21 years', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'Who can open SSY?', a: 'Parents or guardians can open SSY for a girl child below 10 years. Only one account per girl child is allowed.' }],
  },
  {
    slug: 'nsc-calculator',
    id: 'nsc',
    name: 'NSC Calculator',
    category: 'savings',
    metaTitle: 'NSC Calculator India (2026) — National Savings Certificate',
    metaDescription:
      'Calculate National Savings Certificate maturity amount and interest. Free NSC calculator for India post office scheme.',
    h1: 'NSC Calculator — National Savings Certificate',
    standfirst: 'Estimate returns on NSC investment with 5-year lock-in.',
    intro: 'National Savings Certificate (NSC) is a post office savings scheme with 5-year tenure, eligible for Section 80C deduction.',
    howItWorks: 'Enter investment amount and current NSC rate. Interest compounds annually and is reinvested (deemed reinvestment for tax).',
    related: ['ppf-calculator', 'scss-calculator', 'post-office-mis-calculator'],
    inputs: [
      { id: 'amount', label: 'Investment amount', type: 'currency', default: 100000, min: 1000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 7.7, min: 1, max: 10 },
      { id: 'years', label: 'Tenure', type: 'years', default: 5, min: 5, max: 5 },
    ],
    outputs: [
      { id: 'invested', label: 'Investment', format: 'currency' },
      { id: 'interest', label: 'Interest earned', format: 'currency' },
      { id: 'total', label: 'Maturity amount', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'Is NSC interest taxable?', a: 'NSC interest is taxable each year (deemed reinvested) but qualifies for 80C. At maturity, the full amount including interest is paid out.' }],
  },
  {
    slug: 'scss-calculator',
    id: 'scss',
    name: 'SCSS Calculator',
    category: 'savings',
    metaTitle: 'SCSS Calculator India (2026) — Senior Citizens Savings Scheme',
    metaDescription:
      'Calculate Senior Citizens Savings Scheme returns. Free SCSS calculator for India — quarterly interest payouts.',
    h1: 'SCSS Calculator — Senior Citizens Savings Scheme',
    standfirst: 'Estimate interest and maturity on SCSS deposits for senior citizens.',
    intro: 'SCSS is designed for Indian residents aged 60+ with quarterly interest payouts and 5-year tenure (extendable by 3 years).',
    howItWorks: 'Works like an FD calculator with quarterly compounding. Max deposit ₹30 lakh per account.',
    related: ['post-office-mis-calculator', 'fd-calculator', 'ppf-calculator'],
    inputs: [
      { id: 'amount', label: 'Deposit amount', type: 'currency', default: 500000, min: 1000, max: 3000000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 8.2, min: 1, max: 12 },
      { id: 'years', label: 'Tenure', type: 'years', default: 5, min: 5, max: 8 },
    ],
    outputs: [
      { id: 'invested', label: 'Deposit', format: 'currency' },
      { id: 'interest', label: 'Interest earned', format: 'currency' },
      { id: 'total', label: 'Maturity amount', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'Who is eligible for SCSS?', a: 'Indian residents aged 60+ (55+ for voluntary retirees, 50+ for defence personnel) can invest up to ₹30 lakh.' }],
  },
  {
    slug: 'post-office-mis-calculator',
    id: 'post-office-mis',
    name: 'Post Office MIS Calculator',
    category: 'savings',
    metaTitle: 'Post Office MIS Calculator India (2026) — Monthly Income Scheme',
    metaDescription:
      'Calculate Post Office Monthly Income Scheme returns and monthly payout. Free POMIS calculator for India.',
    h1: 'Post Office MIS Calculator',
    standfirst: 'Estimate monthly income from Post Office Monthly Income Scheme.',
    intro: 'Post Office MIS (POMIS) pays fixed monthly interest on a lump sum deposit for 5 years — popular with retirees seeking regular income.',
    howItWorks: 'Enter deposit amount, interest rate and tenure to see monthly payout and total interest over the period.',
    related: ['scss-calculator', 'fd-calculator', 'swp-calculator'],
    inputs: [
      { id: 'amount', label: 'Deposit amount', type: 'currency', default: 500000, min: 10000, max: 900000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 7.4, min: 1, max: 12 },
      { id: 'years', label: 'Tenure', type: 'years', default: 5, min: 5, max: 5 },
    ],
    outputs: [
      { id: 'invested', label: 'Deposit', format: 'currency' },
      { id: 'monthlyIncome', label: 'Monthly income', format: 'currency', highlight: true },
      { id: 'totalInterest', label: 'Total interest', format: 'currency' },
    ],
    faqs: [{ q: 'Is POMIS interest taxable?', a: 'Yes. Monthly interest is added to your income and taxed per your slab. Principal is returned at maturity.' }],
  },
  {
    slug: 'epf-calculator',
    id: 'epf',
    name: 'EPF Calculator',
    category: 'savings',
    metaTitle: 'EPF Calculator India (2026) — Employee Provident Fund Balance',
    metaDescription:
      'Calculate EPF corpus at retirement from monthly contributions. Free Employee Provident Fund calculator for India.',
    h1: 'EPF Calculator — Employee Provident Fund',
    standfirst: 'Estimate your EPF balance from employee and employer contributions over your working years.',
    intro: 'EPF is a mandatory retirement savings scheme for organised sector employees. Both employee (12% of basic) and employer contribute, with interest set annually by EPFO.',
    howItWorks: 'Enter monthly basic salary and years of service. We calculate 12% employee + 3.67% employer EPF share compounded monthly.',
    related: ['nps-calculator', 'gratuity-calculator', 'salary-calculator'],
    inputs: [
      { id: 'basic', label: 'Monthly basic salary', type: 'currency', default: 30000, min: 1000 },
      { id: 'years', label: 'Years of service', type: 'years', default: 20, min: 1, max: 40 },
      { id: 'rate', label: 'EPF interest (p.a.)', type: 'percent', default: 8.25, min: 1, max: 12 },
    ],
    outputs: [
      { id: 'invested', label: 'Total contributions', format: 'currency' },
      { id: 'returns', label: 'Interest earned', format: 'currency' },
      { id: 'total', label: 'EPF balance', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'Is EPF withdrawal tax-free?', a: 'EPF withdrawal after 5 years of continuous service is tax-free. Partial withdrawals are allowed for specific purposes.' }],
  },
  {
    slug: 'emi-calculator',
    id: 'emi',
    name: 'EMI Calculator',
    category: 'loan',
    metaTitle: 'EMI Calculator India (2026) — Loan EMI Online',
    metaDescription:
      'Calculate loan EMI, total interest and total payment. Free EMI calculator for personal, home and car loans in India.',
    h1: 'EMI Calculator — Equated Monthly Installment',
    standfirst: 'Calculate monthly EMI, total interest and total payment on any loan.',
    intro: 'EMI (Equated Monthly Installment) is the fixed monthly payment on a loan comprising principal and interest. Most Indian loans use reducing balance method.',
    howItWorks: 'Enter loan amount, annual interest rate and tenure. EMI is calculated using the standard reducing-balance formula.',
    formula: 'EMI = P × r × (1+r)^n / ((1+r)^n − 1)',
    related: ['home-loan-emi-calculator', 'car-loan-emi-calculator', 'flat-vs-reducing-calculator'],
    inputs: [
      { id: 'principal', label: 'Loan amount', type: 'currency', default: 1000000, min: 10000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 9, min: 1, max: 24 },
      { id: 'years', label: 'Loan tenure', type: 'years', default: 5, min: 1, max: 30 },
    ],
    outputs: [
      { id: 'emi', label: 'Monthly EMI', format: 'currency', highlight: true },
      { id: 'totalInterest', label: 'Total interest', format: 'currency' },
      { id: 'totalPayment', label: 'Total payment', format: 'currency' },
    ],
    faqs: [
      { q: 'What is reducing balance EMI?', a: 'Interest is charged on the outstanding principal each month, so interest component decreases over time while principal component increases.' },
    ],
  },
  {
    slug: 'home-loan-emi-calculator',
    id: 'home-loan-emi',
    name: 'Home Loan EMI Calculator',
    category: 'loan',
    metaTitle: 'Home Loan EMI Calculator India (2026) — Housing Loan EMI',
    metaDescription:
      'Calculate home loan EMI, total interest and repayment schedule estimate. Free housing loan EMI calculator for India.',
    h1: 'Home Loan EMI Calculator',
    standfirst: 'Estimate monthly EMI and total interest on a home loan in India.',
    intro: 'Home loans typically run 15–30 years at rates linked to repo rate and bank MCLR/equivalent. Use this calculator to plan affordability before applying.',
    howItWorks: 'Same reducing-balance EMI formula as the general EMI calculator, pre-set for typical home loan amounts and tenures.',
    related: ['emi-calculator', 'car-loan-emi-calculator', 'flat-vs-reducing-calculator'],
    inputs: [
      { id: 'principal', label: 'Home loan amount', type: 'currency', default: 5000000, min: 100000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 8.5, min: 1, max: 15 },
      { id: 'years', label: 'Tenure', type: 'years', default: 20, min: 5, max: 30 },
    ],
    outputs: [
      { id: 'emi', label: 'Monthly EMI', format: 'currency', highlight: true },
      { id: 'totalInterest', label: 'Total interest', format: 'currency' },
      { id: 'totalPayment', label: 'Total repayment', format: 'currency' },
    ],
    faqs: [{ q: 'What is the maximum home loan tenure in India?', a: 'Most banks offer up to 30 years. Longer tenure reduces EMI but increases total interest paid.' }],
  },
  {
    slug: 'car-loan-emi-calculator',
    id: 'car-loan-emi',
    name: 'Car Loan EMI Calculator',
    category: 'loan',
    metaTitle: 'Car Loan EMI Calculator India (2026) — Auto Loan EMI',
    metaDescription:
      'Calculate car loan EMI and total interest. Free auto loan EMI calculator for new and used cars in India.',
    h1: 'Car Loan EMI Calculator',
    standfirst: 'Estimate monthly EMI on a car loan before you buy.',
    intro: 'Car loans in India typically run 3–7 years with rates varying by lender, car type (new vs used) and your credit profile.',
    howItWorks: 'Enter loan amount, interest rate and tenure to get EMI and total cost of borrowing.',
    related: ['emi-calculator', 'home-loan-emi-calculator', 'flat-vs-reducing-calculator'],
    inputs: [
      { id: 'principal', label: 'Car loan amount', type: 'currency', default: 800000, min: 50000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 9.5, min: 1, max: 18 },
      { id: 'years', label: 'Tenure', type: 'years', default: 5, min: 1, max: 7 },
    ],
    outputs: [
      { id: 'emi', label: 'Monthly EMI', format: 'currency', highlight: true },
      { id: 'totalInterest', label: 'Total interest', format: 'currency' },
      { id: 'totalPayment', label: 'Total payment', format: 'currency' },
    ],
    faqs: [{ q: 'New vs used car loan rates?', a: 'Used car loans typically carry 1–3% higher interest than new car loans. Rates also depend on the lender and your credit score.' }],
  },
  {
    slug: 'flat-vs-reducing-calculator',
    id: 'flat-vs-reducing',
    name: 'Flat vs Reducing Rate Calculator',
    category: 'loan',
    metaTitle: 'Flat vs Reducing Interest Rate Calculator India (2026)',
    metaDescription:
      'Compare flat rate vs reducing balance loan EMI and total interest. See how much you save with reducing rate loans in India.',
    h1: 'Flat Rate vs Reducing Rate Calculator',
    standfirst: 'Compare EMI and total cost under flat and reducing balance interest methods.',
    intro: 'Some lenders quote flat rates which appear lower but cost more than reducing balance rates. Always compare effective interest cost, not just the quoted rate.',
    howItWorks: 'Enter loan amount, quoted rate and tenure. The calculator shows EMI and total interest under both methods and your potential savings.',
    related: ['emi-calculator', 'home-loan-emi-calculator', 'car-loan-emi-calculator'],
    inputs: [
      { id: 'principal', label: 'Loan amount', type: 'currency', default: 500000, min: 10000 },
      { id: 'rate', label: 'Interest rate (p.a.)', type: 'percent', default: 10, min: 1, max: 24 },
      { id: 'years', label: 'Tenure', type: 'years', default: 5, min: 1, max: 30 },
    ],
    outputs: [
      { id: 'reducingEmi', label: 'Reducing balance EMI', format: 'currency' },
      { id: 'flatEmi', label: 'Flat rate EMI', format: 'currency' },
      { id: 'savings', label: 'Interest saved (reducing)', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'Which method do Indian banks use?', a: 'Most regulated banks and NBFCs use reducing balance for home, personal and car loans. Flat rate is more common in informal or short-term lending.' }],
  },
  {
    slug: 'simple-interest-calculator',
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    category: 'loan',
    metaTitle: 'Simple Interest Calculator India (2026) — SI Formula Online',
    metaDescription: 'Calculate simple interest on loans and deposits. Free simple interest calculator with SI = P × R × T / 100 formula.',
    h1: 'Simple Interest Calculator',
    standfirst: 'Calculate interest using the simple interest formula — no compounding.',
    intro: 'Simple interest is calculated only on the principal amount, not on accumulated interest. Used in some short-term loans and educational examples.',
    formula: 'SI = P × R × T / 100',
    howItWorks: 'Enter principal, annual rate and time in years.',
    related: ['compound-interest-calculator', 'fd-calculator', 'emi-calculator'],
    inputs: [
      { id: 'principal', label: 'Principal', type: 'currency', default: 100000, min: 1000 },
      { id: 'rate', label: 'Rate (p.a.)', type: 'percent', default: 8, min: 1, max: 30 },
      { id: 'years', label: 'Time (years)', type: 'years', default: 3, min: 1, max: 30 },
    ],
    outputs: [
      { id: 'interest', label: 'Simple interest', format: 'currency' },
      { id: 'total', label: 'Total amount', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'Simple vs compound interest?', a: 'Simple interest grows linearly. Compound interest grows exponentially because interest earns interest. Most investments and bank deposits use compounding.' }],
  },
  {
    slug: 'compound-interest-calculator',
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    category: 'loan',
    metaTitle: 'Compound Interest Calculator India (2026) — CI Formula Online',
    metaDescription: 'Calculate compound interest with annual, quarterly or monthly compounding. Free compound interest calculator for India.',
    h1: 'Compound Interest Calculator',
    standfirst: 'See how compounding grows your money over time.',
    intro: 'Compound interest is interest on both principal and accumulated interest — the foundation of long-term wealth building.',
    formula: 'A = P(1 + r/n)^(nt)',
    howItWorks: 'Enter principal, rate, time and compounding frequency.',
    related: ['simple-interest-calculator', 'fd-calculator', 'cagr-calculator'],
    inputs: [
      { id: 'principal', label: 'Principal', type: 'currency', default: 100000, min: 1000 },
      { id: 'rate', label: 'Rate (p.a.)', type: 'percent', default: 8, min: 1, max: 30 },
      { id: 'years', label: 'Time (years)', type: 'years', default: 5, min: 1, max: 40 },
      { id: 'frequency', label: 'Compounding per year', type: 'select', default: 4, options: [
        { value: 1, label: 'Annually' },
        { value: 4, label: 'Quarterly' },
        { value: 12, label: 'Monthly' },
      ]},
    ],
    outputs: [
      { id: 'interest', label: 'Compound interest', format: 'currency' },
      { id: 'total', label: 'Final amount', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'What is the Rule of 72?', a: 'Divide 72 by the annual return rate to estimate years to double your money. At 12% return, money doubles in roughly 6 years.' }],
  },
  {
    slug: 'income-tax-calculator',
    id: 'income-tax',
    name: 'Income Tax Calculator',
    category: 'tax',
    metaTitle: 'Income Tax Calculator India FY 2025-26 — New Regime Tax',
    metaDescription:
      'Calculate income tax under the new tax regime for FY 2025-26. Free online income tax calculator with slab rates and cess.',
    h1: 'Income Tax Calculator — FY 2025-26',
    standfirst: 'Estimate income tax under the new tax regime with updated slabs and standard deduction.',
    intro: 'This calculator uses the new tax regime slabs for FY 2025-26 (AY 2026-27) with ₹75,000 standard deduction. Old regime and deductions beyond standard deduction are not modelled.',
    howItWorks: 'Enter gross annual income. Tax is computed on progressive slabs with 4% health and education cess.',
    related: ['hra-calculator', 'tds-calculator', 'salary-calculator', 'gratuity-calculator'],
    inputs: [
      { id: 'income', label: 'Gross annual income', type: 'currency', default: 1200000, min: 0 },
    ],
    outputs: [
      { id: 'taxable', label: 'Taxable income', format: 'currency' },
      { id: 'totalTax', label: 'Total tax (incl. cess)', format: 'currency', highlight: true },
      { id: 'netIncome', label: 'Net income', format: 'currency' },
    ],
    faqs: [
      { q: 'New vs old tax regime?', a: 'The new regime has lower rates but fewer deductions. Old regime allows 80C, HRA, home loan interest etc. Choose the regime that minimises your tax.' },
      { q: 'Is this calculator accurate for filing?', a: 'This is an estimate for planning. Actual tax depends on all deductions, exemptions, surcharge and rebate under Section 87A.' },
    ],
  },
  {
    slug: 'hra-calculator',
    id: 'hra',
    name: 'HRA Calculator',
    category: 'tax',
    metaTitle: 'HRA Calculator India (2026) — House Rent Allowance Exemption',
    metaDescription:
      'Calculate HRA tax exemption under Section 10(13A). Free HRA calculator for metro and non-metro cities in India.',
    h1: 'HRA Calculator — House Rent Allowance',
    standfirst: 'Calculate how much of your HRA is tax-exempt under Indian income tax rules.',
    intro: 'HRA exemption is the minimum of: actual HRA received, rent paid minus 10% of basic, and 50% of basic (metro) or 40% (non-metro).',
    howItWorks: 'Enter basic salary, HRA received, rent paid and whether you live in a metro city.',
    related: ['income-tax-calculator', 'salary-calculator', 'gratuity-calculator'],
    inputs: [
      { id: 'basic', label: 'Monthly basic salary', type: 'currency', default: 40000, min: 1000 },
      { id: 'hra', label: 'Monthly HRA received', type: 'currency', default: 20000, min: 0 },
      { id: 'rent', label: 'Monthly rent paid', type: 'currency', default: 18000, min: 0 },
      { id: 'metro', label: 'Metro city', type: 'select', default: 1, options: [
        { value: 1, label: 'Yes (50% of basic)' },
        { value: 0, label: 'No (40% of basic)' },
      ]},
    ],
    outputs: [
      { id: 'exempt', label: 'HRA exempt (monthly)', format: 'currency', highlight: true },
      { id: 'taxable', label: 'Taxable HRA (monthly)', format: 'currency' },
    ],
    faqs: [{ q: 'Can I claim HRA if I live with parents?', a: 'Yes, if you pay rent to parents and they declare it as income. You need rent receipts and a valid rental arrangement.' }],
  },
  {
    slug: 'gst-calculator',
    id: 'gst',
    name: 'GST Calculator',
    category: 'tax',
    metaTitle: 'GST Calculator India (2026) — Add or Calculate GST Amount',
    metaDescription: 'Calculate GST amount at 5%, 12%, 18% or 28%. Free GST calculator for India with base amount and total.',
    h1: 'GST Calculator',
    standfirst: 'Calculate GST on any base amount at standard Indian GST rates.',
    intro: 'Goods and Services Tax (GST) is India\'s unified indirect tax. Common rates are 5%, 12%, 18% and 28% depending on the product or service category.',
    howItWorks: 'Enter base amount and GST rate to see tax amount and total inclusive price.',
    related: ['tds-calculator', 'income-tax-calculator', 'salary-calculator'],
    inputs: [
      { id: 'amount', label: 'Base amount (excl. GST)', type: 'currency', default: 10000, min: 1 },
      { id: 'rate', label: 'GST rate', type: 'select', default: 18, options: [
        { value: 5, label: '5%' },
        { value: 12, label: '12%' },
        { value: 18, label: '18%' },
        { value: 28, label: '28%' },
      ]},
    ],
    outputs: [
      { id: 'gst', label: 'GST amount', format: 'currency' },
      { id: 'total', label: 'Total (incl. GST)', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'What GST rate applies to brokerage?', a: 'Brokerage and financial services typically attract 18% GST on the service charge (not on the trade value itself).' }],
  },
  {
    slug: 'tds-calculator',
    id: 'tds',
    name: 'TDS Calculator',
    category: 'tax',
    metaTitle: 'TDS Calculator India (2026) — Tax Deducted at Source',
    metaDescription: 'Calculate TDS deduction on payments. Free TDS calculator for common rates — 10% on interest, professional fees and more.',
    h1: 'TDS Calculator — Tax Deducted at Source',
    standfirst: 'Estimate TDS deducted from a payment at a given rate.',
    intro: 'TDS (Tax Deducted at Source) is tax withheld at the time of payment. Rates vary by payment type — 10% on interest and professional fees is common.',
    howItWorks: 'Enter gross payment amount and TDS rate to see deduction and net amount received.',
    related: ['income-tax-calculator', 'gst-calculator', 'salary-calculator'],
    inputs: [
      { id: 'amount', label: 'Gross payment', type: 'currency', default: 100000, min: 1 },
      { id: 'rate', label: 'TDS rate', type: 'percent', default: 10, min: 1, max: 30 },
    ],
    outputs: [
      { id: 'tds', label: 'TDS deducted', format: 'currency' },
      { id: 'net', label: 'Net received', format: 'currency', highlight: true },
    ],
    faqs: [{ q: 'Can I claim TDS credit?', a: 'Yes. TDS deducted is credited against your total tax liability when you file your ITR, subject to matching in Form 26AS.' }],
  },
  {
    slug: 'salary-calculator',
    id: 'salary',
    name: 'Salary Calculator',
    category: 'salary',
    metaTitle: 'Salary Calculator India (2026) — In-Hand Salary from CTC',
    metaDescription:
      'Calculate in-hand salary from CTC. Estimate monthly take-home after PF and tax deductions in India.',
    h1: 'Salary Calculator — CTC to In-Hand',
    standfirst: 'Estimate your monthly take-home salary from annual CTC.',
    intro: 'CTC (Cost to Company) includes basic, HRA, allowances and employer contributions. In-hand salary is what you receive after employee PF and tax deductions.',
    howItWorks: 'Enter annual CTC and basic salary percentage. We estimate PF and a simplified tax deduction for take-home pay.',
    related: ['income-tax-calculator', 'hra-calculator', 'gratuity-calculator', 'epf-calculator'],
    inputs: [
      { id: 'ctc', label: 'Annual CTC', type: 'currency', default: 1200000, min: 100000 },
      { id: 'basicPct', label: 'Basic (% of CTC)', type: 'percent', default: 40, min: 20, max: 60 },
    ],
    outputs: [
      { id: 'grossMonthly', label: 'Gross monthly', format: 'currency' },
      { id: 'pf', label: 'PF deduction', format: 'currency' },
      { id: 'netMonthly', label: 'In-hand monthly', format: 'currency', highlight: true },
      { id: 'netAnnual', label: 'In-hand annual', format: 'currency' },
    ],
    faqs: [{ q: 'Why is in-hand much less than CTC?', a: 'CTC includes employer PF, gratuity provisions, insurance and other benefits you don\'t receive as cash. Employee PF and tax further reduce take-home.' }],
  },
  {
    slug: 'gratuity-calculator',
    id: 'gratuity',
    name: 'Gratuity Calculator',
    category: 'salary',
    metaTitle: 'Gratuity Calculator India (2026) — Payment of Gratuity Act',
    metaDescription:
      'Calculate gratuity amount for employees covered under the Payment of Gratuity Act. Free gratuity calculator for India.',
    h1: 'Gratuity Calculator',
    standfirst: 'Estimate gratuity payable on retirement or exit after 5+ years of service.',
    intro: 'Gratuity is a statutory benefit for employees who complete at least 5 years of continuous service. For covered establishments: Gratuity = (Basic × 15 × Years) / 26.',
    formula: 'Gratuity = (Last drawn basic × 15 × Years of service) / 26',
    howItWorks: 'Enter last drawn basic salary and years of service. Tax-free up to ₹20 lakh.',
    related: ['salary-calculator', 'epf-calculator', 'income-tax-calculator'],
    inputs: [
      { id: 'basic', label: 'Last drawn basic (monthly)', type: 'currency', default: 50000, min: 1000 },
      { id: 'years', label: 'Years of service', type: 'years', default: 10, min: 5, max: 40 },
      { id: 'covered', label: 'Covered under Act', type: 'select', default: 1, options: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },
      ]},
    ],
    outputs: [{ id: 'gratuity', label: 'Gratuity amount', format: 'currency', highlight: true }],
    faqs: [{ q: 'When is gratuity paid?', a: 'On retirement, resignation after 5 years, death or disablement. Maximum tax-free limit is ₹20 lakh.' }],
  },
  {
    slug: 'margin-calculator',
    id: 'margin',
    name: 'Margin Calculator',
    category: 'trading',
    metaTitle: 'Margin Calculator India (2026) — Trading Margin Required',
    metaDescription:
      'Calculate margin required for delivery, intraday and F&O trades in India. Free stock trading margin calculator.',
    h1: 'Margin Calculator — Trading Margin',
    standfirst: 'Estimate the margin or funds required before placing a trade.',
    intro: 'Margin is the capital blocked for a trade. Delivery requires full payment; intraday and F&O use leverage with lower margin requirements set by SEBI and exchanges.',
    howItWorks: 'Enter price, quantity and segment. Delivery uses 100%, intraday ~20%, F&O ~18% as approximate minimum margins.',
    related: ['brokerage-calculator', 'stock-average-calculator', 'lowest-brokerage-brokers-in-india'],
    inputs: [
      { id: 'price', label: 'Price per share', type: 'currency', default: 500, min: 1 },
      { id: 'qty', label: 'Quantity', type: 'number', default: 100, min: 1 },
      { id: 'segment', label: 'Segment', type: 'select', default: 1, options: [
        { value: 0, label: 'Delivery (100%)' },
        { value: 1, label: 'Intraday (~20%)' },
        { value: 2, label: 'F&O (~18%)' },
      ]},
    ],
    outputs: [
      { id: 'turnover', label: 'Trade value', format: 'currency' },
      { id: 'marginRequired', label: 'Margin required', format: 'currency', highlight: true },
    ],
    faqs: [
      { q: 'Does margin vary by broker?', a: 'Yes. Brokers may require higher margin than exchange minimums. F&O margin also depends on SPAN + exposure which varies by contract.' },
      { q: 'Compare broker margins', a: 'See our broker profiles and compare platforms on the best stock brokers page.' },
    ],
  },
  {
    slug: 'stock-average-calculator',
    id: 'stock-average',
    name: 'Stock Average Calculator',
    category: 'trading',
    metaTitle: 'Stock Average Calculator India (2026) — Average Buy Price',
    metaDescription:
      'Calculate average buy price across multiple stock purchases. Free stock average price calculator for Indian shares.',
    h1: 'Stock Average Calculator',
    standfirst: 'Find your average purchase price after buying the same stock at different prices.',
    intro: 'When you buy a stock multiple times at different prices, the average cost determines your breakeven and profit/loss on sale.',
    howItWorks: 'Enter up to three buy transactions with quantity and price. Average = total invested / total shares.',
    related: ['roi-calculator', 'xirr-calculator', 'brokerage-calculator', 'margin-calculator'],
    inputs: [
      { id: 'qty1', label: 'Buy 1 — Quantity', type: 'number', default: 50, min: 1 },
      { id: 'price1', label: 'Buy 1 — Price', type: 'currency', default: 500, min: 1 },
      { id: 'qty2', label: 'Buy 2 — Quantity', type: 'number', default: 30, min: 0 },
      { id: 'price2', label: 'Buy 2 — Price', type: 'currency', default: 450, min: 0 },
      { id: 'qty3', label: 'Buy 3 — Quantity', type: 'number', default: 20, min: 0 },
      { id: 'price3', label: 'Buy 3 — Price', type: 'currency', default: 520, min: 0 },
    ],
    outputs: [
      { id: 'totalQty', label: 'Total shares', format: 'number' },
      { id: 'averagePrice', label: 'Average buy price', format: 'currency', highlight: true },
      { id: 'totalInvested', label: 'Total invested', format: 'currency' },
    ],
    faqs: [{ q: 'Does average price include brokerage?', a: 'This calculator uses purchase prices only. Add brokerage and charges to each lot for a more accurate cost basis.' }],
  },
  {
    slug: 'xirr-calculator',
    id: 'xirr',
    name: 'XIRR Calculator',
    category: 'trading',
    metaTitle: 'XIRR Calculator India (2026) — Extended Internal Rate of Return',
    metaDescription:
      'Calculate XIRR for irregular investments and redemptions. Free XIRR calculator for mutual funds and portfolios in India.',
    h1: 'XIRR Calculator',
    standfirst: 'Calculate annualised return (XIRR) for irregular cash flows.',
    intro: 'XIRR (Extended Internal Rate of Return) handles investments and withdrawals on different dates — more accurate than CAGR for SIP portfolios with partial redemptions.',
    howItWorks: 'Enter up to 5 cash flows (negative for investment, positive for redemption) at equal monthly intervals. XIRR is computed using Newton-Raphson iteration.',
    related: ['cagr-calculator', 'roi-calculator', 'sip-calculator', 'mf-calculator'],
    inputs: [
      { id: 'flow1', label: 'Month 1 cash flow', type: 'currency', default: -10000 },
      { id: 'flow2', label: 'Month 6 cash flow', type: 'currency', default: -10000 },
      { id: 'flow3', label: 'Month 12 cash flow', type: 'currency', default: -10000 },
      { id: 'flow4', label: 'Month 18 cash flow', type: 'currency', default: -10000 },
      { id: 'flow5', label: 'Month 24 cash flow (final value)', type: 'currency', default: 55000 },
    ],
    outputs: [{ id: 'xirr', label: 'XIRR', format: 'percent', highlight: true }],
    faqs: [{ q: 'XIRR vs CAGR?', a: 'CAGR needs only start and end values. XIRR accounts for timing of each cash flow — essential for SIP portfolios with irregular investments or withdrawals.' }],
  },
  {
    slug: 'brokerage-calculator',
    id: 'brokerage',
    name: 'Brokerage Calculator',
    category: 'trading',
    metaTitle: 'Brokerage Calculator India (2026) — All Brokers Compared',
    metaDescription:
      'Calculate stock brokerage and trade costs for every major Indian broker. Compare delivery, intraday and F&O charges with statutory fees.',
    h1: 'Brokerage Calculator — All Indian Brokers',
    standfirst: 'Compare trade costs across Zerodha, Groww, Upstox, Angel One, Dhan and 12 more brokers.',
    intro: 'Our per-broker brokerage calculators estimate full round-trip costs including STT, exchange charges, GST, stamp duty and net P&L — built from each broker\'s published pricing.',
    howItWorks: 'Choose your broker from the list below. Each calculator models delivery, intraday and F&O trades with live cost breakdown.',
    related: ['margin-calculator', 'stock-average-calculator', 'lowest-brokerage-brokers-in-india'],
    inputs: [],
    outputs: [],
    external: true,
    externalPath: '/brokerage-calculators/',
    faqs: [
      { q: 'Which broker has the lowest brokerage?', a: 'Several discount brokers charge zero delivery brokerage and ₹20 per intraday/F&O order. See our lowest brokerage comparison for a data-driven ranking.' },
    ],
  },
  ...calculatorVariants,
];

/** @param {string} slug */
export function getCalculator(slug) {
  return calculators.find((c) => c.slug === slug) ?? null;
}

/** @param {string} slug */
export function calculatorPath(slug) {
  return `/calculators/${slug}/`;
}

/** @param {CalcCategory} category */
export function calculatorsByCategory(category) {
  return calculators.filter((c) => c.category === category && !c.external);
}

export function getRelatedCalculators(slug, limit = 6) {
  const calc = getCalculator(slug);
  if (!calc) return [];
  return calc.related
    .map((s) => getCalculator(s))
    .filter(Boolean)
    .slice(0, limit);
}

export function getAllCalculatorSlugs() {
  return calculators.filter((c) => !c.external).map((c) => c.slug);
}
