<template>
  <div>
    <el-card style="height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">商品列表</div>
        <Search></Search>
      </div>
      <Table :table="table" :tableData="tableData" :buttonShow="true"></Table>
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
  handleClose,
  rules,
  formRules
} from '@/utils/pageData/shopNameData'
import { pageSize, tableChange } from '@/utils/request'
import { ElMessage } from 'element-plus'
import Table from '@/components/table/table.vue'
import Search from '@/components/search.vue'
export default defineComponent({
  name: 'ShopName',
  components: {
    Table,
    Search
  },
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

    // 上传文件成功后
    const handleAvatarSuccess = (res, file) => {
      console.log(res, file)
    }

    return {
      tableData,
      table,
      handleCurrentChange,
      options,
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
  width: 178px;
  height: 178px;
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
