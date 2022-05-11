<template>
  <div class="books">
    <div class="d-flex justify-content-around">
      <div class="h1 text-left me-auto">Book Catalogue</div>
      <div class="p-1">
        <div class="input-group">
          <div class="p-0">
            <input type="search" class="form-control" placeholder="Search" v-model="searchBox" />
          </div>
          <span class="btn btn-secondary input-group-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="container-sm">
      <div class="row row-cols-4 g-2">
        <BookComponent
          class="col border p-0"
          v-for="(book, index) in books"
          :key="index"
          :id_book="book.id_book"
          :name_book="book.name_book"
          :url="book.url"
          :quantity_book="book.quantity_book"
          :borrowedQty="book.borrowedQty"
          :quantity_cart="book.quantity_borrowed"
          v-show="book.name_book.includes(searchBox)"
          @cart-change="cartChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchBooks } from '@/services/BookService.js'
import { getCurrentCart } from '@/services/CartService.js'
import BookComponent from '@/components/BookComponent.vue'

export default {
  components: {
    BookComponent
  },
  data () {
    return {
      books: {},
      cart: {},
      searchBox: '',
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
        this.books[book.id_book]['quantity_borrowed'] = 0
      }
    }
    response = await getCurrentCart()
    const cart = response.data
    if (cart) {
      const cartItems = cart.CartItems
      if (cartItems) {
        for (const cartItem of cartItems) {
          this.cart[cartItem.id_book] = cartItem
          this.books[cartItem.id_book].quantity_borrowed = cartItem.quantity_cart
        }
      }
    }
    this.loaded = true
  },
  methods: {
    cartChange (itemData) {
      console.log(itemData)
      const { idBook, cartItem } = itemData
      console.log(idBook)
      if (cartItem) {
        this.cart[idBook] = cartItem
        this.books[idBook].quantity_borrowed = cartItem.quantity_cart
      } else {
        delete this.cart[idBook]
        this.books[idBook].quantity_borrowed = 0
      }
      this.$forceUpdate()
    }
  },
  computed: {
    searchFilter () {
      return this.searchBox
    }
  }
}
</script>
