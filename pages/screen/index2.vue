<script setup lang="ts">
import Lights from '@/components/Main/Lights.vue';
import Radios from '@/components/Main/Radios.vue';
import Sand from '@/components/Main/Sand.vue';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Box, LampCeilingIcon, RadioIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import Header from '~/components/Header/Header.vue';
import Settings from '~/components/Settings/Settings.vue';
import MediaPart from '~/components/Side/Media.vue';
import Weather from '~/components/Side/Weather.vue';
import { definePageMeta, useGlobalStore } from '#imports';

const globalStore = useGlobalStore();

const { currentMainScreen, currentSideCarousel } = storeToRefs(globalStore);

const withFrame = true; //import.meta.dev;

definePageMeta({
  layout: withFrame ? 'screen' : 'default',
});
</script>

<template>
  <div class="flex w-full flex-col h-full">
    <Header/>
    <main class="flex-1 flex flex-col gap-2 h-full">
      <div class="grid gap-4 grid-cols-12 h-[550px]">
        <Card class="col-span-3 h-full rounded-none border-0 overflow-y-auto bg-background">
          <div class="flex flex-col h-full justify-between">
            <main class=" h-full overflow-y-hidden mb-4 p-2">
              <Carousel :opts="{align: 'start'}" orientation="vertical" class="w-full" v-model="currentSideCarousel">
                <CarouselContent class="h-[500px]">
                  <CarouselItem class="h-full overflow-hidden" key="media">
                    <MediaPart/>
                  </CarouselItem>
                  <CarouselItem class="h-full overflow-hidden" key="weather">
                    <Weather/>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </main>
            <footer class="justify-center justify-items-center flex p-2">
              <Tabs :default-value="currentMainScreen" class="w-full">
                <TabsList class="w-full">
                  <TabsTrigger value="radios" @click="currentMainScreen = 'radios'" class="h-12 w-full">
                    <RadioIcon></RadioIcon>
                  </TabsTrigger>
                  <TabsTrigger value="lights" @click="currentMainScreen = 'lights'" class="h-12 w-full">
                    <LampCeilingIcon/>
                  </TabsTrigger>
                  <TabsTrigger value="box" @click="currentMainScreen = 'box'" class="h-12 w-full">
                    <Box></Box>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </footer>
          </div>
        </Card>
        <Card class="col-span-9 rounded-none h-full p-2 border-0 bg-background">
          <Radios v-if="currentMainScreen === 'radios'"/>
          <Lights v-if="currentMainScreen === 'lights'"/>
          <Sand v-if="currentMainScreen === 'box'"/>
<!--          <transition-->
<!--              enter-from-class="translate-x-[150%] opacity-0"-->
<!--              enter-active-class="transition duration-300"-->
<!--          >-->
<!--            -->
<!--          </transition>-->
<!--          <transition-->
<!--              enter-from-class="translate-x-[150%] opacity-0"-->
<!--              enter-active-class="transition duration-300"-->
<!--          >-->

<!--          </transition>-->
        </Card>
      </div>
    </main>
    <client-only>
      <Settings/>
    </client-only>
  </div>
</template>

