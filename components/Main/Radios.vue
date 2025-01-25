<template>
  <Grid :pages="pages"/>
</template>
<script setup lang="ts">
import {pdbClient} from "~/services/api/pdb";
import {ref} from 'vue'
import {cluster} from 'radash'
import Grid, {type Pages} from './Grid.vue'
import {useWsNodeRedStore} from "~/stores/wsNodeRedStore";
import {storeToRefs} from "pinia";
import type {Item} from "~/components/Main/Grid.vue";

const wsNodeRedStore = useWsNodeRedStore();

const {dataWsNodeRed} = storeToRefs(wsNodeRedStore)

const pages = ref<Pages>([])
const currentSelectedRadio = dataWsNodeRed?.value?.sonos_player_media?.select_radio_details?.slug;

async function fetchRadios() {
  const data: any = await pdbClient.get("radios/records", {
    searchParams: {
      perPage: 1000,
      skipTotal: true,
      fields: 'slug,url,image_url',
      filter: 'disabled=false',
      sort: '-counter,-last_selected_date,slug'
    }
  }).json();

  const items: Item[] = (data.items as any[]).map(item => {
    return {
      imageSrc: item?.image_url,
      onClick: async (data, {sendToApiNodeRed}) => {
        if (currentSelectedRadio !== data?.slug) {
          await sendToApiNodeRed({
            "action": "action_select_radio_set",
            "payload": {
              "radio": data.slug
            }
          })

          setTimeout(async () => {
            await fetchRadios();
          }, 1000);
        }
      },
      data: item,
    }
  })

  pages.value = cluster(items, 10);
}

fetchRadios();
</script>
