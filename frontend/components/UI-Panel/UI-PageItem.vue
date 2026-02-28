<template>
  <div
    class="h-full w-full aspect-square rounded-lg border-gray-800"
    :class="{ border: !pageItem?.backgroundImage || pageItem?.title }"
    @click="pageItem?.onClick"
  >
    <div class="relative h-full rounded-lg overflow-hidden text-center bg-gray-800/50">
      <Skeleton v-if="pageItem?.backgroundImage && !isImageLoaded" class="absolute inset-0 w-full h-full rounded-lg" />

      <img
        v-if="pageItem?.backgroundImage"
        :src="pageItem?.backgroundImage"
        @load="() => isImageLoaded = true"
        class="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        alt=""
        :class="{
          'grayscale': pageItem?.isBackgroundImageGray ?? false,
          'opacity-0': !isImageLoaded,
          'opacity-100': isImageLoaded
        }"
      >

      <div v-if="pageItem?.title" class="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/80">
        <span class="text-xl font-bold text-white"> {{ pageItem.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Skeleton } from '~/components/ui/skeleton';
import type { PageItem } from '~/core/entities/UI/PageItem';

const { pageItem } = defineProps<{ pageItem: PageItem }>();

const isImageLoaded = ref(false);
</script>
