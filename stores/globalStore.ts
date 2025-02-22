import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Panel } from '~/core/Domain/UI/Panel';

export const useGlobalStore = defineStore(
  'globalStore',
  () => {
    const showDialogDebug = ref(false);
    const currentMainScreen = ref<'radios' | 'lights' | 'box'>('radios');
    const currentSideCarousel = ref<'media' | 'weather'>('media');
    const allPanels = ref<Panel[]>([]);

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
