<template>
  <form @submit.prevent="addBook" class="d-flex align-items-center justify-content-center flex-column pb-3" novalidate="true">
    <div class="form-floating w-100 px-2 my-3">
      <input
        type="text"
        class="form-control"
        placeholder="Enter book's name"
        name="book-name"
        v-model="bookData.name_book"
        required>
      <label for="book-name">Book's name</label>
    </div>
    <div class="form-floating w-100 px-2 my-3">
      <input
        type="text"
        class="form-control"
        placeholder="Enter image's URL"
        name="url"
        v-model="bookData.url">
      <label for="url">Image URL</label>
    </div>
    <div class="form-floating w-100 px-2 my-3">
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
      type="submit">{{editMode ? 'Edit' : 'Add'}} book</button>
    <div class="text-danger w-60 text-center" v-if="errBook">
      <small>You must provide a book's name</small>
    </div>
  </form>
</template>

<script>
import { createBook, editBook } from '@/services/BookService.js'

export default {
  props: {
    id_book: Number,
    name_book: {type: String, default: ''},
    url: {type: String, default: ''},
    quantity_book: {type: Number, default: 0},
    editMode: {type: Boolean, default: false}
  },
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
  mounted () {
    if (this.editMode) {
      this.bookData = {
        name_book: this.name_book,
        url: this.url,
        quantity_book: this.quantity_book
      }
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
        if (
          this.bookData.name_book !== this.name_book ||
          this.bookData.url !== this.url ||
          this.bookData.quantity_book !== this.quantity_book
        ) {
          this.errBook = false
          if (!this.editMode) {
            const response = await createBook(this.bookData)
            this.$emit('add-book', response.data)
          }
          if (this.editMode) {
            await editBook(this.id_book, this.bookData)
            const emitData = {
              id_book: this.id_book,
              name_book: this.bookData.name_book,
              url: this.bookData.url,
              quantity_book: this.bookData.quantity_book
            }
            this.$emit('edit-book', emitData)
          }
          this.bookData = {
            name_book: '',
            url: '',
            quantity_book: 0
          }
        }
      } catch (err) {
        alert(`There is an error when ${this.editMode ? 'editing' : 'adding'} book`)
      }
    }
  }
}
</script>
