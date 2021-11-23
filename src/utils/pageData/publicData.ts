import { ref } from 'vue'
import { phoneShow } from './personData'
import { activeShow } from './activityData'
import { storage } from '../storage'
import { title } from './personData'
export const dialogFormVisible = ref<boolean>(false)
// 添加框弹出，子组件触发
export const showAdd = (form) => {
  for (const key in form) {
    delete form[key]
  }
  phoneShow.value = false
  dialogFormVisible.value = true
  activeShow.value = false
  storage.set('title', '新增')
  title.value = storage.get('title')
}
// 修改
export const handleClick = (scoped: any, form) => {
  phoneShow.value = true
  activeShow.value = true
  dialogFormVisible.value = true
  for (const key in scoped) {
    form[key] = scoped[key]
  }
  storage.set('title', '修改')
  title.value = storage.get('title')
  if (form.jurisdiction) {
    storage.set('rolelist', form.jurisdiction)
  }
}
