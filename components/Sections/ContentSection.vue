<template>
  <div class="h-[540px] grid gap-2 grid-cols-12">
    <div class="col-span-3 h-full overflow-hidden">
      <div class="flex flex-col h-full">
        <div class="flex-grow h-full w-full overflow-hidden">
          <slot name="side" />
        </div>
        <div class="h-1/5 p-1">
          <slot name="side-footer" />
        </div>
      </div>
    </div>
    <div class="col-span-9 h-full w-full p-1">
      <slot name="content" />
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
