<template>
  <AlertDialog :open="revealModalCurrentMedia">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogDescription>
          <div class="text-center">
            <div class="text-xl block font-semibold mb-1">
              {{ dataWsNodeRed?.sonos_player_media?.mediaArtist }}
            </div>
            <div class="text-xl">
              {{ dataWsNodeRed?.sonos_player_media?.mediaTitle }}
            </div>
          </div>

        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="revealModalCurrentMedia = false">OK</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  <div class="h-full text-center p-2">
    <img
        :src="dataWsNodeRed?.sonos_player_media?.mediaImageUrl"
        @click="setVolume('toggle_mute')" alt=""
        class="w-[60%] rounded-lg mb-4 object-cover aspect-square mx-auto"
        :class="{grayscale: dataWsNodeRed?.sonos_player_media?.isMute}"
    >
    <div v-if="dataWsNodeRed?.sonos_player_media?.showAuthorTitle" @click="revealModalCurrentMedia = true">
      <div class="text-3xl block line-clamp-1 font-semibold">
        {{ dataWsNodeRed?.sonos_player_media?.mediaArtist }}
      </div>
      <div class="text-2xl line-clamp-1 font-semibold">
        {{ dataWsNodeRed?.sonos_player_media?.mediaTitle }}
      </div>
    </div>
    <div class="flex mt-2 gap-6 items-center justify-center">
      <Volume1 @click="setVolume('down')" class="h-[55px] w-[55px] cursor-pointer"></Volume1>
      <CirclePlay @click="setVolume('play')" class="h-[85px] w-[85px] cursor-pointer"
                  v-show="!dataWsNodeRed?.sonos_player_media?.isPlaying"></CirclePlay>
      <CirclePause @click="setVolume('pause')" class="h-[85px] w-[85px] cursor-pointer"
                   v-show="dataWsNodeRed?.sonos_player_media?.isPlaying"></CirclePause>
      <Volume2 @click="setVolume('up')" class="h-[55px] w-[55px] cursor-pointer"></Volume2>
    </div>
  </div>

</template>
<script setup lang="ts">
import { CirclePause, CirclePlay, Volume1, Volume2 } from 'lucide-vue-next';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';
import { ref, storeToRefs, useFetch } from '#imports';

const revealModalCurrentMedia = ref(false);

const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

async function setVolume(kind: 'up' | 'down' | 'pause' | 'play' | 'toggle_mute') {
  return useFetch('/api/node-red/desk-display-api', {
    query: {
      action: `player_action_${kind}`,
    },
  });
}
</script>
