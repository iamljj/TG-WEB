<template>
  <el-container style="height: 100vh">
    <el-aside width="250px">
      <left :routers="sildeMenus"></left>
    </el-aside>
    <el-container>
      <el-header style="background: #ffffff">
        <top></top>
      </el-header>
      <el-main style="background: #f4f6f4">
        <!-- <router-view v-slot="keepAliveRouter">
          <keep-alive>
            <component :is="keepAliveRouter" />
          </keep-alive>
        </router-view> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import left from "@/components/home/left.vue";
import top from "@/components/home/top.vue";
import { routers } from "@/router/homeChildren";
import { useStore } from "vuex";

export default defineComponent({
  name: "home",
  components: {
    left,
    top,
  },
  setup() {
    const sildeMenus = routers;
    const store = useStore();
    let keepAliveRouter = [];
    sildeMenus.forEach((route) => {
      if (route.meta && route.meta.keepAlive) {
        keepAliveRouter.push(route.name);
      }
    });
    store.commit("SET_KEEP_ALIVE_ROUTER", keepAliveRouter);
    return {
      sildeMenus,
      keepAliveRouter,
    };
  },
});
</script>

<style lang="scss">
.el-message {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
}
.el-message__icon {
  font-size: 30px;
}
</style>
