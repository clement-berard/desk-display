<template>
  <div>
    <span class="font-bold">{{ fullDate }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useClock } from '~/composables/useClock';

const { fullDate } = useClock();
</script>
