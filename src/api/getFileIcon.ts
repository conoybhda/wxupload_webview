// 文件图标配置项
export const fileIconConfig: { [key: string]: string } = {
  DOC: "DOC.svg",
  DOCX: "DOC.svg",
  PDF: "PDF.svg",
  JPG: "JPG.svg",
  JEPG: "JPG.svg",
  AI: "AI.svg",
  PNG: "PNG.svg",
  ZIP: "ZIP.svg",
  SEG: "Segmentation.svg",
  DS: "DS.svg",
  JSON: "JSON.svg",
  PPT: "PPTX.svg",
  PPTX: "PPTX.svg",
  RAR: "RAR.svg",
  TEXT: "TEXT.svg",
  TXT: "TEXT.svg",
  XLS: "XLSX.svg",
  XLSX: "XLSX.svg",
};

export const getFileIcon = (fileType: string) => {
  console.log(
    `../assets/fileIcons/${
      fileIconConfig[fileType.toUpperCase()] || "default.svg"
    }`
  );
  console.log(
    new URL(
      `../assets/fileIcons/${
        fileIconConfig[fileType.toUpperCase()] || "default.svg"
      }`,
      import.meta.url
    ).href
  );
  return new URL(
    `../assets/fileIcons/${
      fileIconConfig[fileType.toUpperCase()] || "default.svg"
    }`,
    import.meta.url
  ).href;
};
