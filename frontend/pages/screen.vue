<script setup lang="ts">
import {
  computed,
  definePageMeta,
  storeToRefs,
  useDisplayStore,
  useGlobalStore,
  useWsNodeRedStore,
  watch,
} from '#imports';
import IdleScreen from '~/components/Screens/IdleScreen.vue';
import Settings from '~/components/Screens/SettingsScreen.vue';
import GlobalFrameSection from '~/components/Sections/GlobalFrameSection.vue';
import HeaderSection from '~/components/Sections/HeaderSection.vue';
import SideSection from '~/components/Sections/SideSection/SideSection.vue';
import TabSide from '~/components/Side/TabSide.vue';
import UIPanel from '~/components/UI-Panel/UI-Panel.vue';

const globalStore = useGlobalStore();
const displayStore = useDisplayStore();

const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

const deskDisplayReloadButton = computed(
  () => dataWsNodeRed?.value?.main_sensors?.desk_display_config.desk_display_reload,
);

watch(deskDisplayReloadButton, () => location.reload());

const { allPanels, currentPanel, currentDisplayView } = storeToRefs(globalStore);

const { showIdleScreen } = storeToRefs(displayStore);
currentDisplayView.value = 'screen';

definePageMeta({
  layout: 'screen',
});
</script>

<template>
  <GlobalFrameSection :is-idle-state="showIdleScreen">
    <template #header> <HeaderSection /> </template>
    <template #side-content> <SideSection /> </template>
    <template #side-footer> <TabSide /> </template>

    <template #content>
      <div class="panel-stack">
        <div
          v-for="panel in allPanels?.panelList"
          :key="panel.id"
          class="panel-stack-item"
          :class="{ 'panel-stack-item--active': panel.id === currentPanel?.id }"
        >
          <UIPanel :panel="panel" />
        </div>
      </div>
    </template>

    <template #idle> <IdleScreen /> </template>
  </GlobalFrameSection>
  <client-only> <Settings /> </client-only>
</template>

<style scoped>
.panel-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.panel-stack-item {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.98);
  transition:
    opacity 0.08s ease-out,
    transform 0.08s ease-out;
}

.panel-stack-item--active {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}
</style>
