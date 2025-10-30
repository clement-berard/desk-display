<template>
  <div
    class="h-full w-full aspect-square rounded-lg border-gray-600"
    :class="{border: !pageItem?.backgroundImage || pageItem?.title}"
    @click="pageItem?.onClick"
  >
    <div class="relative h-full rounded-lg overflow-hidden text-center">
      <img
        v-if="pageItem?.backgroundImage"
        :src="pageItem?.backgroundImage"
        class="w-full h-full object-cover"
        alt=""
        :class="{'grayscale': pageItem?.isBackgroundImageGray ?? false}"
      >
      <div v-if="pageItem?.title" class="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/80">
        <span class="text-xl font-bold"> {{ pageItem.title }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageItem } from '~/core/Domain/UI/PageItem';

const { pageItem } = defineProps<{ pageItem: PageItem }>();
</script>
