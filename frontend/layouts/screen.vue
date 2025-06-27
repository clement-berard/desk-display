<template>
    <div class="relative w-screen h-screen overflow-hidden screen-layout">
        <div class="fixed top-0 left-0 overflow-hidden"
            :style="{ height: `${DISPLAY_SCREEN_FRAME_HEIGHT}px`, width: `${DISPLAY_SCREEN_FRAME_WIDTH}px` }">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, storeToRefs, useGlobalStore } from '#imports';
import { useInitPanels } from '~/composables/Panels/useInitPanels';
import { DISPLAY_SCREEN_FRAME_HEIGHT, DISPLAY_SCREEN_FRAME_WIDTH } from '~/constants/app.constants';

const store = useGlobalStore();
const { initAllPanels } = useInitPanels();
const { allPanels, currentPanel } = storeToRefs(store);
const panelsGroup = await initAllPanels();

onMounted(() => {
  allPanels.value = panelsGroup;
  currentPanel.value = panelsGroup.firstPanel;
});
</script>
