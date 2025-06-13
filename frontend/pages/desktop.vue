<template>
  <div class="flex h-screen">
    <!-- Left Sidebar -->
    <aside class="w-1/5 border-r border-gray-900">
      <SideSection/>
      <TabSide />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-4">
        <template v-if="currentPanel">
          <UIPanel :panel="currentPanel"/>
        </template>
      </div>
    </main>
  </div>
</template>


<script lang="ts" setup>
import SideSection from '~/components/Sections/SideSection/SideSection.vue';
import TabSide from '~/components/Side/TabSide.vue';
import UIPanel from '~/components/UI-Panel/UI-Panel.vue';
import { useInitPanels } from '~/composables/Panels/useInitPanels';
import { useGlobalStore } from '~/stores/globalStore';
import { getCurrentHostName } from '~/utils/utils';
import { onMounted, storeToRefs } from '#imports';
const globalStore = useGlobalStore();
const { allPanels, currentPanel, currentDisplayView } = storeToRefs(globalStore);
const hostname = getCurrentHostName();
const { initAllPanels } = useInitPanels();
const panelsGroup = await initAllPanels();
currentDisplayView.value = 'desktop';

onMounted(() => {
  allPanels.value = panelsGroup;
  currentPanel.value = panelsGroup.firstPanel;
});
</script>
