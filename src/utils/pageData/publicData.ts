import { ref } from 'vue'
import { phoneShow } from './personData'
export const dialogFormVisible = ref<boolean>(false)
// 修改
export const handleClick = (scoped: any, form) => {
  phoneShow.value = true
  dialogFormVisible.value = true
  for (let key in scoped) {
    form[key] = scoped[key]
  }
}
