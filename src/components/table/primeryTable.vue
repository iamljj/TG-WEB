<template>
  <el-table
    ref="tableRef"
    :data="tableData"
    stripe
    :height="height"
    :row-key="(row) => row.id"
    style="width: 100%"
    empty-text="暂无数据"
    @select-all="selectAll"
    @select="select"
    @selection-change="selectChange"
  >
    <el-table-column
      v-for="(col, i) in columns"
      :type="col.type"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
      :key="i"
      show-overflow-tooltip
      :reserve-selection="true"
    >
    </el-table-column>
    <slot />
  </el-table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    height: [Number, String]
  },
  setup() {},
  data() {
    return {
      currentRow: null,
    };
  },
  methods: {
    selectAll(selection) {
      this.$emit('selectAll', selection)
    },
    select(selection, row) {
      this.currentRow = row;
    },
    selectChange() {
      this.$emit("selectChange", this.currentRow);
    },
  },
});
</script>
<style lang="scss" scoped></style>
