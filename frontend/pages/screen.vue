<script setup lang="ts">
import IdleScreen from '~/components/Screens/IdleScreen.vue';
import Settings from '~/components/Screens/SettingsScreen.vue';
import GlobalFrameSection from '~/components/Sections/GlobalFrameSection.vue';
import HeaderSection from '~/components/Sections/HeaderSection.vue';
import SideSection from '~/components/Sections/SideSection/SideSection.vue';
import UIPanel from '~/components/UI-Panel/UI-Panel.vue';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { processNodeWsRedMessage } from '~/services/ws/node-red-matcher';
import {
  computed,
  definePageMeta,
  storeToRefs,
  useDisplayStore,
  useGlobalStore,
  useWsNodeRedStore,
  watch,
} from '#imports';

const globalStore = useGlobalStore();
const displayStore = useDisplayStore();

const wsNodeRedStore = useWsNodeRedStore();
const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

const deskDisplayReloadButton = computed(
  () => dataWsNodeRed?.value?.main_sensors?.desk_display_config.desk_display_reload,
);

watch(deskDisplayReloadButton, () => location.reload());

const { allPanels, currentPanel } = storeToRefs(globalStore);

const { showIdleScreen } = storeToRefs(displayStore);

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
      <Tabs class="h-full" :model-value="currentPanel?.id">
        <TabsList class="w-full h-full">
          <template v-for="(panel, index) in allPanels?.panelList" :key="index">
            <TabsTrigger :value="panel.id" @click="currentPanel = panel" class="h-full w-full">
              <span class="text-4xl">{{ panel.name }}</span>
            </TabsTrigger>
          </template>
        </TabsList>
      </Tabs>
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

