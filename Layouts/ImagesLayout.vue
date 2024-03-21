<template lang="">
  <div class="min-h-screen h-screen min-w-full relative">
    <header
      class="bg-primary bg-opacity-25 flex flex-col justify-around items-center h-1/4"
    >
      <section class="py-4 flex flex-col justify-center">
        <img src="/logo.svg" alt="Logo" />
      </section>
      <Searcher @load-vendors="loadVendors" @new-search="addNewSession" />
    </header>
    <section
      class="p-8 w-full bg-slate-100 bg-opacity-50 h-full overflow-y-auto h-3/4"
    >
      <section
        class="flex flex-col w-full md:grid md:grid-cols-3 md:gap-2 content-around"
        v-if="showSellers"
      >
        <article v-for="seller in fullSellerData" class="py-4 md:py-0">
          <seller-box
            :url="seller.url"
            :description="seller.description"
            :fullUrl="seller.fullUrl"
            :sellerData="mapSellerInfo(seller)"
            :sellerScore="sellerPoints[seller.identification] || 0"
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
      :url="currentImage.url"
      :fullUrl="currentImage.fullUrl"
      :description="currentImage.description"
      :sellerId="currentImage.sellerId"
      :voted="isThisOneVoted(currentImage.sellerId)"
      @exit-button-action="closeModalImage"
      @up-vote="upVote"
    />
  </div>
  <div v-if="showInvoiceModal">
    <InvoiceModal
      @exit-button-action="closeInvoiceModal"
      :winner="winnerData.sellerName"
      :sellerId="winnerData.sellerId"
    />
  </div>
</template>
<script>
  import { useRuntimeConfig } from '#app'

  import Searcher from '../components/Searcher.vue'
  import SellerBox from '../components/SellerBox.vue'
  import EmptyMessage from '../components/EmptyMessage.vue'
  import ImageModal from '../components/Modal/ImageModal.vue'
  import InvoiceModal from '../components/Modal/InvoiceModal.vue'

  import { getSellers } from '../services/alegraService'

  export default {
    name: 'imagesLayout',
    components: {
      Searcher,
      SellerBox,
      EmptyMessage,
      ImageModal,
      InvoiceModal
    },
    data() {
      return {
        sellersArray: [],
        fullSellerData: [],
        sellerPoints: {},
        showSellers: false,
        showImageModal: false,
        showInvoiceModal: false,
        currentImage: { url: '', description: '', sellerId: -1 },
        sessionVotes: {},
        currentSessionId: '',
        winnerData: {}
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
          url: image.url,
          fullUrl: image.fullUrl,
          description: image.description,
          sellerId: image.sellerId
        }
        this.showImageModal = true
      },
      upVote(sellerId) {
        if (this.sessionVotes[this.currentSessionId].includes(sellerId)) {
          this.sellerPoints[sellerId] = this.sellerPoints[sellerId] - 3
          this.sessionVotes[this.currentSessionId] = this.sessionVotes[
            this.currentSessionId
          ].filter((votes) => votes != sellerId)
          return
        }
        this.sessionVotes[this.currentSessionId] = [
          ...this.sessionVotes[this.currentSessionId],
          sellerId
        ]
        if (this.sellerPoints[sellerId]) {
          this.sellerPoints[sellerId] = this.sellerPoints[sellerId] + 3
          if (this.sellerPoints[sellerId] > 20) this.sellerPoints[sellerId] = 20
        } else {
          this.sellerPoints[sellerId] = 3
        }
        if (this.sellerPoints[sellerId] >= 20) {
          this.showInvoiceModal = true
          const winner = this.sellersArray.find(
            (seller) => seller.identification === sellerId
          )
          this.winnerData = { sellerId: winner.id, sellerName: winner.name }
        }
      },
      closeModalImage() {
        this.showImageModal = false
        this.currentImage = { url: '', description: '', sellerId: -1 }
      },
      closeInvoiceModal() {
        this.showInvoiceModal = false
      },
      // Should delete the previous session if any vote has been made, and should add the new one
      addNewSession(sessionId) {
        //Should erase previouse one or maybe filtering the
        if (this.sessionVotes[this.currentSessionId] === '') {
          delete this.sessionVotes[this.currentSessionId]
        }
        this.currentSessionId = sessionId
        this.sessionVotes[sessionId] = '' // Add new session
      },
      isThisOneVoted(sellerId) {
        return this.sessionVotes[this.currentSessionId].includes(sellerId)
      }
    }
  }
</script>
<style lang=""></style>
