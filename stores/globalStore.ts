import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore(
  'globalStore',
  () => {
    const showDialogDebug = ref(false);
    const currentMainScreen = ref<'radios' | 'lights' | 'box'>('radios');
    const currentSideCarousel = ref<'media' | 'weather'>('media');

    return {
      currentMainScreen,
      currentSideCarousel,
      showDialogDebug,
    };
  },
  {
    persist: true,
  },
);
