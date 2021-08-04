<template>
  <el-row class="all">
    <el-col :span="3"></el-col>
    <el-col :span="2">
      <img src="@/assets/logo.png" alt="" class="vertical1" />
    </el-col>
    <el-col :span="4">
      <div class="text vertical1">
        <span>连客宝管理平台</span>
      </div>
    </el-col>
    <el-col :span="5"></el-col>
    <el-col :span="8">
      <el-card class="card vertical1 box-card">
        <div class="login">
          <div class="loginText">登录</div>
        </div>
        <el-form :model="loginUser" :rules="rules" ref="formRules">
          <div class="userNameDiv">
            <div class="usernameInput">账号</div>
            <div style="height: 50px">
              <el-form-item prop="phone">
                <el-input class="vertical inputDeep" v-model="loginUser.phone"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="userNameDiv">
            <div class="usernameInput">手机验证</div>
            <div style="height: 50px">
              <el-form-item prop="code">
                <el-input class="vertical inputDeep" v-model="loginUser.code">
                  <template #suffix>
                    <el-button
                      type="text"
                      class="inputDeep-vercode"
                      v-show="isVercode"
                      @click="getVercode"
                      >{{ vercodeText }}</el-button
                    >
                    <span v-show="!isVercode" class="inputDeep-vercode">{{ time }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <el-button type="primary" class="loginButton" @click="submitForm">登 录</el-button>
      </el-card>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// data
import {
  loginUser,
  rules,
  formRules,
  isVercode,
  time,
  vercodeText
} from '@/utils/pageData/loginData'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import axios from 'axios'
import { GlobalDataProps } from '@/store/types'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'login',
  setup() {
    const store = useStore<GlobalDataProps>()
    // 倒计时方法
    const countDown = () => {
      if (time.value == 0) {
        vercodeText.value = '重新获取验证码'
        isVercode.value = true
        time.value = 60
      } else {
        time.value--
        setTimeout(() => {
          countDown()
        }, 1000)
      }
    }
    const getVercode = () => {
      if (loginUser.value.phone && loginUser.value.phone.toString().length == 11) {
        axios
          .get(`/proxy/7000/service/sms/LoginCode/${loginUser.value.phone}`)
          .then((res) => {
            isVercode.value = false
            countDown()
          })
          .catch(() => {
            ElMessage({
              type: 'error',
              iconClass: 'el-icon-circle-close',
              message: '请输入正确的手机号'
            })
          })
      } else {
        ElMessage({
          type: 'error',
          iconClass: 'el-icon-circle-close',
          message: '请输入正确的手机号'
        })
      }
    }
    const submitForm = () => {
      formRules.value.validate((valid) => {
        if (valid) {
          axios
            .post(`/proxy/7002/service/auth/login`, loginUser.value)
            .then((res) => {
              console.log(res.data.data)
              store.commit('login', res.data.data)
              router.push('/home')
            })
            .catch(() => {
              ElMessage({
                type: 'error',
                iconClass: 'el-icon-circle-close',
                message: '请输入正确的手机号/验证码'
              })
            })
          // 获取token并传入vuex中 通过vuex中方法存储在localstorage
        } else {
          ElMessage({
            type: 'error',
            iconClass: 'el-icon-circle-close',
            message: '请输入正确的手机号或验证码'
          })
        }
      })
    }
    return {
      loginUser,
      rules,
      getVercode,
      submitForm,
      time,
      formRules,
      isVercode,
      vercodeText
    }
  }
})
</script>
<style lang="scss" scoped>
.all {
  background-image: url('~@/assets/bgImg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh;
  .text {
    font-weight: 500;
    color: #ffffff;
    font-size: 32px;
    min-width: 100%;
    font-family: PingFangSC, PingFangSC-Medium;
  }
  .card {
    width: 460px;
    height: 566px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.1);
    .login {
      width: 90%;
      padding-bottom: 10%;
      margin: 7%;
      margin-bottom: 0%;
      .loginText {
        font-weight: 500;
        color: #333333;
        font-size: 40px;
        font-family: PingFangSC, PingFangSC-Medium;
      }
    }
  }
  .userNameDiv {
    margin: 7%;
    margin-top: 2%;
    margin-bottom: 3%;
    height: 80px;
    .usernameInput {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
    }
  }
  .loginButton {
    width: 86%;
    height: 56px;
    margin: 7%;
    position: relative;
    font-size: 20px;
    color: #ffffff;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    background: #1766f5;
    border-radius: 12px;
    margin-top: 20%;
  }
}
.inputDeep {
  ::v-deep .el-input__inner {
    border-radius: 12px;
  }
  &-vercode {
    margin-right: 10px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 520;
  }
}
</style>
<style>
.el-message {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
}
.el-message__icon {
  font-size: 30px;
}
</style>
