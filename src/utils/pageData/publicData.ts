import { ref } from 'vue'
export const dialogFormVisible = ref<boolean>(false)
// 修改
export const handleClick = (scoped: any, form) => {
  dialogFormVisible.value = true
  for (let key in scoped) {
    form[key] = scoped[key]
  }
}
