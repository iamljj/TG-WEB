<template>
  <div class="dealer-container">
    <h3>关联经销商</h3>
    <div style="height: 83vh; position: relative">
      <el-tabs type="border-card" class="tabs">
        <el-tab-pane label="待选">
          <div style="height: 76vh; position: relative; width: 100%vw">
            <el-pagination
              layout="prev, pager, next"
              :total="1000"
              :pager-count="11"
              :page-size="8"
              @current-change="handleCurrentChange"
              class="pageSelect"
            >
            </el-pagination>
            <div class="header">
              <div class="text">
                <h4>关联节点：{{}}</h4>
              </div>
              <div class="right">
                <el-select v-model="value" placeholder="省" style="width: 100px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> </el-select
                ><el-select v-model="value" placeholder="市" style="width: 100px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> </el-select
                ><el-select v-model="value" placeholder="县" style="width: 100px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  style="width: 200px; margin-left: 20px"
                  @input="change"
                  class="top-search-input"
                  placeholder="经销商名字"
                  v-model="searchText"
                  suffix-icon="el-icon-search"
                ></el-input>
                <el-button type="primary" style="height: 20px; margin-left: 20px">搜索</el-button>
              </div>
            </div>
            <div class="body">
              <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%"
                @selection-change="fetchDealer"
                @select="fetchDealer"
                @select-all="fetchDealer"
              >
                <el-table-column type="selection" width="316" />
                <el-table-column type="index" width="316" label="序号" />
                <el-table-column label="经销商名称" width="316">
                  <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="name" label="地区" width="316" />
                <el-table-column property="address" label="联系方式" width="316" />
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已选">
          <div style="height: 76vh; position: relative; width: 100%vw">
            <el-pagination
              layout="prev, pager, next"
              :total="1000"
              :pager-count="11"
              :page-size="8"
              @current-change="handleCurrentChange"
              class="pageSelect"
            >
            </el-pagination>
            <div class="header">
              <div class="text">
                <h4>关联节点：{{}}</h4>
              </div>
              <div class="right">
                <el-select v-model="value" placeholder="省" style="width: 100px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> </el-select
                ><el-select v-model="value" placeholder="市" style="width: 100px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> </el-select
                ><el-select v-model="value" placeholder="县" style="width: 100px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  style="width: 200px; margin-left: 20px"
                  @input="change"
                  class="top-search-input"
                  placeholder="经销商名字"
                  v-model="searchText"
                  suffix-icon="el-icon-search"
                ></el-input>
                <el-button type="primary" style="height: 20px; margin-left: 20px">搜索</el-button>

                <el-button
                  type="danger"
                  style="height: 20px; margin-left: 20px"
                  @click="deleteselected"
                  >删除</el-button
                >
                <el-button
                  type="primary"
                  style="height: 20px; margin-left: 20px"
                  @click="deleteselected"
                  >同步</el-button
                >
              </div>
            </div>
            <div class="body">
              <el-table
                ref="multipleTable1"
                :data="getDealer"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @select="daletedealer"
                @select-all="daletedealer"
              >
                <el-table-column type="selection" width="316" />
                <el-table-column type="index" width="316" label="序号" />
                <el-table-column label="经销商名称" width="316">
                  <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="name" label="地区" width="316" />
                <el-table-column property="address" label="联系方式" width="316" />
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { tableData, getDealer, daleteDealer } from '@/utils/pageData/dealer'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'dealer',
  components: {},
  setup() {

    let deletelist = ref(null)
    const multipleTable = ref(null)
    //获取选中数据
    const fetchDealer = (selection) => {
      getDealer.value = selection
    }
    //获取要删除的数据
    const daletedealer = (selection) => {
      deletelist = selection
      console.log()
    }
    //改变待选框中多选框的状态
    const deleteselected = () => {
      deletelist.forEach((item) => {
        multipleTable.value.toggleRowSelection(item, false)
      })
    }
    return {
      tableData,
      fetchDealer,
      getDealer,
      daleteDealer,
      daletedealer,
      multipleTable,
      deletelist,
      deleteselected
    }
  }
})
</script>

<style lang="scss">
.dealer-container {
  .tabs {
    .header {
      display: flex;
      justify-content: center;
      .text {
        flex: 1;
        width: 40%;
      }
      .right {
        display: flex;
        justify-content: center;
      }
    }
    .pageSelect {
      position: absolute;
      bottom: 2px;
      transform: translateX(-50%);
      left: 50%;
      z-index: 999;
    }
  }
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
}
</style>
