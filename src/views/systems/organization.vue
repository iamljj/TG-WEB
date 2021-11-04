<template>
  <el-dialog
    title="新增"
    width="25%"
    :before-close="handleClose"
    destroy-on-close
    v-model="dialogFormVisible1"
  >
    <el-form
      :model="nodeitem"
      :rules="rules"
      ref="formRules"
      style="display: flex; justify-between: center"
    >
      <div style="width: 80%; height: 100%">
        <el-form-item label="上级节点" label-width="100px" prop="departmentName">
          <el-input v-model="nodeitem.departmentName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="新增节点名" label-width="100px" prop="addname">
          <el-input v-model="nodeitem.addname" autocomplete="off"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitnode">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible2" title="删除" width="30%" center>
    <span
      >确定要删除
      <p style="color: red">{{ nodeitem.label }}</p></span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="nodedelete">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <div class="flex">
    <el-card
      style="width: 15%; margin-right: 50px; height: 85vh; border-radius: 10px; overflow: auto"
    >
      <div class="search">
        <el-input
          @input="change"
          class="top-search-input"
          placeholder="输入组织框架节点"
          v-model="filterText"
          suffix-icon="el-icon-search"
        ></el-input>
        <div style="display: flex">
          <h1 style="flex: 1">组织架构</h1>
        </div>
        <el-tree
          :data="data"
          ref="Tree"
          node-key="path"
          :default-expanded-keys="['000000010060']"
          :props="defaultProps"
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node" @click="getdata(data, node)">
              <span
                @click="getdata(data)"
                :style="{ color: node.label == nodeitem.departmentName ? 'red' : '#606266' }"
                >{{ node.label }}</span
              >
            </span>
          </template>
        </el-tree>
      </div>
    </el-card>
    <el-card style="height: 79vh; position: relative; margin-top: 6vh">
      <div class="top">
        <div class="top-name">经销商管理</div>
        <Search @search="search" searchtext="经销商名字" name="绑定" :isShow="true"></Search>
        <el-button type="primary" size="medium" class="top-search-button" @click="add(form)"
          >新增节点</el-button
        >
        <el-button type="primary" size="medium" class="top-search-button" @click="remove(form)"
          >删除节点</el-button
        >
        <el-button type="primary" size="medium" class="top-search-button text" @click="dealer"
          >关联经销商</el-button
        >
      </div>
      <Table
        :isshow="true"
        :table="table"
        :tableData="tableData"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
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
  page,
  data,
  defaultProps,
  tree,
  filterText,
  nodeitem,
  dialogFormVisible1,
  dialogFormVisible2,
  Distribution,
} from '@/utils/pageData/organization'
import { title } from '@/utils/pageData/personData'
import { dialogFormVisible } from '@/utils/pageData/publicData'
import {
  tableChange,
  searchAxios,
  tablePost,
  getOrganization,
  addnode,
  deletenode,
  getDistribution
} from '@/utils/request'
import { ElMessage } from 'element-plus'
import Table from '@/components/table/table.vue'
import router from '@/router/index'
import Search from '@/components/search.vue'
export default defineComponent({
  name: 'ShopName',
  components: {
    Table,
    Search
  },
  setup() {
    const url = ''
    var searchtext = ''
    const Tree = ref(null)
    watch(filterText, (val) => {
      Tree.value.filter(val)
    })
    const dealer = () => {
      router.push('/home/dealer')
    }
    const getdistribution = () => {
      const params = {
        departmentName: nodeitem.departmentName,
        path: nodeitem.path
      }
      //   getDistribution(params)
      //     .then((res) => {})
      //     .catch(() => {
      //       ElMessage({
      //         type: 'error',
      //         iconClass: 'el-icon-circle-close',
      //         message: '请先选择节点'
      //       })
      //     })
    }
    const getdata = (data) => {
      nodeitem.path = data.path
      nodeitem.departmentName = data.departmentName
    }
    const filterNode = (val, data) => {
      if (!val) return true
      return data.departmentName.indexOf(val) !== -1
    }

    const add = () => {
      dialogFormVisible1.value = true
    }
    const remove = () => {
      dialogFormVisible2.value = true
    }
    const submitnode = () => {
      const params = {
        departmentName: nodeitem.addname,
        fatherPath: nodeitem.path
      }
      addnode(params)
        .then(() => {
          ElMessage({
            type: 'success',
            iconClass: 'el-icon-circle-close',
            message: '新增成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            iconClass: 'el-icon-circle-close',
            message: '修改失败'
          })
        })
      dialogFormVisible1.value = false
      nodeitem.addname = ''
      getorganization()
    }
    const nodedelete = () => {
      deletenode(nodeitem.path)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              type: 'success',
              iconClass: 'el-icon-circle-close',
              message: '删除成功'
            })
            dialogFormVisible2.value = false
            getorganization()
          } else {
            ElMessage({
              type: 'error',
              iconClass: 'el-icon-circle-close',
              message: res.data.message
            })
            dialogFormVisible2.value = false
          }
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            iconClass: 'el-icon-circle-close',
            message: '此节点还有人员存在，请移除人员再删除或请先选中节点'
          })
          dialogFormVisible2.value = false
        })
    }
    const change = (val, label) => {
      console.log(val, label)
    }
    //首次进入加载组织架构
    const getorganization = () => {
      getOrganization()
        .then((res) => {
          data.value = res.data.data
          console.log(data.value)
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getorganization()
    //首次进页面刷新数据
    const getlist = () => {
      // const params = {
      //   page: page.value,
      //   pageSize: pagesize.value
      // }
      // displayall(params).then((res) => {
      //   tableData.value = res.data.data.records
      //   totol.value = res.data.data.total
      // })
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
      console.log(tree.value.getCheckedKeys())
      console.log(tree.value.getHalfCheckedKeys())
      formRules.value.validate((valid: any) => {
        if (valid) {
          if (form.roleid != '') {
            tableChange(url, form).then(() => {
              handleCurrentChange(page.value)
            })
          } else {
            delete form.roleid
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
      page,
      title,
      data,
      defaultProps,
      tree,
      add,
      filterText,
      Tree,
      filterNode,
      nodeitem,
      dialogFormVisible1,
      submitnode,
      dialogFormVisible2,
      remove,
      nodedelete,
      getdata,
      Distribution,
      getdistribution,
      dealer
    }
  }
})
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  .search {
    height: 20px;
    border-radius: 10px;
  }
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
    .top-search-button {
      height: 40px;
      width: 96px;
      margin-left: -370px;
      margin-right: 10px;
      border-radius: 10px;
    }
    .text {
      padding-left: 15px;
    }
  }
  .TreeTransfer {
    display: flex;
    justify-content: center;

    .life {
      width: 40%;
      height: 60vh;
    }
    .middle {
      width: 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .pageSelect {
    position: absolute;
    bottom: 20px;
    transform: translateX(-50%);
    left: 50%;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    padding-right: 8px;
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
}
</style>
<style lang="scss">
.bind {
  border-radius: 20px;
  .el-dialog__header {
    background-color: #409eff;
    border-radius: 20px 20px 0 0;
    color: #fff !important;
  }
  .el-dialog__title {
    color: white;
  }
  .el-dialog__close {
    color: white;
  }
}
</style>
