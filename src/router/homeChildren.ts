export default [
  {
    path: 'activity',
    name: 'activity',
    component: () => import(/* webpackChunkName: "home" */ '@/views/pages/activityCom/all.vue'),
    meta: {
      title: '活动中心',
      icon: 'el-icon-wind-power',
      path: '/home/activity'
    }
  },
  {
    path: 'shopName',
    name: 'shopName',
    component: () => import(/* webpackChunkName: "home" */ '@/views/pages/shopName.vue'),
    meta: {
      title: '商品管理',
      icon: 'el-icon-goods',
      path: '/home/shopName'
    }
  },
  {
    path: 'statistical',
    name: 'statistical',
    component: () => import(/* webpackChunkName: "home" */ '@/views/pages/statisticalCom/all.vue'),
    meta: {
      title: '统计报表',
      icon: 'el-icon-pie-chart',
      path: '/home/statistical'
    }
  },
  {
    path: 'changePerson',
    name: 'changePerson',
    component: () => import(/* webpackChunkName: "home" */ '@/views/pages/changePerson.vue'),
    meta: {
      title: '个人信息',
      icon: 'el-icon-pie-chart',
      path: '/home/changePerson'
    }
  },
  {
    path: 'person',
    name: 'person',
    component: () => import(/* webpackChunkName: "home" */ '@/views/pages/person.vue'),
    meta: {
      title: '人员管理',
      icon: 'el-icon-pie-chart',
      path: '/home/person'
    }
  }
]
export const asyncRoute = [
  // {
  //   path: 'person',
  //   name: 'person',
  //   component: () => import(/* webpackChunkName: "home" */ '@/views/pages/person.vue'),
  //   meta: { title: '超级管理员', roles: ['cjgly'] }
  // }
]
