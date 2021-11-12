<template>
  <div class="flex">
    <el-card class="flex-left">
      <div class="search">
        <TreeNode
          :treeData="treeData"
          :isContextMenu="true"
          :contextMenus="contextMenus"
          @nodeClick="nodeClick"
          @node-context="nodeContext"
          class="person-left"
        />
      </div>
    </el-card>
    <el-card class="flex-right">
      <div class="top">
        <div class="top-name">经销商管理</div>
        <div class="top-right">
          <el-input class="input" placeholder="请输入经销商" v-model="searchKey"
            ><template #append>
              <el-button class="input-button">搜索</el-button>
            </template></el-input
          >
          <el-button class="button" type="primary" @click="dealer">绑定经销商</el-button>
        </div>
      </div>
      <Table ref="table" :columns="tableCol_" :tableData="tableData_" v-loading="loading">
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="medium" type="text">解绑</el-button>
          </template>
        </el-table-column>
      </Table>
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
  <el-dialog v-model="AddNode" width="30%" class="mydialog" title="新增节点"></el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive } from 'vue'
import { displayall } from '@/utils/request'
import {
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
  Distribution,
  columns
} from '@/utils/pageData/organization'
import { title, treeData } from '@/utils/pageData/personData'
import { dialogFormVisible } from '@/utils/pageData/publicData'
import { tableChange, tablePost, getOrganization, addnode, deletenode } from '@/utils/request'
import { ElMessage } from 'element-plus'
import Table from '@/components/table/primeryTable.vue'
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
    //搜索框的文本值
    let searchKey = ref('')

    //表格Table
    let tableCol_ = reactive(columns)
    let tableData_ = tableData

    //弹窗的model值
    let AddNode = ref(false)

    //跳转到经销商绑定
    const dealer = () => {
      router.push('/home/dealer')
    }

    //点击树节点获取数据
    let node = ref(null)
    const nodeContext = (e, data) => {
      node.value = data
    }

    // 架构右键菜单
    let isContextMenu = ref(true)
    const contextMenus: Array<any> = [
      {
        label: '新增节点',

        icon: 'el-icon-plus',
        onClick() {
          AddNode.value = true
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

    //首次进入加载组织架构

    // 搜索
    const search = (searchText: string) => {
      const params = {
        page: 1,
        pageSize: pagesize.value,
        queryKey: searchText
      }
      // displayall(params).then((res) => {
      //   tableData_.value = res.data.data.records
      //   totol.value = res.data.data.total
      // })
    }
    // 翻页
    const handleCurrentChange = (val: number) => {
      page.value = val
      const params = {
        page: val,
        pageSize: pagesize.value
      }
      // displayall(params).then((res) => {
      //   tableData.value = res.data.data.records
      //   totol.value = res.data.data.total
      // })
    }
    // 修改页面点击确认

    return {
      AddNode,
      tableData_,
      handleCurrentChange,
      form,
      formId,
      dialogFormVisible,
      search,
      formLabelWidth,
      rules,
      formRules,
      handleClose,
      totol,
      pagesize,
      page,
      title,
      data,
      tree,
      nodeitem,
      dialogFormVisible1,
      dialogFormVisible2,
      Distribution,
      dealer,
      treeData,
      isContextMenu,
      contextMenus,
      searchKey,
      tableCol_,
      node,
      nodeContext
    }
  }
})
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  &-left {
    width: 15%;
    margin-right: 50px;
    height: 85vh;
    border-radius: 10px;
    overflow: auto;
  }
  &-right {
    height: 79vh;
    position: relative;
    margin-top: 6vh;
    width: 100%;
  }
  .search {
    height: 20px;
    border-radius: 10px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &-name {
      flex: 1;
      min-width: 7%;
      height: 5vh;
      line-height: 5vh;
      color: #333333;
      font-size: 20px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
    }
    &-right {
      .input {
        width: 250px;
        &-button {
          background-color: #409eff;
          color: #fff;
        }
      }
      .button {
        width: 100px;
        padding-left: 16px;
        margin-left: 10px;
      }
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

