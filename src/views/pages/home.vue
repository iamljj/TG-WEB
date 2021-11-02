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
import { tableData } from '@/utils/request'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/types'

export default defineComponent({
  name: 'home',
  //页面刷新一次
  mounted: function () {
    if (location.href.indexOf('#reloaded') == -1) {
      location.href = location.href + '#reloaded'
      location.reload()
    }
  },
  components: {
    left,
    top
  },
  setup() {
    // const store = useStore<GlobalDataProps>()
    // 请求商品列表数据
    onMounted(() => {
      // tableData('/').then((res) => {
      //   store.commit('getHeader', res)
      // })
    })
    return {}
  }
})
</script>

<style lang="scss">
.el-message {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
}
.el-message__icon {
  font-size: 30px;
}
</style>
