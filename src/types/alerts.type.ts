import { AlertType } from '@enums/alerts.enum';
import { Order } from './stream.type';

export interface Alert {
  alertType: AlertType;
  alertMessage: string;
  price: number;
  quantity: number;
  total: number;
  timestamp: number;
}

export interface AlertCounts {
  cheap: number;
  solid: number;
  big: number;
}

export interface AlertContextType {
  alerts: Alert[];
  cheapOrderCount: number;
  solidOrderCount: number;
  bigBusinessCount: number;
  processOrder: (order: Order) => void;
}

export interface AlertRule {
  check: (price: number, quantity: number, total: number) => boolean;
  createAlert: (
    price: number,
    quantity: number,
    total: number,
    timestamp: number
  ) => Alert;
}
