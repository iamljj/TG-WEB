<template>
  <div class="flex">
    <el-card class="flex-left">
      <div class="search">
        <TreeNode
          :treeData="tree_Data"
          :isContextMenu="true"
          :contextMenus="contextMenus"
          @node-context="nodeContext"
          @nodeClick="nodeClick"
          class="person-left"
        />
      </div>
    </el-card>
    <el-card class="flex-right">
      <div class="top">
        <div class="top-name">经销商管理</div>
        <div class="top-right">
          <el-input class="input" placeholder="请输入经销商" v-model="searchKey"
            ><template #append>
              <el-button class="input-button">搜索</el-button>
            </template></el-input
          >
        </div>
      </div>
      <Table ref="table" :columns="tableCol_" :tableData="tableData_">
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="medium" type="text">解绑</el-button>
          </template>
        </el-table-column>
      </Table>
      <el-pagination
        layout="prev, pager, next"
        :total="totol"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        class="pageSelect"
      >
      </el-pagination>
    </el-card>
  </div>
  <el-dialog v-model="dialogVisible" width="30%" title="新增节点" @closed="clearform">
    <el-form ref="formRules" :model="form_" label-width="120px" :rules="rules">
      <el-form-item label="上级节点">
        <el-input v-model="form_.nodeName" disabled></el-input>
      </el-form-item>
      <el-form-item label="节点名称" prop="childNodeName">
        <el-input v-model="form_.childNodeName"></el-input>
      </el-form-item>
      <el-form-item label="业务类型" prop="bsCode">
        <el-select v-model="form_.bsCode" placeholder="请选择业务类型" clearable multiple>
          <el-option
            v-for="(item, i) in business"
            :label="item.bsName"
            :value="item.bsCode"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addnode">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="修改节点" width="20%" v-model="EditNode">
    <el-form
      ref="formRules1"
      :model="form_"
      label-width="120px"
      @closed="clearform1"
      :rules="rules"
    >
      <el-form-item label="节点名称" prop="NodeName">
        <el-input v-model="form_.nodeName"></el-input>
      </el-form-item>
      <el-form-item label="业务类型" prop="bsCode">
        <el-select
          v-model="form_.bsCodeList"
          placeholder="请选择业务类型"
          clearable
          multiple
        >
          <el-option
            v-for="(item, i) in business"
            :label="item.bsName"
            :value="item.bsCode"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditNode = false">取消</el-button>
        <el-button type="primary" @click="editnode">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, onBeforeMount } from "vue";
import {
  tableData,
  form,
  totol,
  pagesize,
  page,
  data,
  columns,
  Businessall,
  rules,
  put_framework_node,
  node_business,
  delet_framework_node,
  get_framework_node_business,
  bindedagency,
} from "@/utils/pageData/organization";
import { title, get_tree_data } from "@/utils/pageData/personData";
import { storage } from "@/utils/storage";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/primeryTable.vue";
import router from "@/router/index";
import TreeNode from "@/components/treeNode.vue";
import { useStore } from "vuex";
import { arrayToTree } from "@/utils/arrayToTree";

