import { useQuery } from '@tanstack/vue-query';
import { defineStore } from 'pinia';
import { sleep } from 'radash';
import { NC_TABLE_RADIO_ID, nocodbInstance } from '~/services/api/nocodb';

export const useScreensStore = defineStore(
  'screensStore',
  () => {
    const fetchRadios = async () => {
      await sleep(5000);
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

    return {
      radiosList,
      isLoading,
      fetchRadioRefetch,
    };
  },
  {
    persist: true,
  },
);
