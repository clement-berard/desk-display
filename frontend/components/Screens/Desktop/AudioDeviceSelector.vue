<script setup lang="ts">
import { computed, ref, storeToRefs, useMediaPlayerStore } from '#imports';
import { Checkbox } from '@/components/ui/checkbox';

const mediaPlayerStore = useMediaPlayerStore();
const { mediaPlayer } = storeToRefs(mediaPlayerStore);

const shouldAutoPlay = ref(false);

const currentRadioUrl = computed(() => {
  return mediaPlayer?.value?.selectedRadio?.out_media_url || '';
});
</script>

<template>
  <div>
    <div class="mt-4">
      <div class="flex items-center space-x-2 mb-4">
        <Checkbox id="terms" v-model="shouldAutoPlay" />
        <label for="terms">Auto play</label>
      </div>
      <audio controls :src="currentRadioUrl" :autoplay="shouldAutoPlay" class="w-full"></audio>
    </div>
  </div>
</template>
