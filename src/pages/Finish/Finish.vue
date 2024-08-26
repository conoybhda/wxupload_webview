<template>
  <div class="finishBox">
    <div class="title">文件上传成功</div>
    <img class="img" src="@/assets/files-success.svg" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.finishBox {
  position: absolute;
  top: 55vw;
  left: auto;
  right: auto;
  width: 70vw;
  height: 70vw;
  background: rgba(253, 254, 255, 0.7);
  box-shadow: 1vw 2vw 5vw 0vw rgba(0, 0, 0, 0.1);
  border-radius: 6vw 6vw 6vw 6vw;
  opacity: 1;
}

.title {
  position: absolute;
  top: 14vw;
  left: 8vw;
  font-size: 9vw;
  font-family: Source Han Sans SC-Regular, Source Han Sans SC;
  font-weight: 400;
  color: #4e94dd;
}

.img {
  position: absolute;
  top: 35vw;
  left: 77vw;
  width: 16vw;
  height: 16vw;
  opacity: 1;
  filter: drop-shadow(-50vw 0vw #4e94dd);
}
</style>
