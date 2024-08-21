<template>
  <div :class="'fileListBox ' + nowStatus">
    <text class="fltext">文件列表</text>
    <text v-if="nowStatus" class="sugMaxCount"
      >您最多可以选择{{ maxCount }}个文件</text
    >
    <div class="fileList">
      <fileCard
        class="fileCard"
        v-for="file in fileList"
        v-model="file.isChoosen"
        :choosable="choosable || file.isChoosen"
        :file="file.file"
      />
    </div>
  </div>
  <button v-if="nowStatus == 'uploadFile'" class="uploadButton" @click="upload">
    <text class="buttonText">上传</text>
  </button>
</template>
<script setup lang="ts">
import { maxCount } from "@/api/urlParams";
import fileCard from "@/components/fileCard.vue";
import { fileList, nowStatus } from "@/utils/values";
import { computed } from "vue";

const choosable = computed(() => {
  let res = 0;
  fileList.value.forEach((file) => {
    if (file.isChoosen) res++;
  });
  return res < maxCount.value;
});

const upload = () => {
  // 筛选选中的文件
  fileList.value = fileList.value.filter((file) => file.isChoosen);
  // 切换状态
  nowStatus.value = "uploading";
};
</script>
<style scoped lang="less">
.fileListBox {
  transition: all 0.5s;
  width: 80vw;
  &.uploadFile {
    position: relative;
    margin-top: -15vh;
  }
  &.uploading {
    position: relative;
    margin-top: 20vh;
  }
  .fltext {
    position: relative;
    font-size: 9vw;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    display: block;
    color: #ffffff;
  }
  .sugMaxCount {
    position: relative;
    font-size: 5vw;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    display: block;
    color: #ffffffb6;
  }
  .fileList {
    position: relative;
    margin-top: 8px;
    width: 100%;
    max-height: 60vh;
    overflow: auto;
    .fileCard {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      margin-top: 2vh;
      margin-bottom: 2vh;
      width: 96%;
      height: 8vh;
      border-radius: 2vh;
    }
  }
}

.circleText {
  width: 18vw;
  height: 13vw;
  font-size: 9vw;
  font-weight: 400;
  fill: #ffffff;
}
.circle {
  fill: none;
  width: 100vw;
  height: 100vw;
  stroke-dasharray: 314;
  stroke-dashoffset: 314;
  stroke-linecap: round;
  transition: all 0.5s;
  transform: rotate(-90deg);
  transform-origin: center;
  transform-box: fill-box;
}
.loadCircle {
  position: absolute;
  top: 62vw;
  left: 32vw;
  width: 35vw;
  height: 35vw;
  overflow: visible;
}
.load {
  position: absolute;
  top: 43vw;
  left: 67vw;
  width: 7vw;
  height: 7vw;
  overflow: visible;
}
.uploadText {
  position: absolute;
  top: 41vw;
  left: 29vw;
  width: 35vw;
  height: 10vw;
  font-size: 7vw;
  font-family: Source Han Sans SC-Regular, Source Han Sans SC;
  font-weight: 400;
  color: #ffffff;
  z-index: 99;
}

.center {
  position: absolute;
  top: 6vw;
  left: 6vw;
  width: 23vw;
  height: 23vw;
  background: #3b98ea;
  box-shadow: 1vw 1vw 2vw 0vw rgba(0, 0, 0, 0.16);
  border-radius: 50%;
  opacity: 1;
  z-index: 101;
}

.bigupload {
  position: absolute;
  top: 62vw;
  left: 32vw;
  width: 35vw;
  height: 35vw;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  opacity: 1;
  z-index: 99;
}

.uploadButton {
  position: relative;
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28vw;
  height: 13vw;
  background: #ffffffce;
  box-shadow: 0vw 1vw 2vw 0vw rgba(78, 148, 221, 0.8);
  border-radius: 2vw 2vw 2vw 2vw;
  border: 0;
  opacity: 1;
  transition: all 0.1s;
  &:active {
    filter: brightness(0.9);
    scale: 0.97;
  }
}

.buttonText {
  width: 12vw;
  height: 9vw;
  font-size: 6vw;
  font-family: Source Han Sans SC-Regular, Source Han Sans SC;
  font-weight: 400;
  color: #4e94dd;
}
</style>
