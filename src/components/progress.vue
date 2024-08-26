<template>
  <div
    class="progress"
    :style="{
      '--percent': percent,
      '--size': size + 'vw',
      '--border-width': borderWidth + 'px',
      '--color': color,
      '--inactive-color': inactiveColor,
    }"
  >
    <svg>
      <circle stroke="var(--inactive-color)" />
      <circle
        stroke="var(--color)"
        class="progress-value"
        style="
          stroke-dasharray: calc(2 * 3.1415 * var(--r) * (var(--percent) / 100)),
            1000;
        "
      />
    </svg>
  </div>
</template>
<script setup lang="ts">
defineProps({
  percent: Number,
  size: { type: Number, default: 50 },
  borderWidth: { type: Number, default: 10 },
  color: { type: String, default: "#ffffff" },
  inactiveColor: { type: String, default: "#ffffff73" },
});
</script>
<style scoped lang="less">
.progress {
  --percent: 0; /* 百分数 */
  --size: 50vw; /* 尺寸大小 */
  --border-width: 10px; /* 环宽（粗细） */
  --color: #ffffff; /* 主色 */
  --inactive-color: #ffffff73; /* 辅助色 */

  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    counter-reset: progress var(--percent);
    content: counter(progress) "%";
    white-space: nowrap;
    font-size: 10vw;
    color: white;
  }
  & > svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  circle {
    --r: calc((var(--size) - var(--border-width)) / 2);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--r);
    fill: none;
    stroke-width: var(--border-width);
    stroke-linecap: round;
    transition: stroke-dasharray 0.8s ease-in-out;
  }
  .progress-value {
    opacity: var(--percent);
  }
}
</style>
