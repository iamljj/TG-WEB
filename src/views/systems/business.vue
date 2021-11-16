<template>
  <div class="business-Mcontainer">
    <el-pagination layout="prev, pager, next" :total="999" :page-size="8" class="pageSelect">
    </el-pagination>
    <el-card class="card">
      <template #header>
        <div class="header">
          <text class="header-title"><b>业务类型管理</b></text>
          <el-button type="primary" @click="addform_">新增</el-button>
        </div>
      </template>
      <Table ref="table" :columns="tableCol_" :tableData="tableData_">
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="medium" type="text" @click="editform_(scope.row)">编辑</el-button>
            <el-button size="medium" type="text" @click="deleteform_(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </Table>
    </el-card>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <el-form ref="form" :model="form_" label-width="120px">
      <el-form-item label="业务类型名称">
        <el-input v-model="form_.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/primeryTable.vue'
import { columns, tableData, form } from '@/utils/pageData/business'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
  name: 'business',
  components: {
    Table
  },
  setup(props, context) {
    //表格
    let tableCol_ = columns
    let tableData_ = reactive(tableData)
    let form_ = ref(form)
    let dialogVisible = ref(false)
    let title = ref('')

    const editform_ = (scoped) => {
      dialogVisible.value = true
      title.value = '编辑'
      form_.value.name = scoped.business
    }
    const addform_ = (scoped) => {
      dialogVisible.value = true
      title.value = '新增'
    }
    const deleteform_ = (scoped) => {
      form_.value.name = scoped.business
      ElMessageBox.confirm(`确定要删除${form_.value.name}`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then()
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '你已取消删除'
          })
        })
    }

    return {
      tableCol_,
      tableData_,
      form_,
      dialogVisible,
      editform_,
      title,
      addform_,
      deleteform_
    }
  }
})
</script>
<style lang="scss">
.business-Mcontainer {
  position: relative;
  display: flex;
  justify-content: center;
  .pageSelect {
    position: absolute;
    bottom: 20px;
    transform: translateX(-50%);
    left: 50%;
  }
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
