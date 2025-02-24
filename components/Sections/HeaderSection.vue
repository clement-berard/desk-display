<template>
  <section class="h-[60px] w-full overflow-hidden">
    <header class="grid grid-cols-12 gap-4 bg-background px-4 py-2 h-full">
      <div class="col-span-4 h-full">
        <div class="h-full">
        <span class="font-bold text-3xl">
        {{ dataWsNodeRed?.main_sensors?.sensor?.temps_salon }} °C -
        {{ dataWsNodeRed?.main_sensors?.weather?.state_translated }}
        </span>
          <img :src="dataWsNodeRed?.main_sensors?.weather?.stateIconUrl" alt="weather-icon"
               class="w-12 inline-block -mt-3 ml-2" />
        </div>
      </div>
      <div class="col-span-4 flex justify-center h-full text-3xl">
        <span class="font-bold" @click="showDialogDebug = true">{{ fullDate }}</span>
      </div>
      <transition name="fade">
        <div class="col-span-4 flex justify-end w-full">
          <template v-if="dataWsNodeRed?.sonos_player_media?.isPlaying">
            <MusicBar class="mr-2 inline-block text-primary mt-1" width="24" height="24" />
            <div class="truncate font-bold text-3xl" @click="triggerRandomRadio">
              {{ dataWsNodeRed?.sonos_player_media?.sourceName }}
            </div>
          </template>
        </div>
      </transition>
    </header>
  </section>
</template>

<script lang="ts" setup>
import MusicBar from '~/components/assets/icons/MusicBar.vue';
import { storeToRefs, useClock, useGlobalStore, useRadios, useWsNodeRedStore } from '#imports';
const { fullDate } = useClock();
const globalStore = useGlobalStore();

const { showDialogDebug } = storeToRefs(globalStore);

const { setRandomRadio } = useRadios();

const wsNodeRedStore = useWsNodeRedStore();

const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

async function triggerRandomRadio() {
  await setRandomRadio();
}
</script>
