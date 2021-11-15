<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#302d35"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <div class="ma left">
        <img src="@/assets/logo.png" alt="" class="left-logo" />
        <div class="left-text">口子窖数字化营销平台</div>
      </div>
      <div style="margin-top: 52px">
        <template v-for="routers in sildeMenus" :key="routers.name">
          <el-menu-item :index="routers.path" v-if="!routers.children">
            <i class="iconfont" :class="routers.icon"></i>
            <template #title>{{ routers.title }}</template>
          </el-menu-item>
          <el-submenu :index="routers.name" v-if="routers.children">
            <template #title>
              <i class="iconfont" :class="routers.icon"></i>
              {{ routers.title }}
            </template>
            <el-menu-item
              :index="router.path"
              v-for="router in routers.children"
              :key="router.name"
              v-show="router.title"
            >
              <i class="iconfont" :class="router.icon"></i>
              <template #title>{{ router.title }}</template>
            </el-menu-item>
          </el-submenu>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    routers: Array
  },
  setup(props) {
    const sildeMenus = props.routers
    return {
      sildeMenus
    }
  }
})
</script>
<style lang="scss" scoped>
.left {
  width: 146px;
  height: 50px;
  margin-top: 31px;
  margin-left: 25px;
  &-logo {
    margin-left: 40px;
    height: 50px;
    width: 51px;
    position: relative;
    z-index: 1;
  }
  &-text {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 50px;
    height: 100%;
    flex: 1;
  }
  .icon {
    width: 32px;
    height: 32px;
  }
}
.el-menu-vertical-demo {
  height: 100vh;
  text-align: left;
  i {
    margin-right: 20px;
  }
  .img {
    margin-right: 20px;
    margin-left: 6px;
    height: 18px;
    width: 18px;
  }
}
</style>
