<template>
  <body>
    <ImagesLayout />
  </body>
</template>
<script setup>
  import ImagesLayout from './Layouts/ImagesLayout.vue'
</script>
<style scoped>
  * {
    box-sizing: border-box;
  }
  body {
    background: rgb(205, 239, 236);
    background: linear-gradient(
      90deg,
      rgba(205, 239, 236, 1) 0%,
      rgba(205, 239, 236, 0.5) 100%
    );
    overflow: hidden;
  }
</style>
