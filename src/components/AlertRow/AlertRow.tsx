import { FC, memo } from 'react';
import { useFormatters } from '@hooks/useFormatters';
import { AlertType } from '@enums/alerts.enum';
import { AlertRowProps } from 'types/props.type';
import styles from './AlertRow.module.css';

const ALERT_TYPE_STYLES = {
  [AlertType.Cheap]: styles.cheapOrder,
  [AlertType.Solid]: styles.solidOrder,
  [AlertType.Big]: styles.bigOrder,
};

const AlertRow: FC<AlertRowProps> = ({ alert, isMostRecent }) => {
  const { formatPrice, formatTimestamp } = useFormatters();
  const alertTypeClass = ALERT_TYPE_STYLES[alert.alertType] || '';
  const rowClassName =
    `${styles.row} ${alertTypeClass} ${isMostRecent ? styles.mostRecentAlert : ''}`.trim();

  return (
    <tr className={rowClassName}>
      <td className={styles.message}>
        <span className={`${styles.circle} ${alertTypeClass}`} />
        {alert.alertMessage}
      </td>
      <td className={styles.price}>{formatPrice(alert.price)}</td>
      <td className={styles.quantity}>{alert.quantity}</td>
      <td className={styles.total}>{formatPrice(alert.total)}</td>
      <td className={styles.time}>{formatTimestamp(alert.timestamp)}</td>
    </tr>
  );
};

export default memo(AlertRow);
