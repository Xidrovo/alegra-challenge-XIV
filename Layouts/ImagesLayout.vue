<template lang="">
  <div class="min-h-screen min-w-screen">
    <header class="bg-primary bg-opacity-25 p-10">
      <article class="flex flex-col items-center space-y-4">
        <section>
          <img src="/logo.svg" alt="Logo" />
        </section>
        <section class="ml-24 font-semibold text-4xl">
          <h2>Imágenes del mundo</h2>
        </section>
      </article>
    </header>
    <section class="p-10 w-full bg-slate-100 bg-opacity-50 min-h-screen">
      <Searcher @load-vendors="loadVendors" />
      <section class="grid grid-cols-3" v-if="showSellers">
        <article v-for="seller in fullSellerData" class="h-full">
          <seller-box
            :url="seller.url"
            :description="seller.description"
            :fullUrl="seller.fullUrl"
            :sellerData="mapSellerInfo(seller)"
          />
        </article>
      </section>
      <section v-else>
        <EmptyMessage />
      </section>
    </section>
  </div>
  <div v-if="showImageModal">
    <ImageModal
      :fullUrl="currentImage.url"
      :description="currentImage.description"
    />
  </div>
</template>
<script>
  import { useRuntimeConfig } from '#app'

  import Searcher from '../components/Searcher.vue'
  import SellerBox from '../components/SellerBox.vue'
  import EmptyMessage from '../components/EmptyMessage.vue'
  import ImageModal from '../components/Modal/ImageModal.vue'

  import { getSellers } from '../services/alegraService'

  export default {
    name: 'imagesLayout',
    components: {
      Searcher,
      SellerBox,
      EmptyMessage,
      ImageModal
    },
    data() {
      return {
        sellersArray: [],
        fullSellerData: [],
        showSellers: false,
        showImageModal: false,
        currentImage: { url: '', description: '' }
      }
    },
    async mounted() {
      const config = useRuntimeConfig()
      this.sellersArray = await getSellers(config.public.alegraApiKey)
    },
    methods: {
      loadVendors(images) {
        this.fullSellerData = [...this.sellersArray].splice(
          0,
          images.length - 1
        ) // This way we can handle if the images information is less than expected (6)
        if (images.length === 0) {
          // We shall not show anything if thre's no image to show
          this.showSellers = false
        }
        images.forEach((imageData, index) => {
          this.showSellers = true
          this.fullSellerData[index] = {
            ...this.sellersArray[index],
            ...imageData
          }
        })
      },
      mapSellerInfo(seller) {
        return {
          name: seller.name,
          id: seller.identification,
          observations: seller.observations
        }
      },
      showModalImage(image) {
        this.currentImage = {
          url: image.fullUrl,
          description: image.description
        }
        this.showImageModal = true
      }
    }
  }
</script>
<style lang=""></style>
