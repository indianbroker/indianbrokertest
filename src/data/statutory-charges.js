/**
 * Statutory and exchange levies for Indian markets (2026).
 * Same across SEBI-regulated brokers — sourced from exchange circulars
 * and government notifications. Rates may change; verify before trading.
 *
 * @see https://zerodha.com/charges/ (reference schedule)
 * @see NSE/BSE transaction charge circulars
 */

/** @typedef {'nse' | 'bse'} Exchange */
/** @typedef {'delivery' | 'intraday' | 'fno_futures' | 'fno_options'} TradeSegment */

/** STT rates — fraction of turnover; 0 = not applicable on that leg */
export const sttRates = {
  delivery: { buy: 0.001, sell: 0.001 },
  intraday: { buy: 0, sell: 0.00025 },
  fno_futures: { buy: 0, sell: 0.000125 },
  fno_options: { buy: 0, sell: 0.000625 },
};

/** Exchange transaction charge — fraction of leg turnover */
export const exchangeTxnRates = {
  nse: {
    delivery: 0.0000345,
    intraday: 0.0000345,
    fno_futures: 0.00002,
    fno_options: 0.0005,
  },
  bse: {
    delivery: 0.0000375,
    intraday: 0.0000375,
    fno_futures: 0.0000175,
    fno_options: 0.0005,
  },
};

/** Stamp duty on buy leg only (unified rates post Stamp Act amendment) */
export const stampDutyRates = {
  delivery: 0.00015,
  intraday: 0.00003,
  fno_futures: 0.00002,
  fno_options: 0.00003,
};

/** SEBI turnover fee — ₹10 per crore of turnover */
export const SEBI_RATE = 0.000001;

/** GST on brokerage + exchange txn + SEBI (not on STT or stamp duty) */
export const GST_RATE = 0.18;

/** Typical DP charge on equity delivery sell (depository + broker; approximate) */
export const DP_CHARGE_SELL = 15.34;
export const DP_CHARGE_GST = DP_CHARGE_SELL * GST_RATE;

export const segmentLabels = {
  delivery: 'Delivery equity',
  intraday: 'Intraday equity',
  fno_futures: 'F&O — Futures',
  fno_options: 'F&O — Options',
};
