<template>
  <Modal>
    <article class="relative h-full w-full py-2 overflow-auto min-h-64">
      <a
        :href="fullUrl"
        target="_blank"
        class="h-full w-full flex justify-center"
      >
        <img :src="url" :alt="description" class="object-cover h-full" />
      </a>
      <section class="absolute bottom-0 left-0">
        <button
          class="px-4 py-4 rounded-full bg-primary bg-opacity-75 flex flex-col justify-center"
          @click="upVote"
        >
          <EmptyHeartIcon v-if="chosen" />
          <HeartIcon v-else />
        </button>
      </section>
    </article>
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'
  import EmptyHeartIcon from '../Icons/EmptyHeartIcon.vue'
  import HeartIcon from '../Icons/HeartIcon.vue'

  export default {
    name: 'ImageModal',
    emit: ['upVote'],
    components: {
      Modal,
      EmptyHeartIcon,
      HeartIcon
    },
    data() {
      return {
        chosen: false
      }
    },
    mounted() {
      this.chosen = !this.voted
    },
    props: {
      url: {
        type: String,
        required: true
      },
      fullUrl: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: 'Image description'
      },
      sellerId: {
        type: String,
        default: ''
      },
      voted: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      upVote() {
        this.chosen = !this.chosen
        this.$emit('upVote', this.sellerId)
      }
    }
  }
</script>
