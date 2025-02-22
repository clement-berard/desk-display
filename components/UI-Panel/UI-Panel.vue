<template>
  <UIPanelFrame>
    <Carousel :opts="{align: 'start'}" orientation="horizontal" class="w-full h-full flex carousel-parent">
      <CarouselContent class="h-full">
        <CarouselItem class="h-full w-full overflow-hidden" v-for="(page, indexPage) in panel.pages" :key="indexPage">
          <Page :page="page" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </UIPanelFrame>
</template>
<script setup lang="ts">
import UIPanelFrame from '~/components/UI-Panel/UI-Panel-Frame.vue';
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import { Skeleton } from '~/components/ui/skeleton';
import type { Panel } from '~/core/Domain/UI/Panel';
import Page from './UI-Page.vue';

const { panel } = defineProps<{ panel: Panel }>();
</script>

<style lang="scss" scoped>
.carousel-parent {
  > div {
    width: 100%;
  }
}
</style>
