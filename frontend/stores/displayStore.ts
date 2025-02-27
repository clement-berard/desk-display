import { useIdle, whenever } from '@vueuse/core';
import { callDisplayHandler } from '~/services/display/display';
import { computed, defineStore, ref, storeToRefs, useWsNodeRedStore, watch } from '#imports';

const ONE_MINUTE = 60 * 1_000;
const IDLE_TIME_SHORT = ONE_MINUTE;
const IDLE_TIME_MEDIUM = ONE_MINUTE * 2;
// const IDLE_TIME_LONG = ONE_MINUTE * 15;
const FORCE_IDLE_SCREEN = false;

export const useDisplayStore = defineStore('displayStore', () => {
  const wsNodeRedStore = useWsNodeRedStore();
  const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

  const { idle: isIdleShortTime, reset: resetIdleShortTime } = useIdle(IDLE_TIME_SHORT, {
    initialState: false,
  });
  const { idle: isIdleMiddleTime, reset: resetIdleMiddleTime } = useIdle(IDLE_TIME_MEDIUM, {
    initialState: false,
  });
  // const { idle: isIdleLongTime, reset: resetIdleLongTime } = useIdle(IDLE_TIME_LONG);
  const isScreenWakeUp = ref(true);
  const isDev = ref<boolean>(import.meta.env.DEV);

  const enableDisplayStandbyProcess = computed(
    () => !isDev.value && !dataWsNodeRed.value?.main_sensors?.desk_display_config?.prevent_standby,
  );

  const hasDeskConsumption = computed(() => dataWsNodeRed.value?.main_sensors?.sensor?.has_desk_consumption);

  function resetAllIdleTimers() {
    resetIdleShortTime();
    resetIdleMiddleTime();
    // resetIdleLongTime();
  }

  async function wakeUpScreen() {
    isScreenWakeUp.value = true;
    await callDisplayHandler('on');
  }

  whenever(isIdleMiddleTime, async () => {
    if (enableDisplayStandbyProcess.value) {
      isScreenWakeUp.value = false;
      await callDisplayHandler('low-brightness');
    }
  });

  // whenever(isIdleLongTime, async () => {
  //   if (enableDisplayStandbyProcess.value && !hasDeskConsumption.value) {
  //     await callDisplayHandler('standby');
  //   }
  // });

  const buttonResetStandby = computed(
    () => dataWsNodeRed.value?.main_sensors?.desk_display_config?.button_reset_standby,
  );

  watch(buttonResetStandby, async () => {
    wakeUpScreen();
    resetAllIdleTimers();
  });

  // watch(hasDeskConsumption, async () => {
  //   if (!hasDeskConsumption) {
  //     resetIdleLongTime();
  //   }
  // });

  const showMainScreen = computed(() => {
    return !FORCE_IDLE_SCREEN && (!enableDisplayStandbyProcess.value || isScreenWakeUp.value);
  });

  const showIdleScreen = computed(() => {
    return !showMainScreen.value;
  });

  const isLowBrightness = computed(() => {
    return (
      (enableDisplayStandbyProcess.value && isIdleShortTime.value) ||
      dataWsNodeRed.value?.main_sensors?.desk_display_config?.force_low_brightness
    );
  });

  const forceBrightnessNightShift = computed(() => {
    return dataWsNodeRed.value?.main_sensors?.desk_display_config?.force_brightness_nightshift;
  });

  return {
    showMainScreen,
    showIdleScreen,
    isLowBrightness,
    wakeUpScreen,
    forceBrightnessNightShift,
    buttonResetStandby,
  };
});
