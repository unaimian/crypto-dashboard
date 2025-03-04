export const API_KEY =
  '9227a8972068871a010453dc7d54c97fb86197657cd90e1dfd76bcc35fc99f3d';
export const API_URL = `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`;
export const SUBSCRIPTION_TOPIC = '8~Binance~BTC~USDT';

export const ALERT_RULES = {
  CHEAP_ORDER_THRESHOLD: 50000,
  SOLID_ORDER_THRESHOLD: 10,
  BIG_BIZ_THRESHOLD: 1000000,
};

export const MAX_ORDERS = 500;
export const ALERT_TIME_WINDOW_MS = 60000;
export const DEBOUNCE_TIME_MS = 1000;
export const BASE_CURRENCY = 'USD';
export const BASE_LOCALE = 'en-US';

export const ORDER_SIDE = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

export const BATCH_UPDATE_INTERVAL_MS = 3000;
export const CLEANUP_INTERVAL_MS = 60000;
