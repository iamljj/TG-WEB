<template>
  <div class="log-Mcontainer">
    <el-card style="height: 89vh; position: relative">
      <template #header>
        <div style="display: flex">
          <div style="flex: 1">
            <text style="font-size: 20px"><b>操作日志</b></text>
          </div>
          <div>
            <ElDatePicker :locale="locale"> </ElDatePicker>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElDatePicker } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: 'log',
  components: {
    ElDatePicker
  },
  setup(props, context) {
    //日期的值
    let date = ref('')
    return {
      date,
      locale: zhCn
    }
  }
})
</script>
<style lang="scss">
.log-Mcontainer {
}
</style>
