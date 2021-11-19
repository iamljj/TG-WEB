<template>
  <div class="Role-Mcontainer">
    <Tabs class="person-right" :tabs="tabs" :activeName="activeName" @handleClick="tabChange">
      <template v-slot:[activeName]>
        <el-card>
          <div class="tableBar">
            <p class="p">{{ activeName }}列表</p>
            <el-input class="input"></el-input>
            <el-button type="primary">搜索</el-button>
            <el-button type="primary" @click="addrole">新增</el-button>
          </div>
          <Table :columns="columns" :data="tableData_">
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="medium" type="text">编辑</el-button>
                <el-button size="medium" type="text">删除</el-button>
              </template>
            </el-table-column>
          </Table>
        </el-card>
      </template>
    </Tabs>
  </div>
  <el-dialog :title="title" v-model="editadd" width="30%">
    <el-form :model="form_">
      <el-form-item label="角色名称">
        <el-input v-model="form_.bsrName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="业务类型">
        <el-select v-model="form_.bsCode" placeholder="请选择业务类型" clearable multiple>
          <el-option
            v-for="(item, i) in business"
            :label="item.bsName"
            :value="item.bsCode"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editadd = false">取消</el-button>
        <el-button type="primary" @click="sendNode">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { tabs, columns, tableData, getrole, form, business } from '@/utils/pageData/role'
import { defineComponent, ref } from 'vue'
import Table from '@/components/table/primeryTable.vue'
import Tabs from '@/components/tabsButton.vue'
export default defineComponent({
  name: 'Role',
  components: {
    Table,
    Tabs
  },
  setup(props, context) {
    //切换框架
    let activeName = ref('酒业')
    const tabChange = (tab) => {
      activeName.value = tab.props.name
    }

    //表格
    let editadd = ref(false)
    let form_ = ref(form)
    let tableData_ = ref(tableData)

    //打开弹窗
    let title = ref('')
    const addrole = () => {
      title.value = '新增'
      editadd.value = true
    }
    getrole()
    return {
      tabs,
      tabChange,
      activeName,
      columns,
      form_,
      business,
      editadd,
      tableData_,
      addrole,
      title
    }
  }
})
</script>
<style lang="scss">
.Role-Mcontainer {
  .tableBar {
    display: flex;
    justify-content: center;
    align-items: center;
    .p {
      width: 30%;
      flex: 1;
      font-size: 1.6rem;
      font-family: PingFangSC, PingFangSC-Medium;
      color: #333333;
    }
    .input {
      width: 200px;
    }
  }
}
</style>
