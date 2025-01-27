<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { nodeRedClient } from '~/services/api/node-red';
import { useGlobalStore } from '~/stores/globalStore';

const globalStore = useGlobalStore();

const { isIdleLongTime } = storeToRefs(globalStore);

watch(isIdleLongTime, async (stateIdle) => {
  if (!import.meta.env.DEV) {
    if (stateIdle) {
      await nodeRedClient.post('desk-display', {
        json: {
          action: 'action_hard_display',
          payload: {
            action: 'idle_mode',
          },
        },
      });
    } else {
      await nodeRedClient.post('desk-display', {
        json: {
          action: 'action_hard_display',
          payload: {
            action: 'active_mode',
          },
        },
      });
    }
  }
});
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
