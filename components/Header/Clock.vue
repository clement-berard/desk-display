<template>
  <div>
    <span class="font-bold">{{ fullDate }}</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
const initialNow = new Date();

const options: Intl.DateTimeFormatOptions = {
  timeZone: 'Europe/Paris',
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
};

const formatter = new Intl.DateTimeFormat('fr-FR', options);
const fullDate = ref(formatter.format(initialNow).replace(/,/g, ''));

function updateClock() {
  const now = new Date();

  fullDate.value = formatter.format(now).replace(/,/g, '');
}

onMounted(() => {
  const interval = setInterval(updateClock, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
