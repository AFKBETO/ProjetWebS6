import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginService from '@/views/LoginService.vue'
import RegisterService from '@/views/RegisterService.vue'
import BookView from '@/views/BookView.vue'
import CartView from '@/views/CartView.vue'
import AdminView from '@/views/AdminView.vue'
import { isLoggedIn, isAdmin } from '../services/AuthService.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: {
        allowAnonymous: false
      },
      children: [
        {
          path: '/',
          name: 'books',
          component: BookView
        },
        {
          path: '/cart',
          name: 'cart',
          component: CartView
        },
        {
          path: '/admin',
          name: 'admin',
          component: AdminView,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginService,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterService,
      meta: {
        allowAnonymous: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (((to.name === 'login' || to.name === 'register') && isLoggedIn()) || (to.name === 'admin' && !isAdmin())) {
    next({
      path: '/'
    })
  } else if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
