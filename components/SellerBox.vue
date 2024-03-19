<template class="p-8 flex flex-col h-full items-center">
  <div class="relative group h-2/3 w-full cursor-pointer" @click="showBigUrl">
    <img :src="url" :alt="description" class="h-full object-cover w-full" />
    <div
      class="rounded-lg absolute inset-0 bg-slate-700 opacity-0 group-hover:opacity-75 transition-opacity duration-300"
    ></div>
    <section
      class="absolute top-0 w-full flex justify-between py-4 px-2 md:px-4"
    >
      <!-- score section -->
      <div
        class="rounded-lg md:h-8 px-2 md:px-8 p-2 font-semibold bg-primary text-white"
      >
        <section
          class="flex flex-col items-center my-auto justify-center h-full"
        >
          <p>Puntaje: {{ sellerScore }}</p>
        </section>
      </div>
      <section
        class="text font-bold px-4 md:px-16 py-2 bg-white bg-opacity-50 items-center my-auto flex flex-col items-center my-auto justify-center h-full rounded-lg md:h-8"
      >
        <p>{{ sellerData.name }}</p>
      </section>
    </section>
    <article class="absolute bottom-0 flex w-full md:h-1/4">
      <div
        class="relative px-2 md:py-4 bg-secondary bg-opacity-75 w-full rounded-b-lg"
      >
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
      },
      sellerScore: {
        type: Number,
        default: 0
      }
    },
    methods: {
      showBigUrl() {
        this.$emit('showModalImage', {
          url: this.url,
          fullUrl: this.fullUrl,
          description: this.description,
          sellerId: this.sellerData.id
        })
      }
    }
  }
</script>
<style lang=""></style>
