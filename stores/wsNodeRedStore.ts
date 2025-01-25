import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useWebSocket } from '~/composables/useWsNodeRed';
import { processNodeWsRedMessage } from '~/services/ws/node-red-matcher';

export type WsNodeRedKeys = {
  main_sensors: {
    'sensor.sensor_temp_balcon_temperature': number;
    'sensor.temps_salon': number;
    'weather.humidity': number;
    'weather.rain_chance': number;
    'weather.state': string;
    'weather.state_translated': string;
  };
  sonos_player_media: {
    mediaTitle?: string;
    mediaArtist?: string;
    mediaImageUrl: string;
    isPlaying: boolean;
    hasAuthorTitle: boolean;
    hasSelectRadio: boolean;
    showRadioName: boolean;
    showAuthorTitle: boolean;
    volumeLevel: number;
    isMute?: boolean;
    sourceName?: string;
    select_radio_details: {
      label: string;
      slug: string;
      show_radio_name_only: boolean;
      image_url: string;
    };
  };
};

type WsNodeRedKeysObject = {
  [K in keyof WsNodeRedKeys]: WsNodeRedKeys[K];
};

export const useWsNodeRedStore = defineStore(
  'wsNodeRedStore',
  () => {
    const dataWsNodeRed = ref<Partial<WsNodeRedKeysObject>>({});

    const { messages, isConnected } = useWebSocket(`ws://${import.meta.env.VITE_NODE_RED_WS_URL as string}`);

    watch(messages, (newMessage) => {
      if (newMessage) {
        const { key, value } = newMessage;

        if (key) {
          // @ts-ignore
          dataWsNodeRed.value[key] = processNodeWsRedMessage(key, value);
        }
      }
    });

    return { dataWsNodeRed };
  },
  {
    persist: true,
  },
);
