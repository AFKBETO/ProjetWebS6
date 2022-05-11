<template>
  <form @submit.prevent="addBook" class="d-flex align-items-center justify-content-center flex-column border pb-3" novalidate="true">
    <div class="form-floating w-50 my-3">
      <input
        type="text"
        class="form-control"
        placeholder="Enter book's name"
        name="book-name"
        v-model="bookData.name_book"
        required>
      <label for="book-name">Book's name</label>
    </div>
    <div class="form-floating w-50 my-3">
      <input
        type="text"
        class="form-control"
        placeholder="Enter image's URL"
        name="url"
        v-model="bookData.url">
      <label for="url">Image URL</label>
    </div>
    <div class="form-floating w-50 my-3">
      <input
        type="number"
        class="form-control"
        id="quantity"
        name="quantity-book"
        min="0"
        v-model="bookData.quantity_book">
      <label for="quantity-book">Book quantity</label>
    </div>
    <button class="btn btn-dark active w-auto"
      :disabled="errBook" data-bs-dismiss="offcanvas"
      type="submit">Add book</button>
    <div class="text-danger w-60 text-center" v-if="errBook">
      <small>You must provide a book's name</small>
    </div>
  </form>
</template>

<script>
import { createBook } from '@/services/BookService.js'

export default {
  data () {
    return {
      bookData: {
        name_book: '',
        url: '',
        quantity_book: 0
      },
      errBook: false
    }
  },
  watch: {
    'bookDetails.name_book': {
      handler () {
        this.errBook = !(!this.bookData.name_book)
      }
    }
  },
  methods: {
    addBook: async function () {
      try {
        this.errBook = false
        const response = await createBook(this.bookData)
        this.bookData = {
          name_book: '',
          url: '',
          quantity_book: 0
        }
        this.$emit('add-book', response.data)
      } catch (err) {
        alert('There is an error when adding book')
      }
    }
  }
}
</script>
