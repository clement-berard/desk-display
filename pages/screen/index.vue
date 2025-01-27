<script setup lang="ts">
import ContentLayout from '@/components/Layouts/Content.vue';
import IdleScreen from '@/components/Layouts/IdleScreen.vue';
import Lights from '@/components/Main/Lights.vue';
import Radios from '@/components/Main/Radios.vue';
import Sand from '@/components/Main/Sand.vue';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Box, LampCeilingIcon, RadioIcon } from 'lucide-vue-next';
import Header from '~/components/Header/Header.vue';
import Settings from '~/components/Settings/Settings.vue';
import MediaPart from '~/components/Side/Media.vue';
import Weather from '~/components/Side/Weather.vue';
import { definePageMeta, storeToRefs, useDisplayStore, useGlobalStore } from '#imports';

const globalStore = useGlobalStore();
const displayStore = useDisplayStore();

const { currentMainScreen, currentSideCarousel } = storeToRefs(globalStore);

const { showMainScreen, showIdleScreen, isLowBrightness } = storeToRefs(displayStore);

definePageMeta({
  layout: 'screen',
});
</script>

<template>
  <div class="h-[600px] w-[1600px]" :class="{'brightness-50': isLowBrightness}">
    <template v-if="showMainScreen">
      <section class="h-[60px] w-full overflow-hidden">
        <Header/>
      </section>
      <section class="h-[540px] w-full overflow-hidden">
        <ContentLayout>
          <template #side>
            <Carousel :opts="{align: 'start'}" orientation="vertical" class="w-full" v-model="currentSideCarousel">
              <CarouselContent class="h-[460px]">
                <CarouselItem class=" h-full" key="media">
                  <MediaPart/>

                </CarouselItem>
                <CarouselItem class=" h-full" key="weather">
                  <Weather/>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </template>
          <template #side-footer>
            <Tabs :default-value="currentMainScreen" class="h-full">
              <TabsList class="w-full h-full">
                <TabsTrigger value="radios" @click="currentMainScreen = 'radios'" class="h-full w-full">
                  <RadioIcon></RadioIcon>
                </TabsTrigger>
                <TabsTrigger value="lights" @click="currentMainScreen = 'lights'" class="h-full w-full">
                  <LampCeilingIcon/>
                </TabsTrigger>
                <TabsTrigger value="box" @click="currentMainScreen = 'box'" class="h-full w-full">
                  <Box></Box>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </template>
          <template #content>
            <Radios v-show="currentMainScreen === 'radios'"/>
            <Lights v-show="currentMainScreen === 'lights'"/>
            <Sand v-show="currentMainScreen === 'box'"/>
          </template>
        </ContentLayout>
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

