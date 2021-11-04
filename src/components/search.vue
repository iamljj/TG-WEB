<template>
  <div>
    <div class="top-search">
      <el-input
        @input="change"
        class="top-search-input"
        :placeholder="searchtext"
        v-model="searchText"
        suffix-icon="el-icon-search"
      ></el-input>
      <el-button
        type="primary"
        class="top-search-button"
        @click="$emit('search', searchText)"
        >搜索</el-button
      >
      <el-button
        type="primary"
        size="medium"
        class="top-search-button"
        @click="showAdd(form)"
        v-if="!isShow"
      >
        新增
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { showAdd } from "@/utils/pageData/publicData";
export default defineComponent({
  name: "Search",
  emits: ["search"],
  props: {
    form: Object,
    searchtext: String,
    name: String,
    isShow: Boolean,
  },

  setup() {
    const searchText = ref("");
    const change = () => {
      if (!searchText) {
      }
    };

    return { showAdd, searchText };
  },
});
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  &-search {
    display: flex;
    &-input {
      width: 240px;
      margin-right: 10px;
    }
    &-button {
      height: 40px;
      width: 96px;
      margin-right: 10px;
      border-radius: 10px;
    }
  }
}
</style>
