import { Ref, ref } from "vue";

/**
 * @chooseFile 文件选择阶段
 * @uploadFile 文件选择超过最大限制，进入二次选择阶段
 * @uploading 文件上传阶段
 * @finish 文件上传完成阶段
 */
export const nowStatus: Ref<
  "chooseFile" | "uploadFile" | "uploading" | "finish"
> = ref("chooseFile");

export const fileList: Ref<{ file: File; isChoosen: boolean }[]> = ref([]);
