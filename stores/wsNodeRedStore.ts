import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useWebSocket } from '~/composables/useWsNodeRed';
import { processNodeWsRedMessage } from '~/services/ws/node-red-matcher';

type DeskDisplayConfig = {
  prevent_standby: boolean;
  force_brightness_nightshift: boolean;
  force_low_brightness: boolean;
  button_reset_standby: string;
};

export type WsNodeRedKeys = {
  main_sensors: {
    desk_display_config: DeskDisplayConfig;
    all_lights: {
      chambre: number;
    };
    sensor: {
      sensor_temp_balcon_temperature: number;
      temps_salon: number;
      has_desk_consumption: boolean;
    };
    weather: {
      humidity: number;
      rain_chance: number;
      state: string;
      stateIconUrl: string;
      state_translated: string;
      alert: {
        global: string;
        wind: boolean;
        rain: boolean;
        thunderstorm: boolean;
      };
    };
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
