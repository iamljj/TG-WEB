<template>
  <div>
    <el-card style="height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">商品列表</div>
        <div class="top-search">
          <el-input
            class="top-search-input"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
          ></el-input>
          <el-button type="primary" class="top-search-button">搜索</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="(item, i) in table"
          :key="i"
          :prop="item.prop"
          :label="item.name"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" style="color: orange" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { table, tableData } from '@/utils/pageData/shopNameData'
export default defineComponent({
  setup() {
    const handleCurrentChange = (val) => {
      console.log(val)
    }
    const handleSelectionChange = (val) => {
      console.log(val)
    }
    return {
      tableData,
      table,
      handleCurrentChange,
      handleSelectionChange
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
.pageSelect {
  position: absolute;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
}
</style>
