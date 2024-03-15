<template>
  <Modal>
    <img :src="fullUrl" :alt="description" />
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'
  export default {
    name: 'ImageModal',
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
      }
    }
  }
</script>
