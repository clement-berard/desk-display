<template>
  <div :class="[`grid-cols-${page.pageColumn}`, `grid-rows-${page.pageRows}`]" class="grid gap-3 h-full min-h-0">
    <template v-for="(pageItem, index) in page.getItems()" :key="index">
      <PageItem :page-item="pageItem" />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Page } from '~/core/entities/UI/Page';
import PageItem from './UI-PageItem.vue';

const { page } = defineProps<{ page: Page }>();
</script>
