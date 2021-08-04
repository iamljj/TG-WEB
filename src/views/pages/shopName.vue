<template>
  <div>
    <el-card style="height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">商品列表</div>
        <div class="top-search">
          <el-input
            class="top-search-input"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
          ></el-input>
          <el-button type="primary" class="top-search-button">搜索</el-button>
          <el-button
            type="primary"
            size="medium"
            class="top-search-button"
            @click="dialogFormVisible = true"
            >添加</el-button
          >
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="(item, i) in table"
          :key="i"
          :prop="item.prop"
          :label="item.name"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text">修改</el-button>
            <el-button type="text" style="color: orange" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
    <!-- 修改弹出框 -->
    <el-dialog title="修改" :before-close="handleClose" v-model="dialogFormVisible">
      <el-form
        :model="form"
        :rules="rules"
        ref="formRules"
        style="display: flex; justify-between: center"
      >
        <div style="width: 40%; height: 100%">
          <el-form-item label="商品编号" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格属性" :label-width="formLabelWidth" prop="type">
            <el-input v-model="form.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="商品价格"
            :label-width="formLabelWidth"
            prop="price"
            v-model="form.price"
            style="display: flex"
          >
            <el-input v-model="form.price" autocomplete="off" style="width: 80%"></el-input>
            <span style="margin-left: 5%">{{ form.base }}</span>
          </el-form-item>
          <el-form-item
            label="图片："
            :label-width="formLabelWidth"
            prop="img"
            style="display: flex"
          >
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              style="margin-left: 20px"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.img" :src="form.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div style="width: 40%; margin-left: 10%">
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="基本单位" :label-width="formLabelWidth" prop="base">
            <el-select v-model="form.base" @change="change" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  table,
  options,
  tableData,
  dialogFormVisible,
  formLabelWidth,
  form,
  handleClick,
  handleClose,
  rules,
  formRules
} from '@/utils/pageData/shopNameData'
import { pageSize, tableChange, handleDel } from '@/utils/request'
import router from '@/router/index'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  setup() {
    const change = (val, label) => {
      console.log(val, label)
    }

    // 页面改变时调用参数
    const handleCurrentChange = (val: number) => {
      pageSize(val).then((res) => {})
    }

    const submitForm = () => {
      formRules.value.validate((valid: any) => {
        if (valid) {
          // tableChange(form, form.id).then(()=>{
          // })
          dialogFormVisible.value = false
        } else {
          ElMessage({
            type: 'error',
            iconClass: 'el-icon-circle-close',
            message: '请检查输入的是否正确'
          })
        }
      })
    }

    const handleSelectionChange = (val) => {}

    // 上传文件成功后
    const handleAvatarSuccess = (res, file) => {
      console.log(res, file)
    }
    // 删除
    const handleDelete = (scoped) => {
      ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          handleDel('/', scoped.id)
            .then((res) => {
              ElMessage({
                iconClass: 'el-icon-circle-check',
                type: 'success',
                message: '项目操作完成'
              })
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
      tableData,
      table,
      handleCurrentChange,
      handleSelectionChange,
      options,
      handleDelete,
      handleClick,
      form,
      handleAvatarSuccess,
      dialogFormVisible,
      formLabelWidth,
      rules,
      change,
      formRules,
      submitForm,
      handleClose
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
  &-search {
    display: flex;
    &-input {
      width: 240px;
      margin-right: 10px;
    }
    &-button {
      height: 40px;
      width: 96px;
      margin-right: 10px;
      border-radius: 10px;
    }
  }
}
.pageSelect {
  position: absolute;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 70%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
