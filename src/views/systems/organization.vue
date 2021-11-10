<template>
  <div class="flex">
    <el-card
      class="flex-lfet"
      style="width: 15%; margin-right: 50px; height: 85vh; border-radius: 10px; overflow: auto"
    >
      <div class="search">
        <TreeNode
          :treeData="treeData"
          :isContextMenu="true"
          :contextMenus="contextMenus"
          class="person-left"
        />
      </div>
    </el-card>
    <el-card style="height: 79vh; position: relative; margin-top: 6vh">
      <div class="top">
        <div class="top-name">经销商管理</div>
        <Search @search="search" searchtext="经销商名字" name="绑定" :isShow="true"></Search>
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
  tree,
  nodeitem,
  dialogFormVisible1,
  dialogFormVisible2,
  Distribution
} from '@/utils/pageData/organization'
import { title, treeData } from '@/utils/pageData/personData'
import { dialogFormVisible } from '@/utils/pageData/publicData'
import { tableChange, tablePost, getOrganization, addnode, deletenode } from '@/utils/request'
import { ElMessage } from 'element-plus'
import Table from '@/components/table/table.vue'
import router from '@/router/index'
import Search from '@/components/search.vue'
import TreeNode from '@/components/treeNode.vue'
export default defineComponent({
  name: 'ShopName',
  components: {
    Table,
    Search,
    TreeNode
  },
  setup() {
    const url = ''
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
    // 架构右键菜单
    let isContextMenu = ref(true)
    const contextMenus: Array<any> = [
      {
        label: '新增节点',
        icon: 'el-icon-plus',
        onClick() {
          console.log('新增节点')
        }
      },
      {
        label: '删除节点',
        icon: 'el-icon-minus',
        onClick() {
          console.log('删除节点')
        }
      },
      {
        label: '修改节点',
        icon: 'el-icon-edit',
        onClick() {
          console.log('修改节点')
        }
      }
    ]
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
        pageSize: pagesize.value
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
      tree,
      nodeitem,
      dialogFormVisible1,
      submitnode,
      dialogFormVisible2,
      nodedelete,
      Distribution,
      getdistribution,
      dealer,
      treeData,
      isContextMenu,
      contextMenus
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
