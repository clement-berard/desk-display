<template>
  <Grid :pages="pages"/>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import Grid, { type Pages } from '~/components/Main/Grid.vue';
import { nodeRedClient } from '~/services/api/node-red';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';
import { storeToRefs } from '#imports';

const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

async function setScene(name: any) {
  await nodeRedClient.post('desk-display', {
    json: {
      action: 'action_set_lights',
      payload: {
        scene: name,
      },
    },
  });
}

const getUnsplashImage = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=300&auto=format&fit=crop`;

const pages = computed<Pages>(() => [
  [
    {
      title: 'Work',
      onClick: () => setScene('desk_work'),
      backgroundImage: getUnsplashImage('1486312338219-ce68d2c6f44d'),
    },
    {
      title: 'Salon Edison',
      onClick: () => setScene('salon_edison'),
      backgroundImage: getUnsplashImage('1458172594959-b57570af4d0a'),
    },
    {
      title: 'Salon Off',
      onClick: () => setScene('salon_off'),
      backgroundImage: getUnsplashImage('1580644327874-c637192725a8'),
    },
    {
      title: 'Salon Red',
      onClick: () => setScene('salon_red'),
      backgroundImage: getUnsplashImage('1535868463750-c78d9543614f'),
    },
    {
      title: 'Salon Energize',
      onClick: () => setScene('salon_energize'),
      backgroundImage: getUnsplashImage('1663426242582-7c707af07128'),
    },
    {
      title: 'TV Night Good',
      onClick: () => setScene('salon_tv_night_good'),
      backgroundImage: getUnsplashImage('1593305841991-05c297ba4575'),
    },
    {
      title: 'Salon Calm TV',
      onClick: () => setScene('salon_calm_tv'),
      backgroundImage: getUnsplashImage('1624115773145-9b77fe912897'),
    },
    {
      title: 'Chambre Toggle',
      onClick: () => setScene('chambre_toggle'),
      backgroundImage: getUnsplashImage('1522771739844-6a9f6d5f14af'),
      isBackgroundImageGray: dataWsNodeRed?.value?.main_sensors?.all_lights?.chambre === 0,
    },
  ],
]);
</script>
