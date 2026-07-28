/**
 * Pure financial calculator functions for Indian personal finance tools.
 */

/** @param {number} n */
export function formatInr(n) {
  if (!Number.isFinite(n)) return '—';
  const rounded = Math.round(n * 100) / 100;
  return `₹${rounded.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

/** @param {number} n */
export function formatInrCompact(n) {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  const sign = n < 0 ? '−' : '';
  if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(2)} L`;
  if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(1)} K`;
  return formatInr(n);
}

/** @param {number} n */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/** Annual % → effective monthly rate (compounded) */
function monthlyRate(annualPct) {
  return (1 + annualPct / 100) ** (1 / 12) - 1;
}

/** @param {number} annualPct @param {number} years */
function sipFutureValue(monthly, annualPct, years) {
  const r = monthlyRate(annualPct);
  const n = years * 12;
  if (n <= 0) return 0;
  if (r === 0) return monthly * n;
  return monthly * (((1 + r) ** n - 1) / r) * (1 + r);
}

/** @param {Record<string, number>} i */
export function computeSip(i) {
  const monthly = i.monthly ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const invested = monthly * years * 12;
  const total = sipFutureValue(monthly, rate, years);
  return {
    invested: round2(invested),
    returns: round2(total - invested),
    total: round2(total),
  };
}

/** @param {Record<string, number>} i */
export function computeLumpsum(i) {
  const amount = i.amount ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const r = rate / 100;
  const total = amount * (1 + r) ** years;
  return {
    invested: round2(amount),
    returns: round2(total - amount),
    total: round2(total),
  };
}

/** @param {Record<string, number>} i */
export function computeStepUpSip(i) {
  const monthly = i.monthly ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const stepUp = i.stepUp ?? 0;
  const r = monthlyRate(rate);
  let balance = 0;
  let invested = 0;
  let payment = monthly;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + payment;
      invested += payment;
    }
    payment *= 1 + stepUp / 100;
  }
  return {
    invested: round2(invested),
    returns: round2(balance - invested),
    total: round2(balance),
  };
}

/** @param {Record<string, number>} i */
export function computeSwp(i) {
  const corpus = i.corpus ?? 0;
  const withdrawal = i.withdrawal ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const r = monthlyRate(rate);
  let balance = corpus;
  let totalWithdrawn = 0;
  const months = years * 12;
  for (let m = 0; m < months; m++) {
    balance = balance * (1 + r);
    if (withdrawal > balance) break;
    balance -= withdrawal;
    totalWithdrawn += withdrawal;
  }
  return {
    corpus: round2(corpus),
    withdrawn: round2(totalWithdrawn),
    remaining: round2(balance),
  };
}

/** @param {Record<string, number>} i */
export function computeMf(i) {
  return computeLumpsum(i);
}

/** @param {Record<string, number>} i */
export function computeFd(i) {
  const amount = i.amount ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const r = rate / 100;
  const total = amount * (1 + r / 4) ** (4 * years);
  return {
    invested: round2(amount),
    interest: round2(total - amount),
    total: round2(total),
  };
}

/** @param {Record<string, number>} i */
export function computeRd(i) {
  const monthly = i.monthly ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const r = rate / 400;
  const n = years * 12;
  let total = 0;
  for (let k = 1; k <= n; k++) {
    total += monthly * (1 + r) ** (n - k + 1);
  }
  const invested = monthly * n;
  return {
    invested: round2(invested),
    interest: round2(total - invested),
    total: round2(total),
  };
}

/** @param {Record<string, number>} i */
export function computePpf(i) {
  const yearly = i.yearly ?? 0;
  const rate = i.rate ?? 7.1;
  const years = i.years ?? 15;
  const r = rate / 100;
  let balance = 0;
  let invested = 0;
  for (let y = 0; y < years; y++) {
    balance = (balance + yearly) * (1 + r);
    invested += yearly;
  }
  return {
    invested: round2(invested),
    interest: round2(balance - invested),
    total: round2(balance),
  };
}

/** @param {Record<string, number>} i */
export function computeSsy(i) {
  const yearly = i.yearly ?? 0;
  const rate = i.rate ?? 8.2;
  const depositYears = 15;
  const maturityYears = 21;
  const r = rate / 100;
  let balance = 0;
  let invested = 0;
  for (let y = 0; y < maturityYears; y++) {
    if (y < depositYears) {
      balance += yearly;
      invested += yearly;
    }
    balance *= 1 + r;
  }
  return {
    invested: round2(invested),
    interest: round2(balance - invested),
    total: round2(balance),
  };
}

/** @param {Record<string, number>} i */
export function computeNsc(i) {
  const amount = i.amount ?? 0;
  const rate = i.rate ?? 7.7;
  const years = i.years ?? 5;
  const r = rate / 100;
  const total = amount * (1 + r) ** years;
  return {
    invested: round2(amount),
    interest: round2(total - amount),
    total: round2(total),
  };
}

/** @param {Record<string, number>} i */
export function computeScss(i) {
  return computeFd(i);
}

/** @param {Record<string, number>} i */
export function computePostOfficeMis(i) {
  const amount = i.amount ?? 0;
  const rate = i.rate ?? 7.4;
  const years = i.years ?? 5;
  const monthlyIncome = (amount * (rate / 100)) / 12;
  return {
    invested: round2(amount),
    monthlyIncome: round2(monthlyIncome),
    totalInterest: round2(monthlyIncome * 12 * years),
  };
}

/** @param {Record<string, number>} i */
export function computeEpf(i) {
  const basic = i.basic ?? 0;
  const years = i.years ?? 0;
  const rate = i.rate ?? 8.25;
  const r = monthlyRate(rate);
  const employee = basic * 0.12;
  const employer = basic * 0.0367;
  const monthly = employee + employer;
  const n = years * 12;
  let balance = 0;
  for (let m = 0; m < n; m++) {
    balance = balance * (1 + r) + monthly;
  }
  const invested = monthly * n;
  return {
    invested: round2(invested),
    returns: round2(balance - invested),
    total: round2(balance),
  };
}

/** @param {Record<string, number>} i */
export function computeNps(i) {
  const monthly = i.monthly ?? 0;
  const rate = i.rate ?? 10;
  const years = i.years ?? 0;
  const currentAge = i.currentAge ?? 30;
  const retirementAge = 60;
  const yearsToRetire = Math.max(retirementAge - currentAge, years);
  const result = computeSip({ monthly, rate, years: yearsToRetire });
  const annuityYears = 20;
  const annuityRate = 6;
  const monthlyPension =
    (result.total * (annuityRate / 100 / 12)) /
    (1 - (1 + annuityRate / 100 / 12) ** (-annuityYears * 12));
  return {
    ...result,
    monthlyPension: round2(monthlyPension || 0),
    corpusAtRetirement: result.total,
  };
}

/** @param {Record<string, number>} i */
export function computeApy(i) {
  const age = i.age ?? 18;
  const monthly = i.monthly ?? 0;
  const years = Math.max(60 - age, 1);
  const invested = monthly * 12 * years;
  const pension = i.pension ?? 1000;
  const corpusNeeded = pension * 12 * 20;
  return {
    invested: round2(invested),
    monthlyPension: round2(pension),
    years,
    corpusNeeded: round2(corpusNeeded),
  };
}

/** @param {Record<string, number>} i */
export function computeRetirement(i) {
  const monthlyExpense = i.monthlyExpense ?? 0;
  const inflation = i.inflation ?? 6;
  const yearsToRetire = i.yearsToRetire ?? 20;
  const yearsInRetirement = i.yearsInRetirement ?? 25;
  const returnRate = i.returnRate ?? 10;
  const futureExpense = monthlyExpense * (1 + inflation / 100) ** yearsToRetire;
  const r = monthlyRate(returnRate);
  const n = yearsInRetirement * 12;
  const corpus =
    r === 0 ? futureExpense * n : (futureExpense * (1 - (1 + r) ** -n)) / r;
  const sipNeeded = computeSip({ monthly: 1, rate: returnRate, years: yearsToRetire }).total;
  const monthlySip = sipNeeded > 0 ? corpus / sipNeeded : 0;
  return {
    futureExpense: round2(futureExpense),
    corpusNeeded: round2(corpus),
    monthlySip: round2(monthlySip),
  };
}

/** @param {Record<string, number>} i */
export function computeEmi(i) {
  const principal = i.principal ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const r = rate / 100 / 12;
  const n = years * 12;
  const emi = r === 0 ? principal / n : (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  const total = emi * n;
  return {
    emi: round2(emi),
    totalPayment: round2(total),
    totalInterest: round2(total - principal),
  };
}

/** @param {Record<string, number>} i */
export function computeFlatVsReducing(i) {
  const principal = i.principal ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const reducing = computeEmi(i);
  const flatInterest = principal * (rate / 100) * years;
  const flatTotal = principal + flatInterest;
  const flatEmi = flatTotal / (years * 12);
  return {
    reducingEmi: reducing.emi,
    flatEmi: round2(flatEmi),
    reducingInterest: reducing.totalInterest,
    flatInterest: round2(flatInterest),
    savings: round2(flatTotal - reducing.totalPayment),
  };
}

/** @param {Record<string, number>} i */
export function computeSimpleInterest(i) {
  const principal = i.principal ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const interest = (principal * rate * years) / 100;
  return {
    principal: round2(principal),
    interest: round2(interest),
    total: round2(principal + interest),
  };
}

/** @param {Record<string, number>} i */
export function computeCompoundInterest(i) {
  const principal = i.principal ?? 0;
  const rate = i.rate ?? 0;
  const years = i.years ?? 0;
  const frequency = i.frequency ?? 1;
  const total = principal * (1 + rate / 100 / frequency) ** (frequency * years);
  return {
    principal: round2(principal),
    interest: round2(total - principal),
    total: round2(total),
  };
}

/** @param {Record<string, number>} i */
export function computeCagr(i) {
  const initial = i.initial ?? 0;
  const final = i.final ?? 0;
  const years = i.years ?? 0;
  const cagr = years > 0 && initial > 0 ? ((final / initial) ** (1 / years) - 1) * 100 : 0;
  return { cagr: round2(cagr) };
}

/** @param {Record<string, number>} i */
export function computeRoi(i) {
  const invested = i.invested ?? 0;
  const returned = i.returned ?? 0;
  const roi = invested > 0 ? ((returned - invested) / invested) * 100 : 0;
  return {
    roi: round2(roi),
    gain: round2(returned - invested),
  };
}

/** @param {Record<string, number>} i */
export function computeInflation(i) {
  const amount = i.amount ?? 0;
  const inflation = i.inflation ?? 6;
  const years = i.years ?? 0;
  const future = amount * (1 + inflation / 100) ** years;
  const purchasingPower = amount / (1 + inflation / 100) ** years;
  return {
    futureCost: round2(future),
    purchasingPower: round2(purchasingPower),
  };
}

/** @param {Record<string, number>} i */
export function computeGst(i) {
  const amount = i.amount ?? 0;
  const rate = i.rate ?? 18;
  const gst = (amount * rate) / 100;
  return {
    base: round2(amount),
    gst: round2(gst),
    total: round2(amount + gst),
  };
}

/** @param {Record<string, number>} i */
export function computeTds(i) {
  const amount = i.amount ?? 0;
  const rate = i.rate ?? 10;
  const tds = (amount * rate) / 100;
  return {
    gross: round2(amount),
    tds: round2(tds),
    net: round2(amount - tds),
  };
}

/** New regime FY 2025-26 simplified slabs */
/** @param {Record<string, number>} i */
export function computeIncomeTax(i) {
  const income = i.income ?? 0;
  const deduction = 75000;
  const taxable = Math.max(income - deduction, 0);
  const slabs = [
    [400000, 0],
    [800000, 0.05],
    [1200000, 0.1],
    [1600000, 0.15],
    [2000000, 0.2],
    [2400000, 0.25],
    [Infinity, 0.3],
  ];
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxable <= prev) break;
    const slice = Math.min(taxable, limit) - prev;
    if (slice > 0) tax += slice * rate;
    prev = limit;
  }
  const cess = tax * 0.04;
  return {
    taxable: round2(taxable),
    tax: round2(tax),
    cess: round2(cess),
    totalTax: round2(tax + cess),
    netIncome: round2(income - tax - cess),
  };
}

/** @param {Record<string, number>} i */
export function computeHra(i) {
  const basic = i.basic ?? 0;
  const hra = i.hra ?? 0;
  const rent = i.rent ?? 0;
  const metro = i.metro ?? 1;
  const a = hra;
  const b = rent - basic * 0.1;
  const c = basic * (metro ? 0.5 : 0.4);
  const exempt = Math.max(0, Math.min(a, b, c));
  return {
    hraReceived: round2(hra),
    exempt: round2(exempt),
    taxable: round2(hra - exempt),
  };
}

/** @param {Record<string, number>} i */
export function computeGratuity(i) {
  const basic = i.basic ?? 0;
  const years = i.years ?? 0;
  const covered = i.covered ?? 1;
  const amount = covered
    ? (basic * 15 * years) / 26
    : (basic * years * 15) / 26;
  return { gratuity: round2(amount) };
}

/** @param {Record<string, number>} i */
export function computeSalary(i) {
  const ctc = i.ctc ?? 0;
  const basicPct = i.basicPct ?? 40;
  const hraPct = i.hraPct ?? 40;
  const pfPct = 12;
  const basic = (ctc * basicPct) / 100 / 12;
  const hra = (basic * hraPct) / 100;
  const pf = basic * (pfPct / 100) * 2;
  const gross = ctc / 12;
  const tax = gross * 0.05;
  const net = gross - pf - tax;
  return {
    grossMonthly: round2(gross),
    pf: round2(pf),
    tax: round2(tax),
    netMonthly: round2(net),
    netAnnual: round2(net * 12),
  };
}

/** @param {Record<string, number>} i */
export function computeMargin(i) {
  const price = i.price ?? 0;
  const qty = i.qty ?? 0;
  const segment = i.segment ?? 0;
  const turnover = price * qty;
  const pct = segment === 0 ? 1 : segment === 1 ? 0.2 : 0.18;
  return {
    turnover: round2(turnover),
    marginRequired: round2(turnover * pct),
    marginPct: pct * 100,
  };
}

/** @param {Record<string, number>} i */
export function computeStockAverage(i) {
  const lots = [
    { qty: i.qty1 ?? 0, price: i.price1 ?? 0 },
    { qty: i.qty2 ?? 0, price: i.price2 ?? 0 },
    { qty: i.qty3 ?? 0, price: i.price3 ?? 0 },
  ].filter((l) => l.qty > 0 && l.price > 0);
  const totalQty = lots.reduce((s, l) => s + l.qty, 0);
  const totalValue = lots.reduce((s, l) => s + l.qty * l.price, 0);
  return {
    totalQty: round2(totalQty),
    averagePrice: totalQty > 0 ? round2(totalValue / totalQty) : 0,
    totalInvested: round2(totalValue),
  };
}

/** Newton-Raphson XIRR for equal monthly intervals */
/** @param {Record<string, number>} i */
export function computeXirr(i) {
  const flows = [
    i.flow1 ?? 0,
    i.flow2 ?? 0,
    i.flow3 ?? 0,
    i.flow4 ?? 0,
    i.flow5 ?? 0,
  ];
  const nonZero = flows.filter((f) => f !== 0);
  if (nonZero.length < 2) return { xirr: 0 };
  let rate = 0.1;
  for (let iter = 0; iter < 50; iter++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < flows.length; t++) {
      const factor = (1 + rate) ** t;
      npv += flows[t] / factor;
      dnpv -= (t * flows[t]) / (factor * (1 + rate));
    }
    if (Math.abs(dnpv) < 1e-10) break;
    const next = rate - npv / dnpv;
    if (Math.abs(next - rate) < 1e-7) {
      rate = next;
      break;
    }
    rate = next;
  }
  return { xirr: round2(rate * 100) };
}

/** @type {Record<string, (i: Record<string, number>) => Record<string, number>>} */
export const computeFunctions = {
  sip: computeSip,
  lumpsum: computeLumpsum,
  'step-up-sip': computeStepUpSip,
  swp: computeSwp,
  mf: computeMf,
  fd: computeFd,
  rd: computeRd,
  ppf: computePpf,
  ssy: computeSsy,
  nsc: computeNsc,
  scss: computeScss,
  'post-office-mis': computePostOfficeMis,
  epf: computeEpf,
  nps: computeNps,
  apy: computeApy,
  retirement: computeRetirement,
  emi: computeEmi,
  'home-loan-emi': computeEmi,
  'car-loan-emi': computeEmi,
  'flat-vs-reducing': computeFlatVsReducing,
  'simple-interest': computeSimpleInterest,
  'compound-interest': computeCompoundInterest,
  cagr: computeCagr,
  roi: computeRoi,
  inflation: computeInflation,
  gst: computeGst,
  tds: computeTds,
  'income-tax': computeIncomeTax,
  hra: computeHra,
  gratuity: computeGratuity,
  salary: computeSalary,
  margin: computeMargin,
  'stock-average': computeStockAverage,
  xirr: computeXirr,
};

/** @param {string} calcId @param {Record<string, number>} inputs */
export function computeYearlyProjection(calcId, inputs) {
  const years = Math.min(Math.max(Math.floor(inputs.years ?? 0), 1), 40);
  const startYear = new Date().getFullYear();

  if (calcId === 'sip') {
    const monthly = inputs.monthly ?? 0;
    const rate = inputs.rate ?? 0;
    const r = monthlyRate(rate);
    let balance = 0;
    let invested = 0;
    const rows = [];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + r) + monthly;
        invested += monthly;
      }
      rows.push({
        year: startYear + y,
        invested: round2(invested),
        returns: round2(balance - invested),
        total: round2(balance),
      });
    }
    return rows;
  }

  if (calcId === 'lumpsum') {
    const amount = inputs.amount ?? 0;
    const rate = inputs.rate ?? 0;
    const r = rate / 100;
    const rows = [];
    for (let y = 1; y <= years; y++) {
      const total = amount * (1 + r) ** y;
      rows.push({
        year: startYear + y,
        invested: round2(amount),
        returns: round2(total - amount),
        total: round2(total),
      });
    }
    return rows;
  }

  if (calcId === 'step-up-sip') {
    const monthly = inputs.monthly ?? 0;
    const rate = inputs.rate ?? 0;
    const stepUp = inputs.stepUp ?? 0;
    const r = monthlyRate(rate);
    let balance = 0;
    let invested = 0;
    let payment = monthly;
    const rows = [];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + r) + payment;
        invested += payment;
      }
      rows.push({
        year: startYear + y,
        invested: round2(invested),
        returns: round2(balance - invested),
        total: round2(balance),
      });
      payment *= 1 + stepUp / 100;
    }
    return rows;
  }

  return [];
}

/** @param {string} calcId @param {Record<string, number>} inputs */
export function computeGrowthScenarios(calcId, inputs) {
  const baseRate = inputs.rate ?? 12;
  const offsets = [
    { key: 'above', label: 'Above Average', offset: 2 },
    { key: 'average', label: 'Average', offset: 0, active: true },
    { key: 'below', label: 'Below Average', offset: -2 },
  ];
  return offsets.map(({ key, label, offset, active }) => {
    const rate = Math.max(baseRate + offset, 0.5);
    const result = computeCalculator(calcId, { ...inputs, rate });
    return {
      key,
      label,
      rate,
      total: result?.total ?? result?.corpusAtRetirement ?? 0,
      active: Boolean(active),
    };
  });
}

/** @param {string} id @param {Record<string, number>} inputs */
export function computeCalculator(id, inputs) {
  const fn = computeFunctions[id];
  if (!fn) return null;
  return fn(inputs);
}
