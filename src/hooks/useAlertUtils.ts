import { useMemo } from 'react';
import { AlertType } from '@enums/alerts.enum';
import { ALERT_RULES } from '@constants/app.constants';
import { Order } from 'types/stream.type';
import { Alert, AlertCounts, AlertRule } from 'types/alerts.type';

export const useAlertUtils = () => {
  const alertRules = useMemo<AlertRule[]>(
    () => [
      {
        check: (price) => price < ALERT_RULES.CHEAP_ORDER_THRESHOLD,
        createAlert: (price, quantity, total, timestamp) => ({
          alertMessage: `Cheap order`,
          alertType: AlertType.Cheap,
          price,
          quantity,
          total,
          timestamp,
        }),
      },
      {
        check: (_, quantity) => quantity > ALERT_RULES.SOLID_ORDER_THRESHOLD,
        createAlert: (price, quantity, total, timestamp) => ({
          alertMessage: `Solid order`,
          alertType: AlertType.Solid,
          price,
          quantity,
          total,
          timestamp,
        }),
      },
      {
        check: (_, __, total) => total > ALERT_RULES.BIG_BIZ_THRESHOLD,
        createAlert: (price, quantity, total, timestamp) => ({
          alertMessage: `💰💰💰 Big biznis here 💰💰💰`,
          alertType: AlertType.Big,
          price,
          quantity,
          total,
          timestamp,
        }),
      },
    ],
    []
  );

  const createAlertsFromOrder = useMemo(
    () =>
      (order: Order): Alert[] => {
        const { P: price, Q: quantity } = order;
        const total = price * quantity;
        const timestamp = order.timestamp || Date.now();

        return alertRules
          .filter((rule) => rule.check(price, quantity, total))
          .map((rule) => {
            const alertTimestamp = timestamp + Math.random() * 10;
            return rule.createAlert(price, quantity, total, alertTimestamp);
          });
      },
    [alertRules]
  );

  const updateAlertCounts = useMemo(
    () =>
      (prevCounts: AlertCounts, newAlerts: Alert[]): AlertCounts => {
        const counts = { ...prevCounts };

        for (const alert of newAlerts) {
          const type = alert.alertType.toLowerCase() as keyof AlertCounts;
          if (type in counts) {
            counts[type]++;
          }
        }

        return counts;
      },
    []
  );

  const calculateTotalCounts = useMemo(
    () =>
      (alerts: Alert[]): AlertCounts => {
        const counts: AlertCounts = { cheap: 0, solid: 0, big: 0 };

        for (const alert of alerts) {
          const type = alert.alertType.toLowerCase() as keyof AlertCounts;
          if (type in counts) {
            counts[type]++;
          }
        }

        return counts;
      },
    []
  );

  return {
    createAlertsFromOrder,
    updateAlertCounts,
    calculateTotalCounts,
  };
};
