import { onBeforeUnmount, onMounted, ref } from 'vue';
import { WebSocketService } from '@/services/ws/node-red';

export function useWebSocket(url: string, reconnectInterval = 5000) {
  const messages = ref<any>(null);
  const isConnected = ref(false);

  let webSocketService: WebSocketService;

  onMounted(() => {
    webSocketService = new WebSocketService(url, reconnectInterval);

    webSocketService.onMessage((data) => {
      messages.value = data;
    });

    webSocketService.onConnectionChange((connected) => {
      isConnected.value = connected;
    });
  });

  onBeforeUnmount(() => {
    webSocketService.close();
  });

  return {
    messages,
    isConnected,
  };
}
