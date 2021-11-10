export const routers = [
  {
    path: '/home/person',
    name: 'person',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/person.vue'),
    title: '人员管理',
    icon: 'iconperson',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/home/displayitem',
    name: 'displayitem',
    component: () => import(/* webpackChunkName: "home" */ '@/views/displayItem/DisplayItems.vue'),
    title: '陈列项',
    icon: 'iconmanage',
    meta: {
      keepAlive: false
    }
  },
  {
<<<<<<< HEAD
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
  },
  {
    path: 'dealer',
    name: 'dealer',
    component: () => import(/* webpackChunkName: "home" */ '@/views/systems/dealer.vue'),
    meta: {
      title: '绑定经销商',
      path: '/home/dealer',
      image: 'role',
      isshow: 'false'
    }
  },
  {
    path: 'log',
    name: 'log',
    component: () => import(/* webpackChunkName: "home" */ '@/views/systems/log.vue'),
    meta: {
      title: '操作日志',
      path: '/home/log',
      image: 'log',
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
=======
>>>>>>> 51dd7e03e11b8e9d761c7a7f2619edd63c1ff31b
    title: '系统设置',
    name: 'system',
    icon: 'iconsystem',
    path: '/home/system',
    component: () => import(/* webpackChunkName: "system" */ '@/views/systems/container.vue'),
    children: [
      {
        path: '/home/system/role',
        name: 'role',
        component: () => import(/* webpackChunkName: "system" */ '@/views/systems/Role.vue'),
        title: '岗位管理',
        icon: 'iconframework',
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/home/system/organization',
        name: 'organization',
        component: () =>
          import(/* webpackChunkName: "system" */ '@/views/systems/organization.vue'),
        title: '组织架构',
<<<<<<< HEAD
        path: '/home/organization',
        image: 'organization'
      },
      {
        name: 'log',
        title: '操作日志',
        path: '/home/log',
        image: 'organization'
=======
        icon: 'iconframework',
        meta: {
          keepAlive: false
        }
      },
      {
        name: 'process',
        path: '/home/system/approval',
        component: () => import(/* webpackChunkName: "system" */ '@/views/systems/process.vue'),
        title: '审批流管理',
        icon: 'iconframework',
        meta: {
          keepAlive: false
        }
>>>>>>> 51dd7e03e11b8e9d761c7a7f2619edd63c1ff31b
      }
    ]
  }

  // {
  //   path: '/home/dealer',
  //   name: 'dealer',
  //   component: () => import(/* webpackChunkName: "home" */ '@/views/systems/dealer.vue'),
  //   title: '绑定经销商',
  //   icon: 'role',
  //   meta: {
  //     isshow: 'false'
  //   }
  // }
]
