<template>
  <div>
    <div class="top-search">
      <el-input
        class="top-search-input"
        placeholder="请输入内容"
        v-model="searchText"
        suffix-icon="el-icon-search"
      ></el-input>
      <el-button type="primary" class="top-search-button">搜索</el-button>
      <el-button type="primary" size="medium" class="top-search-button" @click="showAdd"
        >添加</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showAdd, searchText } from '@/utils/pageData/shopNameData'
export default defineComponent({
  name: 'Search',
  setup() {
    return { showAdd, searchText }
  }
})
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  &-search {
    display: flex;
    &-input {
      width: 240px;
      margin-right: 10px;
    }
    &-button {
      height: 40px;
      width: 96px;
      margin-right: 10px;
      border-radius: 10px;
    }
  }
}
</style>
