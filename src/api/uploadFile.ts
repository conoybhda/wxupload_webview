import { Url, token, isResume } from "./urlParams";
import axios, { AxiosProgressEvent } from "axios";

/**
 * 上传文件
 * @param f 上传的文件
 * @param onUploadProgress 获取上传进度的接口
 */
export const uploadFile = async (
  f: File,
  onUploadProgress?: (ProgressEvent: AxiosProgressEvent) => void
) => {
  try {
    let getToken = await axios({
      url: Url,
      method: "POST",
      data: {
        type: isResume.value ? "work" : "resume",
        name: f.name,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    let { OSSAccessKeyId, callback, expire, host, key, policy, signature } =
      getToken.data.data;
    console.log(host);
    if (new Date(expire) > new Date()) {
      let formData = new FormData();
      formData.append("OSSAccessKeyId", OSSAccessKeyId);
      formData.append("callback", callback);
      formData.append("expire", expire);
      formData.append("key", key);
      formData.append("policy", policy);
      formData.append("signature", signature);
      formData.append("file", f);
      let upload = await axios({
        url: host,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 180000,
        onUploadProgress,
      });
      if (upload.status === 200) {
        console.log("上传成功");
      }
      console.log(upload);
      return upload;
    } else {
      console.log("token过期");
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 模拟上传文件
 */
export const uploadFileLocal = async (
  f: File,
  onUploadProgress?: (ProgressEvent: AxiosProgressEvent) => void
) => {
  for (let i = 0; i <= 100; i+=2) {
    onUploadProgress &&
      onUploadProgress({
        progress: i,
        bytes: 0,
        lengthComputable: false,
        loaded: 0,
      });
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  console.log("上传成功");
  return { status: 200 };
};
