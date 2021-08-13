<template>
  <div>
    <el-card style="max-height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">活动中心</div>
        <Search :form="form" @search="search"></Search>
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
        :current-page="currIndex"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Search from '@/components/search.vue'
import { activeName, allTableData } from '@/utils/pageData/activityData'
import { form } from '@/utils/pageData/activityData'
import { getCurrentActivity, getTabActivity, pageSize, searchAxios } from '@/utils/request'
import { tableData } from '@/utils/pageData/personData'
export default defineComponent({
  name: 'Activity',
  components: {
    Search
  },
  setup() {
    const url = '/b'
    const index = ref(0)
    const currIndex = ref<number>(1)
    // 翻页
    const handleCurrentChange = (val) => {
      currIndex.value = val
      getCurrentActivity(index.value, val).then((res) => {
        tableData.value = res.data
      })
    }
    const search = (searchText: string) => {
      searchAxios(url, searchText).then((res) => {
        allTableData.value = res.data
      })
    }
    const handleClick = (val) => {
      getTabActivity(val.index).then((res) => {
        tableData.value = res.data
      })
      index.value = val.index
      currIndex.value = 1
    }
    return {
      activeName,
      handleClick,
      form,
      search,
      handleCurrentChange,
      currIndex
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
