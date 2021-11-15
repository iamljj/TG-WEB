<template>
  <div class="business-Mcontainer">
    <el-card class="card">
      <template #header>
        <div class="header">
          <text class="header-title"><b>业务类型管理</b></text>
          <el-button type="primary">新增</el-button>
        </div>
      </template>
      <Table ref="table" :columns="tableCol_" :tableData="tableData_">
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="medium" type="text">编辑</el-button>
            <el-button size="medium" type="text">删除</el-button>
          </template>
        </el-table-column>
      </Table>
    </el-card>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" width="30%" :before-close="handleClose">
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/primeryTable.vue'
import { columns, tableData } from '@/utils/pageData/business'
export default defineComponent({
  name: 'business',
  components: {
    Table
  },
  setup(props, context) {
    //表格
    let tableCol_ = columns
    let tableData_ = reactive(tableData)
    return {
      tableCol_,
      tableData_
    }
  }
})
</script>
<style lang="scss">
.business-Mcontainer {
  display: flex;
  justify-content: center;
  .card {
    width: 100%;
    height: 89vh;
    .header {
      display: flex;
      &-title {
        flex: 1;
        margin-top: 10px;
      }
    }
  }
}
</style>
