<template>
  <div>
    <el-card style="height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">陈列项列表</div>
        <Search @search="search" searchtext="搜索人员名称 "></Search>
      </div>
      <Table
        :table="table"
        :tableData="tableData"
        url="/proxy/7003/service/admin/display/"
        id="displayId"
        :form="form"
        :buttonShow="true"
        @delete:gitlist="handleCurrentChange"
        :page="page"
      ></Table>
      <el-pagination
        layout="prev, pager, next"
        :total="totol"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
    <!-- 修改弹出框 -->
    <el-dialog
      title="title"
      width="25%"
      :before-close="handleClose"
      destroy-on-close
      v-model="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="formRules"
        style="display: flex; justify-between: center"
      >
        <div style="width: 80%; height: 100%">
          <el-form-item label="费用项编号" :label-width="formLabelWidth" prop="dispalyNumber">
            <el-input v-model="form.dispalyNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="费用项名称" :label-width="formLabelWidth" prop="displayName">
            <el-input v-model="form.displayName" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { displayall } from '@/utils/request'
import {
  table,
  tableData,
  formLabelWidth,
  formId,
  form,
  handleClose,
  rules,
  formRules,
  totol,
  pagesize,
  page
} from '@/utils/pageData/displayItem'
import { dialogFormVisible } from '@/utils/pageData/publicData'
import { tableChange, searchAxios, tablePost } from '@/utils/request'
import { ElMessage } from 'element-plus'
import Table from '@/components/table/table.vue'
import Search from '@/components/search.vue'
export default defineComponent({
  name: 'ShopName',
  components: {
    Table,
    Search
  },
  setup() {
    const url = '/proxy/7003/service/admin/display/save'
    var searchtext = ''

    const change = (val, label) => {
      console.log(val, label)
    }
    //首次进页面刷新数据
    const getlist = () => {
      const params = {
        page: page.value,
        pageSize: pagesize.value
      }
      displayall(params).then((res) => {
        tableData.value = res.data.data.records
        totol.value = res.data.data.total
      })
    }
    getlist()
    // 搜索
    const search = (searchText: string) => {
      searchtext = searchText
      const params = {
        page: 1,
        pageSize: pagesize.value,
        queryKey: searchText
      }
      displayall(params).then((res) => {
        tableData.value = res.data.data.records
        totol.value = res.data.data.total
      })
    }
    // 翻页
    const handleCurrentChange = (val: number) => {
      page.value = val
      const params = {
        page: val,
        pageSize: pagesize.value,
        queryKey: searchtext
      }
      displayall(params).then((res) => {
        tableData.value = res.data.data.records
        totol.value = res.data.data.total
      })
    }
    // 修改页面点击确认
    const submitForm = () => {
      formRules.value.validate((valid: any) => {
        if (valid) {
          if (form.displayId != '') {
            tableChange(url, form).then(() => {
              handleCurrentChange(page.value)
            })
          } else {
            delete form.displayId
            tablePost(url, form).then(() => {
              handleCurrentChange(page.value)
            })
          }
          for (const key in form) {
            form[key] = ''
          }
          dialogFormVisible.value = false
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
      tableData,
      table,
      handleCurrentChange,
      form,
      formId,
      dialogFormVisible,
      search,
      formLabelWidth,
      rules,
      change,
      formRules,
      submitForm,
      handleClose,
      totol,
      pagesize,
      page
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
.pageSelect {
  position: absolute;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 178px;
  height: 178px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
