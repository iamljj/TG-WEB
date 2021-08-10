<template>
  <div>
    <Activity>
      <el-card style="height: 87vh; position: relative">
        <Table :table="allTable" :form="form" :tableData="allTableData" :buttonShow="true"></Table>
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
            <el-form-item label="活动编号" :label-width="formLabelWidth">
              <el-input
                v-model="form.number"
                :disabled="true"
                autocomplete="off"
                style="margin-left: 10px"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="日期选择" :label-width="formLabelWidth" prop="time">
              <el-date-picker
                v-model="time"
                type="datetimerange"
                @change="change"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
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
            <el-form-item label="活动说明" prop="explain">
              <el-input
                type="textarea"
                v-model="form.explain"
                style="position: relative; width: 250%"
              ></el-input>
            </el-form-item>
          </div>
          <div style="width: 40%; margin-left: 10%">
            <el-form-item label="活动地点" :label-width="formLabelWidth" prop="address">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </Activity>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  form,
  allTable,
  allTableData,
  handleClick,
  formLabelWidth,
  time,
  handleClose,
  rules,
  formRules
} from '@/utils/pageData/activityData'
import { dialogFormVisible } from '@/utils/pageData/publicData'
import { pageSize, tableChange } from '@/utils/request'
import { ElMessage } from 'element-plus'
import Table from '@/components/table/table.vue'
import Activity from '@/views/pages/activity.vue'
export default defineComponent({
  name: 'ShopName',
  components: {
    Table,
    Activity
  },
  setup() {
    // 选择时间

    const change = (val, label) => {
      console.log(val, label)
    }

    // 页面翻页时调用参数

    const handleCurrentChange = (val: number) => {
      pageSize(val).then((res) => {})
    }

    // 表单校验

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
      allTableData,
      allTable,
      handleCurrentChange,
      form,
      handleAvatarSuccess,
      dialogFormVisible,
      rules,
      change,
      handleClick,
      formRules,
      formLabelWidth,
      time,
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
