<template>
  <header class="grid grid-cols-12 gap-4 bg-background px-4 py-2">
    <div class="col-span-5">
      <span class="font-bold">
      {{ dataWsNodeRed["main_sensors"]?.["sensor.temps_salon"] }} °C -
      {{ dataWsNodeRed?.['main_sensors']?.["weather.state_translated"] }}
      </span>
    </div>
    <div class="col-span-2 text-center">
      <Clock @click="showDialogDebug = true" />
    </div>
    <transition name="fade">
      <div class="col-span-5 flex items-center justify-end w-full">
        <template v-if="dataWsNodeRed?.sonos_player_media?.isPlaying">
          <Music class="pr-2 h-4 inline-block animate-bounce text-primary" />
          <div class="truncate font-bold">
            {{dataWsNodeRed?.sonos_player_media?.sourceName}}
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
