import { Alert } from './alerts.type';
import { AlertType } from '@enums/alerts.enum';

export interface AlertCardProps {
  title: string;
  count: number;
  variant: AlertType;
}

export interface AlertRowProps {
  alert: Alert;
  isMostRecent: boolean;
}

export interface AlertTableProps {
  alerts: Alert[];
  type?: AlertType[keyof AlertType];
  visibleAlerts?: number;
  totalAlerts?: number;
}

export interface AlertProviderProps {
  children: React.ReactNode;
}

export interface ToggleStreamingProps {
  className?: string;
}

export interface OrderSkeletonProps {
  count?: number;
}
