<template>
  <div class="cart p-0 m-0">
    <div class="container-md border border-dark my-1 p-0 d-flex align-items-center">
      <div class="container-fluid row d-flex align-items-center pe-0">
        <div class="col d-flex flex-column text-center text-truncate">
          <div v-show="status === 'borrowed' || status === 'returned'">
            <strong>Borrowed: </strong> {{getBorrowedDate}}
          </div>
          <div v-show="status === 'returned'">
            <strong>Returned: </strong> {{getReturnedDate}}
          </div>
        </div>
        <div class="col-2 d-flex flex-column text-center text-truncate">
          <div>
            <strong>User</strong>
          </div>
          <div>
            {{username}}
          </div>
        </div>
        <div class="col-2 d-flex flex-column text-center text-truncate">
          <div>
            <strong>Status</strong>
          </div>
          <div :class="colorStatus">
            {{status}}
          </div>
        </div>
        <div class="col text-center text-truncate">
          <button
            type="button"
            class="btn bg-dark text-light btn-more p-0 px-1"
            @click.prevent="toggleList">
            Show book list
          </button>
          <div
            v-show="showList && cartItems.length"
            class="position-absolute border border-dark bg-light book-list">
              <ul class="list-group">
                <li class="list-group-item container"
                  v-for="cartItem of cartItems"
                  :key="cartItem.id_book">
                  <div class="row">
                    <div class="col"><strong>{{cartItem.name_book}}</strong></div>
                    <div class="col-1">{{cartItem.quantity_cart}}</div>
                  </div>
                </li>
              </ul>
          </div>
        </div>
        <div class="col-1">
          <div v-show="status === 'borrowed'">
            <div class="d-flex p-0">
              <div class="tool-tip">
                <button
                  type="button"
                  class="btn btn-info"
                  @click.prevent="validateChange">
                  <i class="bi bi-check-square"></i>
                </button>
                <span class="tooltiptext">Check to confirm book return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { returnBooks } from '../services/CartService'

export default {
  props: {
    id_cart: Number,
    status: String,
    cartItems: {
      type: Array,
      default (rawProps) {
        return []
      }
    },
    username: {
      type: String,
      default: ''
    },
    createdAt: String,
    updatedAt: String
  },
  data () {
    return {
      showList: false
    }
  },
  created () {
    document.addEventListener('focusout', this.loseFocus)
  },
  beforeDestroy () {
    document.removeEventListener('focusout', this.loseFocus)
  },
  mounted () {
    this.currentStatus = this.status
  },
  methods: {
    toggleList () {
      this.showList = !this.showList
    },
    loseFocus (event) {
      this.showList = false
    },
    validateChange: async function () {
      await returnBooks(this.id_cart)
      this.$emit('book-returned', this.id_cart)
    }
  },
  computed: {
    colorStatus () {
      switch (this.status) {
        case 'borrowed':
          return 'text-danger'
        case 'pending':
          return 'text-primary'
        case 'returned':
          return 'text-success'
        default:
          return 'text-dark'
      }
    },
    getBorrowedDate () {
      let date = null
      switch (this.status) {
        case 'borrowed':
          date = new Date(this.updatedAt)
          break
        case 'returned':
          date = new Date(this.createdAt)
          break
        default:
          return ''
      }
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    },
    getReturnedDate () {
      let date = null
      switch (this.status) {
        case 'returned':
          date = new Date(this.updatedAt)
          break
        default:
          return ''
      }
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }
  }
}
</script>

<style>
.book-list {
  z-index: 10;
  min-width: 25vw;
  right: 10%;
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
  left: 0px;
  top: 100%;
}
.tool-tip:hover .tooltiptext {
  visibility: visible;
}
</style>
