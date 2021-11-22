<template>
  <div class="person">
    <TreeNode
      :treeData="tree_data"
      :isContextMenu="true"
      :contextMenus="contextMenus"
      @node-context="nodeContext"
      class="person-left"
      v-loading="treeLoad"
    />
    <Tabs
      class="person-right"
      :tabs="tabs"
      :activeName="activeName"
      @handleClick="tabChange"
    >
      <template v-slot:[activeName]>
        <el-card>
          <div class="tableBar">
            <p class="tableBar-title">{{ activeName }}列表</p>
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
              <el-button type="primary" class="spanRow">搜索</el-button>
              <template v-if="isExternal">
                <el-dropdown>
                  <el-button type="primary" class="spanRow"> 导入 </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="downloadTemp">下载模板</el-dropdown-item>
                      <el-dropdown-item @click="importTemp">导入</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <el-button type="primary" @click="addExternalPerson"
                  >新增外部人员</el-button
                >
                <el-button type="primary" @click="deleteExteranlPerson">删除</el-button>
              </template>
            </div>
          </div>
          <Table
            ref="table"
            :columns="tableCol_"
            :tableData="tableData_"
            v-loading="loading"
            @selectChange="selectChange"
            @selectAll="selectAll"
          >
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="mini" type="text">启用</el-button>
                <el-button size="mini" type="text">禁用</el-button>
              </template>
            </el-table-column>
          </Table>
        </el-card>
      </template>
    </Tabs>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item prop="name" label="姓名">
          <el-input v-model="form.name" placeholder="请输入人员姓名" />
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="form.phone" placeholder="请输入人员电话" />
        </el-form-item>
        <el-form-item prop="roles" label="角色" style="width: 100%">
          <el-select
            v-model="form.roles"
            multiple
            class="rowWidth"
            placeholder="请选择人员角色"
          >
            <el-option
              v-for="(item, index) in jobs"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="架构节点" prop="node">
          <el-input v-model="form.node" placeholder="请输入架构节点" />
          <TreeNode
            :treeData="tree_data"
            :isExpand="false"
            :isSearch="false"
            @nodeClick="nodeClick"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <ImportFile :dialogVisibled="importShow" :uploadUrl="uploadUrl" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import {
  tabs,
  get_tree_data,
  jobs,
  status,
  columns,
  tableData,
  formRules,
} from "@/utils/pageData/personData";
import { arrayToTree } from "@/utils/arrayToTree";
import Table from "@/components/table/primeryTable.vue";
import Tabs from "@/components/tabsButton.vue";
import TreeNode from "@/components/treeNode.vue";
import ImportFile from "@/components/upload/uploadFile.vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
export default defineComponent({
  name: "person",
  components: {
    Table,
    Tabs,
    TreeNode,
    ImportFile,
  },
  data() {
    return {
      form: {
        name: "",
        phone: "",
        roles: "",
        node: "",
      },
    };
  },
  setup(props, ctx) {
    const store = useStore();
    // 切换架构
    let activeName = ref("内部架构");
    const tabChange = (tab) => {
      activeName.value = tab.props.name;
    };

    // 查询条件
    let searchKey = ref("");
    let searchJob = ref("");
    let searchStatu = ref("");

    // 数据加载中
    let loading = ref(false);
    // 内外部架构判别
    const isExternal = computed(() => (activeName.value == "内部架构" ? false : true));

    // 表格列
    let tableData_ = tableData;
    let tableCol_ = reactive(columns);

    const selectChange = (row) => {
      console.log(row);
    };
    const selectAll = (selection) => {};
    // 下载
    const downloadTemp = () => {};
    // 导入
    const importTemp = () => {
      importShow.value = true;
    };
    // 新增
    const addExternalPerson = () => {
      dialogVisible.value = true;
    };
    // 删除
    const deleteExteranlPerson = () => {
      ElMessageBox.confirm("是否确认删除", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showClose: false,
        callback(actions, instace) {
          console.log(actions);
          if (actions == "cancel") {
            console.log("取消");
          } else {
            console.log("确定");
          }
        },
      });
    };
    // dialog标题
    let dialogTitle = ref("新增账号");
    let dialogVisible = ref(false);

    // 导入文件
    let importShow = ref(false);
    let uploadUrl = "";

    // 选择节点
    let tree_data = ref([]);
    let treeLoad = ref(true);

    if (store.state.Node.frameworkNode.length == 0) {
      get_tree_data(20).then((res) => {
        tree_data.value = arrayToTree(res, "parentCode");
        treeLoad.value = false;
        store.commit("SET_FRAMEWORK_NODE", tree_data.value);
      });
    } else {
      tree_data.value = store.state.Node.frameworkNode;
      treeLoad.value = false;
    }
    let currentHoverItem = reactive<any>({});
    let parentNode = reactive<any>({});
    const nodeSelect = (node) => {
      console.log("节点选择", node);
    };
    // 查询是否是内部节点
    let contextMenus = [
      {
        label: "迁移节点",
        icon: "el-icon-minus",
        onClick() {
          // let nodeIndex = parentNode.childNodes.findIndex(
          //   (node) => node.label == currentHoverItem.nodeName
          // )
          // parentNode.childNodes.splice(nodeIndex, 1)
          console.log("迁移");
          store.commit("SET_FRAMEWORK_NODE", tree_data.value);
        },
      },
    ];
    // 点解右键获取实例
    const nodeContext = (e, data) => {
      console.log("右键", data);
    };

    return {
      tabs,
      activeName,
      searchKey,
      searchJob,
      searchStatu,
      jobs,
      status,
      tableData_,
      loading,
      treeLoad,
      isExternal,
      tableCol_,
      dialogTitle,
      dialogVisible,
      formRules,
      importShow,
      uploadUrl,
      contextMenus,
      tree_data,
      tabChange,
      downloadTemp,
      importTemp,
      addExternalPerson,
      deleteExteranlPerson,
      selectChange,
      selectAll,
      nodeContext,
    };
  },
  methods: {
    nodeClick(data) {
      this.form.node = data.label;
      console.log("data", data);
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
    min-width: 210px;
    height: calc(100vh - 140px);
    padding: 20px;
  }
  &-right {
    width: 100%;
    margin-left: 10px;
    height: calc(100vh - 100px);
  }
}
.tableBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-title {
    font-size: 1.6rem;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #333333;
  }
  &-condition {
    display: inherit;
  }
}
.spanRow {
  margin-right: 10px !important;
}
</style>
