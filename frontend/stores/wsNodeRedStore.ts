import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useWebSocket } from '~/composables/useWsNodeRed';
import { processNodeWsRedMessage } from '~/services/ws/node-red-matcher';

type DeskDisplayConfig = {
  prevent_standby: boolean;
  force_brightness_nightshift: boolean;
  force_low_brightness: boolean;
  button_reset_standby: string;
  desk_display_reload: string;
};

export type WsNodeRedKeys = {
  main_sensors: {
    desk_display_config: DeskDisplayConfig;
    all_lights: {
      chambre: number;
    };
    text_daily_know: string;
    sensor: {
      has_desk_consumption: boolean;
      sensor_temp_balcon_temperature: number;
      temps_salon: number;
    };
    weather: {
      alert: {
        global: string;
        rain: boolean;
        thunderstorm: boolean;
        wind: boolean;
      };
      humidity: number;
      rain_chance: number;
      state: string;
      stateIconUrl: string;
      state_translated: string;
    };
  };
  sonos_player_media: {
    hasAuthorTitle: boolean;
    hasRadioSelected: boolean;
    isMute?: boolean;
    isPlaying: boolean;
    mediaArtist?: string;
    mediaImageUrl: string;
    mediaTitle?: string;
    showAuthorTitle: boolean;
    showRadioName: boolean;
    sourceName?: string;
    volumeLevel: number;
    select_radio_details: {
      image_url: string;
      label: string;
      show_radio_name_only: boolean;
      slug: string;
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
