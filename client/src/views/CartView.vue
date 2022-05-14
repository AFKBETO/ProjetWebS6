<template>
  <div class="cart container-fluid">
    <div class="d-flex justify-content-around">
      <div class="h1 text-left me-auto">Your cart</div>
      <div class="text-center pt-2" v-show="Object.keys(cart).length">
        <div class="tool-tip">
          <button
            type="button"
            class="btn btn-info px-5"
            :disabled="!cartValid()"
            @click.prevent="validateCart">
            <i class="bi bi-cart-check-fill"></i>
          </button>
          <span class="tooltiptext" v-show="cartValid()">Validate your cart</span>
          <span class="tooltiptext" v-show="!cartValid()">Some books are not available</span>
        </div>
        <div class="tool-tip">
          <button
            type="button"
            class="btn btn-danger px-5"
            @click.prevent="deleteCart">
            <i class="bi bi-cart-x-fill"></i>
          </button>
          <span class="tooltiptext">Empty your cart</span>
        </div>
      </div>
    </div>
    <div class="h3 fst-italic mt-5" v-show="!Object.keys(cart).length">
      Wow, so empty! You can try borrowing some books by checking out our <a href="#" @click.prevent="openHome" >catalog</a>.
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
import { getCurrentCart, validateCart, deleteCart } from '@/services/CartService.js'
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
    cartChange (itemData) {
      const { idBook, cartItem } = itemData
      if (cartItem) {
        this.cart[idBook].quantity_cart = cartItem.quantity_cart
      } else {
        delete this.cart[idBook]
      }
      this.$forceUpdate()
    },
    validateCart: async function () {
      try {
        await validateCart()
        this.cart = {}
        alert('Thank you for renting our books!')
      } catch (err) {
        alert(err.message)
      }
    },
    deleteCart: async function () {
      try {
        await deleteCart()
        this.cart = {}
      } catch (err) {
        alert(err.message)
      }
    },
    openHome () {
      this.$router.push('/')
    },
    cartValid () {
      for (const idBook in this.cart) {
        if (this.cart[idBook].quantity_available < this.cart[idBook].quantity_cart) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style>
.tool-tip {
  position: relative;
  display: inline-block;
}
.tool-tip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: lightgray;
  color: black;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 100%;
}
.tool-tip:hover .tooltiptext {
  visibility: visible;
}
</style>
