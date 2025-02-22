<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <div class="fixed top-0 left-0 w-[1600px] h-[600px] overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Panels } from '~/core/Domain/UI/Panels';
import { onMounted, storeToRefs, useGlobalStore, useLights, useRadios } from '#imports';
const store = useGlobalStore();

const { panel: panelRadios, initPanel: initPanelRadios } = useRadios();
const { panel: panelLights, initPanel: initPanelLights } = useLights();

const { allPanels, currentPanel } = storeToRefs(store);

initPanelRadios();
initPanelLights();

onMounted(() => {
  const panelsGroup = new Panels();

  panelsGroup?.addPanels([panelRadios.value, panelLights.value]);
  allPanels.value = panelsGroup;
  currentPanel.value = panelsGroup.firstPanel;
});
</script>
