import { FC } from 'react';
import { AlertCardProps } from 'types/props.type';

import styles from './AlertCard.module.css';

const AlertCard: FC<AlertCardProps> = ({ title, count, variant }) => {
  return (
    <div className={`${styles.card} ${styles[`card-${variant}`]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={`${styles.count} ${styles[`count-${variant}`]}`}>
          {count}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
