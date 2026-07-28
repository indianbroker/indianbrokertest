import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { computeCalculator, computeGrowthScenarios, computeSip, computeYearlyProjection, formatInr } from './financeCalc.js';

describe('formatInr', () => {
  it('formats rupees', () => {
    assert.equal(formatInr(5000), '₹5,000');
  });
});

describe('computeSip', () => {
  it('computes SIP with compounded monthly rate', () => {
    const r = computeSip({ monthly: 1000, rate: 12, years: 1 });
    assert.ok(r.total > 12000);
    assert.equal(r.invested, 12000);
  });
});

describe('computeCalculator', () => {
  it('SIP calculator', () => {
    const r = computeCalculator('sip', { monthly: 5000, rate: 12, years: 10 });
    assert.ok(r.total > r.invested);
  });

  it('EMI calculator', () => {
    const r = computeCalculator('emi', { principal: 1000000, rate: 9, years: 5 });
    assert.ok(r.emi > 0);
    assert.ok(r.totalInterest > 0);
  });

  it('Income tax calculator', () => {
    const r = computeCalculator('income-tax', { income: 1200000 });
    assert.ok(r.totalTax > 0);
    assert.ok(r.netIncome < 1200000);
  });

  it('CAGR calculator', () => {
    const r = computeCalculator('cagr', { initial: 100000, final: 200000, years: 5 });
    assert.ok(r.cagr > 14 && r.cagr < 15);
  });

  it('Stock average calculator', () => {
    const r = computeCalculator('stock-average', {
      qty1: 10,
      price1: 100,
      qty2: 10,
      price2: 200,
      qty3: 0,
      price3: 0,
    });
    assert.equal(r.averagePrice, 150);
  });

  it('Flat vs reducing shows savings', () => {
    const r = computeCalculator('flat-vs-reducing', { principal: 500000, rate: 10, years: 5 });
    assert.ok(r.savings > 0);
  });

  it('yearly SIP projection returns rows', () => {
    const rows = computeYearlyProjection('sip', { monthly: 10000, rate: 12, years: 5 });
    assert.equal(rows.length, 5);
    assert.ok(rows[4].total > rows[0].total);
  });

  it('growth scenarios vary by rate', () => {
    const s = computeGrowthScenarios('sip', { monthly: 5000, rate: 12, years: 10 });
    assert.equal(s.length, 3);
    assert.ok(s[0].total > s[2].total);
  });
});
