<template>
  <el-dialog title="导入" lock-scroll :model-value="dialogVisibled" width="30%">
    <div class="row">
      <span>导入文件</span>
      <el-upload :action="uploadUrl" :file-list="fileList">
        <el-button class="row-right" size="small" type="primary">上传文件</el-button>
      </el-upload>
    </div>
    <div class="row">
      <span>导入说明</span>
      <div class="row-right">
        <p>1、请在模板的基础下编辑导入人员</p>
        <p>2、请从EXCEL的第二行开始输入导入信息</p>
        <p>3、填写的岗位和节点数据应为系统已有</p>
        <p>4、导入的电话号码不能与系统已有号码重复</p>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImportFile",
  props: {
    dialogVisibled: Boolean,
    uploadUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {},
});
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  &-right {
    margin-left: 50px;
  }
}
</style>
