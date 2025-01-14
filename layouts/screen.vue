<template>
  <div id="screen-display">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  $RES_X: 1600px;
  $RES_Y: 600px;
  div#screen-display {
    margin: 2rem;
    outline: 2rem solid black;
    width: $RES_X;
    min-width: $RES_X;
    max-width: $RES_X;
    height: $RES_Y;
    min-height: $RES_Y;
    max-height: $RES_Y;
    overflow: hidden;
  }
</style>
