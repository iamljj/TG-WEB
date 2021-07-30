export default [
  {
    path: '/activity',
    name: 'activity',
    component: () => {
      import(/* webpackChunkName: "home" */ '@/views/pages/activity.vue')
    }
  },
  {
    path: '/person',
    name: 'person',
    component: () => {
      import(/* webpackChunkName: "home" */ '@/views/pages/person.vue')
    }
  },
  {
    path: '/shopName',
    nmae: 'shopName',
    component: () => {
      import(/* webpackChunkName: "home" */ '@/views/pages/shopName.vue')
    }
  },
  {
    path: '/statisical',
    name: 'statisical',
    component: () => {
      import(/* webpackChunkName: "home" */ '@/views/pages/statistical.vue')
    }
  }
]
