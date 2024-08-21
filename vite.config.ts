import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://api.recruitment.ziqiang.net.cn/api",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //     "/test": {
  //       target: "https://api.test.recruitment.ziqiang.net.cn/api",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/test/, ""),
  //     },
  //   },
  // },
});
