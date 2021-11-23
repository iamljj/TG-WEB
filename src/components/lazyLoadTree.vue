<template>
  <div class="tree">
    <el-input v-if="isSearch" v-model="filterText" placeholder="请输入架构节点" />
    <el-tree
      ref="tree"
      class="filter-tree"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :lazy="isLazy"
      :load="loadData"
      @node-click="nodeClick"
      @node-contextmenu="contextmenu"
      @node-collapse="nodeCollapse"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, PropType, onBeforeMount } from "vue";
import { treeDataType } from "@/utils/pageData/personData";
import { getOAframework } from "@/service/frameworkNode";
export default defineComponent({
  props: {
    treeData: {
      type: Array,
    },
    isSearch: {
      type: Boolean,
      default() {
        return true;
      },
    },
    isExpand: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isContextMenu: {
      type: Boolean,
      default() {
        return false;
      },
    },
    contextMenus: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const defaultProps = {
      children: "children",
      label: "name",
      isLeaf: "leaf",
    };
    let filterText = ref("");
    let isLazy = ref(true);

    return {
      defaultProps,
      filterText,
      isLazy,
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
      return data.name.indexOf(value) !== -1;
    },
    nodeClick(node) {
      this.$emit("nodeClick", node);
      // console.log(this.$refs.tree);
    },
    nodeCollapse(obj, node) {
      console.log(node);
    },
    async loadData(node, resolve) {
      if (node.level == 0) {
        let res = await this.getNextNodeData();
        return resolve(res);
      }
      if (node.level > 0) {
        let res = await this.getNextNodeData({ path: node.data.path });
        resolve(res);
        // return resolve([res]);
      }
    },
    async getNextNodeData(params?: any) {
      let { data } = await getOAframework(params);
      if (data.code == 200) {
        let res = data.data;
        return res;
      } else {
        return [];
      }
    },
    contextmenu(e, data, node) {
      let dom = this.$refs.tree;
      this.$emit("node-context", e, data, node, dom);
      if (this.isContextMenu) {
        let options: any = {
          x: e.x,
          y: e.y,
          items: [],
        };
        e.preventDefault();
        options.items = this.contextMenus;
        (this as any).$contextmenu(options);
      }
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
