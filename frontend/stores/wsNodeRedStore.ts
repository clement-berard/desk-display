import { defineStore } from 'pinia';
import { ref, toRaw, watch } from 'vue';
import { useWebSocket } from '~/composables/useWsNodeRed';
import { processNodeWsRedMessage } from '~/services/ws/node-red-ws-matcher.services';

type DeskDisplayConfig = {
  prevent_standby: boolean;
  force_brightness_nightshift: boolean;
  force_low_brightness: boolean;
  button_reset_standby: string;
  desk_display_reload: string;
};

export type WsNodeRedKeys = {
  main_sensors: {
    all_main_information: {
      '3d_printer.prise': boolean;
      '3d_printer.light': boolean;
      'fan_xiaomi.power': boolean;
    };
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
};

type WsNodeRedKeysObject = {
  [K in keyof WsNodeRedKeys]: WsNodeRedKeys[K];
};

export const useWsNodeRedStore = defineStore(
  'wsNodeRedStore',
  () => {
    const dataWsNodeRed = ref<Partial<WsNodeRedKeysObject>>({});

    const { messages } = useWebSocket(`ws://${import.meta.env.VITE_NODE_RED_WS_URL as string}`);

    watch(
      messages,
      (newMessage) => {
        if (newMessage) {
          const { key, value } = newMessage;
          const excludedKeys = ['media_player', 'sonos_player_media'];

          if (key && !excludedKeys.includes(key)) {
            const typedKey = key as keyof WsNodeRedKeys;
            dataWsNodeRed.value[typedKey] = processNodeWsRedMessage(typedKey, value);
          }
        }
      },
      { deep: true },
    );

    return { dataWsNodeRed };
  },
  {
    persist: true,
  },
);
