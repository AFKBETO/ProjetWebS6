<template>
  <div class="books">
    <div class="h1">Book Catalogue</div>
    <div class="container-sm">
      <div class="row row-cols-4 g-2">
        <BookComponent
          class="col border p-0"
          v-for="book in books"
          :key="book.id_book"
          :name_book="book.name_book"
          :url="book.url"
          :quantity_book="book.quantity_book"
          :borrowedQty="book.borrowedQty" />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchBooks } from '@/services/BookService.js'
import BookComponent from '@/components/BookComponent.vue'

export default {
  components: {
    BookComponent
  },
  data () {
    return {
      books: []
    }
  },
  mounted: async function () {
    const books = await fetchBooks()
    this.books = books.data
  }
}
</script>
