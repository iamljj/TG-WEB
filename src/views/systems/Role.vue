<template>
  <div>
    <el-card style="height: 87vh; position: relative">
      <div class="top">
        <div class="top-name">岗位管理</div>
        <Search @search="search" searchtext="角色名字 " name="新增"></Search>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="内部"
          ><Table
            :isshow="true"
            :table="table"
            :tableData="tableData"
            id="displayId"
            :form="form"
            :buttonShow="true"
            @delete:gitlist="handleCurrentChange"
            :page="page"
            url="/proxy/7003/service/admin/deleteRole/"
            url1="/proxy/7003/service/admin/updateStatus/"
          ></Table
        ></el-tab-pane>
        <el-tab-pane label="外部"
          ><Table
            :isshow="true"
            :table="table"
            :tableData="tableData"
            id="displayId"
            :form="form"
            :buttonShow="true"
            @delete:gitlist="handleCurrentChange"
            :page="page"
            url="/proxy/7003/service/admin/deleteRole/"
            url1="/proxy/7003/service/admin/updateStatus/"
          ></Table
        ></el-tab-pane>
      </el-tabs>
      <!-- <Table
        :isshow="true"
        :table="table"
        :tableData="tableData"
        id="displayId"
        :form="form"
        :buttonShow="true"
        @delete:gitlist="handleCurrentChange"
        :page="page"
        url="/proxy/7003/service/admin/deleteRole/"
        url1="/proxy/7003/service/admin/updateStatus/"
      ></Table> -->
      <el-pagination
        layout="prev, pager, next"
        :total="totol"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
    <!-- 修改弹出框 -->
    <el-dialog
      :title="title"
      width="25%"
      :before-close="handleClose"
      destroy-on-close
      v-model="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="formRules"
        style="display: flex; justify-between: center"
      >
        <div style="width: 80%; height: 100%">
          <el-form-item label="岗位名字" :label-width="formLabelWidth" prop="roleName">
            <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <h1>权限</h1>
      <el-select v-model="form.structure" placeholder="Select">
        <el-option
          v-for="item in category"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-tree
        :data="data"
        ref="tree"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 7]"
        :default-checked-keys="rolelist"
        :props="defaultProps"
      >
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  table,
  tableData,
  formLabelWidth,
  formId,
  form,
  handleClose,
  rules,
  formRules,
  totol,
  pagesize,
  page,
  data,
  defaultProps,
  tree,
  category,
  rolelist,
} from "@/utils/pageData/role";
import { title } from "@/utils/pageData/personData";
import { dialogFormVisible } from "@/utils/pageData/publicData";
import { ElMessage } from "element-plus";
import Table from "@/components/table/table.vue";
import Search from "@/components/search.vue";
export default defineComponent({
  name: "ShopName",
  components: {
    Table,
    Search,
  },
  setup() {
    const url = "/proxy/7003/service/admin/addRole";
    const url1 = "/proxy/7003/service/admin/updataRole";
    var searchtext = "";

    const change = (val, label) => {
      console.log(val, label);
    };
    //首次进页面刷新数据
    const getlist = () => {
      console.log([1, 2, 3]);

      const params = {
        roleDesc: "",
        page: "1",
        pagesize: pagesize.value,
      };
    };
    getlist();
    // 搜索
    const search = (searchText: string) => {
      searchtext = searchText;
      const params = {
        page: 1,
        pageSize: pagesize.value,
        roleDesc: searchText,
      };
    };
    // 翻页
    const handleCurrentChange = (val: number) => {
      page.value = val;
      const params = {
        page: val,
        pageSize: pagesize.value,
        roleDesc: searchtext,
      };
    };
    // 修改页面点击确认
    const submitForm = () => {
      formRules.value.validate((valid: any) => {
        if (valid) {
          const son = tree.value.getCheckedKeys();
          const father = tree.value.getHalfCheckedKeys();
          if (form.id != "") {
            const params = {
              id: form.id,
              jurisdiction: son,
              fatherJurisdiction: father,
              structure: form.structure,
              roleDesc: form.roleDesc,
            };
          } else {
            delete form.id;
            const params = {
              jurisdiction: son,
              fatherJurisdiction: father,
              structure: form.structure,
              roleDesc: form.roleDesc,
            };
          }
          for (const key in form) {
            form[key] = "";
          }
          dialogFormVisible.value = false;
        } else {
          ElMessage({
            type: "error",
            iconClass: "el-icon-circle-close",
            message: "请检查输入的是否正确",
          });
        }
      });
    };
    return {
      tableData,
      table,
      handleCurrentChange,
      form,
      formId,
      dialogFormVisible,
      search,
      formLabelWidth,
      rules,
      change,
      formRules,
      submitForm,
      handleClose,
      totol,
      pagesize,
      page,
      title,
      data,
      defaultProps,
      tree,
      category,
      rolelist,
    };
  },
});
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
