import { useIdle, whenever } from '@vueuse/core';
import { handleLowBrightness, handleStandBy, handleWakeUp } from '~/services/display/display';
import { computed, defineStore, ref } from '#imports';

const ONE_MINUTE = 60 * 1_000;
const IDLE_TIME_SHORT = ONE_MINUTE;
const IDLE_TIME_MEDIUM = ONE_MINUTE * 2;
const IDLE_TIME_LONG = ONE_MINUTE * 15;

export const useDisplayStore = defineStore('displayStore', () => {
  const { idle: isIdleShortTime } = useIdle(IDLE_TIME_SHORT, {
    initialState: false,
  });
  const { idle: isIdleMiddleTime } = useIdle(IDLE_TIME_MEDIUM, {
    initialState: false,
  });
  const { idle: isIdleLongTime } = useIdle(IDLE_TIME_LONG);
  const isScreenWakeUp = ref(true);
  const isDev = ref<boolean>(import.meta.env.DEV);

  const enableDisplayStandbyProcess = computed(() => !isDev.value);

  async function wakeUpScreen() {
    isScreenWakeUp.value = true;
    await handleWakeUp();
  }

  if (enableDisplayStandbyProcess) {
    whenever(isIdleMiddleTime, async () => {
      isScreenWakeUp.value = false;
      await handleLowBrightness();
    });

    whenever(isIdleLongTime, async () => {
      await handleStandBy();
    });
  }

  const showMainScreen = computed(() => {
    return !enableDisplayStandbyProcess.value || isScreenWakeUp.value;
  });

  const showIdleScreen = computed(() => {
    return !showMainScreen.value;
  });

  const isLowBrightness = computed(() => {
    return enableDisplayStandbyProcess.value && isIdleShortTime.value;
  });

  return {
    showMainScreen,
    showIdleScreen,
    isLowBrightness,
    wakeUpScreen,
  };
});
