<template>
  <div class="book border text-center">
    <div class="h6 border-bottom bg-secondary text-light p-1 text-overflow">
      <div>{{name_book}}</div>
    </div>
    <div class="w-75 imageblock border text-center mx-auto d-block">
      <img
        :src="url"
        class="img-thumbnail imageinbox"
        :alt="name_book">
    </div>
    <div>
      <strong>Qty: </strong><small>{{quantity_book}}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name_book: String,
    url: String,
    quantity_book: Number
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
