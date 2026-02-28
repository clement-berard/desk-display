<template>
  <UIPanelFrame>
    <Carousel :opts="{align: 'start'}" orientation="horizontal" class="w-full h-full flex carousel-parent">
      <CarouselContent class="h-full">
        <CarouselItem
          v-for="page in panel.pages"
          :key="page.id"
          class="h-full w-full overflow-hidden animate-in fade-in duration-500 ease-out"
        >
          <Page :page="page" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </UIPanelFrame>
</template>

<script setup lang="ts">
import UIPanelFrame from '~/components/UI-Panel/UI-Panel-Frame.vue';
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import type { Panel } from '~/core/entities/UI/Panel';
import Page from './UI-Page.vue';

const { panel } = defineProps<{ panel: Panel }>();
</script>

<style scoped>
.carousel-parent > div {
  width: 100%;
}
</style>
