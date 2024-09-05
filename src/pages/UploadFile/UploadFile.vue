<template>
  <div :style="'width:100%;height:100%'">
    <Transition name="tran" mode="out-in">
      <Progress
        v-if="nowStatus == 'uploading'"
        class="progress"
        :percent="progress"
      ></Progress>
      <Success v-else-if="nowStatus == 'finish'" class="progress" />
    </Transition>
    <div :class="'fileListBox ' + nowStatus">
      <text class="fltext">文件列表</text>
      <text v-if="nowStatus" class="sugMaxCount"
        >您最多可以选择{{ maxCount }}个文件</text
      >
      <div class="fileList">
        <fileCard
          class="fileCard"
          v-for="(file, index) in fileList"
          :key="file.file.name"
          :style="'animation-delay: ' + index * 100 + 'ms'"
          v-model="file.isChoosen"
          :choosable="choosable || file.isChoosen"
          :file="file.file"
          @upload-end="uploadEnd"
        />
      </div>
    </div>
    <button
      v-if="nowStatus == 'uploadFile'"
      class="uploadButton"
      @click="upload"
    >
      <text class="buttonText">上传</text>
    </button>
  </div>
</template>
<script setup lang="ts">
import { maxCount } from "@/api/urlParams";
import { fileList, nowStatus } from "@/utils/values";
import { computed, onMounted, ref } from "vue";
import fileCard from "@/components/fileCard.vue";
import Progress from "@/components/progress.vue";
import Success from "@/components/success.vue";

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
    nowStatus.value = "finish";
  }
};
</script>
<style scoped lang="less">
.progress {
  position: absolute;
  display: block;
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
  &.uploading,
  &.finish {
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
      opacity: 0;
      animation: fadeIn 0.5s ease-in-out both;
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateX(40px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}

.uploadButton {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28vw;
  height: 13vw;
  left: 50vw;
  transform: translateX(-50%);
  top: auto;
  bottom: calc(15vh - 14vw);
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

.tran-enter-active,
.tran-leave-active {
  transition: all 0.6s;
}

.tran-leave-to {
  opacity: 0;
  transform: rotateY(60deg);
}
.tran-enter-from {
  opacity: 0;
  transform: rotateY(-60deg);
}
</style>
