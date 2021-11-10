<template>
  <el-table
    :data="tableData"
    stripe
    :height="height"
    style="width: 100%"
    empty-text="暂无数据"
    @select-all="selectAll"
    @select="select"
  >
    <el-table-column
      v-for="(col, i) in columns"
      :type="col.type"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
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
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    height: [Number, String],
  },
  setup() {},
  methods: {
    selectAll(selection) {
      this.$emit("selectAll", selection);
    },
    select(selection, row) {
      this.$emit("select", row);
    },
  },
});
</script>
<style lang="scss" scoped></style>
