<template>
  <div class="flex">
    <el-card class="flex-left">
      <div class="search">
        <TreeNode
          :treeData="tree_Data"
          :isContextMenu="true"
          :contextMenus="contextMenus"
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
      <Table ref="table" :columns="tableCol_" :tableData="tableData_">
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
  <el-dialog v-model="dialogVisible" width="30%" title="新增节点">
    <el-form ref="formRules" :model="form_" label-width="120px" :rules="rules">
      <el-form-item label="上级节点">
        <el-input v-model="form_.nodeName" disabled></el-input>
      </el-form-item>
      <el-form-item label="节点名称" prop="childNodeName">
        <el-input v-model="form_.childNodeName"></el-input>
      </el-form-item>
      <el-form-item label="业务类型" prop="bsCode">
        <el-select v-model="form_.bsCode" placeholder="请选择业务类型" clearable multiple>
          <el-option
            v-for="(item, i) in business_"
            :label="item.bsName"
            :value="item.bsCode"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sendNode">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="修改节点名称" width="20%" v-model="EditNode">
    <el-form ref="formRlu" :model="form_" label-width="120px">
      <el-form-item label="节点名称">
        <el-input v-model="form_.label"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditNode = false">取消</el-button>
        <el-button type="primary" @click="EditNode = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, onBeforeMount } from 'vue'
import {
  tableData,
  form,
  totol,
  pagesize,
  page,
  data,
  columns,
  business,
  Businessall,
  rules
} from '@/utils/pageData/organization'
import { arrayToTree } from '@/utils/arrayToTree'
import { title, treeData } from '@/utils/pageData/personData'
import { ElMessage, ElMessageBox } from 'element-plus'
import Table from '@/components/table/primeryTable.vue'
import router from '@/router/index'
import TreeNode from '@/components/treeNode.vue'
import { putFrameworkNode } from '@/service/frameworkNode'
export default defineComponent({
  name: 'ShopName',
  components: {
    Table,
    TreeNode
  },
  setup() {
    const formRules = ref(null)

    //业务类型
    const business_ = reactive(business)
    const url = ''

    //搜索框的文本值
    let searchKey = ref('')

    //表格Table
    let tableCol_ = reactive(columns)
    let tableData_ = tableData

    //弹窗的model值
    let dialogVisible = ref(false)
    let EditNode = ref(false)

    //弹窗表单的值
    let form_ = reactive(form)

    //跳转到经销商绑定
    const dealer = () => {
      router.push('/home/dealer')
    }

    // 架构数据

    let tree_Data = ref([])

    onBeforeMount(async () => {
      let treedata = await treeData(4)
      tree_Data.value = arrayToTree(treedata, 'parentPath')
    })

    //点击树节点获取数据

    const nodeContext = (e, data) => {
      console.log(data)

      form_.nodeName = data.name
      form_.parentCode = data.path
    }

    // 架构右键菜单
    let isContextMenu = ref(true)
    const contextMenus: Array<any> = [
      {
        label: '新增节点',
        icon: 'el-icon-plus',
        onClick() {
          dialogVisible.value = true
          Businessall('', form_.parentCode)
        }
      },
      {
        label: '删除节点',
        icon: 'el-icon-minus',
        onClick() {
          ElMessageBox.confirm(`确定要删除${form_.nodeName}`, '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              ElMessage({
                type: 'success',
                message: 'Delete completed'
              })
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: 'Delete canceled'
              })
            })
        }
      },
      {
        label: '修改节点',
        icon: 'el-icon-edit',
        onClick() {
          EditNode.value = true
          Businessall('', '')
        }
      }
    ]

    //首次进入加载组织架构

    //发送新增修改节点请求
    const sendNode = () => {
      formRules.value.validate((valid: any) => {
        if (valid) {
          if (!form_.id) {
            let params = {
              nodeName: form_.childNodeName,
              parentCode: form_.parentCode,
              root: true
            }
            putFrameworkNode(params).then(() => {
              if (form_.bsCode) {
                form_.bsCode.forEach((item) => {
                  if (item == '910854855222886400') {
                    const list1 = []
                    form_.bsCode = ''
                    business_.forEach((item) => {
                      let list = {
                        bsCode: item.bsCode
                      }
                      list1.push(list)
                    })
                    form_.bsCode = list1

                  }
                })
              }
            })
          }
        }
      })
    }

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
      dialogVisible,
      tableData_,
      handleCurrentChange,
      search,
      totol,
      pagesize,
      page,
      title,
      data,
      dealer,
      treeData,
      isContextMenu,
      contextMenus,
      searchKey,
      tableCol_,
      nodeContext,
      form_,
      business_,
      EditNode,
      tree_Data,
      rules,
      sendNode,
      formRules
    }
  }
})
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  &-left {
    width: 25%;
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
