<template>
  <div>
    <Statistical>
      <template #unitList>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="table" :tableData="tableData" :form="form" :buttonShow="false"></Table>
        </el-card>
      </template>
    </Statistical>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { table, tableData } from '@/utils/pageData/shopNameData'
import Statistical from '../statistical.vue'
import Table from '@/components/table/table.vue'
export default defineComponent({
  name: 'ShopName',
  components: {
    Table,
    Statistical
  },
  setup() {
    return {
      tableData,
      table
    }
  }
})
</script>

<style scoped lang="scss"></style>
