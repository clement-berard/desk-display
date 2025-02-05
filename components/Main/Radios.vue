<template>
  <Grid :pages="pages"/>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { cluster } from 'radash';
import { ref } from 'vue';
import type { Item } from '~/components/Main/Grid.vue';
import { NC_TABLE_RADIO_ID, nocodbInstance } from '~/services/api/nocodb';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';
import Grid, { type Pages } from './Grid.vue';

const wsNodeRedStore = useWsNodeRedStore();

const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

const pages = ref<Pages>([]);
const currentSelectedRadio = dataWsNodeRed?.value?.sonos_player_media?.select_radio_details?.slug;

async function fetchRadios() {
  const data: any = await nocodbInstance
    .get(`${NC_TABLE_RADIO_ID}/records`, {
      searchParams: {
        fields: 'slug,label,out_media_img',
        sort: '-counter,-last_selected_date,slug',
      },
    })
    .json();

  const items: Item[] = (data.list as any[]).map((item) => {
    return {
      imageSrc: item?.out_media_img,
      onClick: async (data, { sendToApiNodeRed }) => {
        if (currentSelectedRadio !== data?.slug) {
          await sendToApiNodeRed({
            action: 'action_select_radio_set',
            payload: {
              radio: data.slug,
            },
          });

          setTimeout(async () => {
            await fetchRadios();
          }, 1000);
        }
      },
      data: item,
    };
  });

  pages.value = cluster(items, 10);
}

fetchRadios();
</script>
