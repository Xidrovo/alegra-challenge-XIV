<template lang="">
  <div class="h-screen min-w-full relative">
    <header
      class="bg-primary bg-opacity-25 p-10 h-1/4 flex flex-col justify-center items-center"
    >
      <section>
        <img src="/logo.svg" alt="Logo" />
      </section>
      <section class="font-semibold text-4xl">
        <h2>Imágenes del mundo</h2>
      </section>
    </header>
    <section
      class="p-10 w-full bg-slate-100 bg-opacity-50 h-full overflow-y-auto"
    >
      <Searcher @load-vendors="loadVendors" />
      <section class="grid grid-cols-3 gap-2" v-if="showSellers">
        <article v-for="seller in fullSellerData">
          <seller-box
            :url="seller.url"
            :description="seller.description"
            :fullUrl="seller.fullUrl"
            :sellerData="mapSellerInfo(seller)"
            @show-modal-image="showModalImage"
          />
        </article>
      </section>
      <section v-else class="h-2/3 flex flex-col justify-center">
        <EmptyMessage />
      </section>
    </section>
  </div>
  <div v-if="showImageModal">
    <ImageModal
      :fullUrl="currentImage.url"
      :description="currentImage.description"
      :sellerId="currentImage.sellerId"
      @exit-button-action="closeModalImage"
      @up-vote="upVote"
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
        sellerPoints: {},
        showSellers: false,
        showImageModal: false,
        currentImage: { url: '', description: '', sellerId: -1 }
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
          description: image.description,
          sellerId: image.sellerId
        }
        this.showImageModal = true
      },
      upVote(sellerId) {
        if (this.sellerPoints[sellerId]) {
          this.sellerPoints[sellerId] = this.sellerPoints[sellerId] + 3
          if (this.sellerPoints[sellerId] > 20) this.sellerPoints[sellerId] = 20
        } else {
          this.sellerPoints[sellerId] = 3
        }
        if (this.sellerPoints[sellerId] >= 20) {
          console.log('we have a winner!!!')
        }
      },
      closeModalImage() {
        this.showImageModal = false
        this.currentImage = { url: '', description: '', sellerId: -1 }
      }
    }
  }
</script>
<style lang=""></style>
