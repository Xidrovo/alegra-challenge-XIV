<template>
  <Modal
    :ConfirmButtonText="showCrearFactura"
    :buttonActionEnabled="buttonEnabled"
    :modalWidth="modalWidth"
    @confirm-button-action="createInvoice()"
  >
    <section class="px-2 md:px-0 md:w-2/3 mx-auto" v-if="!showInvoice">
      <p v-if="invoiceText" class="text-4xl text-center py-4 font-semibold">
        {{ invoiceText }}
      </p>
      <h1 class="text-left py-4 md:py-0 md:text-center text-2xl">
        ¡Vaya parece que
        <strong class="font-semibold text-primary">{{ winner }}</strong> ha
        ganado!
      </h1>
      <p class="text-left md:text-center text-xl py-2">
        ¡Ha llegado el momento de la acción! Realiza una compra y tu factura
        será elaborada por el vendedor ganador. ¡Es tu oportunidad de elegir
        entre una amplia selección de juegos! Sumérgete en aventuras épicas,
        desafíos emocionantes y mundos fascinantes. ¿Listo para comenzar?
        ¡Selecciona tus juegos favoritos y da el primer paso hacia una
        experiencia inolvidable!
      </p>
      <section class="flex flex-wrap py-8 space-x-4 justify-around">
        <article
          v-for="videogame in videogames"
          class="w-full py-8 md:w-1/4 md:py-4 flex flex-col justify-between"
        >
          <ItemCard
            :item="videogame"
            @action-button-clicked="addRemoveCart"
            :actionButtonName="
              isInCart(videogame.id)
                ? 'Quitar del carrito'
                : 'Agregar al carrito'
            "
          />
        </article>
      </section>
    </section>
    <!-- Should move the code below to a new subComponent maybe -->
    <!-- Invoice information section -->
    <section class="px-2 md:px-0 md:w-2/3 mx-auto min-w-full" v-else>
      <article class="space-y-4 mb-4">
        <img src="/logo.svg" alt="Logo" />
        <p class="text-primary text-2xl font-semibold text-left mb-4">
          ¡Gracias por comprar!
        </p>
      </article>
      <section
        class="flex flex-col md:flex-row justify-between space-y-12 md:space-y-0 md:space-x-12 py-4"
      >
        <article class="w-full md:w-1/2">
          <p class="font-semibold pb-4 text-secondary">
            Información del cliente
          </p>
          <div class="w-full flex justify-between">
            <label class="font-semibold">Nombre:</label>
            <p class="text-left w-1/2">{{ invoice.clientInfo.name }}</p>
          </div>
          <div class="w-full flex justify-between">
            <label class="font-semibold">Identification:</label>
            <p class="text-left w-1/2">
              {{ invoice.clientInfo.identification }}
            </p>
          </div>
          <div class="w-full flex justify-between">
            <label class="font-semibold">Email:</label>
            <p class="text-left w-1/2">
              {{ invoice.clientInfo.email }}
            </p>
          </div>
        </article>
        <article class="w-full md:w-1/2">
          <p class="font-semibold pb-4 text-secondary">
            Información del vendedor
          </p>
          <div class="w-full flex justify-between">
            <label class="font-semibold">Nombre:</label>
            <p class="text-left w-1/2">{{ invoice.seller.name }}</p>
          </div>
          <div class="w-full flex justify-between">
            <label class="font-semibold">Identification:</label>
            <p class="text-left w-1/2">
              {{ invoice.seller.identification }}
            </p>
          </div>
        </article>
      </section>
      <!-- item table information -->
      <section class="w-full my-4">
        <table class="w-full table-auto border">
          <thead class="bg-primary-light">
            <tr class="table-row">
              <th>No.</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoice.items">
              <th>{{ index + 1 }}</th>
              <th>{{ item.name }}</th>
              <th>{{ item.quantity }}</th>
              <th>${{ item.total }}</th>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- Pricing -->
      <section class="mb-4">
        <div class="flex justify-end space-x-4">
          <label class="font-semibold">Subtotal:</label>
          <p class="w-1/4 text-right">{{ invoice.subtotal }}</p>
        </div>
        <div class="flex justify-end space-x-4">
          <label class="font-semibold">Tax({{ invoice.tax }}%): </label>
          <p class="w-1/4 text-right">0</p>
        </div>
        <div class="flex justify-end space-x-4">
          <label class="font-semibold">Total:</label>
          <p class="w-1/4 text-right">{{ invoice.total }}</p>
        </div>
      </section>
    </section>
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'
  import ItemCard from '../ItemCard.vue'
  import { getItems, createInvoice } from '../../services/alegraService'
  import { useRuntimeConfig } from '#app'

  export default {
    name: 'InvoiceModal',
    components: {
      Modal,
      ItemCard
    },
    data() {
      return {
        cart: {},
        loading: false,
        invoiceText: '',
        videogames: [],
        invoice: {},
        showInvoice: false
      }
    },
    computed: {
      buttonEnabled() {
        return Object.keys(this.cart).length > 0 && !this.loading
      },
      showCrearFactura() {
        return this.showInvoice ? '' : '¡Crear factura!'
      },
      modalWidth() {
        return !this.showInvoice ? 'w-full' : 'w-full md:w-1/2'
      }
    },
    props: {
      sellerId: {
        type: String,
        default: ''
      },
      winner: {
        type: String,
        default: 'Seller'
      }
    },
    async mounted() {
      const config = useRuntimeConfig()
      const items = await getItems(config.public.alegraApiKey)
      this.videogames = [...items] || []
    },
    methods: {
      addRemoveCart(item) {
        if (this.cart[item.id]) {
          // remover de carrito
          delete this.cart[item.id]
        } else {
          this.cart[item.id] = item
        }
      },
      isInCart(itemId) {
        return !!this.cart[itemId]
      },
      async createInvoice() {
        const config = useRuntimeConfig()
        this.loading = true
        try {
          this.invoice = await createInvoice(
            config.public.alegraApiKey,
            Object.values(this.cart),
            this.sellerId
          )
          // this.invoice = { ...this.invoice }
          this.showInvoice = true
        } catch (error) {
          this.invoiceText = '¡Ha ocurrido algo al crear la factura!'
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
<style scoped>
  tbody tr:nth-child(odd) {
    background-color: #e9b4a8;
  }
  tbody tr:nth-child(even) {
    background-color: #f1f5f9;
  }

  th {
    /* font-bold p-2 border-b text-left */
    font-weight: 600;
    text-align: left;
    padding: 0.5rem;
    border-bottom-width: 1px;
  }
</style>
