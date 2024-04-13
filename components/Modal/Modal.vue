<template>
  <article
    class="z-50 bg-slate-700 bg-opacity-50 absolute top-0 h-screen w-screen align-middle flex flex-col justify-center"
    ref="modalContainer"
    @click.self="$emit('exitButtonAction')"
  >
    <div :class="modalClass">
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
          class="px-4 py-2 bg-secondary text-white font-semibold rounded-md hover:bg-secondary-light hover:text-secondary disabled:bg-secondary-dark disabled:cursor-not-allowed"
          @click="$emit('confirmButtonAction')"
          :disabled="!buttonActionEnabled"
          v-if="ConfirmButtonText"
        >
          {{ ConfirmButtonText || 'Confirm' }}
        </button>
        <button
          class="px-4 py-2 text-secondary font-semibold hover:text-secondary-light"
          @click="$emit('exitButtonAction')"
        >
          {{ ExitbuttonText || 'Salir' }}
        </button>
      </footer>
    </div>
  </article>
</template>

<script>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  export default {
    name: 'Modal',
    emits: ['exitButtonAction', 'confirmButtonAction'],
    computed: {
      modalClass() {
        return `bg-white mx-auto max-w-full max-h-full px-8 py-4 flex flex-col justify-between rounded-lg overflow-y-auto ${this.modalWidth}`
      }
    },
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
      },
      buttonActionEnabled: {
        type: Boolean,
        default: true
      },
      modalWidth: {
        type: String,
        default: ''
      }
    }
  }
</script>
