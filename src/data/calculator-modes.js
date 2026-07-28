/**
 * Shared investment calculator modes (SIP / Lumpsum / Step up).
 */

import { getCalculator } from './calculators.js';

/** @type {Record<string, string>} */
export const investmentModeDefaults = {
  'sip-calculator': 'sip',
  'lumpsum-calculator': 'lumpsum',
  'step-up-sip-calculator': 'step-up-sip',
};

/** @param {string} slug */
function resolveDefaultTab(slug) {
  if (investmentModeDefaults[slug]) return investmentModeDefaults[slug];
  const calc = getCalculator(slug);
  if (!calc) return null;
  if (calc.id === 'sip') return 'sip';
  if (calc.id === 'lumpsum') return 'lumpsum';
  if (calc.id === 'step-up-sip') return 'step-up-sip';
  return null;
}

/** @type {import('./calculators.js').Calculator['inputs']} */
const sipInputs = [
  { id: 'monthly', label: 'Monthly Investment', type: 'currency', default: 10000, min: 500, max: 1000000, step: 500 },
  { id: 'rate', label: 'Expected Growth Rate', type: 'percent', default: 12, min: 1, max: 30, step: 0.1 },
  { id: 'years', label: 'Investment Duration', type: 'years', default: 10, min: 1, max: 50, step: 1 },
];

/** @type {import('./calculators.js').Calculator['outputs']} */
const sipOutputs = [
  { id: 'invested', label: 'Total Investment', format: 'currency' },
  { id: 'returns', label: 'Wealth Gained', format: 'currency' },
  { id: 'total', label: 'Total Wealth', format: 'currency', highlight: true },
];

export const mutualFundModes = {
  slugs: Object.keys(investmentModeDefaults),
  tabs: [
    {
      id: 'sip',
      label: 'SIP',
      calcId: 'sip',
      inputs: sipInputs,
      outputs: sipOutputs,
      hasScenarios: true,
      hasYearlyTable: true,
      hasChart: true,
    },
    {
      id: 'lumpsum',
      label: 'Lumpsum',
      calcId: 'lumpsum',
      inputs: [
        { id: 'amount', label: 'Investment Amount', type: 'currency', default: 100000, min: 1000, max: 100000000, step: 1000 },
        { id: 'rate', label: 'Expected Growth Rate', type: 'percent', default: 12, min: 1, max: 30, step: 0.1 },
        { id: 'years', label: 'Investment Duration', type: 'years', default: 10, min: 1, max: 50, step: 1 },
      ],
      outputs: sipOutputs,
      hasScenarios: true,
      hasYearlyTable: true,
      hasChart: true,
    },
    {
      id: 'step-up-sip',
      label: 'Step up',
      calcId: 'step-up-sip',
      inputs: [
        ...sipInputs.slice(0, 1),
        { id: 'stepUp', label: 'Yearly Step-Up', type: 'percent', default: 10, min: 0, max: 50, step: 1 },
        ...sipInputs.slice(1),
      ],
      outputs: sipOutputs,
      hasScenarios: true,
      hasYearlyTable: true,
      hasChart: true,
    },
  ],
};

/** @param {string} slug */
export function getInvestmentModeConfig(slug) {
  const defaultTab = resolveDefaultTab(slug);
  if (!defaultTab) return null;
  const calc = getCalculator(slug);
  const tabs = mutualFundModes.tabs.map((tab) => {
    if (tab.id !== defaultTab || !calc?.inputs?.length) return tab;
    return {
      ...tab,
      inputs: calc.inputs.map((input) => {
        const base = tab.inputs.find((i) => i.id === input.id);
        return base ? { ...base, ...input, label: input.label ?? base.label } : input;
      }),
      outputs: calc.outputs?.length ? calc.outputs : tab.outputs,
    };
  });
  return {
    ...mutualFundModes,
    tabs,
    defaultTab,
  };
}

/** @param {import('./calculators.js').Calculator} calc */
export function getCalculatorLayout(calc) {
  if (getInvestmentModeConfig(calc.slug)) return 'investment';
  return 'standard';
}
