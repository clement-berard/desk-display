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
          <Music class="mr-2 h-6 inline-block text-primary mt-1"/>
          <div class="truncate font-bold text-3xl">
            {{ dataWsNodeRed?.sonos_player_media?.sourceName }}
          </div>
        </template>
      </div>
    </transition>
  </header>
</template>

<script lang="ts" setup>
import Clock from '@/components/Header/Clock.vue';
import { Music } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '~/stores/globalStore';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';

const globalStore = useGlobalStore();

const { showDialogDebug } = storeToRefs(globalStore);

const wsNodeRedStore = useWsNodeRedStore();

const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);
</script>
