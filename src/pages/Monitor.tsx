import React, { FC } from 'react';
import { useStream } from '@contexts/StreamContext';
import { useOrderProcessing } from '@hooks/useOrderProcessing';
import { ORDER_SIDE } from '@constants/app.constants';
import OrderBookTable from '@components/OrderBookTable/OrderBookTable';

import styles from './Monitor.module.css';

const Monitor: FC = React.memo(() => {
  const { orders, isLoading } = useStream();
  const { buyOrders, sellOrders, maxBuyQuantity, maxSellQuantity } =
    useOrderProcessing(orders);

  return (
    <div className={styles.monitorContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>BTC/USDT</h1>
      </header>

      <div className={styles.orderBookContainer}>
        <OrderBookTable
          title="Buy Orders"
          orders={buyOrders}
          isLoading={isLoading}
          maxQuantity={maxBuyQuantity}
          type={ORDER_SIDE.BUY}
        />
        <OrderBookTable
          title="Sell Orders"
          orders={sellOrders}
          isLoading={isLoading}
          maxQuantity={maxSellQuantity}
          type={ORDER_SIDE.SELL}
        />
      </div>
    </div>
  );
});

export default Monitor;
