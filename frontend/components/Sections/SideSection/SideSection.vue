<script setup lang="ts">
import { storeToRefs } from '#imports';
import MediaPart from '~/components/Side/Media.vue';
import Weather from '~/components/Side/Weather.vue';
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import { FRAME_SIDE_CONTENT_HEIGHT } from '~/constants/app.constants';
import { useGlobalStore } from '~/stores/globalStore';

const globalStore = useGlobalStore();

const { currentSideCarousel } = storeToRefs(globalStore);
</script>

<template>
  <Carousel :opts="{align: 'start'}" orientation="vertical" class="w-full" v-model="currentSideCarousel">
    <CarouselContent :style="{height: `${FRAME_SIDE_CONTENT_HEIGHT}px`}">
      <CarouselItem class=" h-full" key="media"> <MediaPart /> </CarouselItem>
      <CarouselItem class=" h-full" key="weather"> <Weather /> </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
