<template>
  <div>
    <el-card style="height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">人员管理</div>
        <div style="display: flex">
          <el-select
            v-model="job"
            @change="selectJob"
            clearable
            placeholder="请选择"
            style="margin-right: 20px"
          >
            <el-option
              v-for="item in optionsJob"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <Search :form="form" @search="search"></Search>
        </div>
      </div>
      <Table
        :table="table"
        :tableData="tableData"
        url="/person"
        :form="form"
        :buttonShow="true"
      ></Table>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
    <!-- 修改弹出框 -->
    <el-dialog title="修改" destroy-on-close v-model="dialogFormVisible">
      <el-form
        :model="form"
        :rules="rules"
        ref="formRules"
        style="display: flex; justify-between: center"
      >
        <div style="width: 40%; height: 100%">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="form.phone" :disabled="phoneShow" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-select v-model="form.sex" @change="selectSex" clearable placeholder="请选择">
              <el-option
                v-for="item in selectSexData"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="width: 40%; margin-left: 10%">
          <el-form-item label="职务" :label-width="formLabelWidth" prop="job">
            <el-select v-model="form.job" @change="selectDioJob" clearable placeholder="请选择">
              <el-option
                v-for="item in dioJobData"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级" :label-width="formLabelWidth" prop="superior">
            <el-select
              v-model="form.superior"
              @change="selectSuperior"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectSuperiorData"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
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
import { defineComponent } from 'vue'
import {
  optionsJob,
  job,
  table,
  tableData,
  rules,
  selectSexData,
  phoneShow,
  dioJobData,
  selectSuperiorData,
  formRules,
  form,
  formLabelWidth
} from '@/utils/pageData/personData'
import { dialogFormVisible } from '@/utils/pageData/publicData'
import { pageSize, searchAxios, selectJobs, tableChange, tablePost } from '@/utils/request'
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
    const url = '/person'
    // 选择上级
    const selectSuperior = (val) => {
      console.log(val)
    }
    // list选择职位
    const selectJob = (val) => {
      selectJobs(val).then((res) => {
        tableData.value = res.data
      })
    }
    // 页面改变时调用参数
    const handleCurrentChange = (val: number) => {
      pageSize(url, val).then((res) => {
        tableData.value = res.data
      })
    }
    // 搜索
    const search = (searchText: string) => {
      searchAxios(url, searchText).then((res) => {
        tableData.value = res.data
      })
    }
    // 修改model选择职位
    const selectDioJob = (val) => {
      console.log(val)
    }
    const submitForm = () => {
      formRules.value.validate((valid: any) => {
        if (valid) {
          if (form.id != '') {
            tableChange(url, form).then((res) => {
              tableData.value = res.data
            })
          } else {
            delete form.id
            tablePost(url, form).then((res) => {
              tableData.value = res.data
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
    const selectSex = (val) => {
      console.log(val)
    }
    // 上传文件成功后
    const handleAvatarSuccess = (res, file) => {
      console.log(res, file)
    }

    return {
      tableData,
      table,
      handleCurrentChange,
      selectSex,
      optionsJob,
      phoneShow,
      search,
      form,
      job,
      handleAvatarSuccess,
      dialogFormVisible,
      formLabelWidth,
      selectSuperior,
      rules,
      selectSexData,
      selectJob,
      formRules,
      selectSuperiorData,
      selectDioJob,
      submitForm,
      dioJobData
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
