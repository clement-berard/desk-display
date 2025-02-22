<template>
  <div class="h-full w-full flex justify-center items-center">
    <Carousel :opts="{align: 'start'}" orientation="horizontal" class="w-full h-full flex">
      <CarouselContent class="h-full">
        <CarouselItem class="h-full overflow-hidden" v-for="(page, indexPage) in getPages" :key="indexPage">
          <div class="grid grid-cols-5 grid-rows-2 gap-4 h-full ">
            <div
                class="h-full w-full aspect-square rounded-lg"
                :class="{border: !item?.imageSrc && !isLoading}"
                v-for="(item, indexItem) in page"
                :key="indexItem"
                @click="triggerOnClick(item)"
            >
              <div class="flex flex-col h-full" v-if="isLoading">
                <Skeleton class="h-full w-full rounded-xl bg-secondary/20" />
              </div>
              <template v-else>
                <template v-if="item?.imageSrc">
                  <img
                      :src="item?.imageSrc"
                      :alt="item?.imageSrc"
                      class="h-full w-full object-cover aspect-square rounded-lg"
                  >
                </template>
                <template v-if="item?.backgroundImage && item?.title">
                  <div class="relative h-full rounded-lg overflow-hidden text-center">
                    <img :src="item?.backgroundImage" class="w-full h-full object-cover" alt="" :class="{'grayscale': item?.isBackgroundImageGray ?? false}" />
                    <div class="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20">
                    <span class="text-3xl p-2 font-normal" v-if="item?.title">
                      {{ item.title }}
                    </span>
                    </div>
                  </div>
                </template>
                <template v-if="!item?.backgroundImage && item?.title">
                  <div class="flex items-center justify-center text-center text-3xl h-full p-1 font-normal">
                    {{ item.title }}
                  </div>
                </template>
              </template>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
import { list } from 'radash';
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import { computed } from '#imports';

export type Item<Data = Record<any, any>> = {
  imageSrc?: string;
  backgroundImage?: string;
  onClick?: (data: Data) => void;
  data?: Data;
  title?: string;
  isBackgroundImageGray?: boolean;
};

export type Page<Data> = Item<Data>[];
export type Pages<Data = Record<any, any>> = Page<Data>[];

const { pages = [], isLoading = true } = defineProps<{ pages?: Pages; isLoading?: boolean }>();

const getPages = computed(() => {
  if (isLoading) {
    return [list(9).map(() => {})];
  }

  return pages;
});

function triggerOnClick(item: Item<any>) {
  if (item?.onClick) {
    item?.onClick(item?.data || {});
  }
}
</script>
