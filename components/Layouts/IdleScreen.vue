<template>
  <div class="flex items-center justify-center grayscale h-full flex-col" @click="wakeUpScreen">
    <div class="text-6xl block font-normal">{{fullDate}}</div>
    <template v-if="dataWsNodeRed?.sonos_player_media?.isPlaying && dataWsNodeRed?.sonos_player_media?.showAuthorTitle">
      <div class="text-3xl line-clamp-1 font-semibold mt-2">
        {{ dataWsNodeRed?.sonos_player_media?.mediaArtist }}
      </div>
      <div class="text-2xl line-clamp-1 font-semibold">
        {{ dataWsNodeRed?.sonos_player_media?.mediaTitle }}
      </div>
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
