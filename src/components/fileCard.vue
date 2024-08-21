<template>
  <div class="card" :class="choosable ? '' : 'disable'" @click="clickFileCard">
    <div class="brief">
      <img class="fileIcon" :src="getFileIcon(showInfo.suffix)" />
      <text class="name">{{ showInfo.name }}</text>
      <text class="size">{{ showInfo.size }}</text>
    </div>
    <div class="state">
      <template v-if="nowStatus == 'uploadFile'">
        <img v-if="!isChoosen" class="icon" src="@/assets/checkmark-0.svg" />
        <div v-else class="icon fill"></div>
      </template>
      <canvas
        v-show="nowStatus == 'uploading' && !uploadEnd"
        class="progress"
        ref="canvas"
        height="110"
        width="110"
      ></canvas>
      <img v-show="uploadEnd" class="icon" src="@/assets/checkmark-1.svg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { uploadFile, uploadFileLocal } from "@/api/uploadFile";
import { getFileIcon } from "@/api/getFileIcon";
import { nowStatus } from "@/utils/values";

const props = defineProps({
  file: {
    type: File,
    required: true,
  },
  choosable: {
    type: Boolean,
    default: true,
  },
});

const isChoosen = defineModel<boolean>();
const canvas = ref<HTMLCanvasElement | null>(null);
const uploadEnd = ref(false);
let ctx: CanvasRenderingContext2D | null | undefined = void 0;
let progress = 0;

nextTick(() => {
  ctx = canvas.value?.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#4e94dd";
  ctx.strokeStyle = "#4e94dd";
});

watch(nowStatus, async () => {
  if (nowStatus.value == "uploading") {
    try {
      const res = await uploadFileLocal(props.file, (e) => {
        progress = e.progress || 0;
        drawProgress();
      });
      if (res.status == 200) {
        uploadEnd.value = true;
      }
    } catch (e) {
      console.log(e);
    }
  }
});

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

const drawProgress = () => {
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.arc(50, 50, 49, -0.5 * Math.PI, (progress / 50 - 0.5) * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

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
  transition: all 0.1s;
  filter: grayscale(0);
  &:active {
    filter: brightness(0.9);
    scale: 0.97;
  }
  .brief {
    position: relative;
    margin-top: 3vw;
    margin-left: 5vw;
    pointer-events: none;
    .fileIcon {
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
  }
  .state {
    position: absolute;
    top: calc(50% - 3vw);
    left: auto;
    right: 6vw;
    width: 6vw;
    height: 6vw;
    opacity: 1;
    pointer-events: none;
    .progress {
      width: 6.6vw;
      height: 6.6vw;
    }
    .icon {
      width: 6vw;
      height: 6vw;
      &.fill {
        background-color: #4e94dd;
        border-radius: 50%;
      }
    }
  }
}

.choosen {
  width: 6vw;
  height: 6vw;
  background-color: #4e94dd;
  border-radius: 50%;
}
</style>
