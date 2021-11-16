<template>
  <div class="log-Mcontainer">
    <el-card class="card">
      <el-pagination layout="prev, pager, next" :total="999" :page-size="8" class="pageSelect">
      </el-pagination>
      <template #header>
        <div class="header">
          <div class="title">
            <text><b>操作日志</b></text>
          </div>
          <div>
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="到"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :locale="locale"
              class="margin"
            >
            </el-date-picker>
            <el-select v-model="operate_" placeholder="请选择操作类型">
              <el-option
                v-for="(item, index) in operate"
                :label="item.label"
                :value="item.value"
                :key="index"
                class="margin"
              ></el-option>
            </el-select>
            <el-input class="margin width" v-model="searchKey" placeholder="操作人姓名"></el-input>
            <el-button type="primary" class="button">搜索</el-button>
          </div>
        </div>
      </template>
      <Table :columns="columns" :data="tableData_">
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="medium" type="text" @click="View(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </Table>
      <el-dialog title="查看详情" v-model="view">
        <el-form ref="form" :model="form_" label-width="120px" :inline="true">
          <el-form-item label="页面">
            <el-input v-model="form_.page" disabled> </el-input>
          </el-form-item>
          <el-form-item label="操作类型">
            <el-input v-model="form_.operate" disabled></el-input>
          </el-form-item>
          <el-form-item label="操作人员">
            <el-input v-model="form_.operater" disabled></el-input>
          </el-form-item>
          <el-form-item label="操作时间">
            <el-input v-model="form_.date" disabled></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              disabled
              v-model="form_.data"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="Please input"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="view = false">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script lang="ts">
import { operate, columns, tableData, form } from '@/utils/pageData/log'
import Table from '@/components/table/primeryTable.vue'
import { defineComponent, ref, reactive } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  components: {
    Table
  },
  name: 'log',
  setup(props, context) {
    //日期的
    let date = ref('')
    //操作类型的值
    let operate_ = ref('')
    //搜索值
    let searchKey = ref('')
    //表格
    const view = ref(false)
    let tableData_ = tableData
    let form_ = ref(form)

    const View = (scoped) => {
      form_.value.page = scoped.page
      form_.value.date = scoped.date
      form_.value.data = scoped.data
      form_.value.operate = scoped.operate
      form_.value.operater = scoped.operater
      console.log(form_)

      view.value = true
    }
    return {
      date,
      locale: zhCn,
      operate,
      operate_,
      searchKey,
      columns,
      tableData_,
      View,
      view,
      form_
    }
  }
})
</script>
<style lang="scss">
.log-Mcontainer {
  .card {
    position: relative;
    height: 89vh;
    .pageSelect {
      position: absolute;
      bottom: 30px;
      transform: translateX(-50%);
      left: 50%;
    }
    .header {
      display: flex;
      .title {
        flex: 1;
        font-size: 20px;
      }
      .margin {
        margin-right: 10px;
      }
      .width {
        width: 200px;
        margin-left: 10px;
      }
      .button {
        width: 100px;
      }
    }
  }
}
</style>
