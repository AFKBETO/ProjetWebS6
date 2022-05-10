<template>
  <div class="book bookcomp card">
    <div class="card-header bg-secondary text-light text-overflow text-nowrap p-1">
      <div class="card-title p-0">
        <div class="h6 p-0">{{name_book}}</div>
      </div>
    </div>
    <div class="card-body imageblock">
      <img
        :src="url"
        class="card-img-top"
        :alt="name_book">
    </div>
    <div class="footer p-2">
      <div class="card-text d-flex align-content-center justify-content-between">
        <div class="py-0 px-1"><strong>Qty: </strong><small>{{remaining}}</small></div>
        <button class="btn btn-info py-0">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name_book: String,
    url: String,
    quantity_book: Number,
    borrowedQty: Number,
    quantity_cart: {type: Number, default: 0}
  },
  computed: {
    remaining () {
      return this.quantity_book - this.borrowedQty - this.quantity_cart
    }
  }
}
</script>

<style>
.text-overflow {
  height: 15%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.imageblock {
  height:65%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.imageinbox {
  object-fit: cover
}

@media screen and (min-width: 1024px) {
  .bookcomp {
    max-height: 250px;
  }
}
</style>
