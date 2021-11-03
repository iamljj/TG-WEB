import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { REQUEST_ADDRESS } from '@/config'
import { storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'

const routes: any = [
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/account/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/*webpackChunkName: '404' */ '@/views/error/error.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/*webpackChunkName: 'home' */ '@/views/home/home.vue'),
    children: require('./homeChildren').default
  }
]

const router = createRouter({
  history: createWebHashHistory(REQUEST_ADDRESS),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path != '/login' && to.name != '404' && !storage.get('token')) {
    ElMessage({
      type: 'error',
      iconClass: 'el-icon-circle-close',
      message: '你还未登录，请登录'
    })
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
