import { useQuery } from '@tanstack/vue-query';
import { NC_TABLE_RADIO_ID, nocodbInstance } from '~/services/api/nocodb';
import { nodeRedClient } from '~/services/api/node-red';
import { computed, defineStore, storeToRefs, useWsNodeRedStore } from '#imports';

export const useRadiosStore = defineStore(
  'radiosStore',
  () => {
    const wsNodeRedStore = useWsNodeRedStore();
    const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);
    const mediaPlayInfo = computed(() => dataWsNodeRed.value?.sonos_player_media);

    const currentRadioName = computed(() => {
      if (!mediaPlayInfo.value?.hasRadioSelected) {
        return null;
      }

      return mediaPlayInfo.value?.sourceName;
    });

    const fetchRadios = async () => {
      return nocodbInstance
        .get(`${NC_TABLE_RADIO_ID}/records`, {
          searchParams: {
            fields: 'slug,label,out_media_img',
            sort: '-counter,-last_selected_date,slug',
          },
        })
        .json();
    };

    const {
      isLoading,
      data: radiosList,
      refetch: fetchRadioRefetch,
    } = useQuery({
      queryKey: ['ncRadio'],
      queryFn: fetchRadios,
      select: (d: any) => d.list,
    });

    async function setRandomRadio() {
      await nodeRedClient.post('desk-display', {
        json: {
          action: 'action_select_radio_random',
        },
      });
    }

    return {
      radiosList,
      isLoading,
      fetchRadioRefetch,
      setRandomRadio,
      currentRadioName,
    };
  },
  {
    persist: true,
  },
);
