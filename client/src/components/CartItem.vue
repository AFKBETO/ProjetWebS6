<template>
  <div class="container-md border cartitem mx-3 p-0 d-flex align-items-center">
    <div class="container-fluid row d-flex align-items-center">
      <div class="text-center vh-16 col-2">
        <img
          :src="url"
          class="image-thumb"
          :alt="name_book">
      </div>
      <div class="col">
        {{name_book}}
      </div>
      <div class="col">Remaining: {{quantity_available}}</div>
      <div class="col btn-group btn-group-sm">
        <button
          type="button"
          class="btn btn-info"
          :disabled="(quantity_available - quantity_cart) < 1"
          @click.prevent="addToCart">
          <i class="bi bi-cart-plus" />
        </button>
        <span class="px-2 bg-dark text-light"><small>{{quantity_cart}}</small></span>
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="(quantity_cart < 1)"
          @click.prevent="subtractFromCart">
          <i class="bi bi-cart-dash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { changeInCart } from '@/services/CartService.js'

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
    }
  }
}
</script>

<style>
.image-thumb {
  width: 10vh;
}
.cartitem {
  height: 16vh
}
</style>
