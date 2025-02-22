<template>
  <pre>
    PANEL : {{panel?.id}} {{panel?.isLoading}} {{panel.pagesNumber}}
  </pre>
</template>
<script setup lang="ts">
import type { Panel } from '~/core/Domain/UI/Panel';

const { panel } = defineProps<{ panel: Panel }>();
</script>
