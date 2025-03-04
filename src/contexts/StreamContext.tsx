import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  FC,
  useRef,
  useEffect,
} from 'react';
import { Order, StreamContextType, StreamData } from 'types/stream.type';
import {
  ORDER_SIDE,
  MAX_ORDERS,
  BATCH_UPDATE_INTERVAL_MS,
  CLEANUP_INTERVAL_MS,
} from '@constants/app.constants';
import { useWebSocket } from '@hooks/useWebSocket';

const StreamContext = createContext<StreamContextType | undefined>(undefined);

export const StreamProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const pendingOrdersRef = useRef<Order[]>([]);
  const { error, isConnected, isLoading, toggleConnection } =
    useWebSocket<StreamData>();

  // Process incoming stream data
  const processStreamData = useCallback(({ P, Q, SIDE }: StreamData) => {
    if (typeof P !== 'number' || Q === undefined || Q <= 0) return;

    const newOrder: Order = {
      P,
      Q,
      S: SIDE === 0 ? ORDER_SIDE.BUY : ORDER_SIDE.SELL,
      timestamp: Date.now(),
    };

    pendingOrdersRef.current.push(newOrder);
  }, []);

  // Batch update orders
  useEffect(() => {
    if (!isConnected) return;

    const batchUpdateInterval = setInterval(() => {
      const pendingOrders = pendingOrdersRef.current;
      if (!pendingOrders.length) return;

      pendingOrdersRef.current = [];

      setAllOrders((prevAllOrders) => {
        return pendingOrders.length > 0
          ? [...pendingOrders, ...prevAllOrders]
          : prevAllOrders;
      });

      setOrders((prevOrders) => {
        if (pendingOrders.length === 0) return prevOrders;

        const combinedOrders = [...pendingOrders, ...prevOrders];
        return combinedOrders.length > MAX_ORDERS
          ? combinedOrders.slice(0, MAX_ORDERS)
          : combinedOrders;
      });
    }, BATCH_UPDATE_INTERVAL_MS);

    return () => clearInterval(batchUpdateInterval);
  }, [isConnected]);

  // Clean up orders periodically
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const expiryTime = Date.now() - CLEANUP_INTERVAL_MS;

      // Clean up all orders
      setAllOrders((prevAllOrders) => {
        const filteredAllOrders = prevAllOrders.filter(
          ({ timestamp }) => !!timestamp && timestamp > expiryTime
        );

        return filteredAllOrders.length === prevAllOrders.length
          ? prevAllOrders
          : filteredAllOrders;
      });

      // Clean up monitor orders
      setOrders((prevOrders) => {
        const filteredOrders = prevOrders.filter(
          ({ timestamp }) => !!timestamp && timestamp > expiryTime
        );

        return filteredOrders.length === prevOrders.length
          ? prevOrders
          : filteredOrders;
      });
    }, CLEANUP_INTERVAL_MS);

    return () => clearInterval(cleanupInterval);
  }, []);

  useEffect(() => {
    return () => {
      pendingOrdersRef.current = [];
    };
  }, []);

  const toggleStreaming = useCallback(() => {
    toggleConnection(processStreamData);
  }, [toggleConnection, processStreamData]);

  const contextValue = useMemo(
    (): StreamContextType => ({
      error,
      orders,
      allOrders,
      streaming: isConnected,
      toggleStreaming,
      isLoading,
    }),
    [error, orders, allOrders, isConnected, toggleStreaming, isLoading]
  );

  return (
    <StreamContext.Provider value={contextValue}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = (): StreamContextType => {
  const context = useContext(StreamContext);
  if (context === undefined) {
    throw new Error('useStream must be used within a StreamProvider');
  }
  return context;
};
