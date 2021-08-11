<template>
  <div>
    <el-card style="height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">统计报表</div>
      </div>
      <el-tabs @tab-click="handleClick">
        <el-tab-pane v-for="(item, i) in selectTab" :label="item.label" :key="i">
          <slot :name="item.name"></slot>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { selectTab } from '@/utils/pageData/statisticalData'
export default defineComponent({
  name: 'ShopName',
  setup() {
    const handleClick = (val) => {
      console.log(val)
    }
    // 翻页
    const handleCurrentChange = (val) => {
      console.log(val)
    }
    return {
      handleClick,
      selectTab,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  &-name {
    min-width: 7%;
    height: 5vh;
    line-height: 5vh;
    color: #333333;
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
  }
}
.pageSelect {
  position: absolute;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
}
</style>