export default defineComponent({
  name: "ShopName",
  components: {
    Table,
    TreeNode,
  },
  setup() {
    const formRules = ref(null);
    const formRules1 = ref(null);
    const store = useStore();
    let business = ref<Array<any>>([]);
    onBeforeMount(async () => {});

    //左键点击节点
    const nodeClick = async (node) => {
      const params = {
        nodeCode: node.nodeCode,
        page: {
          pageNum: page.value,
          pageSize: pagesize.value,
        },
      };
      // let { data } = await bindedagency(params)
    };

    //业务类型

    const url = "";

    //搜索框的文本值
    let searchKey = ref("");

    //表格Table
    let tableCol_ = reactive(columns);
    let tableData_ = tableData;

    //弹窗的model值
    let dialogVisible = ref(false);
    let EditNode = ref(false);

    //弹窗表单的值
    let form_ = reactive(form);

    //跳转到经销商绑定
    const dealer = () => {
      router.push("/home/dealer");
    };

    // 架构数据
    let tree_Data = ref([]);
    let treeLoad = ref(true);
    if (store.state.Node.frameworkNode.length == 0) {
      get_tree_data(20).then((res) => {
        tree_Data.value = arrayToTree(res, "parentCode");
        store.commit("SET_FRAMEWORK_NODE", tree_Data.value);
        treeLoad.value = false;
      });
    } else {
      tree_Data.value = store.state.Node.frameworkNode;
      treeLoad.value = false;
    }
    //点击树节点获取数据
    const rootIstrue: any = ref();
    let currentHoverItem = reactive<any>({});
    let parentNode = reactive<any>({});
    let a = 10;
    const nodeContext = (e, data, node) => {
      storage.set("node", data);

      if (data.root == true) {
        rootIstrue.value = false;
        a = 0;
      } else {
        rootIstrue.value = true;
        a = 10;
      }

      form_.nodeName = data.nodeName;
      form_.parentCode = data.nodeCode;
      form_.id = data.id;

      currentHoverItem = data;

      parentNode = node.parent;
    };
    const get = async () => {
      const params = {
        nodeCode: "",
        fatherCode: form_.parentCode,
      };
      business.value = await Businessall(params);
    };
    // 架构右键菜单
    let statu = "新增";
    const contextMenus: Array<any> = [
      {
        label: "新增节点",
        icon: "el-icon-plus",
        onClick() {
          dialogVisible.value = true;
          get();
        },
      },
      {
        label: "删除节点",
        icon: "el-icon-minus",
        onClick() {
          ElMessageBox.confirm(`确定要删除${form_.nodeName}`, "删除", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              let { code } = await delet_framework_node(form_.id);
              if (code != 200) {
                ElMessage({
                  type: "warning",
                  message: "删除失败",
                });
              } else {
                ElMessage({
                  type: "warning",
                  message: "删除成功",
                });
                let nodeIndex = parentNode.childNodes.findIndex(
                  (node) => node.label == currentHoverItem.nodeName
                );
                parentNode.childNodes.splice(nodeIndex, 1);
              }
              //TODO:先调用接口，数据删除成功之后执行下面代码
            })
            .catch(() => {
              ElMessage({
                type: "warning",
                message: "操作已取消",
              });
            });
        },
      },
      {
        disabled: rootIstrue.value,
        label: "修改节点",
        icon: "el-icon-edit",
        onClick() {
          statu = "修改";
          const params = {
            nodeCode: form_.parentCode,
          };
          const getlist = async () => {
            let { data, code } = await get_framework_node_business(params);
            console.log(data);

            form_.bsCodeList = data;
          };
          getlist();
          EditNode.value = true;
          get();
          let node = parentNode.childNodes.find(
            (node) => node.label == currentHoverItem.nodeName
          );
          node.nodeName = form.nodeName;
          // Businessall("", "");
        },
      },
      {
        label: "绑定经销商",
        icon: "el-icon-plus",
        onClick() {
          dealer();
        },
      },
    ];
    //弹窗关闭，表单清空
    const clearform = () => {
      formRules.value.resetFields();
    };
    const clearform1 = () => {
      formRules1.value.resetFields();
    };
    //首次进入加载组织架构

    //新增节点
    const addnode = () => {
      formRules.value.validate(async (valid: any) => {
        if (valid) {
          let params = {
            nodeName: form_.childNodeName,
            parentCode: form_.parentCode,
            root: rootIstrue.value,
          };
          let { code, data } = await put_framework_node(params);
          if (code !== 200) {
            ElMessage({
              type: "warning",
              message: "新增失败",
            });
          } else {
            ElMessage({
              type: "warning",
              message: "新增成功",
            });
            if (form_.bsCode.length > 0) {
              const params = {
                nodeCode: data,
                bsCodeList: form_.bsCode,
              };
              let { code } = await node_business(params);
              if (code !== 200) {
                ElMessage({
                  type: "warning",
                  message: "绑定业务失败",
                });
              } else {
                ElMessage({
                  type: "warning",
                  message: "绑定业务成功",
                });
              }
            }
            currentHoverItem.leaf = false;
            let d = {
              disable: true,
              nodeName: form_.childNodeName,
              leaf: data.leaf,
              nodeCode: data,
              parentCode: parentNode.nodeCode,
              root: rootIstrue.value,
            };
            if (!currentHoverItem.children) {
              currentHoverItem.children = [];
            }
            currentHoverItem.children.push(d);
          }
          dialogVisible.value = false;
        } else {
          ElMessage({
            type: "warning",
            message: "请检查输入是否正确",
          });
        }
      });
    };

    //修改节点
    const editnode = () => {
      formRules.value.validate(async (valid: any) => {
        if (valid) {
          const params = {
            id: form_.id,
            nodeName: form_.nodeName,
            nodeCode: form_.parentCode,
          };
          let { code, data } = await put_framework_node(params);
          if (code !== 200) {
            ElMessage({
              type: "warning",
              message: "修改失败",
            });
          } else {
            ElMessage({
              type: "warning",
              message: "修改成功",
            });
            if (form_.bsCodeList.length > 0) {
              const params = {
                nodeCode: form_.parentCode,
                bsCodeList: form_.bsCodeList,
              };
              let { code } = await node_business(params);
              if (code !== 200) {
                ElMessage({
                  type: "warning",
                  message: "绑定业务失败",
                });
              } else {
                ElMessage({
                  type: "warning",
                  message: "绑定业务成功",
                });
              }
            }
            currentHoverItem.nodeName = form_.nodeName;
            EditNode.value = false;
          }
        } else {
          ElMessage({
            type: "warning",
            message: "请检查输入是否正确",
          });
        }
      });
    };
    // 搜索
    const search = (searchText: string) => {
      const params = {
        page: 1,
        pageSize: pagesize.value,
        queryKey: searchText,
      };
      // displayall(params).then((res) => {
      //   tableData_.value = res.data.data.records
      //   totol.value = res.data.data.total
      // })
    };
    // 翻页
    const handleCurrentChange = (val: number) => {
      page.value = val;
      const params = {
        page: val,
        pageSize: pagesize.value,
      };
      // displayall(params).then((res) => {
      //   tableData.value = res.data.data.records
      //   totol.value = res.data.data.total
      // })
    };
    // 修改页面点击确认

    return {
      dialogVisible,
      tableData_,
      handleCurrentChange,
      search,
      totol,
      pagesize,
      page,
      title,
      data,
      dealer,
      contextMenus,
      searchKey,
      tableCol_,
      nodeContext,
      form_,
      business,
      EditNode,
      tree_Data,
      rules,
      formRules,
      formRules1,
      clearform,
      clearform1,
      nodeClick,
      addnode,
      editnode,
    };
  },
});
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  &-left {
    width: 25%;
    margin-right: 50px;
    height: 85vh;
    border-radius: 10px;
    overflow: auto;
  }
  &-right {
    height: 79vh;
    position: relative;
    margin-top: 6vh;
    width: 100%;
  }
  .search {
    height: 20px;
    border-radius: 10px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &-name {
      flex: 1;
      min-width: 7%;
      height: 5vh;
      line-height: 5vh;
      color: #333333;
      font-size: 20px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
    }
    &-right {
      .input {
        width: 250px;
        &-button {
          background-color: #409eff;
          color: #fff;
        }
      }
      .button {
        width: 100px;
        padding-left: 16px;
        margin-left: 10px;
      }
    }
  }
  .TreeTransfer {
    display: flex;
    justify-content: center;

    .life {
      width: 40%;
      height: 60vh;
    }
    .middle {
      width: 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .pageSelect {
    position: absolute;
    bottom: 20px;
    transform: translateX(-50%);
    left: 50%;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    padding-right: 8px;
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
}
</style>
