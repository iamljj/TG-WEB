<template>
  <div class="business-Mcontainer">
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      class="pageSelect"
      @current-change="pagechange"
    >
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
  <el-dialog v-model="dialogVisible" :title="title" width="30%" destroy-on-close>
    <el-form ref="formRuler" :model="form_" label-width="120px" :rules="rules">
      <el-form-item label="业务类型名称" prop="bsName">
        <el-input v-model="form_.bsName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="EditAdd">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/primeryTable.vue'
import { columns, tableData, form, rules } from '@/utils/pageData/business'
import { ElMessageBox, ElMessage } from 'element-plus'
import { AddEditBusiness, QueryBusiness, BusinessDal } from '@/service/business'
export default defineComponent({
  name: 'business',
  components: {
    Table
  },
  setup(props, context) {
    //表格
    let tableCol_ = columns
    let tableData_ = ref(tableData)
    let form_ = ref(form)
    let dialogVisible = ref(false)
    let title = ref('')
    let formRuler = ref(null)

    //分页
    let total: any = ref(100)
    let page = ref(1)
    let pagesize = ref(8)

    //首次进入加载数据
    const getlist = () => {
      const params = {
        page: {
          pageNum: 1,
          pageSize: pagesize.value
        }
      }
      QueryBusiness(params).then((res) => {
        tableData_.value = res.data.data.records
        total.value = res.data.data.total
      })
    }
    getlist()

    const editform_ = (scoped) => {
      dialogVisible.value = true
      title.value = '编辑'
      form_.value.bsName = scoped.bsName
      form_.value.bsCode = scoped.bsCode
    }
    const addform_ = () => {
      dialogVisible.value = true
      title.value = '新增'
      form_.value.bsCode = ''
      form_.value.bsName = ''
    }
    const deleteform_ = (scoped) => {
      form_.value.bsName = scoped.bsName
      form_.value.bsCode = scoped.bsCode
      ElMessageBox.confirm(`确定要删除${form_.value.bsName}`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          BusinessDal(form_.value.bsCode)
            .then(() => {
              ElMessage({
                type: 'info',
                message: '删除成功'
              })
              pagechange(page.value)
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '删除失败'
              })
            })
          pagechange(page.value)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '你已取消删除'
          })
        })
    }

    //发送修改新增请求
    const EditAdd = () => {
      formRuler.value.validate((valid: any) => {
        if (valid) {
          dialogVisible.value = false
          AddEditBusiness(form_.value)
            .then(() => {
              pagechange(page.value)
              if (form_.value.bsCode) {
                ElMessage({
                  type: 'info',
                  message: '修改成功'
                })
              } else {
                ElMessage({
                  type: 'info',
                  message: '新增成功'
                })
              }
            })
            .catch(() => {
              if (form_.value.bsCode) {
                ElMessage({
                  type: 'info',
                  message: '修改失败'
                })
              } else {
                ElMessage({
                  type: 'info',
                  message: '新增失败'
                })
              }
            })
        } else {
          ElMessage({
            type: 'info',
            message: '请检查输入的是否正确'
          })
        }
      })
    }

    //翻页触发
    const pagechange = (val) => {
      console.log(val)

      page.value = val
      const params = {
        page: {
          pageNum: page.value,
          pageSize: pagesize.value
        }
      }
      QueryBusiness(params).then((res) => {
        tableData_.value = res.data.data.records
        total.value = res.data.data.total
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
      deleteform_,
      total,
      page,
      pagesize,
      pagechange,
      rules,
      formRuler,
      EditAdd
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
