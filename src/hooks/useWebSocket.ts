import { useState, useCallback, useRef, useEffect } from 'react';
import { connectToStream } from '@services/cryptoService';
import { DEBOUNCE_TIME_MS } from '@constants/app.constants';
import { StreamData } from 'types/stream.type';
import {
  UseWebSocketReturn,
  WebSocketState,
  MessageHandler,
} from 'types/websocket.type';

export function useWebSocket<T extends StreamData>(): UseWebSocketReturn<T> {
  const [state, setState] = useState<WebSocketState>({
    error: null,
    isConnected: false,
    isLoading: false,
  });
  const socketRef = useRef<WebSocket | null>(null);
  const lastToggleRef = useRef<number>(0);
  const onMessageCallbackRef = useRef<((data: T) => void) | null>(null);

  const updateState = useCallback((updates: Partial<WebSocketState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleError = useCallback(
    (error: Event) => {
      const messageEvent = error as MessageEvent;
      updateState({
        error:
          messageEvent.data?.info ??
          'Connection failed. Please try again later.',
        isLoading: false,
        isConnected: false,
      });
    },
    [updateState]
  );

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    updateState({
      isConnected: false,
      isLoading: false,
    });
    onMessageCallbackRef.current = null;
  }, [updateState]);

  const toggleConnection = useCallback(
    (handler: MessageHandler<T>) => {
      const now = Date.now();
      if (now - lastToggleRef.current < DEBOUNCE_TIME_MS) return;

      lastToggleRef.current = now;
      const newConnectionState = !state.isConnected;

      updateState({
        isConnected: newConnectionState,
        error: null,
      });

      if (newConnectionState) {
        updateState({ isLoading: true });

        try {
          const onSubscribeComplete = () => {
            updateState({ isLoading: false });
          };

          socketRef.current = connectToStream(
            handler as MessageHandler<StreamData>,
            handleError,
            onSubscribeComplete
          );
        } catch (err) {
          updateState({
            error: `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
            isLoading: false,
            isConnected: false,
          });
        }
      } else {
        disconnect();
      }
    },
    [state.isConnected, updateState, handleError, disconnect]
  );

  useEffect(() => {
    if (socketRef.current && state.isLoading) {
      const timeout = setTimeout(() => {
        if (
          state.isLoading &&
          socketRef.current?.readyState === WebSocket.OPEN
        ) {
          updateState({ isLoading: false });
        }
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [state.isLoading, updateState]);

  useEffect(() => {
    return disconnect;
  }, [disconnect]);

  return {
    ...state,
    toggleConnection,
    disconnect,
  };
}
