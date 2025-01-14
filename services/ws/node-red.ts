// src/services/websocket.service.ts
type WebSocketCallback = (data: any) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number;
  private isConnected: boolean = false;
  private messageCallbacks: WebSocketCallback[] = [];
  private connectionCallbacks: ((isConnected: boolean) => void)[] = [];

  constructor(url: string, reconnectInterval: number = 5000) {
    this.url = url;
    this.reconnectInterval = reconnectInterval;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('Connecté au WebSocket');
      this.isConnected = true;
      this.connectionCallbacks.forEach((callback) => callback(true));
    };

    this.socket.onmessage = (event) => {
      console.log('Message reçu:', event.data);
      const data = JSON.parse(event.data);
      this.messageCallbacks.forEach((callback) => callback(data));
    };

    this.socket.onclose = () => {
      console.log('Déconnecté du WebSocket');
      this.isConnected = false;
      this.connectionCallbacks.forEach((callback) => callback(false));
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('Erreur WebSocket:', error);
      this.isConnected = false;
      this.connectionCallbacks.forEach((callback) => callback(false));
      this.handleReconnect();
    };
  }

  private handleReconnect() {
    setTimeout(() => {
      console.log('Tentative de reconnexion...');
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
