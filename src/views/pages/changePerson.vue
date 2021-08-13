<template>
  <div>
    <el-card style="max-height: 87vh; min-height: 80vh; position: relative">
      <div class="top">
        <div class="top-name">个人信息</div>
      </div>
      <el-form
        label-width="220px"
        :model="changePerson"
        style="width: 50%; margin-top: 50px"
        :rules="rules"
        ref="formRules"
      >
        <el-form-item label="名称" style="display: flex" prop="name">
          <el-input v-model="changePerson.name" :disabled="changeName"></el-input>
          <el-button type="text" style="margin-left: 5%" @click="changeName = !changeName"
            >修改</el-button
          >
        </el-form-item>
        <el-form-item label="登录账号"> {{ userName }} </el-form-item>
        <el-form-item label="密码">
          <el-button type="text" @click="showPassword = !showPassword">修改密码</el-button>
        </el-form-item>
        <div v-if="showPassword">
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="changePerson.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" prop="repeatPassword">
            <el-input v-model="changePerson.repeatPassword" type="password"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-button type="primary" class="submitButton" @click="submitForm">确认</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  changePerson,
  changeName,
  userName,
  rules,
  showPassword,
  formRules
} from '@/utils/pageData/changePerson'
import { ElMessage } from 'element-plus'
import { putInformation } from '@/utils/request'
export default defineComponent({
  name: 'ShopName',
  setup() {
    const submitForm = () => {
      formRules.value.validate((valid: any) => {
        if (valid) {
          const { name, newPassword } = changePerson.value
          putInformation(name, newPassword).then((res) => {
            changePerson.value = res.data
          })
        } else {
          ElMessage({
            type: 'error',
            iconClass: 'el-icon-circle-close',
            message: '请检查输入的是否正确'
          })
        }
      })
    }
    return {
      changePerson,
      changeName,
      formRules,
      showPassword,
      submitForm,
      rules,
      userName
    }
  }
})
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  &-name {
    min-width: 7%;
    height: 5vh;
    line-height: 5vh;
    color: #333333;
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
  }
}
.el-input {
  width: 80%;
}
.submitButton {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 7%;
  bottom: 10%;
}
</style>
