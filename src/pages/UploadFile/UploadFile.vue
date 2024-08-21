<template>
  <div :class="'fileListBox ' + (true ? 'box' : 'uploading')">
    <text class="fltext">文件列表</text>
    <div class="fileList">
      <fileCard
        class="fileCard"
        v-for="file in fileList"
        v-model="file.isChoosen"
        :file="file.file"
      />
    </div>
  </div>
  <button class="uploadButton" @click="upload">
    <text class="buttonText">上传</text>
  </button>
</template>
<script setup lang="ts">
import fileCard from "@/components/fileCard.vue";
import { fileList } from "@/utils/values";
import { ref } from "vue";

const upload = () => {
  console.log("upload");
};
</script>
<style scoped lang="less">
.fileListBox {
  transition: all 0.5s;
  &.box {
    position: relative;
    margin-left: 10vw;
    top: 12vh;
    margin-right: 10vw;
  }
  &.uploading {
    position: relative;
    left: 10vw;
    top: 108vw;
  }
  .fltext {
    position: relative;
    font-size: 7vw;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #ffffff;
  }
  .fileList {
    position: relative;
    margin-top: 10px;
    width: 100%;
    max-height: 50vh;
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 150vw;
  left: 36vw;
  width: 28vw;
  height: 13vw;
  background: #ffffffce;
  box-shadow: 0vw 1vw 2vw 0vw rgba(78, 148, 221, 0.8);
  border-radius: 2vw 2vw 2vw 2vw;
  opacity: 1;
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
