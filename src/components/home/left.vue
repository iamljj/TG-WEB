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
        <el-menu-item :index="item.path" v-for="(item, i) in list" :key="i" v-show="!item.isshow">
          <img
            :src="require('../../assets/' + item.image + '.png')"
            v-if="item.image"
            class="img"
          />
          <i :class="item.icon" v-if="item.icon"></i>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
        <el-submenu v-for="(item, i) in routers" :key="i" :index="i">
          <template #title><i class="el-icon-setting"></i>{{ item.title }}</template>
          <el-menu-item v-for="(items, i) in item.chlidren" :key="i" :index="items.path">
            <img
              :src="require('../../assets/' + items.image + '.png')"
              v-if="items.image"
              class="img"
            />
            <i :class="items.icon" v-if="items.icon"></i>
            <template #title>{{ items.title }}</template>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import homeChildren from '@/router/homeChildren'
import { Routers } from '@/router/homeChildren'
export default defineComponent({
  setup() {
    const homeChildrenRouter = homeChildren
    const list = []
    homeChildrenRouter.forEach((item, index) => {
      list[index] = item.meta
    })
    console.log(list)
    const routers = Routers

    return {
      list,
      routers
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
