import { useMemo } from 'react';
import { BASE_CURRENCY } from '@constants/app.constants';

export const useFormatters = () => {
  const formatPrice = useMemo(() => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: BASE_CURRENCY,
      maximumFractionDigits: 7,
    });
    return (price: number): string => formatter.format(price).slice(1);
  }, []);

  const formatTimestamp = useMemo(() => {
    return (timestamp: number): string => {
      return new Date(timestamp).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    };
  }, []);

  return {
    formatPrice,
    formatTimestamp,
  };
};
