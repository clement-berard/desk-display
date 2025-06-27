// src/services/websocket.service.ts
type WebSocketCallback = (data: any) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number;
  private isConnected = false;
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
      this.connectionCallbacks.forEach((callback) => callback(true));
    };

    this.socket.onmessage = (event) => {
      console.log('[ws_node_red] msg received:', event.data);
      const data = JSON.parse(event.data);
      this.messageCallbacks.forEach((callback) => callback(data));
    };

    this.socket.onclose = () => {
      console.log('[ws_node_red] disconnected from WebSocket');
      this.isConnected = false;
      this.connectionCallbacks.forEach((callback) => callback(false));
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('[ws_node_red] error WebSocket:', error);
      this.isConnected = false;
      this.connectionCallbacks.forEach((callback) => callback(false));
      this.handleReconnect();
    };
  }

  private handleReconnect() {
    setTimeout(() => {
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
    if (this.socket) {
      this.socket.close();
    }
  }
}
