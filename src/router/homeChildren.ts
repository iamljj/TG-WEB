export default [
  {
    path: 'person',
    name: 'person',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/person.vue'),
    meta: {
      title: '人员管理',
      icon: 'el-icon-s-check',
      path: '/home/person'
    }
  },
  {
    path: 'displayitem',
    name: 'displayitem',
    component: () => import(/* webpackChunkName: "home" */ '@/views/displayItem/DisplayItems.vue'),
    meta: {
      title: '陈列项',
      icon: 'el-icon-s-order',
      path: '/home/displayitem'
    }
  },
  {
    path: 'role',
    name: 'role',
    component: () => import(/* webpackChunkName: "home" */ '@/views/systems/Role.vue'),
    meta: {
      title: '岗位管理',
      path: '/home/role',
      image: 'role',
      isshow: 'false'
    }
  },
  {
    path: 'organization',
    name: 'organization',
    component: () => import(/* webpackChunkName: "home" */ '@/views/systems/organization.vue'),
    meta: {
      title: '组织架构',
      path: '/home/organization',
      image: 'role',
      isshow: 'false'
    }
  }
  // {
  //   path: 'activity',
  //   name: 'activity',
  //   component: () => import(/* webpackChunkName: "home" */ '@/views/pages/activityCom/all.vue'),
  //   meta: {
  //     title: '活动中心',
  //     icon: 'el-icon-wind-power',
  //     path: '/home/activity'
  //   }
  // },
  // {
  //   path: 'shopName',
  //   name: 'shopName',
  //   component: () => import(/* webpackChunkName: "home" */ '@/views/pages/shopName.vue'),
  //   meta: {
  //     title: '商品管理',
  //     icon: 'el-icon-goods',
  //     path: '/home/shopName'
  //   }
  // },
  // {
  //   path: 'statistical',
  //   name: 'statistical',
  //   component: () => import(/* webpackChunkName: "home" */ '@/views/pages/statisticalCom/all.vue'),
  //   meta: {
  //     title: '统计报表',
  //     icon: 'el-icon-pie-chart',
  //     path: '/home/statistical'
  //   }
  // },
  // {
  //   path: 'changePerson',
  //   name: 'changePerson',
  //   component: () => import(/* webpackChunkName: "home" */ '@/views/pages/changePerson.vue'),
  //   meta: {
  //     title: '个人信息',
  //     icon: 'el-icon-pie-chart',
  //     path: '/home/changePerson'
  //   }
  // },
]
export const Routers = [
  {
    title: '系统设置',
    chlidren: [
      {
        name: 'role',
        component: () => import(/* webpackChunkName: "home" */ '@/views/systems/Role.vue'),
        title: '角色管理',
        path: '/home/role',
        image: 'role'
      },
      {
        name: 'organization',
        title: '组织架构',
        path: '/home/organization',
        image: 'organization'
      }
    ]
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
