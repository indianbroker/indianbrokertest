import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { computeBrokerage, formatInr } from './brokerageCalc.js';
import { brokerageRules } from '../data/brokerage-rules.js';

describe('formatInr', () => {
  it('formats rupees', () => {
    assert.equal(formatInr(20), '₹20');
    assert.equal(formatInr(250), '₹250');
  });
});

describe('computeBrokerage', () => {
  it('Zerodha intraday min(20, 0.03%) on ₹1L turnover', () => {
    const r = computeBrokerage({
      rules: brokerageRules.zerodha,
      segment: 'intraday',
      qty: 100,
      price: 1000,
    });
    assert.equal(r.calculable, true);
    assert.equal(r.amount, 20);
  });

  it('Zerodha delivery is free', () => {
    const r = computeBrokerage({
      rules: brokerageRules.zerodha,
      segment: 'delivery',
      qty: 10,
      price: 500,
    });
    assert.equal(r.amount, 0);
  });

  it('Shoonya is zero across segments', () => {
    const r = computeBrokerage({
      rules: brokerageRules.shoonya,
      segment: 'fno',
      qty: 1,
      price: 100,
    });
    assert.equal(r.amount, 0);
  });

  it('Sahi delivery uses flat cap on large turnover', () => {
    const r = computeBrokerage({
      rules: brokerageRules.sahi,
      segment: 'delivery',
      qty: 100,
      price: 1000,
    });
    assert.equal(r.amount, 10);
  });

  it('Sahi delivery uses percentage on small turnover', () => {
    const r = computeBrokerage({
      rules: brokerageRules.sahi,
      segment: 'delivery',
      qty: 10,
      price: 100,
    });
    assert.equal(r.amount, 0.5);
  });

  it('Arrow F&O futures uses min rule', () => {
    const r = computeBrokerage({
      rules: brokerageRules.arrow,
      segment: 'fno',
      qty: 1,
      price: 100000,
      fnoType: 'futures',
    });
    assert.equal(r.amount, 20);
  });

  it('Arrow F&O options is flat', () => {
    const r = computeBrokerage({
      rules: brokerageRules.arrow,
      segment: 'fno',
      qty: 1,
      price: 100000,
      fnoType: 'options',
    });
    assert.equal(r.amount, 20);
  });

  it('Kotak Neo delivery unavailable on Trade Free plan', () => {
    const r = computeBrokerage({
      rules: brokerageRules['kotak-neo'],
      segment: 'delivery',
      qty: 10,
      price: 100,
      planId: 'trade-free',
    });
    assert.equal(r.calculable, false);
  });

  it('IIFL standard plan percentage delivery', () => {
    const r = computeBrokerage({
      rules: brokerageRules.iifl,
      segment: 'delivery',
      qty: 100,
      price: 1000,
      planId: 'standard',
    });
    assert.equal(r.amount, 250);
  });

  it('rejects invalid inputs', () => {
    const r = computeBrokerage({
      rules: brokerageRules.zerodha,
      segment: 'intraday',
      qty: 0,
      price: 100,
    });
    assert.equal(r.calculable, false);
  });
});
