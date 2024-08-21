import { ref } from "vue";
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
/**
 * 上传为简历或普通文件
 * false为普通文件
 */
let isResume = ref(false);

export const getUrlParams = () => {
  const params: { [key: string]: any } = {};
  const search = window.location.search.split("?")[1];
  if (!search) return params;
  search.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    params[key] = value;
  });

  token = params.token;
  maxCount.value = parseInt(params.max || 1);
  isResume.value = params.isResume === "true";
  Url =
    params.istest === "true"
      ? "https://api.test.recruitment.ziqiang.net.cn/api/files/token/"
      : "https://api.recruitment.ziqiang.net.cn/api/files/token/";
  return params;
};

export { token, Url, maxCount, isResume };
