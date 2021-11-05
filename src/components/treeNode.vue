<template>
  <div class="tree">
    <el-input v-if="isSearch" v-model="filterText" placeholder="请输入架构节点" />
    <el-tree
      ref="tree"
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      :default-expand-all="isExpand"
      :filter-node-method="filterNode"
      @node-click="nodeClick"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { treeDataType } from "@/utils/pageData/personData";
export default defineComponent({
  props: {
    treeData: Array,
    isSearch: {
      type: Boolean,
      default() {
        return true;
      },
    },
    isExpand: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  setup() {
    const defaultProps = {
      children: "children",
      label: "label",
    };
    let filterText = ref("");
    return {
      defaultProps,
      filterText,
    };
  },
  watch: {
    filterText(val) {
      (this.$refs.tree as Array<treeDataType>).filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    nodeClick(node, data) {
      this.$emit("nodeClick", data);
    },
  },
});
</script>
<style lang="scss" scoped>
.tree {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  overflow: auto;
  min-height: 180px;
  .filter-tree {
    margin-top: 20px;
  }
}
</style>
