// src/services/websocket.service.ts
type WebSocketCallback = (data: any) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number;
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: ok
  private isConnected = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isClosedByClient = false;
  private messageCallbacks: WebSocketCallback[] = [];
  private connectionCallbacks: ((isConnected: boolean) => void)[] = [];

  constructor(url: string, reconnectInterval = 1000) {
    this.url = url;
    this.reconnectInterval = reconnectInterval;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('[ws_node_red] connected to WebSocket');
      this.isConnected = true;
      for (const callback of this.connectionCallbacks) {
        callback(true);
      }
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      for (const callback of this.messageCallbacks) {
        callback(data);
      }
    };

    this.socket.onclose = () => {
      console.log('[ws_node_red] disconnected from WebSocket');
      this.isConnected = false;
      for (const callback of this.connectionCallbacks) {
        callback(false);
      }
      if (!this.isClosedByClient) {
        this.handleReconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error('[ws_node_red] error WebSocket:', error);
      this.isConnected = false;
      for (const callback of this.connectionCallbacks) {
        callback(false);
      }
    };
  }

  private handleReconnect() {
    if (this.reconnectTimer) {
      return;
    }

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      console.log('[ws_node_red] Retry to connect...');
      this.connect();
    }, this.reconnectInterval);
  }

  public onMessage(callback: WebSocketCallback) {
    this.messageCallbacks.push(callback);
  }

  public onConnectionChange(callback: (isConnected: boolean) => void) {
    this.connectionCallbacks.push(callback);
  }

  public close() {
    this.isClosedByClient = true;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.socket) {
      this.socket.close();
    }
  }
}
