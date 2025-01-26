<template>
  <div class="flex items-center justify-center grayscale h-full flex-col">
    <div class="text-6xl block">{{fullDate}}</div>
    <template v-if="dataWsNodeRed?.sonos_player_media?.isPlaying">
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
import { storeToRefs } from 'pinia';
import { useClock } from '~/composables/useClock';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';
const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);
const { fullDate } = useClock();
</script>
