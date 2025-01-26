import { useIdle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore(
  'globalStore',
  () => {
    const { idle: isIdle } = useIdle(30_000);
    const { idle: isIdleLongTime } = useIdle(60_000);
    const showDialogDebug = ref(false);
    const currentMainScreen = ref<'radios' | 'lights' | 'box'>('radios');
    const currentSideCarousel = ref<'media' | 'weather'>('media');
    const isDev = ref<boolean>(import.meta.env.DEV);

    return { showDialogDebug, currentMainScreen, currentSideCarousel, isIdle, isIdleLongTime, isDev };
  },
  {
    persist: true,
  },
);
