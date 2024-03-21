<template>
  <Modal
    :ConfirmButtonText="'¡Crear factura!'"
    :buttonActionEnabled="Object.keys(cart).length > 0 || !loading"
    @confirm-button-action="createInvoice()"
  >
    <section class="px-2 md:px-0 md:w-2/3 mx-auto">
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
            @acttion-button-clicked="addRemoveCart"
            :actionButtonName="
              isInCart(videogame.id)
                ? 'Quitar del carrito'
                : 'Agregar al carrito'
            "
          />
        </article>
      </section>
    </section>
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'
  import ItemCard from '../ItemCard.vue'
  import { videogames } from '../../utils/items.js'
  import { createInvoice } from '../../services/alegraService'
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
        invoiceText: ''
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
        const invoice = await createInvoice(
          config.public.alegraApiKey,
          Object.values(this.cart),
          this.sellerId
        )
        this.invoiceText =
          invoice?.status === 200
            ? '¡Factura creada correctamente!'
            : '¡Ha ocurrido algo al crear la factura!'
      }
    }
  }
</script>
