// 文件图标配置项
export const fileIconConfig: { [key: string]: string } = {
  doc: "doc.svg",
  docx: "doc.svg",
  pdf: "Pdf.svg",
  jpg: "Jpg.svg",
  jpeg: "Jpg.svg",
  ai: "adobe-ai.svg",
  png: "Png.svg",
  zip: "zip.svg",
  seg: "Segmentation.svg",
  DS: "DS.svg",
};

export const getFileIcon = (fileType: string) => {
  return new URL(
    `../assets/fileIcons/${fileIconConfig[fileType] || "default.svg"}`,
    import.meta.url
  ).href;
};
