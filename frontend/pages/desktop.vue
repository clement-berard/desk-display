<template>
  <div class="flex h-screen">
    <!-- Left Sidebar -->
    <aside class="w-1/5 border-r border-gray-900">
      <div class="mb-4"><MediaPart :full-width="false" /></div>
      <TabSide />
      <AudioDeviceSelector class="mt-4 mx-2"></AudioDeviceSelector>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto overflow-x-hidden">
      <div class="p-4 h-full">
        <Transition name="fade" mode="out-in">
          <UIPanel v-if="currentPanel" :panel="currentPanel" :key="currentPanel.id" />
        </Transition>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.15s ease-out,
    transform 0.15s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
