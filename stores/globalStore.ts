import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore(
  'globalStore',
  () => {
    const showDialogDebug = ref(false);
    const currentMainScreen = ref<'radios' | 'lights' | 'box'>('radios');

    return { showDialogDebug, currentMainScreen };
  },
  {
    persist: true,
  },
);
