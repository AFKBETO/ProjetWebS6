<template>
  <div class="books">
    <div class="d-flex justify-content-around">
      <div class="h1 text-left me-auto">
        Book catalogue
        </div>
      <div class="p-1">
        <div class="input-group">
          <div class="p-0">
            <input type="search" class="form-control"
            placeholder="Search" v-model="searchBox" />
          </div>
          <span class="btn btn-secondary input-group-text">
            <i class="bi bi-search" />
          </span>
        </div>
      </div>
    </div>
    <div class="container-sm">
      <div class="row row-cols-4 g-2">
        <BookComponent
          class="col border p-0"
          v-for="(book, index) in books"
          :id="book.id_book"
          :key="index"
          :id_book="book.id_book"
          :name_book="book.name_book"
          :url="book.url"
          :quantity_book="book.quantity_book"
          :borrowedQty="book.borrowedQty"
          :quantity_cart="book.quantity_cart"
          v-show="book.name_book.includes(searchBox)"
          @cart-change="cartChange"
          @delete-book="deleteBook"
          @edit-book="editBook" />
      </div>
    </div>
    <div class="container-sm p-5 my-5 justify-content-center" v-show="isAdmin">
      <div class="offcanvas offcanvas-end" id="demo">
        <div class="offcanvas-header">
          <h1 class="offcanvas-title">Add new book</h1>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
          <BookForm class="border" @add-book="addBook" />
        </div>
      </div>
      <button
        class="btn btn-admin m-0 p-1 btn-info text-light"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#demo">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle p-0" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { fetchBooks } from '@/services/BookService.js'
import { getCurrentCart } from '@/services/CartService.js'
import { isAdmin } from '@/services/AuthService.js'
import BookComponent from '@/components/BookComponent.vue'
import BookForm from '@/components/BookForm.vue'

export default {
  components: {
    BookComponent,
    BookForm
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
  },
  methods: {
    cartChange: function (itemData) {
      const { idBook, cartItem } = itemData
      if (cartItem) {
        this.cart[idBook] = cartItem
        this.books[idBook].quantity_cart = cartItem.quantity_cart
      } else {
        delete this.cart[idBook]
        this.books[idBook].quantity_cart = 0
      }
      this.$forceUpdate()
    },
    addBook (bookData) {
      this.books[bookData.id_book] = bookData
      this.books[bookData.id_book]['borrowedQty'] = 0
      this.books[bookData.id_book]['quantity_cart'] = 0
      this.$forceUpdate()
    },
    editBook (bookData) {
      this.books[bookData.id_book].name_book = bookData.name_book
      this.books[bookData.id_book].url = bookData.url
      this.books[bookData.id_book].quantity_book = bookData.quantity_book
      this.$forceUpdate()
    },
    deleteBook (idBook) {
      delete this.books[idBook]
      delete this.cart[idBook]
      this.$forceUpdate()
    }
  },
  computed: {
    isAdmin () {
      return isAdmin()
    }
  }
}
</script>

<style scoped>
.btn-admin {
  position: fixed;
  bottom: 5%;
  right: 5%;
  border-radius: 50%;
}
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
}
.tool-tip:hover .tooltiptext {
  visibility: visible;
}
</style>
