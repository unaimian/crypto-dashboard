import { FC } from 'react';
import { useAlerts } from '@contexts/AlertsContext';
import AlertTable from '@components/AlertTable/AlertTable';
import AlertCard from '@components/AlertCard/AlertCard';
import { AlertType } from '@enums/alerts.enum';

import styles from './Alerts.module.css';

const Alerts: FC = () => {
  const { alerts, cheapOrderCount, solidOrderCount, bigBusinessCount } =
    useAlerts();

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.title}>Alerts</h1>
      </div>

      <div className={styles.alertCardsGrid}>
        <AlertCard
          title="Cheap Orders (below $50k)"
          count={cheapOrderCount}
          variant={AlertType.Cheap}
        />
        <AlertCard
          title="Solid Orders (> 10 BTC)"
          count={solidOrderCount}
          variant={AlertType.Solid}
        />
        <AlertCard
          title="💰 Big Biznis Here (> $1M)"
          count={bigBusinessCount}
          variant={AlertType.Big}
        />
      </div>

      <div className={styles.alertTableWrapper}>
        <AlertTable alerts={alerts} />
      </div>
    </div>
  );
};

export default Alerts;
