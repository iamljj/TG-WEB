<template>
  <el-container style="height: 100vh">
    <el-aside width="250px">
      <left></left>
    </el-aside>
    <el-container>
      <el-header style="background: #ffffff">
        <top></top>
      </el-header>
      <el-main style="background: #f4f6f4">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import left from '@/components/home/left.vue'
import top from '@/components/home/top.vue'
import { getHeader } from '@/utils/request'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/types'
export default defineComponent({
  name: 'home',
  components: {
    left,
    top
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    // 请求头像和个人数据
    onMounted(() => {
      // getHeader().then((res) => {
      //   console.log(res)
      //   store.commit('getHeader', res)
      // })
    })
  }
})
</script>

<style scoped lang="scss"></style>
