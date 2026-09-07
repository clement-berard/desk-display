<template>
  <AlertDialog :open="revealModalCurrentMedia">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogDescription>
          <div class="text-center">
            <div class="text-xl block font-semibold mb-1">{{ mediaPlayer?.media?.artist }}</div>
            <div class="text-xl">{{ mediaPlayer?.media?.title }}</div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="setRevealModalCurrentMedia(false)">OK</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  <div class="text-center p-2" :class="{'h-full': fullWidth}">
    <img
      :src="mediaPlayer?.media?.mediaPictureFinal"
      @click="setVolume('toggle_mute')"
      alt=""
      class="w-[60%] rounded-lg mb-4 object-cover aspect-square mx-auto"
      :class="{grayscale: mediaPlayer?.player?.isMuted}"
    >
    <template v-if="mediaPlayer?.player?.isPlaying">
      <div @click="setRevealModalCurrentMedia(true)">
        <template v-if="mediaPlayer?.media?.showOnlySourceName">
          <div class="text-3xl block line-clamp-1 font-semibold">{{ mediaPlayer?.media?.audioSourceName }}</div>
        </template>
        <template v-else>
          <div class="text-3xl block line-clamp-1 font-semibold">{{ mediaPlayer?.media?.artist }}</div>
          <div class="text-2xl line-clamp-1 font-semibold">{{ mediaPlayer?.media?.title }}</div>
        </template>
      </div>
      <div class="flex mt-2 gap-6 items-center justify-center">
        <Volume1
          @click="setVolume('down')"
          v-if="mediaPlayer?.player?.isPlaying"
          class="h-[55px] w-[55px] cursor-pointer"
        ></Volume1>
        <CirclePlay
          @click="setVolume('play')"
          class="h-[85px] w-[85px] cursor-pointer"
          v-if="!mediaPlayer?.player?.isPlaying"
        ></CirclePlay>
        <CirclePause
          @click="setVolume('pause')"
          class="h-[85px] w-[85px] cursor-pointer"
          v-if="mediaPlayer?.player?.isPlaying"
        ></CirclePause>
        <Volume2
          @click="setVolume('up')"
          v-if="mediaPlayer?.player?.isPlaying"
          class="h-[55px] w-[55px] cursor-pointer"
        ></Volume2>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { CirclePause, CirclePlay, Volume1, Volume2 } from '@lucide/vue';
import { ref, storeToRefs, useMediaPlayerStore } from '#imports';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';

const revealModalCurrentMedia = ref(false);

const { fullWidth = true } = defineProps<{
  fullWidth?: boolean;
}>();

const mediaPlayerStore = useMediaPlayerStore();
const { mediaPlayer } = storeToRefs(mediaPlayerStore);

function setRevealModalCurrentMedia(val: boolean) {
  revealModalCurrentMedia.value = val;
}

async function setVolume(kind: 'up' | 'down' | 'pause' | 'play' | 'toggle_mute') {
  return $fetch('/api/node-red/desk-display-api', {
    query: {
      action: `player_action_${kind}`,
    },
  });
}
</script>
