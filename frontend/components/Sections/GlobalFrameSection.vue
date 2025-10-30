<template>
  <div class="full-wh" :class="{'brightness-90': isLowBrightness, 'night-screen-mode': forceBrightnessNightShift}">
    <template v-if="!isIdleState">
      <section class="w-full overflow-hidden" :style="{height:`${FRAME_HEADER_HEIGHT}px`}">
        <slot name="header"/>
      </section>
      <section class="w-full overflow-hidden" :style="{height:`${FRAME_BODY_HEIGHT}px`}">
        <div class="full-wh grid gap-2 grid-cols-12">
          <div class="col-span-3 flex flex-col" :style="{height:`${FRAME_BODY_HEIGHT}px`}">
            <div class="basis-[85%] flex-grow overflow-hidden">
              <slot name="side-content"/>
            </div>
            <div class="basis-[15%] flex-grow-0">
              <slot name="side-footer"/>
            </div>
          </div>
          <div class="col-span-9 w-full p-1" :style="{height:`${FRAME_BODY_HEIGHT}px`}">
            <slot name="content"/>
          </div>
        </div>
      </section>
    </template>
    <slot name="idle" v-if="isIdleState"/>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from '#imports';
import { FRAME_BODY_HEIGHT, FRAME_HEADER_HEIGHT } from '~/constants/app.constants';
import { useDisplayStore } from '~/stores/displayStore';

const displayStore = useDisplayStore();

const { isLowBrightness, forceBrightnessNightShift } = storeToRefs(displayStore);

const { isIdleState = false } = defineProps<{ isIdleState: boolean }>();
</script>
