<template>
  <super-flow class="flow" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import superFlow from "vue-super-flow";

export default defineComponent({
  components: {
    superFlow,
  },
  setup() {},
  data() {
    return {
      config: {
        // 坐标系原点
        origin: [0, 0],
        // 初始化节点列表
        nodeList: [],
        // 初始化连线列表
        linkList: [],
        // 全局右键菜单项
        graphMenu: [],
        // 节点右键菜单选项
        nodeMenu: [],
        // 连线右键菜单
        linkMenu: [],
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.flow {
}
</style>
