import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home.vue'
import Panier from '@/components/Panier.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/panier', component: Panier, name: 'panier' },
    {path: '/login', component: Login, name: 'login'}
  ]
})
