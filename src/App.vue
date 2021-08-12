<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {}
})
</script>

<style>
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
</style>
