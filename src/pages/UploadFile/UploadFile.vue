<template>
  <Progress
    v-if="nowStatus == 'uploading'"
    class="progress"
    :percent="progress"
  ></Progress>
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
        @upload-end="uploadEnd"
      />
    </div>
  </div>
  <button v-if="nowStatus == 'uploadFile'" class="uploadButton" @click="upload">
    <text class="buttonText">上传</text>
  </button>
</template>
<script setup lang="ts">
import { maxCount } from "@/api/urlParams";
import { fileList, nowStatus } from "@/utils/values";
import { computed, onMounted, ref } from "vue";
import fileCard from "@/components/fileCard.vue";
import Progress from "@/components/progress.vue";

const progress = ref(0);
let uploadFileLength = 0;
let nowUploadFileLength = 0;

onMounted(() => {
  uploadFileLength = fileList.value.length;
});

const choosable = computed(() => {
  let res = 0;
  fileList.value.forEach((file) => {
    if (file.isChoosen) res++;
  });
  return res < maxCount.value;
});

const upload = async () => {
  // 筛选选中的文件
  fileList.value = fileList.value.filter((file) => file.isChoosen);
  uploadFileLength = fileList.value.length;
  // 切换状态
  nowStatus.value = "uploading";
};

const uploadEnd = () => {
  nowUploadFileLength++;
  if (nowUploadFileLength < uploadFileLength) {
    progress.value = Math.floor((nowUploadFileLength * 100) / uploadFileLength);
  } else {
    progress.value = 100;
  }
};
</script>
<style scoped lang="less">
.progress {
  position: absolute;
  top: 20vw;
  left: 25vw;
}
.fileListBox {
  position: absolute;
  transition: all 0.5s;
  width: 80vw;
  left: 10vw;
  &.uploadFile {
    top: 6vh;
  }
  &.uploading {
    top: calc(5vh + 70vw);
    .fileList {
      max-height: calc(80vh - 70vw);
    }
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
    width: 80vw;
    max-height: 60vh;
    overflow-x: hidden;
    overflow-y: scroll;
    .fileCard {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      margin-top: 2vh;
      margin-bottom: 2vh;
      width: 78vw;
      height: 18vw;
      border-radius: 2vh;
    }
  }
}

.uploadButton {
  position: relative;
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28vw;
  height: 13vw;
  margin-top: auto;
  margin-bottom: calc(15vh - 14vw);
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
  .buttonText {
    width: 12vw;
    height: 9vw;
    font-size: 6vw;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #4e94dd;
  }
}
</style>
