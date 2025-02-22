import type { RadioItem } from '~/core/Domain/Entities/Radio';
import { storeToRefs, useFetch, useWsNodeRedStore } from '#imports';

export function useRadios() {
  const { dataWsNodeRed } = storeToRefs(useWsNodeRedStore());
  const currentSelectedRadio = dataWsNodeRed?.value?.sonos_player_media?.select_radio_details?.slug;

  function getRadios() {
    return useFetch<RadioItem[]>('/api/radios');
  }

  async function setRandomRadio() {
    return useFetch('/api/radios/set', {
      query: {
        random: true,
      },
    });
  }

  return {
    getRadios,
    setRandomRadio,
    currentSelectedRadio,
  };
}
