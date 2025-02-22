import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Panel } from '~/core/Domain/UI/Panel';
import type { Panels } from '~/core/Domain/UI/Panels';

export const useGlobalStore = defineStore(
  'globalStore',
  () => {
    const showDialogDebug = ref(false);
    const currentMainScreen = ref<string>('radios_panel');
    const currentSideCarousel = ref<'media' | 'weather'>('media');
    const allPanels = ref<Panels>();
    const currentPanel = ref<Panel>();

    return {
      currentMainScreen,
      currentSideCarousel,
      showDialogDebug,
      allPanels,
      currentPanel,
    };
  },
  {
    persist: false,
  },
);
