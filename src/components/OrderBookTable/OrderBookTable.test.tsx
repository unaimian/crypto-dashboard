import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderBookTable from './OrderBookTable';
import { ORDER_SIDE } from '@constants/app.constants';
import { Order } from 'types/stream.type';

jest.mock('@hooks/useFormatters', () => ({
  useFormatters: () => ({
    formatPrice: (value: number) => value.toFixed(2),
  }),
}));

jest.mock('../OrderSkeleton/OrderSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="order-skeleton">Loading...</div>,
}));

describe('OrderBookTable Component', () => {
  const mockOrders: Order[] = [
    { P: 45000, Q: 1.5, S: ORDER_SIDE.BUY },
    { P: 44950, Q: 2.0, S: ORDER_SIDE.BUY },
    { P: 44900, Q: 1.2, S: ORDER_SIDE.SELL },
  ];

  it('renders buy order book correctly', () => {
    render(
      <OrderBookTable
        title="Bids"
        orders={mockOrders}
        isLoading={false}
        maxQuantity={2.0}
        type={ORDER_SIDE.BUY}
      />
    );

    expect(screen.getByText('Bids')).toBeInTheDocument();
    expect(screen.getByText('45000.00')).toHaveClass('buyPrice');

    expect(screen.getByText('Depth')).toBeInTheDocument();
    expect(screen.getByText('Price (USDT)')).toBeInTheDocument();
    expect(screen.getByText('Amount (BTC)')).toBeInTheDocument();
    expect(screen.getByText('Total (USDT)')).toBeInTheDocument();
  });

  it('renders sell order book correctly', () => {
    render(
      <OrderBookTable
        title="Asks"
        orders={mockOrders}
        isLoading={false}
        maxQuantity={2.0}
        type={ORDER_SIDE.SELL}
      />
    );

    expect(screen.getByText('Asks')).toBeInTheDocument();
    expect(screen.getByText('45000.00')).toHaveClass('sellPrice');
  });

  it('shows loading skeleton when isLoading is true', () => {
    render(
      <OrderBookTable
        title="Bids"
        orders={[]}
        isLoading={true}
        maxQuantity={1}
        type={ORDER_SIDE.BUY}
      />
    );

    expect(screen.getByTestId('order-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('45000.00')).not.toBeInTheDocument();
  });

  it('renders correct number of order rows', () => {
    render(
      <OrderBookTable
        title="Bids"
        orders={mockOrders}
        isLoading={false}
        maxQuantity={2.0}
        type={ORDER_SIDE.BUY}
      />
    );

    expect(screen.getByText('45000.00')).toBeInTheDocument();
    expect(screen.getByText('44950.00')).toBeInTheDocument();
    expect(screen.getByText('44900.00')).toBeInTheDocument();

    expect(screen.getByText('1.5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1.2')).toBeInTheDocument();
  });
});
