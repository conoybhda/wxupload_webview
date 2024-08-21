<template>
  <div class="buttonBackground">
    <text class="titleText">上传本地文件</text>

    <label for="chooseFileButton" class="button">
      <img src="@/assets/upload.svg" alt="" class="icon" />
      <text class="text">{{ isResume ? "简历" : "文件" }}上传</text>
    </label>
    <input
      :accept="isResume ? '.doc,.docx,.pdf' : ''"
      type="file"
      id="chooseFileButton"
      :multiple="maxCount > 1"
      :maxlength="maxCount"
      @change="getfile($event)"
    />
    <text class="sugMaxCount">最多上传{{ maxCount }}个文件</text>
  </div>
</template>

<script setup lang="ts">
import { isResume, maxCount } from "@/api/urlParams";
import { nowStatus, fileList } from "@/utils/values";
import { nextTick } from "vue";

const getfile = async (e: any) => {
  nowStatus.value = "uploadFile";
  let list = [];
  for (const file of e.target.files as FileList) {
    list.push({ file, isChoosen: false });
  }
  fileList.value = list;
  if (fileList.value.length <= maxCount.value) {
    fileList.value.forEach((file) => {
      file.isChoosen = true;
    });
    await nextTick();
    nowStatus.value = "uploading";
  }
};
</script>

<style scoped lang="less">
.buttonBackground {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  top: 30vh;
  left: 11vw;
  width: 77vw;
  height: 35vh;
  background: rgba(253, 254, 255, 0.7);
  box-shadow: 1vw 2vw 5vw 0vw rgba(0, 0, 0, 0.1);
  border-radius: 6vw 6vw 6vw 6vw;
  opacity: 1;
  .titleText {
    font-size: 8vw;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #4e94dd;
  }

  #chooseFileButton {
    display: none;
  }

  .button {
    width: 23vw;
    height: 23vw;
    background: rgba(255, 255, 255, 0.59);
    box-shadow: 0vw 1vw 2vw 0vw rgba(0, 0, 0, 0.16);
    border-radius: 6vw 6vw 6vw 6vw;
    opacity: 1;
    overflow: hidden;
    margin-top: 3vh;
    transition: all 0.1s;
    &:active {
      filter: brightness(0.9);
      scale: 0.97;
    }
    .icon {
      display: block;
      position: relative;
      margin-left: 7vw;
      margin-top: 3vw;
      width: 10vw;
      height: 11vw;
      opacity: 1;
    }

    .text {
      position: relative;
      margin-left: 3.5vw;
      width: 16vw;
      height: 6vw;
      font-size: 4vw;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #7e7e7e;
    }
  }
  .sugMaxCount {
    position: relative;
    margin-top: 2vh;
    font-size: 4vw;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #7e7e7e;
  }
}
</style>
