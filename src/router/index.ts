import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { REQUEST_ADDRESS } from '@/config'
import { storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'

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

// router.beforeEach((to, from, next) => {
//   if (to.path != '/login' && !storage.get('token')) {
//     ElMessage({
//       type: 'error',
//       iconClass: 'el-icon-circle-close',
//       message: '你还未登录，请登录'
//     })
//     next({
//       path: '/login'
//     })
//   } else {
//     next()
//   }
// })

export default router
