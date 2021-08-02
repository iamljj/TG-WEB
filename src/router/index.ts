import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { REQUEST_ADDRESS } from '@/config'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/pages/login.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/*webpackChunkName: '404' */ '@/views/pages/error.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/*webpackChunkName: 'home' */ '@/views/pages/home.vue'),
    children: require('./homeChildren').default
  }
]

const router = createRouter({
  history: createWebHashHistory(REQUEST_ADDRESS),
  routes
})

export default router
