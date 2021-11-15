<template>
  <table class="draggableTable">
    <thead>
      <tr>
        <template v-for="(col, i) in columns" :key="i">
          <th :style="{ width: col.width }">{{ col.label }}</th>
        </template>
        <slot name="header" />
      </tr>
    </thead>
    <draggable v-model="tableData" tag="tbody" item-key="id" @end="dragEnd">
      <template #item="{ element, index }">
        <tr class="draggableTable-row">
          <td>{{ index + 1 }}</td>
          <template v-for="(value, key, i) in element" :key="key">
            <td>
              {{ value }}
            </td>
          </template>
          <slot name="scope" />
        </tr>
      </template>
    </draggable>
  </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
export default defineComponent({
  components: { draggable },
  props: {
    columns: Array,
    list: Array,
  },
  setup() {},
  data() {
    return {
      tableData: this.list,
    };
  },
  methods: {
    dragEnd() {
      this.$emit("drag-end", this.tableData);
    },
  },
});
</script>
<style lang="scss" scoped>
.draggableTable {
  margin-top: 15px;
  width: 100%;
  &-row:nth-child(even) {
    background: rgba(230, 230, 230, 0.7);
  }
  &-row:hover {
    background: #d3cece;
  }
  thead {
    background: rgba(211, 211, 211, 0.7);
    font-weight: 500;
  }
  th {
    padding: 10px;
  }
  td {
    text-align: center;
    padding: 10px 5px;
  }
}
</style>
