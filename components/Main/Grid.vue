<template>
  <div class="h-full w-full flex justify-center items-center">
    <Carousel :opts="{align: 'start'}" orientation="horizontal" class="w-full h-full flex">
      <CarouselContent class="h-full">
        <CarouselItem class="h-full overflow-hidden" v-for="(page, indexPage) in pages" :key="indexPage">
          <div class="grid grid-cols-5 grid-rows-2 gap-4 h-full ">
            <div
                class="h-full w-full aspect-square rounded-lg"
                :class="{border: !item?.imageSrc}"
                v-for="(item, indexItem) in page"
                :key="indexItem"
                @click="triggerOnClick(item)"
            >
              <template v-if="item?.imageSrc">
                <img
                    :src="item?.imageSrc"
                    :alt="item?.imageSrc"
                    class="h-full w-full object-cover aspect-square rounded-lg"
                >
              </template>
              <template v-if="item?.backgroundImage && item?.title">
                <div class="relative h-full rounded-lg overflow-hidden">
                  <img :src="item?.backgroundImage" class="w-full h-full object-cover">
                  <div class="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20">
                    <span class="text-3xl" v-if="item?.title">
                      {{ item.title }}
                    </span>
                  </div>
                </div>
              </template>
              <template v-if="!item?.backgroundImage && item?.title">
                <div class="flex items-center justify-center text-center text-3xl h-full">
                  {{ item.title }}
                </div>
              </template>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import { nodeRedClient } from '~/services/api/node-red';

export type Item<Data = Record<any, any>> = {
  imageSrc?: string;
  backgroundImage?: string;
  onClick?: (data: Data, options: { sendToApiNodeRed: typeof sendToApiNodeRed }) => void;
  data?: Data;
  title?: string;
};

export type Page<Data> = Item<Data>[];
export type Pages<Data = Record<any, any>> = Page<Data>[];

const { pages = [] } = defineProps<{ pages: Pages }>();

async function sendToApiNodeRed(payload: Record<any, any>) {
  await nodeRedClient.post('desk-display', {
    json: payload,
  });
}

function triggerOnClick(item: Item<any>) {
  if (item?.onClick) {
    item?.onClick(item?.data || {}, {
      sendToApiNodeRed,
    });
  }
}

new Date().toUTCString();
</script>
