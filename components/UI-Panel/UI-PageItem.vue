<template>
  <div
      class="h-full w-full aspect-square rounded-lg"
      :class="{border: !pageItem?.backgroundImage}"
      @click="pageItem?.onClick"
  >

    <div class="relative h-full rounded-lg overflow-hidden text-center">
      <img v-if="pageItem?.backgroundImage" :src="pageItem?.getBackgroundImage()" class="w-full h-full object-cover" alt=""
           :class="{'grayscale': pageItem?.isBackgroundImageGray ?? false}"/>
      <div v-if="pageItem?.title"
           class="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20"
      >
        <span class="text-3xl p-2 font-normal">
          {{ pageItem.title }}
        </span>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import type { PageItem } from '~/core/Domain/UI/PageItem';

const { pageItem } = defineProps<{ pageItem: PageItem }>();
</script>
