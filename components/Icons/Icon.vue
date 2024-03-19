<template>
  <div :style="{ width: width, height: height }" class="icon-wrapper">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      width: {
        type: String,
        required: true
      },
      height: {
        type: String,
        required: true
      }
    }
  }
</script>

<style>
  .icon-wrapper {
    display: inline-block;
    line-height: 0;
  }
</style>
