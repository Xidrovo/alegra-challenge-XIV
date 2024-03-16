<template class="p-8 flex flex-col h-full items-center rounded-lg">
  <div class="relative group h-2/3 w-full cursor-pointer" @click="showBigUrl">
    <img
      :src="url"
      :alt="description"
      class="h-full object-cover w-full rounded-lg"
    />
    <div
      class="rounded-lg absolute inset-0 bg-slate-700 opacity-0 group-hover:opacity-75 transition-opacity duration-300"
    ></div>
    <article class="absolute bottom-0 flex w-full h-1/4">
      <div class="relative px-2 py-4 bg-secondary w-full rounded-b-lg">
        <div class="  ">
          Hey soy
          <span class="font-semibold text-lg text-primary">{{
            sellerData.name
          }}</span>
          qué te parece esto!
        </div>
        <p class="text-xl px-2 py-4 font-medium text-center my-auto">
          {{ description }}
        </p>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    name: 'sellerBox',
    emits: ['showModalImage'],
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
        this.$emit('showModalImage', {
          fullUrl: this.fullUrl,
          description: this.description,
          sellerId: this.sellerData.id
        })
      }
    }
  }
</script>
<style lang=""></style>
