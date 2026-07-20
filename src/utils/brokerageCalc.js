/**
 * Pure brokerage calculation from structured rules in brokerage-rules.js.
 * Brokerage only — statutory charges (STT, exchange, GST, stamp duty) excluded.
 */

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
