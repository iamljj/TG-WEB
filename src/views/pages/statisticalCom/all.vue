<template>
  <div>
    <Statistical>
      <template #unitList>
        <el-card style="max-height: 87vh; position: relative; width: 100%">
          <Table :table="unitListTable" :tableData="allUnitListTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #groupList>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="groupListTable" :tableData="allUnitListTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #wineList>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="wineListTable" :tableData="allUnitListTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #tastMeet>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="tastMeetTable" :tableData="allUnitListTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #tourPlay>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="tourPlayTable" :tableData="allUnitListTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #travelPlay>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="travelPlayTable" :tableData="allUnitListTable" :buttonShow="false"></Table>
        </el-card>
      </template>
    </Statistical>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Statistical from '../statistical.vue'
import Table from '@/components/table/table.vue'
import {
  unitListTable,
  allUnitListTable,
  groupListTable,
  tourPlayTable,
  wineListTable,
  travelPlayTable,
  tastMeetTable
} from '@/utils/pageData/statistical/tableData'
export default defineComponent({
  name: 'ShopName',
  components: {
    Table,
    Statistical
  },
  setup() {
    return {
      unitListTable,
      allUnitListTable,
      wineListTable,
      tastMeetTable,
      tourPlayTable,
      travelPlayTable,
      groupListTable
    }
  }
})
</script>

<style scoped lang="scss">
.pageSelect {
  position: absolute;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
}
</style>
