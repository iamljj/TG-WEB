<template>
  <el-row class="all">
    <el-col :span="5" class="icon">
      <img src="@/assets/logo.png" alt="" class="vertical" />
    </el-col>
    <el-col :span="9">
      <div class="text vertical" style="margin-left: 20px">
        <span>口子窖数字化营销平台</span>
      </div>
    </el-col>
    <el-col :span="10">
      <el-card class="card vertical box-card">
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
        <el-button type="primary" class="loginButton" @click="submitForm"
          >登 录</el-button
        >
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// data
import {
  loginUser,
  rules,
  formRules,
  countDown,
  isVercode,
  time,
  vercodeText,
  get_ver_code,
  log_in,
} from "@/utils/pageData/loginData";
import { ElMessage } from "element-plus";
import router from "@/router/index";
import axios from "axios";
import { GlobalDataProps } from "@/store/types";
import { useStore } from "vuex";
import { storage } from "@/utils/storage";

export default defineComponent({
  name: "login",
  setup() {
    const store = useStore<GlobalDataProps>();

    const getVercode = async () => {
      isVercode.value = false;
      countDown();
      let res = await get_ver_code({
        phone: loginUser.value.phone,
      });
      if (typeof res == "string") {
        ElMessage({
          type: "error",
          iconClass: "el-icon-circle-close",
          message: res,
        });
      }
    };
    const submitForm = () => {
      formRules.value.validate(async (valid) => {
        if (valid) {
          let res = await log_in(loginUser.value);
          if (typeof res == "string") {
            return ElMessage({
              type: "error",
              iconClass: "el-icon-circle-close",
              message: res,
            });
          }
          store.commit("user", res.data.userInfo);
          store.commit("login", res.data.token);
          router.push("/home/person");
        }
      });
    };
    return {
      loginUser,
      rules,
      getVercode,
      submitForm,
      formRules,
      time,
      vercodeText,
      isVercode,
    };
  },
});
</script>
<style lang="scss" scoped>
.all {
  background-image: url("~@/assets/bgImg.png");
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
  .icon {
    text-align: right;
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
