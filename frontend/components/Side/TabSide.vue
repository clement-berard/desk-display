<script setup lang="ts">
import { storeToRefs, useGlobalStore } from '#imports';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

const globalStore = useGlobalStore();
const { allPanels, currentPanel } = storeToRefs(globalStore);
</script>

<template>
  <Tabs class="h-24" :model-value="currentPanel?.id">
    <TabsList class="w-full h-full">
      <template v-for="(panel, index) in allPanels?.panelList" :key="index">
        <TabsTrigger :value="panel.id" @click="currentPanel = panel" class="h-full w-full whitespace-normal overflow-visible">
          <span class="text-4xl">
            <Component :is="panel.emoji" :size="48" />
          </span>
        </TabsTrigger>
      </template>
    </TabsList>
  </Tabs>
</template>

<style scoped lang="scss">

</style>
