<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      stripe
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="序号" type="index" width="100"> </el-table-column>
      <el-table-column
        v-for="(item, i) in table"
        :key="i"
        :prop="item.prop"
        :label="item.name"
        :width="item.width"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" v-if="buttonShow">
        <template #default="scope">
          <el-button type="text" v-if="!scope.row.state">修改</el-button>
          <el-button type="text" style="color: orange" v-if="!scope.row.state"
            >删除</el-button
          >
          <el-button
            type="text"
            @click="Enable(scope.row)"
            v-if="scope.row.status == '停用'"
          >
            启用</el-button
          >
          <el-button type="text" style="color: orange" v-if="scope.row.status == '启用'"
            >停用</el-button
          >
          <el-button type="text" style="color: orange" v-if="scope.row.state"
            >解绑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { handleClick } from "@/utils/pageData/publicData";

export default defineComponent({
  name: "Table",
  props: {
    table: Array,
    tableData: Array,
    buttonShow: Boolean,
    form: Object,
    url: String,
    id: String,
  },
  setup(props, context) {
    // 选中
    const handleSelectionChange = (val) => {};
    const Deactivated = (scope) => {
      scope.status = "停用";
    };
    const Enable = (scope) => {
      scope.status = "启用";
    };
    return {
      handleClick,
      Deactivated,
      Enable,
      open,
    };
  },
});
</script>

<style></style>
