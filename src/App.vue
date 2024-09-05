<template>
  <Transition name="fade" mode="out-in">
    <ChooseFile v-if="nowStatus == 'chooseFile'" />
    <UploadFile v-else />
    <!-- <Finish v-else-if="nowStatus == 'finish'"></Finish> -->
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { getUrlParams } from "@/api/urlParams";
import { nowStatus } from "@/utils/values";
import ChooseFile from "./pages/ChooseFile/ChooseFile.vue";
import UploadFile from "./pages/UploadFile/UploadFile.vue";
// import Finish from "./pages/Finish/Finish.vue";

onMounted(() => {
  getUrlParams();
});
</script>

<style scoped lang="less">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-leave-to {
  transform: translateX(-20%) scale(0.8);
  opacity: 0;
}
.fade-enter-from {
  transform: translateX(20%) scale(0.8);
  opacity: 0;
}
</style>
