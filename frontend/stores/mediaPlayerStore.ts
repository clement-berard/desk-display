import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useWebSocket } from '~/composables/useWsNodeRed';

interface ContentIdFlags {
  isBuiltIn: boolean;
  isLibrary: boolean;
  isPersonalLibrary: boolean;
  isTuneIn: boolean;
  isExternalRadio: boolean;
  isInternalRadio: boolean;
}

type SelectedRadio = {
  Id: number;
  slug: string;
  label: string;
  isHotmixRadio: boolean;
  out_media_url: string;
  out_media_img: string;
  counter: number;
};

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
    isPlaying?: boolean;
    isMuted?: boolean;
  };
  entity: {
    source?: string;
  };
  contentId: ContentIdFlags;
  selectedRadio?: SelectedRadio;
};

export type EnrichedMediaInfo = Omit<MediaInfo, 'media'> & {
  media: MediaInfo['media'] & {
    mediaPictureFinal?: string;
    showOnlySourceName: boolean;
  };
};

export const useMediaPlayerStore = defineStore(
  'mediaPlayerStore',
  () => {
    const mediaPlayer = ref<EnrichedMediaInfo>();

    const { messages } = useWebSocket(`ws://${import.meta.env.VITE_NODE_RED_WS_URL as string}`);

    watch(
      messages,
      (newMessage) => {
        if (newMessage?.key === 'media_player') {
          const raw = newMessage.value as MediaInfo;
          const hasSelectedRadio = raw?.selectedRadio?.Id;
          const hasMediaArtistAndTitle = raw?.media?.artist && raw?.media?.title;
          const showOnlySourceName = !hasMediaArtistAndTitle;

          mediaPlayer.value = {
            ...raw,
            media: {
              ...raw.media,
              mediaPictureFinal: raw.media?.picture ?? raw.selectedRadio?.out_media_img,
              audioSourceName: hasSelectedRadio ? raw.selectedRadio?.label : raw.media?.audioSourceName,
              showOnlySourceName,
            },
          };
        }
      },
      { deep: true, immediate: true },
    );

    return {
      mediaPlayer,
    };
  },
  {
    persist: true,
  },
);
