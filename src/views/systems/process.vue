<template>
  <el-card>
    <div class="process">
      <p class="process-title">审批流管理</p>
      <div class="process-toolBar">
        <el-row class="spanRow">
          <el-input
            v-model="searchKey"
            prefix-icon="el-icon-search"
            placeholder="请输入流程名称"
          >
          </el-input>
        </el-row>
        <el-row class="spanRow">
          <el-select v-model="searchProcess" clearable placeholder="请根据名称查询">
            <el-option
              v-for="item in process"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>
        <el-button type="primary" class="spanRow" @click="searchAny">搜索</el-button>
        <el-button type="primary" class="spanRow" @click="newPutProcess"
          >新增审批流</el-button
        >
      </div>
    </div>
  </el-card>
  <el-dialog v-model="processVisible" :title="processTitle + '审批流程'" top="5vh">
    <el-card class="process-info">
      <p class="dialog-modal-title">基本信息</p>
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item prop="name" label="流程名称">
          <el-input v-model="form.name" placeholder="请输入流程名称" />
        </el-form-item>
        <el-form-item prop="sort" label="流程分类">
          <el-select
            v-model="form.sort"
            multiple
            class="rowWidth"
            placeholder="请选择流程分类"
          >
            <el-option
              v-for="(item, index) in sorts"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="process-setting">
      <div class="dialog-modal">
        <p class="dialog-modal-title">流程设置</p>
        <el-button type="primary" icon="el-icon-plus" @click="putNewNode"
          >新增审批节点</el-button
        >
      </div>
      <Draggable :columns="columns" :list="table" @drag-end="dragEnd">
        <template #header>
          <span>操作</span>
        </template>
        <template #scope>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </Draggable>
    </el-card>
  </el-dialog>
  <el-dialog
    v-model="processNodeVisible"
    :title="processNodeTitle + '审批节点'"
    width="80%"
  >
    <div class="nodeOption">
      <div class="row-item">
        <label class="row-item-label">通过条件</label>
        <el-radio-group v-model="nodeForm.condi">
          <el-radio label="一人通过"></el-radio>
          <el-radio label="全部通过"></el-radio>
        </el-radio-group>
      </div>
      <div class="row-item transf">
        <div class="left">
          <label>待选</label>
          <TabsButton :tabs="selectTab" :activeName="activeTab">
            <template v-slot:job>
              <el-card class="cardWidth">
                <el-checkbox-group
                  v-model="nodeForm.jobCheckList"
                  @change="changeCheckbox"
                >
                  <el-checkbox
                    class="checkboxTips"
                    v-for="(job, i) in checkboxUnselectList"
                    :key="i"
                    :label="job.value"
                    :checked="job.checked"
                    >{{ job.label }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-card>
            </template>
            <template v-slot:person>
              <el-card class="cardWidth">
                <Table
                  :columns="personTableCol"
                  :tableData="tpersonTableDatad"
                  @selectChange="selectChange"
                ></Table>
                <el-pagination
                  class="pagination"
                  :default-page-size="5"
                  :current-page="personCurrentPage"
                  :total="personTotal"
                  @current-change="personCurrentPageChange"
                  layout="prev, pager, next"
                />
              </el-card>
            </template>
          </TabsButton>
        </div>
        <div class="right">
          <label>已选</label>
          <el-card class="cardWidth selected" shadow="never">
            <el-checkbox-group
              v-model="checkboxSelected"
              @change="changeCheckboxSelected"
              class="selectedSort"
            >
              <el-checkbox
                v-for="(checkbox, i) in checkboxSelectedList"
                :key="i"
                :label="checkbox.value"
                :checked="checkbox.checked"
                >{{ checkbox.label }}</el-checkbox
              >
            </el-checkbox-group>
          </el-card>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="processNodeVisible = false">取消</el-button>
        <el-button type="primary" @click="processNodeVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import {
  processData,
  formRules,
  sorts,
  columns,
  tableData,
  selectTab,
  jobs,
  personTableCol,
  tpersonTableDatad,
  processType,
} from "@/utils/pageData/process";
import Table from "@/components/table/primeryTable.vue";
import Draggable from "@/components/table/draggableTable.vue";
import TabsButton from "@/components/tabsButton.vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    Table,
    Draggable,
    TabsButton,
  },
  setup(prop, ctx) {
    // 查询条件， 搜索
    let searchKey = ref("");
    let searchProcess = ref("");
    let process = reactive(processData);
    const searchAny = () => {
      console.log("搜索");
    };

    // 新增审批流
    let processVisible = ref(false);
    let processTitle = ref("新增");
    const newPutProcess = () => {
      processVisible.value = true;
    };
    // 新增审批节点
    let processNodeVisible = ref(false);
    let processNodeTitle = ref("新增");
    let activeTab = ref("job");
    let personCurrentPage = ref(1);
    let personTotal = ref(26);
    const putNewNode = () => {
      processNodeVisible.value = true;
    };
    const personCurrentPageChange = (pageNum) => {
      personCurrentPage.value = pageNum;
    };

    // 拖拽表格行事件
    let table = reactive(tableData);
    const dragEnd = (d) => {
      table = d;
    };
    watch(table, (val) => {
      if (val && val.length > 8) {
        ElMessage({
          message: "审核节点长度太长",
          type: "warning",
        });
      }
    });
    // form
    let nodeForm = reactive({
      condi: "一人通过",
      jobCheckList: [],
      personList: [],
    });

    // 待选，已选，反选逻辑
    let checkboxUnselectList = ref(jobs);
    let checkboxSelected = ref([]);
    let checkboxSelectedList = ref([]);
    // 待选，已选框处理逻辑
    const selectStatusChange = (value) => {
      checkboxSelectedList.value = value.reduce((list, curr) => {
        let val = checkboxUnselectList.value.filter((job: processType) => {
          if (job.value == curr) {
            job.checked = true;
            return job;
          }
        });
        return list.concat(val);
      }, []);
      checkboxUnselectList.value.forEach((job: processType) => {
        job.checked = false;
        value.forEach((v) => {
          if (job.value == v) {
            job.checked = true;
          }
        });
      });
    };
    const changeCheckbox = (value) => {
      selectStatusChange(value);
    };
    const changeCheckboxSelected = (value) => {
      selectStatusChange(value);
    };
    // 表格选择

    // if (row && row.checked) {
    //   checkboxSelectedList.value.push({
    //     checked: row.checked,
    //     label: row.name,
    //     value: row.id,
    //   });
    // } else {
    //   let rowIndex = checkboxSelectedList.value.findIndex((v) => v.value == row.id);
    //   checkboxSelectedList.value.splice(rowIndex, 1);
    // }
    // console.log(checkboxSelectedList.value);
    const selectChange = (row) => {
      row.checked = !row.checked;
      console.log(row);
    };
    const selectAll = (selection) => {
      // console.log(selection);
    };
    return {
      searchKey,
      searchProcess,
      process,
      processTitle,
      processVisible,
      formRules,
      sorts,
      columns,
      table,
      processNodeVisible,
      processNodeTitle,
      selectTab,
      activeTab,
      checkboxUnselectList,
      nodeForm,
      personTableCol,
      tpersonTableDatad,
      personCurrentPage,
      personTotal,
      checkboxSelected,
      checkboxSelectedList,
      searchAny,
      newPutProcess,
      putNewNode,
      dragEnd,
      personCurrentPageChange,
      changeCheckbox,
      changeCheckboxSelected,
      selectChange,
      selectAll,
    };
  },
  data() {
    return {
      form: {
        name: "",
        sort: [],
        status: "启用",
      },
    };
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.process {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  &-title {
    font-size: 1.6rem;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #333333;
  }
  &-toolBar {
    display: inherit;
  }
}
.dialog {
  &-modal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
}
.process {
  &-setting {
    margin-top: 1em;
  }
}
.spanRow {
  margin-right: 10px !important;
}
.row {
  &-item {
    &-label {
      padding: 5px 20px;
    }
  }
}
.transf {
  display: flex;
  justify-content: space-between;
  height: 40vh;
  .left,
  .right {
    width: 50%;
    padding: 10px 20px;
  }
}
.checkboxTips {
  text-overflow: ellipsis;
  width: 115px;
  text-align: left;
  margin-right: 0;
}
.cardWidth {
  height: 300px;
}
.selected {
  margin-top: 54px;
}
.rowWidth {
  width: 100%;
}
.selectedSort {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.pagination {
  text-align: center;
}
</style>
