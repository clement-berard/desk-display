import { useQuery } from '@tanstack/vue-query';
import { defineStore } from 'pinia';
import { NC_TABLE_RADIO_ID, nocodbInstance } from '~/services/api/nocodb';
import { nodeRedClient } from '~/services/api/node-red';

export const useScreensStore = defineStore(
  'screensStore',
  () => {
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
    };
  },
  {
    persist: true,
  },
);
