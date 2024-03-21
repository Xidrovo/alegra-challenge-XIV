<template lang="">
  <section
    class="flex flex-col space-y-2 items-center w-1/2 mx-auto justify-between"
  >
    <input
      v-model="searchTerm"
      @keyup.enter="getImages"
      placeholder="Buscar..."
      type="text"
      class="rounded-lg px-8 py-2 min-w-full"
    />
    <button
      @click="getImages"
      :class="[
        'rounded-lg px-8 py-2 bg-secondary text-white font-semibold disabled:bg-secondary-dark ',
        `${!loading ? 'hover:bg-secondary-light' : 'cursor-not-allowed'}`
      ]"
      :disabled="loading"
    >
      <p>Buscar</p>
    </button>
    <br />
  </section>
</template>
<script>
  import { getImages } from '../services/imageService'
  import { uuid } from 'vue-uuid'

  import { useRuntimeConfig } from '#app'

  export default {
    name: 'searcher',
    emits: ['loadVendors', 'newSearch'],
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
        if (!this.searchTerm) return
        const newSearch = uuid.v1()
        const config = useRuntimeConfig()
        this.loading = true
        const returnedImages = await getImages(
          this.searchTerm,
          config.public.unsplashAccessKey,
          this.imageCounter
        )
        this.loading = false
        this.$emit('loadVendors', returnedImages)
        this.$emit('newSearch', newSearch)
        this.images = returnedImages
        this.imageCounter++
      }
    }
  }
</script>
<style lang=""></style>
