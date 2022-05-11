<template>
  <div class="cart">
    <div class="d-flex justify-content-around">
      <div class="h1 text-left me-auto">Your cart</div>
    </div>
    <CartItem
      v-for="(item, index) of cart"
      :key="index"
      :id_book="item.id_book"
      :name_book="item.name_book"
      :url="item.url"
      :quantity_available="item.quantity_available"
      :quantity_cart="item.quantity_cart"
      @cart-change="cartChange" />
  </div>
</template>

<script>
import { fetchBooks } from '@/services/BookService.js'
import { getCurrentCart } from '@/services/CartService.js'
import CartItem from '../components/CartItem.vue'

export default {
  data () {
    return {
      cart: {},
      loaded: false
    }
  },
  components: {
    CartItem
  },
  watch: {
    loaded (newValue) {
      if (newValue) {
        this.$forceUpdate()
      }
    }
  },
  beforeMount: async function () {
    let response = await getCurrentCart()
    const cart = response.data
    if (cart) {
      const cartItems = cart.CartItems
      if (cartItems) {
        for (const cartItem of cartItems) {
          this.cart[cartItem.id_book] = cartItem
          this.cart[cartItem.id_book]['quantity_available'] = 0
        }
      }
    }
    response = await fetchBooks()
    const books = response.data
    if (books) {
      for (const book of books) {
        if (this.cart[book.id_book]) {
          this.cart[book.id_book].quantity_available = book.quantity_book - book.borrowedQty
          this.cart[book.id_book]['name_book'] = book.name_book
          this.cart[book.id_book]['url'] = book.url
        }
      }
    }
    this.loaded = true
  },
  methods: {
    cartChange: function (itemData) {
      const { idBook, cartItem } = itemData
      if (cartItem) {
        this.cart[idBook].quantity_cart = cartItem.quantity_cart
      } else {
        delete this.cart[idBook]
      }
      this.$forceUpdate()
    }
  }
}
</script>

<style>

</style>
