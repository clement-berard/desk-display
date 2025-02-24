<template>
  <div class="flex items-center justify-center grayscale h-full flex-col" @click="wakeUpScreen">
    <div class="text-6xl block font-normal mb-8">
      {{fullDate}}
      <span class="text-4xl font-light">
        {{dataWsNodeRed?.main_sensors?.sensor?.sensor_temp_balcon_temperature}} °C
      </span>
      </div>
    <template v-if="dataWsNodeRed?.sonos_player_media?.isPlaying">
      <div class="text-xl line-clamp-1 font-semibold" v-if="dataWsNodeRed?.sonos_player_media?.sourceName">
        {{ dataWsNodeRed?.sonos_player_media?.sourceName }}
      </div>
      <template v-if="dataWsNodeRed?.sonos_player_media?.showAuthorTitle">
        <div class="text-4xl line-clamp-1 font-semibold mt-2">
          {{ dataWsNodeRed?.sonos_player_media?.mediaArtist }}
        </div>
        <div class="text-3xl line-clamp-1 font-medium">
          {{ dataWsNodeRed?.sonos_player_media?.mediaTitle }}
        </div>
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs, useClock, useDisplayStore, useWsNodeRedStore } from '#imports';
const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);
const { wakeUpScreen } = useDisplayStore();
const { fullDate } = useClock();
</script>
