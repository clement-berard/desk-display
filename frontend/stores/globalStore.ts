import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Panel } from '~/core/Domain/UI/Panel';
import type { Panels } from '~/core/Domain/UI/Panels';

export const useGlobalStore = defineStore(
  'globalStore',
  () => {
    const allPanels = ref<Panels>();
    const currentPanel = ref<Panel>();
    const currentSideCarousel = ref<'media' | 'weather'>('media');
    const showDialogDebug = ref(false);

    return {
      allPanels,
      currentPanel,
      currentSideCarousel,
      showDialogDebug,
    };
  },
  {
    persist: false,
  },
);
