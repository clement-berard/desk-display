import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useWebSocket } from '~/composables/useWsNodeRed';

type MediaInfo = {
  media: {
    title?: string;
    artist?: string;
    albumName?: string;
    audioSourceName?: string;
    picture?: string;
  };
  player: {
    name?: string;
    volumeLevel?: number;
  };
  entity: {
    source?: string;
  };
};

export const useMediaPlayerStore = defineStore(
  'mediaPlayerStore',
  () => {
    const mediaPlayer = ref<MediaInfo>();

    const { messages } = useWebSocket(`ws://${import.meta.env.VITE_NODE_RED_WS_URL as string}`);

    watch(
      messages,
      (newMessage) => {
        if (newMessage) {
          const { key, value } = newMessage;

          if (key === 'media_player') {
            mediaPlayer.value = value as MediaInfo;
          }
        }
      },
      { deep: true },
    );

    return { mediaPlayer };
  },
  {
    persist: true,
  },
);
