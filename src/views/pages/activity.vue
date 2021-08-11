<template>
  <div>
    <el-card style="max-height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">活动中心</div>
        <Search></Search>
      </div>
      <el-tabs @tab-click="handleClick">
        <el-tab-pane :label="item.label" :key="i" v-for="(item, i) in activeName">
          <slot></slot>
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
import Search from '@/components/search.vue'
import { activeName } from '@/utils/pageData/activityData'
export default defineComponent({
  name: 'Activity',
  components: {
    Search
  },
  setup() {
    // 翻页
    const handleCurrentChange = (val) => {
      console.log(val)
    }
    const handleClick = (val) => {
      console.log(val)
    }
    return {
      activeName,
      handleClick,
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
