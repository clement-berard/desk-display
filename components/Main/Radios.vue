<template>
  <Grid :is-loading="isLoading" :pages="myPages"/>
</template>
<script setup lang="ts">
import { cluster } from 'radash';
import { useRadios } from '~/composables/useRadios';
import { computed, useFetch } from '#imports';
import Grid, { type Pages } from './Grid.vue';

const { getRadios, currentSelectedRadio } = useRadios();
const { data: radios, pending: isLoading } = await getRadios();

const allRadiosList = computed(() => {
  return [...(radios?.value || [])].map((item) => {
    return {
      imageSrc: item?.img_url,
      onClick: async (data: any) => {
        if (currentSelectedRadio !== data?.slug) {
          await useFetch('/api/radios/set', {
            query: {
              slug: data.slug,
            },
          });
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
