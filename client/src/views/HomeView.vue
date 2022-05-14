<template>
  <div>
    <div class="block-offcanvas">
      <div class="offcanvas offcanvas-start bg-secondary" tabindex="-1" id="navbaroffcanvas" aria-labelledby="navbaroffcanvasLabel">
        <div class="offcanvas-header">
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div class="navbar bg-secondary p-0 border border-dark">
            <div class="container-fluid align-items-start p-0 fill">
              <ul class="navbar-nav w-100">
                <li class="nav-item">
                  <router-link
                    class="nav-link border text-light p-2"
                    :class="activeClass('books')" to="/">Book catalog</router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link border text-light p-2"
                    :class="activeClass('cart')" to="/cart">Cart</router-link>
                </li>
                <li class="nav-item" v-if="isAdmin">
                  <router-link
                    class="nav-link border text-light p-2"
                    :class="activeClass('admin')" to="/admin">Admin</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-secondary btn-offcanvas" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbaroffcanvas" aria-controls="navbaroffcanvas">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="43" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </button>
    </div>
    <div class="d-flex min-vh-100">
      <div class="navbar bg-secondary p-0 border border-dark sidebar">
        <div class="container-fluid align-items-start p-0 fill">
          <ul class="navbar-nav w-100">
            <li class="nav-item">
              <router-link
                class="nav-link border text-light p-2"
                :class="activeClass('books')" to="/">Book catalog</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link border text-light p-2"
                :class="activeClass('cart')" to="/cart">Cart</router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link
                class="nav-link border text-light p-2"
                :class="activeClass('admin')" to="/admin">Admin</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-10 container-fluid">
        <router-view class="h-100" />
      </div>
    </div>
  </div>
</template>

<script>
import { isAdmin } from '../services/AuthService'
export default {
  name: 'HomeView',
  methods: {
    activeClass: function (...names) {
      for (let name of names) {
        if (name === this.$route.name) {
          return 'active text-dark bg-light'
        }
      }
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
.sidebar {
  width: 20%;
}
.block-offcanvas {
  visibility: hidden;
  position: relative;
}

.btn-offcanvas {
  position: absolute;
}
.fill{
  height: 100%;
  min-height: 100%;
}

@media screen and (max-width: 768px) {
  .sidebar {
    visibility: hidden;
    width: 0%
  }
  .block-offcanvas {
    visibility: visible;
  }

  .btn-offcanvas {

    top: -57px;
  }
}
</style>
