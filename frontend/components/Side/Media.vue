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
  <div class="text-center p-2 flex flex-col" :class="{'h-full': fullWidth}">
    <div>
      <img
        :src="mediaPlayer?.media?.mediaPictureFinal"
        @click="callMediaPlayerAction('toggle_mute')"
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
      </template>
    </div>
    <div v-if="mediaPlayer?.player?.isPlaying" class="flex mt-auto pt-2 gap-6 items-center justify-center">
      <Volume1 @click="callMediaPlayerAction('down')" class="h-[55px] w-[55px] cursor-pointer"></Volume1>
      <div class="relative flex items-center justify-center" style="width: 104px; height: 104px">
        <svg viewBox="0 0 104 104" class="absolute inset-0 -rotate-90" role="img">
          <title>Current volume</title>
          <circle cx="52" cy="52" r="46" stroke-width="5" fill="none" class="stroke-muted-foreground/30"></circle>
          <circle
            cx="52"
            cy="52"
            r="46"
            stroke-width="5"
            fill="none"
            stroke-linecap="round"
            class="stroke-primary"
            :stroke-dasharray="volumeRingCircumference"
            :stroke-dashoffset="volumeRingCircumference * (1 - volumeLevel)"
          ></circle>
        </svg>
        <CirclePlay
          @click="callMediaPlayerAction('play')"
          class="relative z-10 h-[85px] w-[85px] cursor-pointer"
          v-if="!mediaPlayer?.player?.isPlaying"
        ></CirclePlay>
        <CirclePause
          @click="callMediaPlayerAction('pause')"
          class="relative z-10 h-[85px] w-[85px] cursor-pointer"
          v-if="mediaPlayer?.player?.isPlaying"
        ></CirclePause>
      </div>
      <Volume2 @click="callMediaPlayerAction('up')" class="h-[55px] w-[55px] cursor-pointer"></Volume2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CirclePause, CirclePlay, Volume1, Volume2 } from '@lucide/vue';
import { computed, ref, storeToRefs, useMediaPlayerStore } from '#imports';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { callMediaPlayerAction } from '~/services/media/media.services';

const revealModalCurrentMedia = ref(false);

const { fullWidth = true } = defineProps<{
  fullWidth?: boolean;
}>();

const mediaPlayerStore = useMediaPlayerStore();
const { mediaPlayer } = storeToRefs(mediaPlayerStore);

const volumeRingCircumference = 2 * Math.PI * 46;
const volumeLevel = computed(() => mediaPlayer.value?.player?.volumeLevel ?? 0);

function setRevealModalCurrentMedia(val: boolean) {
  revealModalCurrentMedia.value = val;
}
</script>
