<template>
  <Grid :pages="myPages"/>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { cluster } from 'radash';
import { ref } from 'vue';
import type { Item } from '~/components/Main/Grid.vue';
import { NC_TABLE_RADIO_ID, nocodbInstance } from '~/services/api/nocodb';
import { computed, useScreensStore, useWsNodeRedStore } from '#imports';
import Grid, { type Pages } from './Grid.vue';

const wsNodeRedStore = useWsNodeRedStore();
const screensStore = useScreensStore();

const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);
const { radiosList } = storeToRefs(screensStore);
const { fetchRadioRefetch } = screensStore;

const currentSelectedRadio = dataWsNodeRed?.value?.sonos_player_media?.select_radio_details?.slug;

const allRadiosList = computed(() => {
  return ((radiosList.value || []) as any[]).map((item) => {
    return {
      imageSrc: item?.out_media_img,
      onClick: async (data: any, { sendToApiNodeRed }: { sendToApiNodeRed: any }) => {
        if (currentSelectedRadio !== data?.slug) {
          await sendToApiNodeRed({
            action: 'action_select_radio_set',
            payload: {
              radio: data.slug,
            },
          });

          setTimeout(async () => {
            // await fetchRadios();
            await fetchRadioRefetch();
          }, 1000);
        }
      },
      data: item,
    };
  });
});

const myPages = computed<Pages>(() => {
  return cluster(allRadiosList.value, 10);
});
</script>
