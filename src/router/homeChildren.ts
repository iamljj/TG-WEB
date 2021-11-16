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
      },
      {
        name: 'business',
        path: '/home/system/business',
        component: () => import(/* webpackChunkName: "system" */ '@/views/systems/business.vue'),
        title: '业务类型管理',
        icon: 'iconframework',
        meta: {
          keepAlive: false
        }
      },
      {
        name: 'log',
        path: '/home/system/log',
        component: () => import(/* webpackChunkName: "system" */ '@/views/systems/log.vue'),
        title: '操作日志',
        icon: 'iconframework',
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/home/dealer',
        name: 'dealer',
        component: () => import(/* webpackChunkName: "home" */ '@/views/systems/dealer.vue'),
        icon: 'role',
        meta: {
          keepAlive: false
        }
      }
    ]
  }
]
