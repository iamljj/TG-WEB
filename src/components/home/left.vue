<template>
  <div>
    <el-menu
      :uniqueOpened="true"
      class="el-menu-vertical-demo"
      background-color="#302d35"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <div class="ma left">
        <img src="@/assets/logo.png" alt="" class="left-logo" />
        <div class="left-text">连客宝</div>
      </div>
      <div style="margin-top: 52px">
        <el-menu-item :index="item.path" v-for="(item, i) in list" :key="i">
          <i :class="item.icon"></i>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import homeChildren from '@/router/homeChildren'
export default defineComponent({
  setup() {
    const homeChildrenRouter = homeChildren
    const list = []
    homeChildrenRouter.forEach((item, index) => {
      list[index] = item.meta
    })
    return {
      list
    }
  }
})
</script>
<style lang="scss" scoped>
.left {
  display: flex;
  width: 146px;
  height: 50px;
  margin-top: 31px;
  &-logo {
    height: 50px;
    width: 51px;
    position: relative;
    z-index: 1;
  }
  &-text {
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 50px;
    height: 100%;
    flex: 1;
  }
}
.el-menu-vertical-demo {
  height: 100vh;
  text-align: left;
  i {
    margin-right: 20px;
  }
}
</style>
