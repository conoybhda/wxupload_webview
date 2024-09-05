<template>
  <div class="suc">
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-labelledby="circleOkIconTitle"
    >
      <title id="circleOkIconTitle">OK</title>
      <polyline
        class="path1"
        points="7 13 10 16 17 9"
        stroke="#ffffff"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        style="animation-delay: 400ms"
      />
      <circle
        class="path2"
        cx="12"
        cy="12"
        r="11"
        stroke="#ffffff"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>
  </div>
</template>
<style lang="less" scoped>
.suc {
  width: 50vw;
}
.path1 {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: offset 1s linear forwards;
}

.path2 {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: offset 0.4s linear forwards;
}

@keyframes offset {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
