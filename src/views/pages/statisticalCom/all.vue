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
          <Table :table="groupListTable" :tableData="allGroupListTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #wineList>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="wineListTable" :tableData="allWineListTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #tastMeet>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="tastMeetTable" :tableData="allTastMeetTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #tourPlay>
        <el-card style="max-height: 87vh; position: relative">
          <Table :table="tourPlayTable" :tableData="allTourPlayTable" :buttonShow="false"></Table>
        </el-card>
      </template>
      <template #travelPlay>
        <el-card style="max-height: 87vh; position: relative">
          <Table
            :table="travelPlayTable"
            :tableData="alltravelPlayTable"
            :buttonShow="false"
          ></Table>
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
  allGroupListTable,
  tourPlayTable,
  allTourPlayTable,
  wineListTable,
  alltravelPlayTable,
  travelPlayTable,
  tastMeetTable,
  allTastMeetTable,
  allWineListTable
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
      allTourPlayTable,
      allTastMeetTable,
      allWineListTable,
      alltravelPlayTable,
      groupListTable,
      allGroupListTable
    }
  }
})
</script>

<style scoped lang="scss"></style>
