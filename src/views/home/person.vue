<template>
  <div class="person">
    <TreeNode :treeData="treeData" class="person-left" />
    <Tabs
      class="person-right"
      :tabs="tabs"
      :activeName="activeName"
      @handleClick="tabChange"
    >
      <el-card>
        <div class="tableBar">
          <p>{{ activeName }}列表</p>
          <div class="tableBar-condition">
            <el-row class="spanRow">
              <el-input
                v-model="searchKey"
                prefix-icon="el-icon-search"
                placeholder="请输入电话或者姓名"
              >
              </el-input> 
            </el-row>
            <el-row class="spanRow">
              <el-select v-model="searchJob" clearable placeholder="请根据岗位查询">
                <el-option
                  v-for="item in jobs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-row>
            <el-row class="spanRow">
              <el-select v-model="searchStatu" clearable placeholder="请根据状态查询">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-row>
            <el-button type="primary">搜索</el-button>
            <el-button type="primary">导入</el-button>
            <el-button type="primary">新增</el-button>
            <el-button type="primary">删除</el-button>
          </div>
        </div>
        <Table :columns="columns" :tableData="tableData" v-loading="loading">
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="mini" type="text">启用</el-button>
              <el-button size="mini" type="text">禁用</el-button>
            </template>
          </el-table-column>
        </Table>
      </el-card>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import {
  tabs,
  treeData,
  jobs,
  status,
  columns,
  tableData,
} from "@/utils/pageData/personData";
import Table from "@/components/table/primeryTable.vue";
import Tabs from "@/components/tabsButton.vue";
import TreeNode from "@/components/treeNode.vue";
export default defineComponent({
  name: "person",
  components: {
    Table,
    Tabs,
    TreeNode,
  },
  setup() {
    // 切换架构
    let activeName = ref("内部架构");
    let searchKey = ref("");
    let searchJob = ref("");
    let searchStatu = ref("");
    let loading = ref(false);

    return {
      tabs,
      activeName,
      treeData,
      searchKey,
      searchJob,
      searchStatu,
      jobs,
      status,
      columns,
      tableData,
      loading,
    };
  },
  methods: {
    tabChange(tab) {
      this.activeName = tab.props.name;
    },
  },
});
</script>

<style scoped lang="scss">
.person {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &-left {
    width: 210px;
    height: calc(100vh - 140px);
    padding: 20px;
  }
  &-right {
    margin-left: 10px;
    height: calc(100vh - 100px);
    flex: 1;
  }
}
.tableBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-condition {
    display: inherit;
  }
}
.spanRow {
  margin-right: 5px !important;
}
</style>
