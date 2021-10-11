<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      stripe
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" width="55"> </el-table-column>
      <el-table-column
        v-for="(item, i) in table"
        :key="i"
        :prop="item.prop"
        :label="item.name"
        :width="item.width"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" v-if="buttonShow">
        <template #default="scope">
          <el-button @click="handleClick(scope.row, form)" type="text">修改</el-button>
          <el-button type="text" style="color: orange" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { handleDel } from '@/utils/request'
import { handleClick } from '@/utils/pageData/publicData'

export default defineComponent({
  name: 'Table',
  props: {
    table: Array,
    tableData: Array,
    buttonShow: Boolean,
    form: Object,
    url: String,
    id: String,
    page: Number
  },
  setup(props, context) {
    // 选中
    // const handleSelectionChange = (val) => {}
    // 是否确认删除
    const handleDelete = (scoped) => {
      ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const id = props.id.toString()
          const newData = JSON.parse(JSON.stringify(scoped).replace(id, 'id'))
          handleDel(props.url, newData.id)
            .then(() => {
              ElMessage({
                iconClass: 'el-icon-circle-check',
                type: 'success',
                message: '项目操作完成'
              })
              context.emit('delete:gitlist', props.page)
            })
            .catch(() => {
              Promise.reject({ msg: '接口请求错误' })
              ElMessage({
                type: 'error',
                iconClass: 'el-icon-circle-close',
                message: '项目操作未完成'
              })
            })
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            iconClass: 'el-icon-circle-close',
            message: '项目操作未完成'
          })
        })
    }
    return {
      // handleSelectionChange,
      handleDelete,
      handleClick
    }
  }
})
</script>

<style></style>
