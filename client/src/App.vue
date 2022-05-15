<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-dark nav-tabs min-vw-100">
      <div class="container-fluid">
        <div class="offcanvas-displace text-dark">abcsddd</div>
        <router-link class="navbar-brand text-light" to="/">
          BiblioEFREI
        </router-link>
        <p class="navbar-nav ms-auto text-light" v-show="isLoggedIn()">Hello, {{ getName() }}!</p>
        <ul class="navbar-nav">
          <li class="nav-item" v-show="!isLoggedIn()">
            <router-link class="nav-link text-light" :class="activeClass('login')" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-show="!isLoggedIn()">
            <router-link class="nav-link text-light" :class="activeClass('register')" to="/register">Register</router-link>
          </li>
          <li class="nav-item" v-show="isLoggedIn()">
            <button class="nav-link text-light" type="button" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <div class="tab-content">
        <router-view
          class="tab-pane active" />
    </div>
  </div>
</template>

<script>
import { logout, isLoggedIn } from './services/AuthService.js'
import { getCookie } from './services/Api.js'

export default {
  name: 'App',
  methods: {
    activeClass: function (...names) {
      for (let name of names) {
        if (name === this.$route.name) {
          return 'active text-dark'
        }
      }
    },
    logout: async function () {
      await logout()
      this.$router.push('/login')
    },
    isLoggedIn () {
      return isLoggedIn()
    },
    getName () {
      return getCookie('displayName')
    }
  }
}
</script>

<style>
.offcanvas-displace {
  visibility: hidden;
  width: 0%
}

@media screen and (max-width: 768px) {
  .offcanvas-displace {
    visibility: visible;
    width: auto;
  }
}
</style>
