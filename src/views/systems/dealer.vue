<template>
  <el-card
    ><div class="dealer-container">
      <h3>关联经销商</h3>
      <div class="left-card">
        <div class="tabs-size">
          <el-pagination
            layout="prev, pager, next"
            :total="1000"
            :pager-count="11"
            :page-size="8"
            @current-change="handleCurrentChange"
            class="pageSelect"
          >
          </el-pagination>
          <div class="buttons">
            <el-button type="primary" @click="back">取消</el-button>
            <el-button type="primary" @click="back">确定</el-button>
          </div>
          <div class="header">
            <div class="text">
              <h4>关联节点：{{}}</h4>
            </div>
            <div class="right">
              <el-select v-model="value" placeholder="省" class="width">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
              ><el-select v-model="value" placeholder="市" class="width">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
              ><el-select v-model="value" placeholder="县" class="width">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                @input="change"
                class="top-search-input"
                placeholder="经销商名字"
                v-model="searchText"
                suffix-icon="el-icon-search"
              ></el-input>
              <el-button type="primary" class="button">搜索</el-button>
            </div>
          </div>
          <div class="body">
            <el-table ref="multipleTable" :data="tableData" @selection-change="fetchDealer">
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
      </div></div
  ></el-card>
</template>

<script lang="ts">
import { tableData, getDealer, daleteDealer } from '@/utils/pageData/dealer'
import { defineComponent, ref, watch } from 'vue'
import router from '@/router/index'

export default defineComponent({
  name: 'dealer',
  components: {},
  setup() {
    let deletelist = ref(null)
    const multipleTable = ref(null)
    //获取选中数据

    //按确定
    const back = () => {
      router.push('/home/system/organization')
    }

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
      deleteselected,
      back
    }
  }
})
</script>

<style lang="scss">
.left-card {
  background-color: #fff;
}
.dealer-container {
  background-color: #fff;
  height: 83vh;
  position: relative;
}

.tabs-size {
  height: 76vh;
}
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
    .width {
      width: 100px;
    }
    .top-search-input {
      width: 200px;
      margin-left: 20px;
      margin-right: 20px;
    }
    .button {
      height: 20px;
      margin-right: 20px;
    }
  }
}
.pageSelect {
  position: absolute;
  bottom: 100px;
  transform: translateX(-50%);
  left: 50%;
  z-index: 999;
}
.buttons {
  position: absolute;
  bottom: 50px;
  transform: translateX(-50%);
  left: 50%;
  z-index: 999;
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
</style>
