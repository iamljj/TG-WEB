import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/axios'
import { dev } from './config'
import { dateFormat } from './utils/date'
import 'element-plus/packages/theme-chalk/src/base.scss'
import { components, plugins } from './elementUI'
import '@/scss/index.scss'
const app = createApp(App)
components.forEach((component) => {
  app.component(component.name, component)
})
plugins.forEach((plugin) => {
  app.use(plugin)
})
if (dev) console.log('dev: ' + dateFormat(Date.now(), '0'))
app.use(store).use(router).mount('#app')
