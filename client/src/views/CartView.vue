<template>
  <div class="cart">
    <div class="d-flex justify-content-around">
      <div class="h1 text-left me-auto">Your cart</div>
    </div>
  </div>
</template>

<script>
import { fetchBooks } from '@/services/BookService.js'
import { getCurrentCart } from '@/services/CartService.js'

export default {
  data () {
    return {
      books: {},
      cart: {},
      loaded: false
    }
  },
  watch: {
    loaded (newValue) {
      if (newValue) {
        this.$forceUpdate()
      }
    }
  },
  beforeMount: async function () {
    let response = await fetchBooks()
    const books = response.data
    if (books) {
      for (const book of books) {
        this.books[book.id_book] = book
        this.books[book.id_book]['quantity_cart'] = 0
      }
    }
    response = await getCurrentCart()
    const cart = response.data
    if (cart) {
      const cartItems = cart.CartItems
      if (cartItems) {
        for (const cartItem of cartItems) {
          this.cart[cartItem.id_book] = cartItem
          this.books[cartItem.id_book].quantity_cart = cartItem.quantity_cart
        }
      }
    }
    this.loaded = true
  }
}
</script>

<style>

</style>
