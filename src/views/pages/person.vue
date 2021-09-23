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
            placeholder="请选择职务"
            style="margin-right: 20px"
          >
            <el-option v-for="(item, index) of optionsJob" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select
            v-model="local"
            @change="selectJob"
            clearable
            placeholder="请选择地区"
            style="margin-right: 20px"
          >
            <el-option
              v-for="(item, index) in optionslocal"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <Search :form="form" @search="search" searchtext="搜索人员名称"></Search>
        </div>
      </div>
      <Table
        @delete:gitlist="handleCurrentChange"
        :table="table"
        :tableData="tableData"
        url="/proxy/7003/service/admin/deleteUser/"
        id="id"
        :form="form"
        :buttonShow="true"
      ></Table>
      <el-pagination
        layout="prev, pager, next"
        :page-size="pagesize"
        :total="total"
        @current-change="handleCurrentChange"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
    <!-- 修改弹出框 -->
    <el-dialog :title="title" destroy-on-close v-model="dialogFormVisible" @open="getSuperior">
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
          <el-form-item label="职务" :label-width="formLabelWidth" prop="roleName">
            <el-select
              v-model="form.roleName"
              @change="selectDioJob"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in optionsJob"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级" :label-width="formLabelWidth" prop="superior">
            <el-select v-model="form.superior" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in optionsSuperior"
                :key="index"
                :label="item.roleName + '：' + '' + item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" :label-width="formLabelWidth" prop="local">
            <el-select v-model="form.local" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in optionslocal"
                :key="index"
                :label="item"
                :value="item"
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
import { storage } from '@/utils/storage'
import {
  job,
  local,
  table,
  tableData,
  rules,
  selectSexData,
  phoneShow,
  formRules,
  form,
  formLabelWidth,
  optionsJob,
  optionslocal,
  page,
  pagesize,
  total,
  optionsSuperior,
  title,
  id
} from '@/utils/pageData/personData'
import { dialogFormVisible } from '@/utils/pageData/publicData'
import {
  selectJobs,
  tableChange,
  tablePost,
  seletlocals,
  usersall,
  getAllSuperior,
  xj,
  pageSize
} from '@/utils/request'
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
    //控制管理员新增人员的上级
    const selectDioJob = () => {
      getAllSuperior().then((res) => {
        const list = res.data.data
        if (storage.get('roleName') == '管理员') {
          switch (form.roleName) {
            case '团购总监':
              var newlist3 = list.filter((item) => {
                return item.roleName == '管理员'
              })
              optionsSuperior.value = newlist3
              break
            case '团购经理':
              var newlist4 = list.filter((item) => {
                return item.roleName == '团购总监' && item.id !== storage.get('id')
              })
              optionsSuperior.value = newlist4
              break
            case '业务员':
              var newlist5 = list.filter((item) => {
                return item.roleName == '团购经理' && item.id !== storage.get('id')
              })
              optionsSuperior.value = newlist5
              break
            case '检核人员':
              var newlist6 = list.filter((item) => {
                return item.roleName == '团购经理' && item.id !== storage.get('id')
              })
              optionsSuperior.value = newlist6
              break
          }
        }
      })
    }

    const url = '/proxy/7003/service/admin/users/insertOrUpdate'
    //加载职位选项
    const getoptionsJob = () => {
      const role = storage.get('role')

      selectJobs().then((res) => {
        const list = res.data.data
        if (role == 'admin') {
          optionsJob.value = list
        } else {
          switch (role) {
            case 'manager':
              var newlist = list.filter((item) => {
                return item == '业务员' || item == '检核人员'
              })
              optionsJob.value = newlist
              break

            case 'chief':
              var newlist1 = list.filter((item) => {
                return item == '团购经理' || item == '业务员' || item == '检核人员'
              })
              optionsJob.value = newlist1
              break
          }
        }
      })
    }
    getoptionsJob()
    //加载所有地区选项
    const getlocals = () => {
      seletlocals().then((res) => {
        const list = res.data.data
        optionslocal.value = list
      })
    }
    getlocals()
    //加载所有的上级
    const getSuperior = () => {
      getAllSuperior().then((res) => {
        const list = res.data.data
        console.log(list)
        if (storage.get('roleName') == '管理员') {
          switch (form.roleName) {
            case '团购总监':
              var newlist3 = list.filter((item) => {
                return item.roleName == '管理员'
              })
              optionsSuperior.value = newlist3
              break
            case '团购经理':
              var newlist4 = list.filter((item) => {
                return item.roleName == '团购总监' && item.id !== storage.get('id')
              })
              optionsSuperior.value = newlist4
              break
            case '业务员':
              var newlist5 = list.filter((item) => {
                return item.roleName == '团购经理' && item.id !== storage.get('id')
              })
              optionsSuperior.value = newlist5
              break
            case '检核人员':
              var newlist6 = list.filter((item) => {
                return item.roleName == '团购经理' && item.id !== storage.get('id')
              })
              optionsSuperior.value = newlist6
              break
          }
        } else {
          console.log(storage.get('title'))

          if (storage.get('title') == '新增') {
            const newlist = list.filter((item) => {
              return item.id == storage.get('id')
            })
            optionsSuperior.value = newlist
          } else {
            switch (storage.get('roleName')) {
              case '团购总监':
                var newlist1 = list.filter((item) => {
                  return item.roleName == '管理员' || item.role == '团购总监'
                })
                optionsSuperior.value = newlist1
                break
              case '团购经理':
                var newlist2 = list.filter((item) => {
                  return (
                    item.roleName == '团购总监' ||
                    (item.role == '团购经理' && item.id !== storage.get('id'))
                  )
                })
                optionsSuperior.value = newlist2
                break
            }
          }
        }
      })
      //把superior字符串变为数字
      if (storage.get('roleName') !== '管理员') {
        id.value = storage.get('id')
      } else {
        const params = {
          pages: 1,
          size: 1,
          userName: form.superior
        }
        usersall(params).then((res) => {
          res.data.data.records.forEach((item) => {
            id.value = item.id
          })
        })
      }
    }
    //首次进入加载数据
    const getusers = () => {
      if (storage.get('roleName') == '管理员') {
        const params = {
          pages: 1,
          size: pagesize.value
        }
        usersall(params).then((res) => {
          tableData.value = res.data.data.records
          total.value = res.data.data.total
        })
      } else {
        const params = {
          superiorId: storage.get('id'),
          pages: 1,
          size: pagesize.value,
          local: local.value,
          role: job.value
        }
        xj(params).then((res) => {
          tableData.value = res.data.data.records
          total.value = res.data.data.total
        })
      }
    }
    getusers()

    // list选择职位
    const selectJob = () => {
      handleCurrentChange(1)
    }
    // 页面改变时调用参数
    const handleCurrentChange = (val: number) => {
      page.value = val
      const params = {
        pages: val,
        size: pagesize.value,
        local: local.value,
        roleName: job.value
      }
      if (storage.get('roleName') == '管理员') {
        usersall(params).then((res) => {
          tableData.value = res.data.data.records
          total.value = res.data.data.total
        })
      } else {
        const params = {
          superiorId: storage.get('id'),
          pages: val,
          size: pagesize.value,
          local: local.value,
          role: job.value
        }
        xj(params).then((res) => {
          tableData.value = res.data.data.records
          total.value = res.data.data.total
        })
      }
    }
    // 搜索
    const search = (searchText: string) => {
      const params = {
        pages: 1,
        size: pagesize.value,
        userName: searchText,
        local: local.value,
        roleName: job.value
      }
      if (storage.get('roleName') == '管理员') {
        usersall(params).then((res) => {
          tableData.value = res.data.data.records
          total.value = res.data.data.total
        })
      } else {
        const params = {
          superiorId: storage.get('id'),
          pages: 1,
          size: pagesize.value,
          userName: searchText,
          local: local.value,
          roleName: job.value
        }
        xj(params).then((res) => {
          tableData.value = res.data.data.records
          total.value = res.data.data.total
        })
      }
    }
    //新增和修改
    const submitForm = () => {
      formRules.value.validate((valid: any) => {
        if (valid) {
          switch (form.roleName) {
            case '业务员':
              form.role = 'user'
              break

            case '检核人员':
              form.role = 'feeAudit'
              break
            case '团购经理':
              form.role = 'manager'
              break
            case '团购总监':
              form.role = 'chief'
              break
            case '管理员':
              form.role = 'admin'
              break
          }
          if (form.id != undefined) {
            if (form.superior.constructor == String) {
              const newData = JSON.parse(JSON.stringify(form).replace(form.superior, id.value))
              console.log(newData.role)
              tableChange(url, newData)
                .then(() => {
                  ElMessage({
                    type: 'success',
                    iconClass: 'el-icon-circle-check',
                    message: '修改成功'
                  })
                  handleCurrentChange(page.value)
                })
                .catch(() => {
                  ElMessage({
                    type: 'error',
                    iconClass: 'el-icon-circle-close',
                    message: '修改失败'
                  })
                })
            } else {
              tableChange(url, form)
                .then(() => {
                  ElMessage({
                    type: 'success',
                    iconClass: 'el-icon-circle-check',
                    message: '修改成功'
                  })
                  handleCurrentChange(page.value)
                })
                .catch(() => {
                  ElMessage({
                    type: 'error',
                    iconClass: 'el-icon-circle-close',
                    message: '修改失败'
                  })
                })
            }
          } else {
            delete form.id
            tablePost(url, form)
              .then(() => {
                ElMessage({
                  type: 'success',
                  iconClass: 'el-icon-circle-check',
                  message: '新增成功'
                })
                handleCurrentChange(page.value)
              })
              .catch(() => {
                ElMessage({
                  type: 'error',
                  iconClass: 'el-icon-circle-close',
                  message: '账号已存在'
                })
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
      phoneShow,
      search,
      form,
      job,
      local,
      getSuperior,
      dialogFormVisible,
      formLabelWidth,
      rules,
      selectSexData,
      selectJob,
      formRules,
      optionsJob,
      submitForm,
      optionslocal,
      page,
      pagesize,
      total,
      optionsSuperior,
      title,
      id,
      xj,
      selectDioJob
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
