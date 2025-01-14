<template>
  <div>
    <span>{{ hours }}</span><span class="blink">:</span><span>{{ minutes }}</span>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Clock',
  setup() {
    const hours = ref<string>(formatTime(new Date().getHours()));
    const minutes = ref<string>(formatTime(new Date().getMinutes()));

    function formatTime(time: number): string {
      return time < 10 ? `0${time}` : `${time}`;
    }

    function updateClock() {
      const now = new Date();
      hours.value = formatTime(now.getHours());
      minutes.value = formatTime(now.getMinutes());
    }

    onMounted(() => {
      const interval = setInterval(updateClock, 1000);

      onUnmounted(() => {
        clearInterval(interval);
      });
    });

    return {
      hours,
      minutes,
    };
  },
};
</script>

<style scoped>

.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
