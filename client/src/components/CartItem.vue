<template>
  <div class="container-md border border-dark cartitem my-1 p-0 d-flex align-items-center">
    <div class="container-fluid row d-flex align-items-center">
      <div class="text-center vh-16 col-2">
        <img
          :src="url"
          class="image-thumb"
          :alt="name_book">
      </div>
      <div class="col d-flex flex-column text-center text-truncate">
        <div>
          <strong>Title</strong>
        </div>
        <div>
          {{name_book}}
        </div>
      </div>
      <div class="col-2 d-flex flex-column text-center text-truncate">
        <div>
          <strong>Available</strong>
        </div>
        <div>
          {{quantity_available}}
        </div>
      </div>
      <div class="col p-5 btn-group btn-group-sm">
        <button
          type="button"
          class="btn btn-info"
          :disabled="(quantity_available - quantity_cart) < 1"
          @click.prevent="addToCart">
          <i class="bi bi-cart-plus" />
        </button>
        <span class="btn bg-dark text-light"><small>{{quantity_cart}}</small></span>
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="(quantity_cart < 1)"
          @click.prevent="subtractFromCart">
          <i class="bi bi-cart-dash" />
        </button>
      </div>
      <div class="col-1 me-2">
        <button type="button"
          class="btn btn-danger px-3">
          <i class="bi bi-cart-x"
          @click.prevent="deleteCartItem"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { changeInCart, deleteCartItem } from '@/services/CartService.js'

export default {
  props: {
    id_book: Number,
    name_book: String,
    url: String,
    quantity_available: Number,
    quantity_cart: Number
  },
  data () {
    return {

    }
  },
  methods: {
    addToCart: async function () {
      const itemData = await changeInCart(this.id_book, true)
      this.$emit('cart-change', itemData.data)
    },
    subtractFromCart: async function () {
      const itemData = await changeInCart(this.id_book, false)
      this.$emit('cart-change', itemData.data)
    },
    deleteCartItem: async function () {
      await deleteCartItem(this.id_book)
      this.$emit('cart-change', {
        idBook: this.id_book,
        cartItem: null
      })
    }
  }
}
</script>

<style>
.image-thumb {
  width: 9vh;
}
.cartitem {
  height: 17vh
}
@media screen and (max-width: 500px) {
  .cartitem {
    min-height: 40vh;
  }
}
</style>
