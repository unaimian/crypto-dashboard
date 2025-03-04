import { ORDER_SIDE } from '@constants/app.constants';

export type OrderSide = (typeof ORDER_SIDE)[keyof typeof ORDER_SIDE];

export interface Order {
  P: number; // Price
  Q: number; // Quantity
  S: OrderSide;
  timestamp?: number;
}

export interface StreamData {
  ACTION?: number;
  CCSEQ?: number;
  DELAYNS?: number;
  FSYM?: string;
  INFO?: string;
  M?: string;
  P: number;
  Q: number;
  REPORTEDNS?: number;
  SEQ?: number;
  SIDE?: number;
  TSYM?: string;
  MESSAGE?: string;
  TYPE?: string;
  PRICE?: number;
  VOLUME?: number;
  TIMESTAMP?: number;
}

export interface StreamState {
  error: string | null;
  streaming: boolean;
  isLoading: boolean;
}

export interface ProcessedOrders {
  buyOrders: Order[];
  sellOrders: Order[];
  maxBuyQuantity: number;
  maxSellQuantity: number;
}

export type StreamContextType = {
  error: string | null;
  orders: Order[];
  allOrders: Order[];
  streaming: boolean;
  toggleStreaming: () => void;
  isLoading: boolean;
};
