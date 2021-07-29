<template>
  <el-row class="all">
    <el-col :span="16" class="left" align="middle">
      <img src="@/assets/Marketing.png" alt="" class="w-4 vertical" />
    </el-col>
    <el-col :span="5" class="right vertical h-6" align="middle">
      <div align="middle">
        <div class="right-title">后台管理系统</div>
      </div>
      <el-card class="mt-1 h-5" style="min-width: 400px">
        <el-form class="mt-1" :rules="rules" :model="loginUser">
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请输入" v-model="loginUser.phone"></el-input>
          </el-form-item>
          <el-row>
            <el-form-item label="验证码" prop="vercode">
              <el-col :span="15">
                <el-input placeholder="请输入" v-model="loginUser.vercode"></el-input>
              </el-col>
              <el-col :span="3">
                <el-button type="primary">获取验证码</el-button>
              </el-col>
            </el-form-item>
          </el-row>
          <el-button class="mt-1" type="primary" size="medium">登录</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue'
// data
import data from '@/utils/pageData/login'
export default defineComponent({
  name: 'login',
  setup() {
    return {
      ...data
    }
  }
})
</script>
<style lang="scss" scoped>
.all {
  background-color: rgb(185, 210, 255);
  height: 100vh;
  .right {
    &-title {
      font-weight: bold;
      font-family: 'Courier New', Courier, monospace;
      font-size: 30px;
    }
  }
}
</style>
