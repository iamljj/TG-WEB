import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/axios'
import { dev } from './config'
import { dateFormat } from './utils/date'
import 'element-plus/packages/theme-chalk/src/base.scss'
import zhCn from 'element-plus/lib/locale/lang/zh-cn' 
import { components, plugins } from './elementUI'
import '@/scss/index.scss'
import Calendar from 'primevue/calendar'
const app = createApp(App)
app.component('Calendar', Calendar)
components.forEach((component) => {
  if (component.locale) {
    app.use(component.name, component.locale)
  }
  app.component(component.name, component)
})

plugins.forEach((plugin) => {
  app.use(plugin, { locale: zhCn })
})
if (dev) console.log('dev: ' + dateFormat(Date.now(), '0'))
app.use(store).use(router).mount('#app')
