import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/admin/Index'),
      children: [
        {
          name: 'Home',
          path: '',
          component: () => import('@/views/admin/pages/bookings/index'),
        },
        {
          name: 'User',
          path: 'user',
          component: () => import('@/views/admin/pages/UserProfile'),
        },
        {
          name: 'Report',
          path: 'reoprt',
          component: () => import('@/views/Report'),
        },
      ],
      beforeEnter: AuthGuard,
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
      path: '*',
      redirect: '/',
    },
  ],
})
