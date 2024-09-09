import { Url, token } from "./urlParams";
import axios, { AxiosProgressEvent, AxiosResponse } from "axios";

/**
 * 上传文件
 * @param f 上传的文件
 * @param onUploadProgress 获取上传进度的接口
 */
const upload = async (
  f: File,
  onUploadProgress?: (ProgressEvent: AxiosProgressEvent) => void
): Promise<AxiosResponse<any, any> | any> => {};

/**
 * 模拟上传速度,单位:byte/s
 */
const locUploadSpeed = 100000;

/**
 * 模拟上传文件
 */
const uploadFileLocal = async (
  f: File,
  onUploadProgress?: (ProgressEvent: AxiosProgressEvent) => void
) => {
  let size = f.size;
  let nowUploadSize = 0;
  while (true) {
    nowUploadSize += locUploadSpeed;
    if (nowUploadSize > size) {
      break;
    }
    onUploadProgress &&
      onUploadProgress({
        progress: Math.floor((nowUploadSize / size) * 100),
        bytes: 0,
        lengthComputable: false,
        loaded: 0,
      });
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  console.log("上传成功");
  return { status: 200 };
};

export const uploadFile =
  import.meta.env.MODE === "loc" ? uploadFileLocal : upload;
