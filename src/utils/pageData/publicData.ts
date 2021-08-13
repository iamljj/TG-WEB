import { ref } from 'vue'
import { phoneShow } from './personData'
import { activeShow } from './activityData'
export const dialogFormVisible = ref<boolean>(false)
// 修改
export const handleClick = (scoped: any, form) => {
  phoneShow.value = true
  activeShow.value = true
  dialogFormVisible.value = true
  for (const key in scoped) {
    form[key] = scoped[key]
  }
}
// 添加框弹出，子组件触发
export const showAdd = (form) => {
  console.log('我触发了添加')
  for (const key in form) {
    delete form[key]
  }
  phoneShow.value = false
  dialogFormVisible.value = true
  activeShow.value = false
}
