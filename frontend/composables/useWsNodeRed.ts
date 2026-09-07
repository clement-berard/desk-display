import { onBeforeUnmount, onMounted, ref } from 'vue';
import { WebSocketService } from '~/services/ws/node-red-ws.services';

type SharedConnection = {
  service: WebSocketService;
  refCount: number;
};

const connections = new Map<string, SharedConnection>();

export function useWebSocket(url: string, reconnectInterval = 5000) {
  const messages = ref<any>(null);
  const isConnected = ref(false);

  onMounted(() => {
    let connection = connections.get(url);

    if (!connection) {
      connection = { service: new WebSocketService(url, reconnectInterval), refCount: 0 };
      connections.set(url, connection);
    }

    connection.refCount++;

    connection.service.onMessage((data) => {
      messages.value = data;
    });

    connection.service.onConnectionChange((connected) => {
      isConnected.value = connected;
    });

    onBeforeUnmount(() => {
      connection.refCount--;

      if (connection.refCount <= 0) {
        connection.service.close();
        connections.delete(url);
      }
    });
  });

  return {
    messages,
    isConnected,
  };
}
