<template>
  <div class="container-sm p-5 my-5 justify-content-center">
    <div class="offcanvas offcanvas-end" id="demo">
      <div class="offcanvas-header">
        <h1 class="offcanvas-title">Add new Book</h1>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
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
        <button class="btn btn-dark active w-auto" :disabled="errBook" data-bs-dismiss="offcanvas" type="submit">Add book</button>
      </form>
      <div class="text-danger w-60 text-center" v-if="errBook">
        <small>You must provide a book's name</small>
      </div>
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
        this.bookData.name_book = ''
        this.bookData.url = ''
        this.quantity_book = 0
        this.$emit('add-book', response.data)
      } catch (err) {
        alert('There is an error when adding book')
      }
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
</style>
