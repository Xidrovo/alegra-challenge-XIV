<template>
  <img
    :src="item.imgURl"
    :alt="item.description"
    class="object-cover h-32 mx-auto py-2"
  />
  <p class="text-primary font-medium">{{ item.name }}</p>
  <section class="flex flex-col pt-8">
    <p class="text-2xl font-semibold py-2">${{ item.price }}</p>
    <button
      class="py-2 px-4 bg-secondary text-white font-semibold rounded-md"
      @click="$emit('acttionButtonClicked', item)"
    >
      {{ actionButtonName }}
    </button>
  </section>
</template>

<script>
  export default {
    name: 'ItemCard',
    emit: ['acttionButtonClicked'],
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      actionButtonName: {
        type: String,
        default: '¡Comprar!'
      }
    }
  }
</script>
