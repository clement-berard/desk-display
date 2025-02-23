<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { onMounted, storeToRefs, useGlobalStore, useLights, useRadios } from '#imports';

const store = useGlobalStore();

const { panel: panelRadios, initPanel: initPanelRadios } = useRadios();
const { panel: panelLights, initPanel: initPanelLights } = useLights();

const { allPanels } = storeToRefs(store);

onMounted(() => {
  initPanelRadios();
  initPanelLights();
  allPanels.value = [panelRadios.value, panelLights.value];

  console.log('allPanels', allPanels);
});
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
