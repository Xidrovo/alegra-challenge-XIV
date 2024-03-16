<template>
  <article
    class="z-50 bg-slate-700 bg-opacity-50 absolute top-0 h-screen w-screen align-middle flex flex-col justify-center"
    ref="modalContainer"
    @click.self="$emit('exitButtonAction')"
  >
    <div
      class="bg-white min-w-1/2 mx-auto min-h-1/2 max-w-full max-h-full px-8 py-4 flex flex-col justify-between rounded-lg overflow-y-auto"
    >
      <header class="flex flex-row justify-between w-full">
        <p>{{ title }}</p>
        <button
          class="px-4 py-2 rounded-full font-bold hover:text-primary"
          @click="$emit('exitButtonAction')"
        >
          X
        </button>
      </header>
      <slot></slot>
      <footer class="flex flex-row justify-center space-x-12 items-baseline">
        <button
          class="px-4 py-2 bg-secondary text-white font-semibold rounded-md hover:bg-secondary-light hover:text-secondary"
          @click="$emit('exitButtonAction')"
          v-if="ConfirmButtonText"
        >
          Confirm
        </button>
        <button
          class="px-4 py-2 text-secondary font-semibold hover:text-secondary-light"
          @click="$emit('exitButtonAction')"
        >
          {{ ConfirmButtonText || 'Salir' }}
        </button>
      </footer>
    </div>
  </article>
</template>

<script>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  export default {
    name: 'Modal',
    emits: ['exitButtonAction'],
    props: {
      title: {
        type: String,
        default: ''
      },
      ExitbuttonText: {
        type: String,
        default: ''
      },
      ConfirmButtonText: {
        type: String,
        default: ''
      },
      ConfirmButtonAction: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
