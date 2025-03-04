import { FC } from 'react';
import OrderSkeleton from '../OrderSkeleton/OrderSkeleton';
import { useFormatters } from '@hooks/useFormatters';
import { ORDER_SIDE } from '@constants/app.constants';
import { Order, OrderSide } from 'types/stream.type';

import styles from './OrderBookTable.module.css';

interface OrderBookTableProps {
  title: string;
  orders: Order[];
  isLoading: boolean;
  maxQuantity: number;
  type: OrderSide;
}

const OrderBookTable: FC<OrderBookTableProps> = ({
  title,
  orders,
  isLoading,
  maxQuantity,
  type,
}) => {
  const { formatPrice } = useFormatters();
  const depthBarClass =
    type === ORDER_SIDE.BUY ? styles.depthBarBuy : styles.depthBarSell;
  const priceClass =
    type === ORDER_SIDE.BUY ? styles.buyPrice : styles.sellPrice;

  return (
    <div className={styles.column}>
      <h3 className={`${styles.columnTitle} ${styles[`columnTitle-${type}`]}`}>
        {title}
      </h3>
      <div className={styles.header}>
        <div>Depth</div>
        <div>Price (USDT)</div>
        <div>Amount (BTC)</div>
        <div>Total (USDT)</div>
      </div>
      <div className={styles.gridBody}>
        {isLoading ? (
          <OrderSkeleton />
        ) : (
          orders.map((order, index) => (
            <div key={`${type}-${index}`} className={styles.gridRow}>
              <div className={styles.depthCell}>
                <div
                  className={depthBarClass}
                  style={{ width: `${(order.Q / maxQuantity) * 100}%` }}
                />
              </div>
              <div className={styles.gridCell}>
                <span className={priceClass}>{formatPrice(order.P)}</span>
              </div>
              <div className={styles.gridCell}>{order.Q}</div>
              <div className={styles.gridCell}>
                {formatPrice(order.P * order.Q)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderBookTable;
