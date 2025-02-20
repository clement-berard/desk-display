<template>
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
      <Clock @click="showDialogDebug = true"/>
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
</template>

<script lang="ts" setup>
import Clock from '@/components/Header/Clock.vue';
import MusicBar from '~/components/assets/icons/MusicBar.vue';
import { storeToRefs, useGlobalStore, useRadiosStore, useWsNodeRedStore } from '#imports';

const globalStore = useGlobalStore();
const radiosStore = useRadiosStore();

const { showDialogDebug } = storeToRefs(globalStore);
const { setRandomRadio } = radiosStore;

const wsNodeRedStore = useWsNodeRedStore();

const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

async function triggerRandomRadio() {
  await setRandomRadio();
}
</script>
