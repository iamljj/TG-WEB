<template>
  <el-tabs :model-value="activeName" @tab-click="handleClick">
    <el-tab-pane :label="tabPane.label" :name="tabPane.value" v-for="(tabPane, i) in tabs" :key="i">
      <slot :name="tabPane.value" />
      <slot></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tabs: Array,
    activeName: String
  },
  methods: {
    handleClick(tab) {
      this.$emit('handleClick', tab)
    }
  }
})
</script>
