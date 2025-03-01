import { useDateFormat, useNow } from '@vueuse/core';

export function useClock(opts = { fullDayName: false }) {
  const fullDate = useDateFormat(useNow(), `${opts.fullDayName ? 'dddd' : 'ddd'} D MMM HH:mm`, { locales: 'fr' });

  return {
    fullDate,
  };
}
