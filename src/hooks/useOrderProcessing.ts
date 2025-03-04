import { useMemo } from 'react';
import { ORDER_SIDE } from '@constants/app.constants';
import { ProcessedOrders, Order } from 'types/stream.type';

export function useOrderProcessing(orders: Order[]): ProcessedOrders {
  return useMemo(() => {
    if (!orders.length) {
      return {
        buyOrders: [],
        sellOrders: [],
        maxBuyQuantity: 0,
        maxSellQuantity: 0,
      };
    }

    const buyMap = new Map<number, Order>();
    const sellMap = new Map<number, Order>();
    let maxBuyQ = 0;
    let maxSellQ = 0;

    for (const order of orders) {
      if (!order?.P || !order?.Q) continue;

      if (order.S === ORDER_SIDE.BUY) {
        buyMap.set(order.P, order);
        maxBuyQ = Math.max(maxBuyQ, order.Q);
      } else if (order.S === ORDER_SIDE.SELL) {
        sellMap.set(order.P, order);
        maxSellQ = Math.max(maxSellQ, order.Q);
      }
    }

    return {
      buyOrders: Array.from(buyMap.values()),
      sellOrders: Array.from(sellMap.values()),
      maxBuyQuantity: maxBuyQ,
      maxSellQuantity: maxSellQ,
    };
  }, [orders]);
}
