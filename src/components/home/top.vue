<template>
  <div>
    <div class="all">
      <div>
        <img :src="header" alt="" class="all-img" />
      </div>
      <div class="all-text">{{ nickName }}</div>
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          <i
            class="el-icon-arrow-down el-icon--right"
            style="line-height: 64px; margin-left: 10px"
          ></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item command="b" @click="changePerson">修改个人信息</el-dropdown-item> -->
            <el-dropdown-item command="c" @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { storage } from '@/utils/storage'
import router from '@/router/index'
import { GlobalDataProps } from '@/store/types'
export default defineComponent({
  name: 'top',
  setup() {
    const store = useStore<GlobalDataProps>()
    const nickName = computed(() => storage.get('nickName'))
    // console.log(nickName.value)

    const header = computed(() => store.state.header)
    const handleCommand = (command: string) => {
      console.log(command)
    }
    const logout = () => {
      router.push('/home')
      storage.clear()
    }
    const changePerson = () => {
      router.push({ name: 'changePerson' })
    }
    return {
      handleCommand,
      header,
      changePerson,
      logout,
      nickName
    }
  }
})
</script>

<style lang="scss" scoped>
.all {
  width: 10%;
  height: 100%;
  display: flex;
  float: right;
  &-img {
    height: 27px;
    width: 27px;
    margin-top: 16px;
  }
  &-text {
    margin-left: 10px;
    font-size: 14px;
    line-height: 57px;
    font-family: PingFangSC, PingFangSC-Regular;
    color: #333333;
  }
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
