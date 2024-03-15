<template lang="">
  <article class="p-8 flex flex-col h-full items-center">
    <div class="relative group h-2/3 w-full cursor-pointer" @click="showBigUrl">
      <img :src="url" :alt="description" class="h-full object-cover w-full" />
      <div
        class="absolute inset-0 bg-slate-700 opacity-0 group-hover:opacity-75 transition-opacity duration-300"
      ></div>
    </div>
    <p class="text-xl px-2 py-4 font-medium text-center">
      <strong>Descripción: </strong>{{ description }}
    </p>
    <p>{{ sellerData }}</p>
  </article>
</template>
<script>
  export default {
    name: 'sellerBox',
    props: {
      description: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      fullUrl: {
        type: String,
        default: ''
      },
      sellerData: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      showBigUrl() {
        console.log('new dialog should open')
      }
    }
  }
</script>
<style lang=""></style>
