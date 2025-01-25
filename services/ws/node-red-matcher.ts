import type { WsNodeRedKeys } from '~/stores/wsNodeRedStore';

export function processNodeWsRedMessage(key: keyof WsNodeRedKeys, value: any) {
  if (key === 'sonos_player_media') {
    // @ts-ignore

    return {
      ...value,
    };
  }
  return value;
}
