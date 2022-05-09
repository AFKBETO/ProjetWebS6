import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginService from '../components/LoginService.vue'
import RegisterService from '../components/RegisterService.vue'
import BookView from '../views/BookView.vue'
import AnotherView from '../views/AnotherView.vue'
import { isLoggedIn } from '../services/AuthService.js'

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
          path: '/another',
          name: 'another',
          component: AnotherView
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
  if ((to.name === 'login' || to.name === 'register') && isLoggedIn()) {
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
