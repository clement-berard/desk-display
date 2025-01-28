<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { NC_TABLE_RADIO_ID, nocodbInstance } from '~/services/api/nocodb';

async function getD() {
  const toto = await nocodbInstance.get(`${NC_TABLE_RADIO_ID}/records`, {
    searchParams: {
      fields: 'slug,label,out_media_img',
      sort: 'slug',
    },
  });
}

getD();
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
