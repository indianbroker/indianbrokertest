/**
 * Trade cost calculation from structured rules in brokerage-rules.js
 * plus statutory levies in statutory-charges.js.
 */

import {
  DP_CHARGE_GST,
  DP_CHARGE_SELL,
  exchangeTxnRates,
  GST_RATE,
  SEBI_RATE,
  stampDutyRates,
  sttRates,
} from '../data/statutory-charges.js';

/** @param {number} n */
export function formatInr(n) {
  if (!Number.isFinite(n)) return '—';
  const rounded = Math.round(n * 100) / 100;
  return `₹${rounded.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

/**
 * @param {import('../data/brokerage-rules.js').FeeRule} rule
 * @param {number} turnover qty × price
 */
export function applyRule(rule, turnover) {
  switch (rule.type) {
    case 'zero':
      return { amount: 0, formula: '₹0 (zero brokerage)' };
    case 'flat':
      return {
        amount: rule.amount,
        formula: `${formatInr(rule.amount)} flat per order`,
      };
    case 'pct_only': {
      const pctAmount = turnover * rule.pct;
      const pctLabel = (rule.pct * 100).toFixed(2).replace(/\.?0+$/, '');
      return {
        amount: pctAmount,
        formula: `${pctLabel}% × ${formatInr(turnover)} = ${formatInr(pctAmount)}`,
      };
    }
    case 'min_of_flat_and_pct': {
      const pctAmount = turnover * rule.pct;
      const amount = Math.min(rule.flat, pctAmount);
      const pctLabel = (rule.pct * 100).toFixed(2).replace(/\.?0+$/, '');
      const winner =
        amount === rule.flat
          ? `${formatInr(rule.flat)} (flat cap applies)`
          : `${pctLabel}% × ${formatInr(turnover)} = ${formatInr(pctAmount)}`;
      return {
        amount,
        formula: `min(${formatInr(rule.flat)}, ${pctLabel}% × ${formatInr(turnover)}) = ${winner}`,
      };
    }
    default:
      return { amount: null, formula: 'Not calculable' };
  }
}

/**
 * @param {Object} opts
 * @param {import('../data/brokerage-rules.js').BrokerageRules | null} opts.rules
 * @param {'delivery' | 'intraday' | 'fno'} opts.segment
 * @param {number} opts.qty
 * @param {number} opts.price
 * @param {string} [opts.planId]
 * @param {'options' | 'futures'} [opts.fnoType]
 */
export function computeBrokerage({ rules, segment, qty, price, planId, fnoType = 'options' }) {
  if (!rules || !rules.calculable) {
    return {
      calculable: false,
      amount: null,
      turnover: null,
      formula: null,
      note: rules?.note ?? 'No verified pricing rule for this broker.',
    };
  }

  if (!Number.isFinite(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
    return {
      calculable: false,
      amount: null,
      turnover: null,
      formula: null,
      note: 'Enter a valid quantity and price per share.',
    };
  }

  const turnover = qty * price;
  let feeRule = null;
  let segmentNote = null;

  if (rules.plans) {
    const pid = planId || rules.defaultPlan;
    const plan = pid ? rules.plans[pid] : null;
    if (!plan) {
      return {
        calculable: false,
        amount: null,
        turnover,
        formula: null,
        note: 'Select a pricing plan to calculate brokerage.',
      };
    }
    if (segment === 'fno' && !plan.segments?.fno) {
      return {
        calculable: false,
        amount: null,
        turnover,
        formula: null,
        note: rules.note ?? 'This plan does not publish an F&O rate we can model.',
      };
    }
    if (segment !== 'fno' && !plan.segments?.[segment]) {
      return {
        calculable: false,
        amount: null,
        turnover,
        formula: null,
        note: rules.note ?? 'This plan does not publish a rate for this segment.',
      };
    }
    feeRule = segment === 'fno' ? plan.segments.fno : plan.segments[segment];
    segmentNote = rules.note;
  } else if (segment === 'fno' && rules.fno) {
    feeRule = rules.fno[fnoType];
    if (!feeRule) {
      return {
        calculable: false,
        amount: null,
        turnover,
        formula: null,
        note: 'Select options or futures for F&O brokerage.',
      };
    }
    segmentNote = rules.note;
  } else if (rules.segments?.[segment]) {
    feeRule = rules.segments[segment];
    segmentNote = rules.note;
  }

  if (!feeRule) {
    return {
      calculable: false,
      amount: null,
      turnover,
      formula: null,
      note: 'Not calculable from published data for this segment.',
    };
  }

  const { amount, formula } = applyRule(feeRule, turnover);

  return {
    calculable: true,
    amount,
    turnover,
    formula,
    note: segmentNote ?? null,
  };
}

/** @param {number} n */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Map UI segment to brokerage-rules segment + optional F&O type.
 * @param {import('../data/statutory-charges.js').TradeSegment} tradeSegment
 */
function resolveBrokerageSegment(tradeSegment) {
  switch (tradeSegment) {
    case 'delivery':
      return { segment: 'delivery', fnoType: 'options' };
    case 'intraday':
      return { segment: 'intraday', fnoType: 'options' };
    case 'fno_futures':
      return { segment: 'fno', fnoType: 'futures' };
    case 'fno_options':
      return { segment: 'fno', fnoType: 'options' };
    default:
      return { segment: 'delivery', fnoType: 'options' };
  }
}

/**
 * Full round-trip trade estimate: brokerage + statutory charges + P&L.
 *
 * @param {Object} opts
 * @param {import('../data/brokerage-rules.js').BrokerageRules | null} opts.rules
 * @param {import('../data/statutory-charges.js').TradeSegment} opts.tradeSegment
 * @param {import('../data/statutory-charges.js').Exchange} opts.exchange
 * @param {number} opts.buyPrice
 * @param {number} opts.sellPrice
 * @param {number} opts.qty
 * @param {string} [opts.planId]
 */
export function computeTradeEstimate({
  rules,
  tradeSegment,
  exchange,
  buyPrice,
  sellPrice,
  qty,
  planId,
}) {
  if (!Number.isFinite(qty) || qty <= 0) {
    return { calculable: false, note: 'Enter a valid quantity.' };
  }
  if (!Number.isFinite(buyPrice) || buyPrice <= 0 || !Number.isFinite(sellPrice) || sellPrice <= 0) {
    return { calculable: false, note: 'Enter valid buy and sell prices.' };
  }

  const { segment, fnoType } = resolveBrokerageSegment(tradeSegment);

  const buyLeg = computeBrokerage({ rules, segment, qty, price: buyPrice, planId, fnoType });
  const sellLeg = computeBrokerage({ rules, segment, qty, price: sellPrice, planId, fnoType });

  if (!buyLeg.calculable || !sellLeg.calculable) {
    return {
      calculable: false,
      note: buyLeg.note ?? sellLeg.note ?? 'Not calculable for this segment or plan.',
      buyTurnover: qty * buyPrice,
      sellTurnover: qty * sellPrice,
    };
  }

  const buyTurnover = qty * buyPrice;
  const sellTurnover = qty * sellPrice;
  const totalTurnover = buyTurnover + sellTurnover;

  const brokerageBuy = buyLeg.amount ?? 0;
  const brokerageSell = sellLeg.amount ?? 0;
  const brokerageTotal = round2(brokerageBuy + brokerageSell);

  const sttCfg = sttRates[tradeSegment];
  const sttBuy = round2(buyTurnover * sttCfg.buy);
  const sttSell = round2(sellTurnover * sttCfg.sell);
  const sttTotal = round2(sttBuy + sttSell);

  const txnRate = exchangeTxnRates[exchange][tradeSegment];
  const exchangeBuy = round2(buyTurnover * txnRate);
  const exchangeSell = round2(sellTurnover * txnRate);
  const exchangeTotal = round2(exchangeBuy + exchangeSell);

  const sebiTotal = round2(totalTurnover * SEBI_RATE);

  const stampRate = stampDutyRates[tradeSegment];
  const stampDuty = round2(buyTurnover * stampRate);

  const gstBase = brokerageTotal + exchangeTotal + sebiTotal;
  const gst = round2(gstBase * GST_RATE);

  const dpCharge =
    tradeSegment === 'delivery' ? round2(DP_CHARGE_SELL + DP_CHARGE_GST) : 0;

  const statutoryTotal = round2(sttTotal + exchangeTotal + sebiTotal + stampDuty + gst);
  const totalCharges = round2(brokerageTotal + statutoryTotal + dpCharge);

  const grossPnl = round2((sellPrice - buyPrice) * qty);
  const netPnl = round2(grossPnl - totalCharges);
  const breakevenPoints = round2(totalCharges / qty);

  return {
    calculable: true,
    note: buyLeg.note ?? sellLeg.note ?? null,
    exchange,
    tradeSegment,
    buyPrice,
    sellPrice,
    qty,
    buyTurnover,
    sellTurnover,
    totalTurnover,
    brokerage: {
      buy: brokerageBuy,
      sell: brokerageSell,
      total: brokerageTotal,
      buyFormula: buyLeg.formula,
      sellFormula: sellLeg.formula,
    },
    stt: { buy: sttBuy, sell: sttSell, total: sttTotal },
    exchangeTxn: { buy: exchangeBuy, sell: exchangeSell, total: exchangeTotal },
    sebi: sebiTotal,
    stampDuty,
    gst,
    dpCharge,
    statutoryTotal,
    totalCharges,
    grossPnl,
    netPnl,
    breakevenPoints,
    contractNote: {
      legs: [
        {
          side: 'Buy',
          price: buyPrice,
          qty,
          turnover: buyTurnover,
          brokerage: brokerageBuy,
        },
        {
          side: 'Sell',
          price: sellPrice,
          qty,
          turnover: sellTurnover,
          brokerage: brokerageSell,
        },
      ],
      grossPnl,
      totalCharges,
      netPnl,
    },
  };
}
