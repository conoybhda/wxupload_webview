import { ref } from "vue";
import { urlConfig } from "@/config";
/**
 * 文件上传的token
 */
let token = "";
/**
 * 文件上传的Url
 */
let Url = "";
/**
 * 最大上传数量
 * 默认为1
 */
let maxCount = ref(1);

export const getUrlParams = () => {
  const params: { [key: string]: any } = {};
  const search = window.location.search.split("?")[1];
  if (!search) return params;
  // 解构url参数
  search.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    params[key] = value;
  });
  // 获取url参数
  token = params.token;
  maxCount.value = parseInt(params.max || 1);
  Url = urlConfig[params.env || "default"];
  return params;
};

export { token, Url, maxCount };
