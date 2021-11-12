<template>
  <router-view />
</template>
<style lang="scss">
body {
  margin: 0px;
  border: 0px;
  box-sizing: border-box;
  min-width: 1366px;
}
.el-message {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
}
.el-message__icon {
  font-size: 30px;
}
//修改弹窗样式
.el-dialog {
  border-radius: 10px !important;
  .el-dialog__header {
    background-color: #409eff;
    border-radius: 10px 10px 0 0;
  }
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__close {
    color: #fff !important;
    &:hover {
      color: #fff !important;
    }
  }
}
</style>
