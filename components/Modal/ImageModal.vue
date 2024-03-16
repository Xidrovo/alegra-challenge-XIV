<template>
  <Modal>
    <article class="relative h-full w-full py-2 overflow-auto min-h-64">
      <a
        :href="fullUrl"
        target="_blank"
        class="h-full w-full flex justify-center"
      >
        <img :src="fullUrl" :alt="description" class="object-cover h-full" />
      </a>
      <section class="absolute bottom-0 left-0">
        <button
          class="px-2 py-4 rounded-md bg-primary text-white font-semibold"
          @click="$emit('upVote', sellerId)"
        >
          Love it!
        </button>
      </section>
    </article>
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'
  export default {
    name: 'ImageModal',
    emit: ['upVote'],
    components: {
      Modal
    },
    props: {
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
      }
    }
  }
</script>
