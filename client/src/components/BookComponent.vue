<template>
  <div class="book bookcomp card">
    <div class="card-header bg-secondary text-dark text-overflow text-nowrap">
      <div class="card-title m-0 p-0 text-center">
        <div class="h6 p-0 m-0">{{name_book}}</div>
      </div>
    </div>
    <div class="card-body imageblock">
      <span class="badge bg-info btn-text border border-secondary">{{quantity_cart}}</span>
      <img
        :src="url"
        class="card-img-top"
        :alt="name_book">
    </div>
    <div class="footer p-2">
      <div class="card-text d-flex align-content-center justify-content-between">
        <div class="p-1">
          <strong>Qty: </strong>
          <small>{{remaining}}</small>
        </div>
        <div>
          <button
            class="btn btn-info py-1 me-0"
            :disabled="!(remaining - quantity_cart)"
            @click.prevent="addToCart">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </button>
          <button
            class="btn btn-secondary py-1 ms-0"
            :disabled="!(quantity_cart)"
            @click.prevent="subtractFromCart">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
              <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changeInCart } from '@/services/CartService.js'

export default {
  name: 'BookComponent',
  props: {
    id_book: Number,
    name_book: String,
    url: String,
    quantity_book: Number,
    borrowedQty: Number,
    quantity_cart: Number
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
  },
  computed: {
    remaining () {
      return this.quantity_book - this.borrowedQty
    }
  }
}
</script>

<style>
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-text {
  position: absolute;
  right: 5%;
  top: 16%
}

.imageblock {
  height:65%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.imageinbox {
  object-fit: cover
}

@media screen and (min-width: 1024px) {
  .bookcomp {
    max-height: 250px;
  }
}
</style>
