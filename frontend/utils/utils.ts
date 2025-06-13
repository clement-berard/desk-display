import { useBrowserLocation } from '@vueuse/core';

export const getUnsplashImage = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=300&auto=format&fit=crop`;

export function getCurrentHostName(): string | undefined {
  const location = useBrowserLocation();

  return location.value.hostname;
}
