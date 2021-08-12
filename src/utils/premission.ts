import { asyncRoute } from '@/router/homeChildren'

export const buildRoute = function (role) {
  const routes = []
  asyncRoute.forEach((route) => {
    if (route.meta.roles && route.meta.roles.includes(role)) {
      routes.push(route)
    }
  })
  return {
    asyncRoutes: routes
  }
}
