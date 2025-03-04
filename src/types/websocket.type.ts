export interface WebSocketState {
  error: string | null;
  isConnected: boolean;
  isLoading: boolean;
}

export interface UseWebSocketReturn<T> {
  error: string | null;
  isConnected: boolean;
  isLoading: boolean;
  toggleConnection: (onMessage: (data: T) => void) => void;
  disconnect: () => void;
}

export type MessageHandler<T> = (data: T) => void;
