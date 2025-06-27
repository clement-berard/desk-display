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
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { processNodeWsRedMessage } from '~/services/ws/node-red-matcher';

const globalStore = useGlobalStore();
const displayStore = useDisplayStore();

const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

const deskDisplayReloadButton = computed(
  () => dataWsNodeRed?.value?.main_sensors?.desk_display_config.desk_display_reload,
);

watch(deskDisplayReloadButton, () => location.reload());

const { currentPanel, currentDisplayView } = storeToRefs(globalStore);

const { showIdleScreen } = storeToRefs(displayStore);
currentDisplayView.value = 'screen';

definePageMeta({
  layout: 'screen',
});
</script>

<template>
  <GlobalFrameSection :is-idle-state="showIdleScreen">
    <template #header>
      <HeaderSection/>
    </template>
    <template #side-content>
      <SideSection/>
    </template>
    <template #side-footer>
      <TabSide />
    </template>
    <template #content v-if="currentPanel">
      <UIPanel :panel="currentPanel"/>
    </template>
    <template #idle>
      <IdleScreen/>
    </template>
  </GlobalFrameSection>
  <client-only>
    <Settings/>
  </client-only>
</template>

