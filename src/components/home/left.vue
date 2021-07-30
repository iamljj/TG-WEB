<template>
  <div>
    <el-menu
      :uniqueOpened="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#302d35"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <div class="ma left">
        <img src="@/assets/logo.png" alt="" class="left-logo" />
        <div class="left-text">连客宝</div>
      </div>
      <el-menu-item index="2" style="margin-top: 32px">
        <i class="el-icon-goods"></i>
        <template #title>商品管理</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-wind-power"></i>
        <template #title>活动中心</template>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-pie-chart"></i>
        <template #title>统计报表</template>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-user"></i>
        <template #title>人员管理</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {}
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
