<template>
  <div>
    <h1>Messages du WebSocket</h1>
    <ul>
        {{ messages }}
    </ul>
  </div>
</template>

<script setup>
import { useWebSocket } from '@/composables/useWsNodeRed';

const { messages, isConnected } = useWebSocket('ws://node-red.home/ws/desk-display');
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}
</style>
