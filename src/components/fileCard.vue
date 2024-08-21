<template>
  <div class="card" @click="clickFileCard">
    <div class="brief">
      <img class="img" :src="getFileIcon(showInfo.suffix)" />
      <text class="name">{{ showInfo.name }}</text>
      <text class="size">{{ showInfo.size }}</text>
    </div>
    <div class="state">
      <template v-if ="nowStatus == 'uploadFile'">
        <img v-if="isChoosen" src="@/assets/checkmark-1.svg"></img>
        <img v-else src="@/assets/checkmark-0.svg"></img>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getFileIcon } from "@/api/getFileIcon";
import { computed } from "vue";
import { nowStatus } from "@/utils/values";

const props = defineProps({
  file: {
    type: File,
    required: true,
  },
});

const isChoosen = defineModel<boolean>()

// 展示信息计算
const showInfo = computed(() => {
  const name = props.file.name;
  const suffix = name.split(".").pop() || "";
  let size = "";
  if (props.file.size < 1024) {
    size = props.file.size + "B";
  } else if (props.file.size < 1024 * 1024) {
    size = (props.file.size / 1024).toFixed(2) + "KB";
  } else {
    size = (props.file.size / 1024 / 1024).toFixed(2) + "MB";
  }
  return { name, suffix, size };
});

const clickFileCard = () => {
  isChoosen.value = !isChoosen.value;
};
</script>
<style scoped lang="less">
.card {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 8px 15px 0px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  opacity: 1;
  overflow: hidden;
  border: 10px;
}

.brief {
  position: relative;
  margin-top: 3vw;
  margin-left: 5vw;
  pointer-events: none;
}

.img {
  position: relative;
  display: block;
  width: 10vw;
  height: 10vw;
  margin-top: 1vw;
  opacity: 1;
}

.name {
  position: relative;
  display: block;
  margin-top: -11vw;
  margin-left: 13vw;
  height: 6vw;
  max-width: 40vw;
  text-overflow: ellipsis;
  font-size: 5vw;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
}

.size {
  position: relative;
  margin-left: 13vw;
  height: 5vw;
  font-size: 4vw;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #8f8f8f;
}

.state {
  position: absolute;
  top: 6vw;
  left: 67vw;
  width: 6vw;
  height: 6vw;
  opacity: 1;
  pointer-events: none;
}

#progress {
  width: 6vw;
  height: 6vw;
}

.choosen {
  width: 6vw;
  height: 6vw;
  background-color: #4e94dd;
  border-radius: 50%;
}
</style>
