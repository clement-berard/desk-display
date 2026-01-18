<template>
  <div class="flex h-screen">
    <!-- Left Sidebar -->
    <aside class="w-1/5 border-r border-gray-900">
      <div class="mb-4">
        <MediaPart :full-width="false" />
      </div>
      <TabSide />
      <AudioDeviceSelector class="mt-4 mx-2"></AudioDeviceSelector>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-4">
        <template v-if="currentPanel">
          <UIPanel :panel="currentPanel" />
        </template>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, storeToRefs } from '#imports';
import AudioDeviceSelector from '~/components/Screens/Desktop/AudioDeviceSelector.vue';
import MediaPart from '~/components/Side/Media.vue';
import TabSide from '~/components/Side/TabSide.vue';
import UIPanel from '~/components/UI-Panel/UI-Panel.vue';
import { useInitPanels } from '~/composables/Panels/useInitPanels';
import { useGlobalStore } from '~/stores/globalStore';

const globalStore = useGlobalStore();
const { allPanels, currentPanel, currentDisplayView } = storeToRefs(globalStore);
const { initAllPanels } = useInitPanels();
const panelsGroup = await initAllPanels();
currentDisplayView.value = 'desktop';

onMounted(() => {
  allPanels.value = panelsGroup;
  currentPanel.value = panelsGroup.firstPanel;
});
</script>
