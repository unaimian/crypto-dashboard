import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  FC,
  useRef,
} from 'react';
import { useStream } from './StreamContext';
import { ALERT_TIME_WINDOW_MS } from '@constants/app.constants';
import { useAlertUtils } from '@hooks/useAlertUtils';
import { AlertCounts } from 'types/alerts.type';
import { Order } from 'types/stream.type';
import { Alert, AlertContextType } from 'types/alerts.type';
import { AlertProviderProps } from 'types/props.type';

const AlertContextProvider = createContext<AlertContextType | undefined>(
  undefined
);
const initialCounts: AlertCounts = { cheap: 0, solid: 0, big: 0 };

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [counts, setCounts] = useState<AlertCounts>(initialCounts);
  const { allOrders } = useStream();
  const processedOrdersRef = useRef<Set<string>>(new Set());
  const { createAlertsFromOrder, updateAlertCounts, calculateTotalCounts } =
    useAlertUtils();

  const processOrder = useCallback(
    (order: Order) => {
      if (!order?.P || !order?.Q) return;

      const newAlerts = createAlertsFromOrder(order);
      if (newAlerts.length === 0) return;

      setAlerts((prevAlerts) => [...newAlerts, ...prevAlerts]);
      setCounts((prevCounts) => updateAlertCounts(prevCounts, newAlerts));
    },
    [createAlertsFromOrder, updateAlertCounts]
  );

  // Process all new orders
  useEffect(() => {
    if (!allOrders?.length) return;

    const newOrders = allOrders.filter((order) => {
      if (!order?.P || !order?.Q || !order.timestamp) return false;

      const orderKey = `${order.P}-${order.Q}-${order.timestamp}`;

      if (processedOrdersRef.current.has(orderKey)) return false;

      processedOrdersRef.current.add(orderKey);
      return true;
    });

    for (const order of newOrders) {
      processOrder(order);
    }

    if (processedOrdersRef.current.size > 1000) {
      const keysArray = Array.from(processedOrdersRef.current);
      processedOrdersRef.current = new Set(keysArray.slice(500));
    }
  }, [allOrders, processOrder]);

  // Clean up alerts
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();

      setAlerts((prevAlerts) => {
        const recentAlerts = prevAlerts.filter(
          ({ timestamp }) => now - timestamp < ALERT_TIME_WINDOW_MS
        );

        if (recentAlerts.length !== prevAlerts.length) {
          setCounts(calculateTotalCounts(recentAlerts));
          return recentAlerts;
        }
        return prevAlerts;
      });
    }, 5000);

    return () => clearInterval(cleanupInterval);
  }, [calculateTotalCounts]);

  const displayAlerts = useMemo(() => alerts, [alerts]);

  const value = useMemo(
    () => ({
      alerts: displayAlerts,
      cheapOrderCount: counts.cheap,
      solidOrderCount: counts.solid,
      bigBusinessCount: counts.big,
      processOrder,
    }),
    [displayAlerts, counts.cheap, counts.solid, counts.big, processOrder]
  );

  return (
    <AlertContextProvider.Provider value={value}>
      {children}
    </AlertContextProvider.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContextProvider);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};
