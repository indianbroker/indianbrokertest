import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { computeBrokerage, computeTradeEstimate, formatInr } from './brokerageCalc.js';
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

describe('computeTradeEstimate', () => {
  it('Zerodha intraday round trip on NSE', () => {
    const r = computeTradeEstimate({
      rules: brokerageRules.zerodha,
      tradeSegment: 'intraday',
      exchange: 'nse',
      buyPrice: 500,
      sellPrice: 510,
      qty: 100,
    });
    assert.equal(r.calculable, true);
    assert.equal(r.brokerage.total, 30.3);
    assert.equal(r.stt.total, 12.75);
    assert.equal(r.grossPnl, 1000);
    assert.ok(r.netPnl > 900);
    assert.ok(r.breakevenPoints > 0);
  });

  it('Zerodha delivery includes DP charge', () => {
    const r = computeTradeEstimate({
      rules: brokerageRules.zerodha,
      tradeSegment: 'delivery',
      exchange: 'nse',
      buyPrice: 500,
      sellPrice: 520,
      qty: 10,
    });
    assert.equal(r.calculable, true);
    assert.equal(r.brokerage.total, 0);
    assert.ok(r.dpCharge > 0);
    assert.equal(r.stt.total, 10.2);
  });

  it('Shoonya has zero brokerage but statutory charges remain', () => {
    const r = computeTradeEstimate({
      rules: brokerageRules.shoonya,
      tradeSegment: 'intraday',
      exchange: 'nse',
      buyPrice: 100,
      sellPrice: 105,
      qty: 50,
    });
    assert.equal(r.brokerage.total, 0);
    assert.ok(r.totalCharges > 0);
  });

  it('Kotak Neo delivery unavailable on Trade Free plan', () => {
    const r = computeTradeEstimate({
      rules: brokerageRules['kotak-neo'],
      tradeSegment: 'delivery',
      exchange: 'nse',
      buyPrice: 100,
      sellPrice: 110,
      qty: 10,
      planId: 'trade-free',
    });
    assert.equal(r.calculable, false);
  });

  it('BSE exchange charges differ from NSE', () => {
    const nse = computeTradeEstimate({
      rules: brokerageRules.zerodha,
      tradeSegment: 'intraday',
      exchange: 'nse',
      buyPrice: 500,
      sellPrice: 510,
      qty: 100,
    });
    const bse = computeTradeEstimate({
      rules: brokerageRules.zerodha,
      tradeSegment: 'intraday',
      exchange: 'bse',
      buyPrice: 500,
      sellPrice: 510,
      qty: 100,
    });
    assert.notEqual(nse.exchangeTxn.total, bse.exchangeTxn.total);
  });
});
