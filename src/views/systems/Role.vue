<template>
  <div class="Role-Mcontainer">
    <Tabs
      class="person-right"
      :tabs="tabs"
      :activeName="activeName"
      @handleClick="tabChange"
    >

    </Tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Table from '@/components/table/primeryTable.vue'
import Tabs from '@/components/tabsButton.vue'
export default defineComponent({
  name: 'Role',
  components: {
    Table,
    Tabs
  },
  setup(props, context) {
    return {}
  }
})
</script>
<style lang="scss">
.Role-Mcontainer {
}
</style>
