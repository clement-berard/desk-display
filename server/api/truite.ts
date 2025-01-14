// server/routes/websocket.ts
import { WebSocket } from 'ws'; // Pour se connecter à Home Assistant
import { defineWebSocketHandler } from '#imports'; // Utilisé par Nuxt pour gérer les WebSockets

export default defineWebSocketHandler({
  open(peer) {
    console.log('NIQUE TOI BIEN');
    peer.send({ user: "server", message: `Welcome ${peer}!` });
    peer.publish("chat", { user: "server", message: `${peer} joined!` });
    peer.subscribe("chat");
  },
  message(peer, message) {
    console.log('NIQUE TOI BIEN2');
    if (message.text().includes("ping")) {
      peer.send({ user: "server", message: "pong" });
    } else {
      const msg = {
        user: peer.toString(),
        message: message.toString(),
      };
      peer.send(msg); // echo
      peer.publish("chat", msg);
    }
  },
  close(peer) {
    console.log('NIQUE TOI BIEN3');
    peer.publish("chat", { user: "server", message: `${peer} left!` });
  },
});

