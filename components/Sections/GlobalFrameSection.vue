<template>
  <div class="full-wh" :class="{'brightness-50': isLowBrightness, 'night-screen-mode': forceBrightnessNightShift}">
    <template v-if="!isIdleState">
      <section class="h-[10%] w-full overflow-hidden">
        <slot name="header" />
      </section>
      <section class="h-[90%] w-full overflow-hidden">
        <div class="full-wh grid gap-2 grid-cols-12">
          <div class="col-span-3 flex flex-col h-full">
            <div class="basis-[85%] flex-grow overflow-hidden">
              <slot name="side-content" />
            </div>
            <div class="basis-[15%] flex-grow-0">
              <slot name="side-footer" />
            </div>
          </div>
          <div class="col-span-9 h-full w-full p-1">
            <slot name="content" />
          </div>
        </div>
      </section>
    </template>
    <slot name="idle" v-if="isIdleState"/>
  </div>
</template>
<script setup lang="ts">
import { useDisplayStore } from '~/stores/displayStore';
import { storeToRefs } from '#imports';

const displayStore = useDisplayStore();

const { isLowBrightness, forceBrightnessNightShift } = storeToRefs(displayStore);

const { isIdleState = false } = defineProps<{ isIdleState: boolean }>();
</script>
