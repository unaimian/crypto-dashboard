import { FC } from 'react';
import styles from './OrderSkeleton.module.css';
import { OrderSkeletonProps } from 'types/props.type';

const OrderSkeleton: FC<OrderSkeletonProps> = ({ count = 20 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={styles.skeletonRow}>
            <div className={styles.gridCell}>
              <div className={styles.skeleton}></div>
            </div>
            <div className={styles.gridCell}>
              <div className={styles.skeleton}></div>
            </div>
            <div className={styles.gridCell}>
              <div className={styles.skeleton}></div>
            </div>
            <div className={styles.gridCell}>
              <div className={styles.skeleton}></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default OrderSkeleton;
