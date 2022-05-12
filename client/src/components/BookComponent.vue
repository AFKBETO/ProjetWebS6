<template>
  <div class="book card">
    <div class="card-header bg-dark text-dark">
      <div class="card-title m-0 p-0 d-flex justify-content-between align-content-center">
        <div class="h6 p-0 m-0 text-truncate text-light">{{name_book}}</div>
        <div class="admin-only" v-show="isAdmin">
          <button
            type="button"
            class="btn btn-close btn-close-white btn-more"
            @click.prevent="deleteBook">
          </button>
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
            :disabled="((remaining - quantity_cart) < 1) || canDelete"
            @click.prevent="addToCart">
            <i class="bi bi-cart-plus" />
          </button>
          <span class="btn bg-dark text-light"><small>{{quantity_cart}}</small></span>
          <button
            type="button"
            class="btn p-0 px-1 btn-secondary"
            :disabled="(quantity_cart < 1) || canDelete"
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

export default {
  name: 'BookComponent',
  props: {
    id_book: Number,
    name_book: String,
    url: String,
    quantity_book: Number,
    borrowedQty: Number,
    quantity_cart: Number,
    canDelete: {type: Boolean, default: false}
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
    deleteBook: async function () {
      try {
        if (confirm('Do you want to delete this book? This action is irreversible.')) {
          await deleteBook(this.id_book)
          this.$emit('delete-book', this.id_book)
        }
      } catch (err) {
        alert(err.message)
      }
    }
  },
  computed: {
    remaining () {
      return this.quantity_book - this.borrowedQty
    },
    isAdmin () {
      return isAdmin() && this.canDelete
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
  background-size: cover;
  margin: auto;
}

.btn-more {
  border-radius: 50%;
}

.imageinbox {
  object-fit: cover
}

@media screen and (max-width: 600px) {
  .qty {
    visibility: hidden;
    position: absolute;
  }
}
</style>
