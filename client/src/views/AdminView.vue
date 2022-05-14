<template>
  <div class="admin container-fluid">
    <div class="d-flex justify-content-around">
      <div class="h1 text-left me-auto">
        All carts
      </div>
      <div class="p-1">
        <div class="form-check form-switch">
          <label class="form-check-label" for="borrowedCheck">Show unreturned carts</label>
          <input class="form-check-input" type="checkbox" id="borrowedCheck" v-model="searchBorrowed">
        </div>
        <div class="input-group">
          <div class="p-0">
            <input type="search" class="form-control"
            placeholder="Search User" v-model="searchUser" />
          </div>
          <span class="btn btn-secondary input-group-text">
            <i class="bi bi-search" />
          </span>
        </div>
      </div>
    </div>
    <div class="carts">
      <CartComponent
        v-for="(cart, index) in carts"
        :key="index"
        :id_cart="cart.id_cart"
        :status="cart.status"
        :cartItems="cart.cartItems"
        :username="cart.username"
        :createdAt="cart.createdAt"
        :updatedAt="cart.updatedAt"
        @book-returned="returnBook"
        v-show="cart.username.toLowerCase().includes(searchUser.toLowerCase()) && (!searchBorrowed || (searchBorrowed && cart.status === 'borrowed'))"
        />
    </div>
  </div>
</template>

<script>
import { fetchAllCarts } from '@/services/AdminService.js'
import CartComponent from '@/components/CartComponent.vue'

export default {
  data () {
    return {
      carts: {},
      loaded: false,
      searchUser: '',
      searchBorrowed: false
    }
  },
  components: {
    CartComponent
  },
  watch: {
    loaded (newValue) {
      if (newValue) {
        this.$forceUpdate()
      }
    }
  },
  beforeMount: async function () {
    let response = await fetchAllCarts()
    for (const data of response.data) {
      const cartItems = []
      for (const cartItem of data.CartItems) {
        const item = {
          id_book: cartItem.Book.id_book,
          quantity_cart: cartItem.quantity_cart,
          name_book: cartItem.Book.name_book,
          url: cartItem.Book.url
        }
        cartItems.push(item)
      }
      const cart = {
        id_cart: data.id_cart,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        cartItems: cartItems,
        username: data.User.username
      }
      this.carts[data.id_cart] = cart
    }
    this.loaded = true
  },
  methods: {
    returnBook (idCart) {
      this.carts[idCart].status = 'returned'
      this.$forceUpdate()
    }
  }
}
</script>

<style>

</style>
