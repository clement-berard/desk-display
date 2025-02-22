<script setup lang="ts">
import MediaPart from '~/components/Side/Media.vue';
import Weather from '~/components/Side/Weather.vue';
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import { useGlobalStore } from '~/stores/globalStore';
import { storeToRefs } from '#imports';

const globalStore = useGlobalStore();

const { currentSideCarousel } = storeToRefs(globalStore);
</script>

<template>
  <Carousel :opts="{align: 'start'}" orientation="vertical" class="w-full" v-model="currentSideCarousel">
    <CarouselContent class="h-[460px]">
      <CarouselItem class=" h-full" key="media">
        <Carousel :opts="{align: 'start'}" class="w-full" v-model="currentSideCarousel">
          <CarouselContent class="h-[460px]">
            <CarouselItem class=" h-full" key="media">
              <MediaPart/>
            </CarouselItem>
            <CarouselItem class=" h-full" key="weather">
              <div>WIP</div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </CarouselItem>
      <CarouselItem class=" h-full" key="weather">
        <Weather/>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>

<style scoped lang="scss">

</style>
