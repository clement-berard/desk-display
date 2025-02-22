import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Panels } from '~/core/Domain/UI/Panels';

export const useGlobalStore = defineStore(
  'globalStore',
  () => {
    const showDialogDebug = ref(false);
    const currentMainScreen = ref<'radios' | 'lights' | 'box'>('radios');
    const currentSideCarousel = ref<'media' | 'weather'>('media');
    const allPanels = ref<Panels>();

    return {
      currentMainScreen,
      currentSideCarousel,
      showDialogDebug,
      allPanels,
    };
  },
  {
    persist: false,
  },
);
