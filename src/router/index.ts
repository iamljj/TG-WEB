import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/pages/login.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/*webpackChunkName: '404' */ '@/views/pages/404.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/*webpackChunkName: 'home' */ '@/views/pages/home.vue'),
    children: [
      // require("./homeChildren").default,
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
