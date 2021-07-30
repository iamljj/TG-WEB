# vue3+ts

## 1. 在 vue3+ts 中使用类似于 prototype 的方法，应当

1. ### 在 main.ts 中

   ```
   app.config.globalProperties = {}
   ```

2. ### 新创建一个 intance.d.ts 文件，为 this 添加扩展类型

   ```
   declare module '@vue/runtime-core' {
   	export interface ComponentCustomProperties {
   		$http: typeof axios
   	}
   }
   ```

## 2. 在 vue3 中使用 reactive 与 ref 使数据实现响应,并使用 return 导出

### **reactive**

#### 适用于复杂数据（数组，对象)

### **ref**

#### 适用于简单数据

```javascript
const loginData = reactive({
  phone: '', // 手机号
  vercode: '' // 验证码
})
return {
  loginData
}
// 此方法在外部使用为 loginData.phone
return {
  loginData
}
// 此方法在外部使用为 phone  （不推荐，易造成变量重）
return {
  ...toRefs(loginData)
}
```

### toRef

为当前元素创建响应式（为当前 prototype 创建一个新的 ref），ref 是拷贝，toRef 创建的此元素是一个引用，toRef 在改变的同时，会改变原来的数据，界面也不会更新

### toRefs

批量创建 ref 类型数据，和以前的数据关联，一般可以在 return 中进行使用

## 3. setup 上存在两个参数（props, context）

## props:

### 接受**props**，同时当传入新的**props**时他会被更新

```javascript
export default {
  porps: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

### 但是**props**不能被解构，这样会消除其响应式，如果需要解构则

```javascript
import {toRefs} from 'vue'
setup(props) {
    const {title} = toRefs(props)
    console.llog(title.value)
}
```

### 如果创建的组件传入参是可选的，**toRefs**就不会为其创建一个**ref**，这时候就需要使用**toRef**代替

```javascript
import {toRef} from 'vue'
setup(props) {
    const title = toRef(props)
    consoloe.log(props)
}
```

## context:

包含三个参数：

### **atters**：Attribute 获取当前标签上的所有属性和对象

### **slot**：插槽

### **emit**：事件派发，子向父传值

## 父组件

```javascript
<template>
  <div class="box">
    父组件
  </div>
  <no-cont :mytitle="msg"
      othertitle="别人的标题"
      @sonclick="sonclick">
  </no-cont>
</template>

<script lang="ts">
import NoCont from "../components/NoCont.vue"
export default {
  setup () {
    let msg={
      title:'父组件给子给子组件的数据'
    }
    function sonclick(msss:string){
      console.log(msss)
    }
    return {msg,sonclick}
  },
  components:{
    NoCont
  }
}
</script>
```

## 子组件

```javascript
<template>
    <div @click="sonHander">
        我是子组件中的数据
    </div>
</template>

<script lang="ts">
import { defineComponent,setup } from 'vue';
export default defineComponent({
  name: 'NoCont',
 //  未进行接受
 //   props:{
 //     mytitle:{
 //         type:Object
 //     }
 //   },
  setup(props,context){
    console.log('props==>',props.mytitle);//输出的值是 undefined
    function sonHander(){
        context.emit('sonclick','子组件传递给父组件')
    }
    return {sonHander}
  }
});
</script>
```

## 配置 TS 识别.vue 文件

### // 解决 所有 ts 中引入 vue 报错

### // 原因 ts 只能理解 ts 文件 而不能理解.vue 文件

### 在 xxx.d.ts 中加入描述文件

```typescript
declare module '*.vue' {
  import { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions

  export default componentOptions
}
```

## VUE3 中的拿到元素上的值

直接使用 ref 创建一个响应式 在 html 中使用 ref 进行绑定，便可以实现

```javascript
// HTML
<el-form class="mt-1" :rules="rules" :model="loginUser" ref="formRules">
// ts
const formRules = ref<null | HTMLFormElement>(null)
console.log(formRles)
return {
    formRules
}
```

## 在 vue3 中使用 router

引入 router.ts 使用 router.push

```typescript
import router from '@/router/index'
router.push('/home')
```
