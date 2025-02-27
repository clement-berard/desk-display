import { useDateFormat, useNow } from '@vueuse/core';

export function useClock() {
  const fullDate = useDateFormat(useNow(), 'ddd DD MMM HH:mm', { locales: 'fr' });

  return {
    fullDate,
  };
}
