import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlertTable from './AlertTable';
import { describe, expect, jest, test } from '@jest/globals';
import { Alert } from 'types/alerts.type';
import { AlertType } from '@enums/alerts.enum';

jest.mock('@hooks/useFormatters', () => ({
  useFormatters: () => ({
    formatPrice: (value: number) => value,
    formatTimestamp: () => '12:30:45',
  }),
}));

describe('AlertTable', () => {
  const now = Date.now();

  const mockAlerts: Alert[] = [
    {
      alertType: AlertType.Solid,
      alertMessage: 'Solid order',
      price: 50000,
      quantity: 0.7114,
      total: 100000,
      timestamp: now,
    },
    {
      alertType: AlertType.Cheap,
      alertMessage: 'Cheap order',
      price: 49500,
      quantity: 9.6442,
      total: 74250,
      timestamp: now - 10000,
    },
  ];

  test('renders table headers correctly', () => {
    render(<AlertTable alerts={mockAlerts} />);

    expect(screen.getByText('Alert message')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Qty')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  test('displays alert messages correctly', () => {
    render(<AlertTable alerts={mockAlerts} />);

    expect(screen.getByText('Solid order')).toBeInTheDocument();
    expect(screen.getByText('Cheap order')).toBeInTheDocument();
  });

  test('displays formatted prices and quantities', () => {
    render(<AlertTable alerts={mockAlerts} />);

    expect(screen.getByText('50000')).toBeInTheDocument();
    expect(screen.getByText('49500')).toBeInTheDocument();
    expect(screen.getByText('0.7114')).toBeInTheDocument();
    expect(screen.getByText('9.6442')).toBeInTheDocument();
  });

  test('shows empty state message when no alerts', () => {
    render(<AlertTable alerts={[]} />);

    expect(
      screen.getByText('No alerts in the past minute')
    ).toBeInTheDocument();
  });

  test('applies special styling to most recent alert', () => {
    const { container } = render(<AlertTable alerts={mockAlerts} />);

    const firstRow = container.querySelector('tbody tr:first-child');
    expect(firstRow).toHaveClass('mostRecentAlert');

    const secondRow = container.querySelector('tbody tr:nth-child(2)');
    expect(secondRow).not.toHaveClass('mostRecentAlert');
  });
});
