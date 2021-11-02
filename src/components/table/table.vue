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
      <el-table-column label="序号" type="index" width="100"> </el-table-column>
      <el-table-column
        v-for="(item, i) in table"
        :key="i"
        :prop="item.prop"
        :label="item.name"
        :width="item.width"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" v-if="buttonShow">
        <template #default="scope">
          <el-button @click="handleClick(scope.row, form)" type="text" v-if="!scope.row.state"
            >修改</el-button
          >
          <el-button
            type="text"
            style="color: orange"
            @click="handleDelete(scope.row)"
            v-if="!scope.row.state"
            >删除</el-button
          >
          <el-button type="text" @click="Enable(scope.row)" v-if="scope.row.status == '停用'">
            启用</el-button
          >
          <el-button
            type="text"
            style="color: orange"
            @click="Deactivated(scope.row)"
            v-if="scope.row.status == '启用'"
            >停用</el-button
          >
          <el-button
            type="text"
            style="color: orange"
            @click="Deactivated(scope.row)"
            v-if="scope.row.state"
            >解绑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { handleDel, tableChange } from '@/utils/request'
import { handleClick } from '@/utils/pageData/publicData'
import { statuChange } from '@/utils/request'

export default defineComponent({
  name: 'Table',
  props: {
    table: Array,
    tableData: Array,
    buttonShow: Boolean,
    form: Object,
    url: String,
    id: String,
    page: Number,
    isshow: String,
    url1: String
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
          console.log(props.url)

          handleDel(props.url, newData.id)
            .then(() => {
              ElMessage({
                iconClass: 'el-icon-circle-check',
                type: 'success',
                message: '项目操作完成'
              })
              context.emit('delete:gitlist', 1)
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
    const Deactivated = (scope) => {
      scope.status = '停用'
      statuChange(scope.id, 0)
    }
    const Enable = (scope) => {
      scope.status = '启用'

      statuChange(scope.id, 1)
    }
    return {
      handleDelete,
      handleClick,
      Deactivated,
      Enable,
      open
    }
  }
})
</script>

<style></style>
