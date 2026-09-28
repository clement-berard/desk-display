<template>
  <div class="relative flex justify-center grayscale h-full flex-col" @click="wakeUpScreen">
    <div
      v-show="mediaPlayer?.player?.isPlaying && mediaPlayer?.media?.mediaPictureFinal"
      class="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-[-1] bg-cover bg-center bg-no-repeat"
      :style="backgroundStyle"
    ></div>

    <button
      type="button"
      class="absolute bottom-[24px] right-[24px] w-[72px] h-[72px] rounded-full bg-black/80 flex items-center justify-center"
      @click.stop="toggleMute"
    >
      <VolumeX v-if="mediaPlayer?.player?.isMuted" class="w-8 h-8 text-white"></VolumeX>
      <Volume2 v-else class="w-8 h-8 text-white"></Volume2>
    </button>

    <div class="p-6 w-3/4 flex flex-col">
      <div class="text-6xl block font-normal mb-8">
        {{ fullDate }}
        <div class="text-3xl font-light">
          {{ dataWsNodeRed?.main_sensors?.sensor?.temps_salon }}°C /
          {{ dataWsNodeRed?.main_sensors?.sensor?.sensor_temp_balcon_temperature }}°C
        </div>
      </div>
      <template v-if="mediaPlayer?.player?.isPlaying">
        <div class="text-xl line-clamp-1 font-semibold" v-if="mediaPlayer?.media?.audioSourceName">
          {{ mediaPlayer?.media?.audioSourceName }}
        </div>
        <template v-if="!mediaPlayer?.media?.showOnlySourceName">
          <div class="text-4xl line-clamp-1 font-semibold mt-2 mb-1">
            {{ mediaPlayer?.media?.artist }}
          </div>
          <div class="text-3xl line-clamp-2 font-medium">{{ mediaPlayer?.media?.title }}</div>
        </template>
        <div class="mt-6 text-2xl italic max-w-[60%]">{{ textDailyKnow }}</div>
      </template>
      <template v-else> <div class="text-4xl italic">{{ textDailyKnow }}</div> </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Volume2, VolumeX } from '@lucide/vue';
import { computed, storeToRefs, useClock, useDisplayStore, useMediaPlayerStore, useWsNodeRedStore } from '#imports';
import { callMediaPlayerAction } from '~/services/media/media.services';

const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);
const { wakeUpScreen } = useDisplayStore();

const mediaPlayerStore = useMediaPlayerStore();
const { mediaPlayer } = storeToRefs(mediaPlayerStore);

const textDailyKnow = computed(() => dataWsNodeRed.value?.main_sensors?.text_daily_know || '');

function toggleMute() {
  return callMediaPlayerAction('toggle_mute');
}

const { fullDate } = useClock({ fullDayName: true });

const backgroundStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0)),
                    url('${mediaPlayer?.value?.media?.mediaPictureFinal}')`,
  transition: 'width 0.8s, opacity 0.8s linear 0.8s',
}));
</script>
