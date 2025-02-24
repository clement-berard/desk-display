<template>
  <div class="grid grid-cols-5 grid-rows-2 gap-4 h-full ">
    <template v-for="(pageItem, index) in page.pageItems" :key="index">
      <PageItem :page-item="pageItem" />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Page } from '~/core/Domain/UI/Page';
import PageItem from './UI-PageItem.vue';

const { page } = defineProps<{ page: Page }>();
</script>
