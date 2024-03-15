<template lang="">
  <section class="flex flex-col space-y-4 items-center w-1/2 mx-auto">
    <input
      v-model="searchTerm"
      @keyup.enter="getImages"
      placeholder="Buscar..."
      type="text"
      class="rounded-lg px-8 py-4 min-w-full"
    />
    <button
      @click="getImages"
      :class="[
        'h-12 rounded-lg px-8 py-2 bg-secondary text-white font-semibold ',
        `${!loading ? 'hover:bg-secondary-light' : 'cursor-not-allowed'}`
      ]"
      :disabled="loading"
    >
      <p v-if="!loading">Buscar</p>
      <div v-else>
        <Loading extraClass="absolute inset-0" />
      </div>
    </button>
    <br />
  </section>
</template>
<script>
  import { getImages } from '../services/imageService'
  import Loading from './Loading.vue'

  import { useRuntimeConfig } from '#app'

  export default {
    name: 'searcher',
    emits: ['loadVendors'],
    data() {
      return {
        searchTerm: '',
        images: [],
        imageCounter: 0,
        loading: false
      }
    },
    watch: {
      searchTerm(newValue, oldValue) {
        if (newValue != oldValue) {
          this.pageNumber = 0
        }
      }
    },
    methods: {
      async getImages() {
        const config = useRuntimeConfig()
        this.loading = true
        const returnedImages = await getImages(
          this.searchTerm,
          config.public.unsplashAccessKey,
          this.imageCounter
        )
        this.loading = false
        this.$emit('loadVendors', returnedImages)
        this.images = returnedImages
        this.imageCounter++
      }
    }
  }
</script>
<style lang=""></style>
