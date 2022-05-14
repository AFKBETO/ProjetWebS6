<template>
  <div class="book card">
    <div class="card-header bg-dark text-dark">
      <div class="card-title m-0 p-0 d-flex justify-content-between align-content-center">
        <div class="h6 p-0 m-0 text-truncate text-light">{{name_book}}</div>
        <div class="admin-only" v-if="isAdmin">
          <button
            v-show="!showMenu"
            type="button"
            class="btn bg-dark text-light p-2"
            @click.prevent="toggleMenu">
            <i class="bi bi-three-dots" />
          </button>
          <button
            v-show="showMenu"
            type="button"
            class="btn btn-close btn-close-white pt-4 pb-0 pe-3"
            @click.prevent="toggleMenu">
          </button>
          <div
            v-show="showMenu"
            class="position-absolute bg-light edit-menu border border-secondary border-3 rounded"
            tabindex="-1">
            <div class="text-end mt-2 me-2">
              <button
                type="button"
                class="btn btn-danger"
                @click.prevent="deleteBook">
                Delete this Book
              </button>
            </div>
            <BookForm
              :key="refresh"
              :id_book="id_book"
              :name_book="name_book"
              :url="url"
              :quantity_book="quantity_book"
              :editMode="true"
              tabindex="-1"
              @edit-book="editBook"/>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div
        class="card-img-top imageblock"
        :style="image"
        :alt="name_book">
      </div>
    </div>
    <div class="footer p-2">
      <div class="card-text d-flex align-content-center justify-content-between">
        <div class="px-2">
          <strong class="qty">Qty: </strong>
          <small>{{remaining}}</small>
        </div>
        <div class="btn-group btn-group-sm">
          <button
            type="button"
            class="btn p-0 px-1 btn-info"
            :disabled="(remaining - quantity_cart) < 1"
            @click.prevent="addToCart">
            <i class="bi bi-cart-plus" />
          </button>
          <span class="btn bg-dark text-light"><small>{{quantity_cart}}</small></span>
          <button
            type="button"
            class="btn p-0 px-1 btn-secondary"
            :disabled="quantity_cart < 1"
            @click.prevent="subtractFromCart">
            <i class="bi bi-cart-dash" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changeInCart } from '@/services/CartService.js'
import { isAdmin } from '../services/AuthService'
import { deleteBook } from '../services/BookService'
import BookForm from './BookForm.vue'

export default {
  name: 'BookComponent',
  props: {
    id_book: Number,
    name_book: String,
    url: String,
    quantity_book: Number,
    borrowedQty: Number,
    quantity_cart: Number,
    activeMenu: Number
  },
  data () {
    return {
      showMenu: false,
      refresh: 1
    }
  },
  watch: {
    activeMenu (newValue) {
      if (newValue !== this.id_book) {
        this.showMenu = false
      }
    }
  },
  components: {
    BookForm
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
    editBook (bookData) {
      try {
        this.$emit('edit-book', bookData)
        this.showMenu = false
      } catch (err) {
        alert(err.message)
      }
    },
    deleteBook: async function () {
      try {
        if (confirm('Do you want to delete this book? This action is irreversible.')) {
          await deleteBook(this.id_book)
          this.$emit('delete-book', this.id_book)
        }
      } catch (err) {
        alert(err.message)
      }
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
      this.$emit('close-others', this.id_book)
      this.refresh++
    }
  },
  computed: {
    isAdmin () {
      return isAdmin()
    },
    remaining () {
      return this.quantity_book - this.borrowedQty
    },
    image () {
      return {
        backgroundImage: `url("${this.url}")`
      }
    }
  }
}
</script>

<style>
.imageblock {
  width: 80%;
  height: 32vh;
  max-height: 200px;
  background-size: cover;
  margin: auto;
}

.imageinbox {
  object-fit: cover
}

.edit-menu {
  z-index: 10;
  min-width: 25vw;
  left: -20%;
}

@media screen and (max-width: 600px) {
  .qty {
    visibility: hidden;
    position: absolute;
  }
}
</style>
