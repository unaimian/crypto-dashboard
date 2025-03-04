import { FC, useMemo, memo } from 'react';

import { ALERT_TIME_WINDOW_MS } from '@constants/app.constants';

import { AlertTableProps } from 'types/props.type';

import styles from './AlertTable.module.css';
import AlertRow from '@components/AlertRow/AlertRow';

const TABLE_HEADERS = ['Alert message', 'Price', 'Qty', 'Total', 'Time'];

const AlertTable: FC<AlertTableProps> = ({ alerts }) => {
  const { processedAlerts, isEmpty, mostRecentId } = useMemo(() => {
    const now = Date.now();
    const filtered = [...alerts]
      .filter(({ timestamp }) => now - timestamp < ALERT_TIME_WINDOW_MS)
      .sort((a, b) => b.timestamp - a.timestamp);

    return {
      processedAlerts: filtered,
      isEmpty: filtered.length === 0,
      mostRecentId: filtered.length > 0 ? filtered[0].timestamp : null,
    };
  }, [alerts]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td colSpan={TABLE_HEADERS.length} className={styles.emptyState}>
                No alerts in the past minute
              </td>
            </tr>
          ) : (
            processedAlerts.map((alert, index) => (
              <AlertRow
                key={`${alert.timestamp}-${alert.alertType}-${index}`}
                alert={alert}
                isMostRecent={alert.timestamp === mostRecentId}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default memo(AlertTable);
