// 解决 所有ts中引入vue报错
// 原因 ts只能理解ts文件 而不能理解.vue文件
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
