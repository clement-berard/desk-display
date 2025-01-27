// composables/useClock.ts
import { onMounted, onUnmounted, ref } from 'vue';

export function useClock() {
  const fullDate = ref('');

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('fr-FR', options);

  function updateClock() {
    const now = new Date();
    fullDate.value = formatter.format(now).replace(/,/g, '');
  }

  onMounted(() => {
    updateClock(); // Mettre à jour immédiatement lors du montage
    const interval = setInterval(updateClock, 1000);

    onUnmounted(() => {
      clearInterval(interval);
    });
  });

  return {
    fullDate,
  };
}
