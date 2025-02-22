<script setup lang="ts">
import IdleScreen from '~/components/Screens/IdleScreen.vue';
import Settings from '~/components/Screens/SettingsScreen.vue';
import ContentSection from '~/components/Sections/ContentSection.vue';
import HeaderSection from '~/components/Sections/HeaderSection.vue';
import SideSection from '~/components/Sections/SideSection/SideSection.vue';
import MediaPart from '~/components/Side/Media.vue';
import Weather from '~/components/Side/Weather.vue';
import UIPanel from '~/components/UI-Panel/UI-Panel.vue';
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { definePageMeta, storeToRefs, useDisplayStore, useGlobalStore } from '#imports';
const globalStore = useGlobalStore();
const displayStore = useDisplayStore();

const { currentSideCarousel, allPanels, currentPanel } = storeToRefs(globalStore);

const { showMainScreen, showIdleScreen, isLowBrightness, forceBrightnessNightShift } = storeToRefs(displayStore);

definePageMeta({
  layout: 'screen',
});
</script>

<template>
  <div class="h-full w-full" :class="{'brightness-50': isLowBrightness, 'night-screen-mode': forceBrightnessNightShift}">
    <template v-if="showMainScreen">
      <HeaderSection/>
      <section class="h-full w-full overflow-hidden">
        <ContentSection>
          <template #side>
            <SideSection />
          </template>
          <template #side-footer>
            <Tabs class="h-full" :model-value="currentPanel?.id">
              <TabsList class="w-full h-full">
                <template v-for="(panel, index) in allPanels?.panelList" :key="index">
                  <TabsTrigger :value="panel.id" @click="currentPanel = panel" class="h-full w-full">
                    {{panel.name}}
                  </TabsTrigger>
                </template>
              </TabsList>
            </Tabs>
          </template>
          <template #content v-if="currentPanel">
            <UIPanel :panel="currentPanel"/>
          </template>
        </ContentSection>
      </section>
      <client-only>
        <Settings/>
      </client-only>

    </template>
    <template v-if="showIdleScreen">
      <IdleScreen />
    </template>
  </div>
</template>

