<script setup lang="ts">
import { computed, ref } from '#imports';
import { Checkbox } from '@/components/ui/checkbox';

import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';

const wsNodeRedStore = useWsNodeRedStore();

const shouldAutoPlay = ref(false);

const currentRadioUrl = computed(() => {
  return wsNodeRedStore.dataWsNodeRed?.sonos_player_media?.select_radio_details.out_media_url || '';
});
</script>

<template>
  <div>
    <div class="mt-4">
      <div class="flex items-center space-x-2 mb-4">
        <Checkbox id="terms" v-model="shouldAutoPlay"/>
        <label for="terms">Auto play</label>
      </div>
      <audio controls :src="currentRadioUrl" :autoplay="shouldAutoPlay" class="w-full"></audio>
    </div>
  </div>
</template>
