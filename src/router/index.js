import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
// import AuthGuard from './auth-guard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index'),
      children: [
        {
          name: 'Home',
          path: '',
          component: () => import('@/views/pages/index'),
        },
        // {
        //   name: 'PruductCreate',
        //   path: 'product/create',
        //   component: () => import('@/views/pages/PageProductCreate'),
        // },
        // {
        //   name: 'User',
        //   path: 'user',
        //   component: () => import('@/views/admin/pages/UserProfile'),
        //   beforeEnter: AuthGuard,
        // },
        // {
        //   name: 'Report',
        //   path: 'reoprt',
        //   component: () => import('@/views/Report'),
        // },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/User/Signin'),
    },
    {
      path: '/signup',
      component: () => import('@/views/User/Signup'),
    },
    {
      path: '/setPassword',
      component: () => import('@/views/User/setPassword'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)

  store.dispatch('auth/initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.requiresAuth)) {
        // protected route
        if (user) {
          next()
        } else {
          next({ name: 'login', query: { redirectTo: to.path } })
        }
      } else if (to.matched.some(route => route.meta.requiresGuest)) {
        // protected route
        if (!user) {
          next()
        } else {
          next({ name: 'Home' })
        }
      } else {
        next()
      }
    })
})

export default router
