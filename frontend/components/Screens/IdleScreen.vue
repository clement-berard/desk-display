<template>
  <div class="flex justify-center grayscale h-full flex-col" @click="wakeUpScreen">
    <div
      v-show="dataWsNodeRed?.sonos_player_media?.isPlaying && dataWsNodeRed?.sonos_player_media?.mediaImageUrl"
      class="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-[-1] bg-cover bg-center bg-no-repeat"
      :style="backgroundStyle"
    ></div>

    <div class="p-6 w-3/4 flex flex-col">
      <div class="text-6xl block font-normal mb-8">
        {{ fullDate }}
        <span class="text-4xl font-light">
          {{ dataWsNodeRed?.main_sensors?.sensor?.sensor_temp_balcon_temperature }}°C
        </span>
      </div>
      <template v-if="dataWsNodeRed?.sonos_player_media?.isPlaying">
        <div class="text-xl line-clamp-1 font-semibold" v-if="dataWsNodeRed?.sonos_player_media?.sourceName">
          {{ dataWsNodeRed?.sonos_player_media?.sourceName }}
        </div>
        <template v-if="dataWsNodeRed?.sonos_player_media?.showAuthorTitle">
          <div class="text-4xl line-clamp-1 font-semibold mt-2 mb-1">
            {{ dataWsNodeRed?.sonos_player_media?.mediaArtist }}
          </div>
          <div class="text-3xl line-clamp-2 font-medium">{{ dataWsNodeRed?.sonos_player_media?.mediaTitle }}</div>
        </template>
        <div class="mt-6 text-2xl italic max-w-[60%]">{{textDailyKnow}}</div>
      </template>
      <template v-else>
        <div class="text-4xl italic">{{textDailyKnow}}</div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, storeToRefs, useClock, useDisplayStore, useWsNodeRedStore } from '#imports';

const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);
const { wakeUpScreen } = useDisplayStore();

const textDailyKnow = computed(() => dataWsNodeRed.value?.main_sensors?.text_daily_know || '');

const { fullDate } = useClock({ fullDayName: true });

const backgroundStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0)),
                    url('${dataWsNodeRed?.value.sonos_player_media?.mediaImageUrl}')`,
  transition: 'width 0.8s, opacity 0.8s linear 0.8s',
}));
</script>
