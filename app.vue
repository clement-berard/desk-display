<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Panel } from '~/core/Domain/UI/Panel';

const panel = new Panel({ id: 'panel1' });
console.log('panel', panel);
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
