import { API_KEY, API_URL, SUBSCRIPTION_TOPIC } from '@constants/app.constants';
import { StreamData } from 'types/stream.type';

export const connectToStream = (
  onMessage: (data: StreamData) => void,
  onError?: (error: Event) => void,
  onSubscribeComplete?: () => void
): WebSocket => {
  const socket = new WebSocket(API_URL);

  socket.onopen = () => {
    const subscribeMessage = JSON.stringify({
      action: 'SubAdd',
      subs: [SUBSCRIPTION_TOPIC],
      api_key: API_KEY,
    });
    socket.send(subscribeMessage);
  };

  socket.onmessage = (event) => {
    try {
      const data: StreamData = JSON.parse(event.data);

      if (data.MESSAGE === 'SUBSCRIBECOMPLETE') {
        if (onSubscribeComplete) onSubscribeComplete();
        return;
      }

      if (data.MESSAGE === 'TOO_MANY_SOCKETS_MAX_1_PER_CLIENT') {
        const errorEvent = new MessageEvent('error', {
          data: {
            message: data.MESSAGE,
            info: data.INFO,
          },
          origin: event.origin,
        });

        if (onError) onError(errorEvent);
        disconnectFromStream(socket);
        return;
      }

      onMessage(data);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    if (onError) onError(error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socket;
};

export const disconnectFromStream = (socket: WebSocket | null): void => {
  if (!socket) return;

  if (socket.readyState === WebSocket.OPEN) {
    const unsubscribeMessage = JSON.stringify({
      action: 'SubRemove',
      subs: [SUBSCRIPTION_TOPIC],
    });
    socket.send(unsubscribeMessage);
    socket.close();
  }
};

export const subscribeToStreamData = (
  onMessage: (data: StreamData) => void
) => {
  return connectToStream(onMessage);
};
